import React from "react";
import {
  ArticleListResponse,
  ArticleSort,
  getArticleList,
} from "../../constants/endpoint.constant";
import { reducer as articleListReducer } from "../../reducers/article-list.reducer";
import ArticleItem from "../ArticleItem/ArticleItem";
import Button from "../Button/Button";
import styles from "./ArticleList.module.scss";

type Props = {
  sort: ArticleSort;
  initialArticleList?: ArticleListResponse;
};

const ArticleList: React.FC<Props> = ({ sort, initialArticleList }) => {
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
        sort: sort,
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
    return <span>No data</span>;
  }

  const hasNextPage =
    state.data.meta.pagination.page < state.data.meta.pagination.totalPages;

  return (
    <>
      <div key={sort} className={styles.wrapper}>
        {state.data.data.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>

      {hasNextPage ? (
        <Button
          style={{ marginTop: 75 }}
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

export default ArticleList;
