import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Header from "../../../components/Header/Header";
import RelatedArticleList from "../../../components/RelatedArticleList/RelatedArticleList";
import {
  ArticleDetailResponse,
  ArticleListResponse,
  getArticleDetail,
  getArticleList,
} from "../../../constants/endpoint.constant";
import styles from "../../../styles/RelatedPage.module.scss";

type Props = {
  slug: string;
  articleDetail: ArticleDetailResponse;
  relatedArticleList: ArticleListResponse;
};

const openSans = Open_Sans({ subsets: ["latin"] });

export const getStaticPaths: GetStaticPaths = async (context) => {
  const articleList = await getArticleList({
    perPage: 999,
  });

  return {
    paths: articleList.data.map((article) => ({
      params: { slug: article.slug },
    })),

    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.["slug"] as string;

  if (!slug) {
    return { notFound: true };
  }

  try {
    const articleDetail = await getArticleDetail(slug);

    const relatedArticleList = await getArticleList({
      categoryId: articleDetail.data.category.id,
      excludedArticleId: articleDetail.data.id,
    });

    return { props: { slug, articleDetail, relatedArticleList } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

const RelatedPage: NextPage<Props> = (props) => {
  return (
    <>
      <div className={`${styles.header} ${openSans.className}`}>
        <Header />

        <div className={styles.titleWrapper} style={{ marginTop: 150 }}>
          <h1>Related Post List</h1>

          <div style={{ display: "flex", gap: 50 }}>
            <div className={styles.imageWrapper} style={{ flex: "1 0 auto" }}>
              <Image
                src={props.articleDetail.data.thumbnail}
                alt={props.articleDetail.data.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 className={styles.title}>{props.articleDetail.data.title}</h1>

              <span className={styles.summary} style={{ marginTop: 12 }}>
                {props.articleDetail.data.summary}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <main className={`${styles.main} ${openSans.className}`}>
          <RelatedArticleList
            articleDetail={props.articleDetail.data}
            initialArticleList={props.relatedArticleList}
          />
        </main>
      </div>
    </>
  );
};

export default RelatedPage;
