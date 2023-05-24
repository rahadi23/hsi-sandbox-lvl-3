import { GetServerSideProps, NextPage } from "next";
import { Open_Sans } from "next/font/google";
import ArticleList from "../components/ArticleList/ArticleList";
import Header from "../components/Header/Header";
import NavButton from "../components/NavButton/NavButton";
import {
  ArticleListResponse,
  ArticleSort,
  getArticleList,
} from "../constants/endpoint.constant";
import styles from "../styles/HomePage.module.scss";

const openSans = Open_Sans({ subsets: ["latin"] });

type Props = { sort: ArticleSort; articleList: ArticleListResponse };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const sortQs = context.query["sort"]?.toString();

  if (!sortQs) {
    return {
      redirect: {
        permanent: false,
        destination: `/?sort=new`,
      },
    };
  }

  if (!["popular", "new"].includes(sortQs)) {
    return {
      notFound: true,
    };
  }

  const sort = sortQs as ArticleSort;

  const articleList = await getArticleList({ sort });

  return { props: { sort, articleList } };
};

const HomePage: NextPage<Props> = (props) => {
  return (
    <main className={`${styles.main} ${openSans.className}`}>
      <Header
        leftChild={
          <NavButton.Group>
            <NavButton href="/?sort=popular" active={props.sort === "popular"}>
              Popular
            </NavButton>

            <NavButton href="/?sort=new" active={props.sort === "new"}>
              New
            </NavButton>
          </NavButton.Group>
        }
      />

      <ArticleList
        key={props.sort}
        sort={props.sort}
        initialArticleList={props.articleList}
      />
    </main>
  );
};

export default HomePage;
