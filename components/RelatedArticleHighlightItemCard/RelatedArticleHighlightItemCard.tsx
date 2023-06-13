import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../../constants/endpoint.constant";
import styles from "./RelatedArticleHighlightItemCard.module.scss";

type Props = {
  article: Article;
};

const RelatedArticleHighlightItemCard: React.FC<Props> = ({ article }) => {
  const author = article.author;
  const authorFullName =
    `${author.firstName} ${author.middleName} ${author.lastName}`.trim();

  return (
    <div className={styles.item}>
      <Link href={`/${article.slug}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className={styles.author}>
        <span className="subtle">By</span>
        <span>{authorFullName}</span>
        <span className="subtle">In</span>
        <span>{article.category.name}</span>
      </div>

      <Link href={`/${article.slug}`} className={styles.title}>
        {article.title}
      </Link>

      <span className={styles.summary}>{article.summary}</span>
    </div>
  );
};

export default RelatedArticleHighlightItemCard;
