import Link from "next/link";
import React from "react";
import { Article } from "../../constants/endpoint.constant";
import RelatedArticleHighlightItemCard from "../RelatedArticleHighlightItemCard/RelatedArticleHighlightItemCard";
import styles from "./RelatedArticleHighlightList.module.scss";

type Props = {
  slug: string;
  relatedArticles: Article[];
};

const RelatedArticleHighlightList: React.FC<Props> = (props) => {
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
        {props.relatedArticles.map((relatedArticle) => (
          <RelatedArticleHighlightItemCard
            key={relatedArticle.id}
            article={relatedArticle}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedArticleHighlightList;
