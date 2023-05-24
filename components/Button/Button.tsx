import React from "react";
import styles from "./Button.module.scss";

type Props = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

const Button: React.FC<Props> = ({ children, ...buttonProps }) => {
  return (
    <button className={styles.button} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
