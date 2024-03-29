import { ReactNode } from "react";
import styles from "../../Assets/Styles/Component/icon.module.scss";

export const IconRipple = ({
  icon,
  type = "primary",
}: {
  icon: ReactNode;
  type?: "primary" | "success" | "error";
}) => {
  return (
    <div className={`${styles?.iconRipple} ${styles?.[type]}`}>
      <div className={styles?.iconRippleInner}>{icon}</div>
    </div>
  );
};

export const IconBG = ({
  icon,
  type = "primary",
}: {
  icon: ReactNode;
  type?: "primary" | "success" | "error";
}) => {
  return <div className={`${styles?.iconBG} ${styles?.[type]}`}>{icon}</div>;
};
