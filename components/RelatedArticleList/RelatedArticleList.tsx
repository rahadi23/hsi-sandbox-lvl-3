import React from "react";
import {
  ArticleDetail,
  ArticleListResponse,
  getArticleList,
} from "../../constants/endpoint.constant";
import { reducer as articleListReducer } from "../../reducers/article-list.reducer";
import Button from "../Button/Button";
import RelatedArticleItemCard from "../RelatedArticleItemCard/RelatedArticleItemCard";
import styles from "./RelatedArticleList.module.scss";

type Props = {
  articleDetail: ArticleDetail;
  initialArticleList?: ArticleListResponse;
};

const RelatedArticleList: React.FC<Props> = ({
  articleDetail,
  initialArticleList,
}) => {
  const [state, dispatch] = React.useReducer(
    articleListReducer,
    initialArticleList
      ? { state: "success", data: initialArticleList }
      : { state: "idle" }
  );

  const handleLoadMore = async () => {
    try {
      dispatch({ type: "loading" });

      let page = 1;

      if (state.state === "success" && state.data) {
        page = state.data.meta.pagination.page + 1;
      }

      const nextPageArticleList = await getArticleList({
        categoryId: articleDetail.category.id,
        excludedArticleId: articleDetail.id,
        page,
      });

      dispatch({ type: "append_data", data: nextPageArticleList });
    } catch (err: any) {
      dispatch({ type: "error", message: err.toString() });
      console.error(err);
    }
  };

  if (state.state === "error") {
    return <span>{state.message}</span>;
  }

  if (state.state === "loading" && !state.data) {
    return <span>Loading...</span>;
  }

  if (state.state === "idle" || !state.data?.data.length) {
    return <span>No related post available</span>;
  }

  const hasNextPage =
    state.data.meta.pagination.page < state.data.meta.pagination.totalPages;

  return (
    <>
      <div className={styles.wrapper}>
        {state.data.data.map((article, idx) => (
          <RelatedArticleItemCard
            key={article.id}
            num={idx + 1}
            article={article}
          />
        ))}
      </div>

      {hasNextPage ? (
        <Button
          style={{ marginTop: 120 }}
          onClick={(e) => {
            handleLoadMore();
          }}
          disabled={state.state === "loading"}
        >
          {state.state === "loading" ? "Loading..." : "Load More"}
        </Button>
      ) : null}
    </>
  );
};

export default RelatedArticleList;
