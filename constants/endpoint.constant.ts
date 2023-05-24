export type ArticleSort = "popular" | "new";

export type ArticleListFilter = {
  perPage?: number;
  page?: number;
  categoryId?: number;
  excludedArticleId?: number;
  sort?: ArticleSort;
};

export type Article = {
  id: number;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
  };
  thumbnail: string;
  slug: string;
  title: string;
  summary: string;
};

export type ArticleDetail = Article & { content: string };

export type ArticleListResponse = {
  meta: {
    pagination: {
      page: number;
      perPage: number;
      totalPages: number;
    };
    sort: ArticleSort;
    categoryId: number | null;
    excludedArticleId: number | null;
  };
  data: Article[];
};

export type ArticleDetailResponse = {
  data: ArticleDetail;
};

export const ARTICLE_ENDPOINT = "https://hsi-sandbox.vercel.app/api/articles";

export const getArticleList = async (filter?: ArticleListFilter) => {
  let params;

  if (filter) {
    params = new URLSearchParams(
      Object.entries(filter).map(([key, val]) => [key, val.toString()])
    ).toString();
  }

  let url = ARTICLE_ENDPOINT;

  if (params) {
    url += `?${params}`;
  }

  const fetchResult = await fetch(url);

  const fetchResultJson = await fetchResult.json();

  if (!fetchResult.ok) {
    throw new Error(fetchResult.statusText);
  }

  const articleList = fetchResultJson as ArticleListResponse;

  return articleList;
};

export const getArticleDetail = async (slug: string) => {
  let url = `${ARTICLE_ENDPOINT}/${slug}`;

  const fetchResult = await fetch(url);

  const fetchResultJson = await fetchResult.json();

  if (!fetchResult.ok) {
    throw new Error(fetchResult.statusText);
  }

  const articleDetail = fetchResultJson as ArticleDetailResponse;

  return articleDetail;
};
