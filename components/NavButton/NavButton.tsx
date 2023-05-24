import Link from "next/link";
import React from "react";
import { UrlObject } from "url";
import styles from "./NavButton.module.scss";

type Props = React.PropsWithChildren<{
  href: string | UrlObject;
  active?: boolean;
}>;

const NavButton: React.FC<Props> & { Group: React.FC<GroupProps> } = (
  props
) => {
  return (
    <Link
      href={props.href}
      className={`${styles.button}${props.active ? ` ${styles.active}` : ""}`}
    >
      {props.children}
    </Link>
  );
};

type GroupProps = React.PropsWithChildren;

const NavButtonGroup: React.FC<GroupProps> = (props) => {
  return <div className={styles.group}>{props.children}</div>;
};

NavButton.Group = NavButtonGroup;

export default NavButton;
