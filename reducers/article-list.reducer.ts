import { Reducer } from "react";
import { Article, ArticleListResponse } from "../constants/endpoint.constant";

export type ArticleListReducerState =
  | { state: "idle" }
  | { state: "loading"; data?: ArticleListResponse }
  | { state: "success"; data: ArticleListResponse }
  | { state: "error"; message: string };

export type ArticleListReducerAction =
  | { type: "loading" }
  | { type: "set_data"; data: ArticleListResponse }
  | { type: "append_data"; data: ArticleListResponse }
  | { type: "error"; message: string };

export const initialState: ArticleListReducerState = {
  state: "idle",
};

export const reducer: Reducer<
  ArticleListReducerState,
  ArticleListReducerAction
> = (state, action) => {
  if (action.type === "loading") {
    return {
      ...state,
      state: "loading",
    };
  }

  if (action.type === "set_data") {
    return {
      state: "success",
      data: action.data,
    };
  }

  if (action.type === "append_data") {
    const previousData: Article[] = [];

    if (state.state === "loading" || state.state === "success") {
      if (state.data) {
        previousData.push(...state.data.data);
      }
    }

    return {
      state: "success",
      data: {
        data: [...previousData, ...action.data.data],
        meta: action.data.meta,
      },
    };
  }

  return {
    state: "error",
    message: action.message || "Terjadi Kesalahan",
  };
};
