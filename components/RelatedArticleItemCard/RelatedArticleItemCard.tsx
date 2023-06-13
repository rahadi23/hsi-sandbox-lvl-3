import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../../constants/endpoint.constant";
import styles from "./RelatedArticleItemCard.module.scss";

type Props = {
  num: number;
  article: Article;
};

const RelatedArticleItemCard: React.FC<Props> = ({ num, article }) => {
  return (
    <Link href={`/${article.slug}`}>
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.number}>{`${num}`.padStart(2, "0")}</span>

          <span className={styles.title} style={{ marginTop: 12 }}>
            {article.title}
          </span>

          <span className={styles.summary} style={{ marginTop: 24 }}>
            {article.summary}
          </span>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </Link>
  );
};

export default RelatedArticleItemCard;
