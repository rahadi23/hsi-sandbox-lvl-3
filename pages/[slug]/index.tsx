import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import React from "react";
import Header from "../../components/Header/Header";
import RelatedArticleHighlightList from "../../components/RelatedArticleHighlightList/RelatedArticleHighlightList";
import {
  ArticleDetailResponse,
  getArticleDetail,
  getArticleList,
} from "../../constants/endpoint.constant";
import { reducer as articleListReducer } from "../../reducers/article-list.reducer";
import styles from "../../styles/DetailPage.module.scss";

type Props = {
  slug: string;
  articleDetail: ArticleDetailResponse;
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

    return { props: { slug, articleDetail } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

const DetailPage: NextPage<Props> = ({ slug, articleDetail }) => {
  const author = articleDetail.data.author;
  const authorFullName =
    `${author.firstName} ${author.middleName} ${author.lastName}`.trim();

  const [state, dispatch] = React.useReducer(articleListReducer, {
    state: "idle",
  });

  React.useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "loading" });

        const relatedArticleList = await getArticleList({
          categoryId: articleDetail.data.category.id,
          excludedArticleId: articleDetail.data.id,
          perPage: 2,
        });

        dispatch({ type: "set_data", data: relatedArticleList });
      } catch (err: any) {
        dispatch({ type: "error", message: err.toString() });
        console.error(err);
      }
    })();
  }, [articleDetail.data.category.id, articleDetail.data.id]);

  return (
    <>
      <div className={`${styles.header} ${openSans.className}`}>
        <Header />

        <div className={styles.titleWrapper} style={{ marginTop: 150 }}>
          <h1 className={styles.title}>{articleDetail.data.title}</h1>

          <span className={styles.summary}>{articleDetail.data.summary}</span>

          <div className={styles.author}>
            <span className="subtle">By</span>
            <span>{authorFullName}</span>
            <span className="subtle">In</span>
            <span>{articleDetail.data.category.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <main className={`${styles.main} ${openSans.className}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={articleDetail.data.thumbnail}
              alt={articleDetail.data.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ marginTop: 60 }}>
            <p className={styles.content}>{articleDetail.data.content}</p>
          </div>

          <div style={{ marginTop: 90 }}>
            {state.state === "success" && state.data?.data.length ? (
              <RelatedArticleHighlightList
                slug={slug}
                relatedArticles={state.data.data}
              />
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
};

export default DetailPage;
