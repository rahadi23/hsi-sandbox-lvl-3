import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../../components/Header/Header";
import RelatedArticleItem from "../../components/RelatedArticleItem/RelatedArticleItem";
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

const DetailPage: NextPage<Props> = (props) => {
  const author = props.articleDetail.data.author;
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
          categoryId: props.articleDetail.data.category.id,
          excludedArticleId: props.articleDetail.data.id,
          perPage: 2,
        });

        dispatch({ type: "set_data", data: relatedArticleList });
      } catch (err: any) {
        dispatch({ type: "error", message: err.toString() });
        console.error(err);
      }
    })();
  }, [props.articleDetail.data.category.id, props.articleDetail.data.id]);

  const renderRelatedArticles = () => {
    // if (state.state === "loading") {
    //   return <h1 style={{ fontSize: 36 }}>Loading...</h1>;
    // }

    if (
      state.state === "error" ||
      state.state === "idle" ||
      !state.data?.data.length
    ) {
      return;
    }

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: 36 }}>You might also like...</h1>

          <Link href={`/${props.slug}/related`} style={{ color: "#9B9B9B" }}>
            More
          </Link>
        </div>

        <div className={styles.relatedArticleWrapper} style={{ marginTop: 60 }}>
          {state.data.data.map((relatedArticle) => (
            <RelatedArticleItem
              key={relatedArticle.id}
              article={relatedArticle}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className={`${styles.header} ${openSans.className}`}>
        <Header />

        <div className={styles.titleWrapper} style={{ marginTop: 150 }}>
          <h1 className={styles.title}>{props.articleDetail.data.title}</h1>

          <span className={styles.summary}>
            {props.articleDetail.data.summary}
          </span>

          <div className={styles.author}>
            <span className="subtle">By</span>
            <span>{authorFullName}</span>
            <span className="subtle">In</span>
            <span>{props.articleDetail.data.category.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <main className={`${styles.main} ${openSans.className}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={props.articleDetail.data.thumbnail}
              alt={props.articleDetail.data.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ marginTop: 60 }}>
            <p className={styles.content}>{props.articleDetail.data.content}</p>
          </div>

          <div style={{ marginTop: 90 }}>{renderRelatedArticles()}</div>
        </main>
      </div>
    </>
  );
};

export default DetailPage;
