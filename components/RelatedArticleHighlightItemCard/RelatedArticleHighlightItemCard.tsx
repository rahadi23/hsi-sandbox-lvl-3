import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../../constants/endpoint.constant";
import styles from "./RelatedArticleHighlightItemCard.module.scss";

type Props = {
  article: Article;
};

const RelatedArticleHighlightItemCard: React.FC<Props> = (props) => {
  const author = props.article.author;
  const authorFullName =
    `${author.firstName} ${author.middleName} ${author.lastName}`.trim();

  return (
    <div className={styles.item}>
      <Link href={`/${props.article.slug}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={props.article.thumbnail}
            alt={props.article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className={styles.author}>
        <span className="subtle">By</span>
        <span>{authorFullName}</span>
        <span className="subtle">In</span>
        <span>{props.article.category.name}</span>
      </div>

      <Link href={`/${props.article.slug}`} className={styles.title}>
        {props.article.title}
      </Link>

      <span className={styles.summary}>{props.article.summary}</span>
    </div>
  );
};

export default RelatedArticleHighlightItemCard;
