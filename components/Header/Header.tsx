import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.scss";

type Props = {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
};

const Header: React.FC<Props> = ({ leftChild, rightChild }) => {
  return (
    <div className={styles.wrapper}>
      <div>{leftChild}</div>

      <div className={styles.logo}>
        <Link href="/">
          <Image src="/Bahram.svg" width={100} height={40} alt="Bahram Logo" />
        </Link>
      </div>

      <div>{rightChild}</div>
    </div>
  );
};

export default Header;
