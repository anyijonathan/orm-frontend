import { ReactElement, ReactNode } from "react";
import styles from "../../Assets/Styles/Component/summaryCard.module.scss";
import { ArrowRight } from "../Icons";
import { Divider } from "../PageShared";

/**
  * <summary>
  * Provides the customised summary card used by App
  * </summary>
  * <param name="title, count, color">
  * </param> 
  * <returns>
  * custom Summary card with title, and count provided by user
  * </returns> 
  */
export type SummaryCardType = {
  title: ReactNode;
  count: number;
  icon?: ReactElement;
  onClick: () => void;
  color?: "primary" | "success" | "error" | "warning";
};

export const SummaryCard = ({
  title,
  count,
  icon,
  onClick,
  color = "primary",
}: SummaryCardType) => {
  return (
    <div className={`${styles?.container}`} onClick={onClick}>
      <div className={styles?.content}>
        <div className={`${styles?.header} ${styles?.[color]}`}>
          {icon}{" "}
          <div className={`${styles?.title} ${styles?.[color]}`}>{title}</div>
        </div>
        <div className={`${styles?.count} ${styles?.[color]}`}>{count}</div>
      </div>
      <div>
        {/* <span className={`${styles?.linkText} ${styles?.[color]}`}>View All</span> <ArrowRight /> */}
        <div className={styles?.reportBreakdown}>
          <div className={styles?.reportBreakdownTitle}>Approved</div>
          <div className={styles?.reportBreakdownValue}>103</div>
        </div>
        <Divider/>
        <div className={styles?.reportBreakdown}>
          <div className={styles?.reportBreakdownTitle}>Rejected</div>
          <div className={styles?.reportBreakdownValue}>103</div>
        </div>
      </div>
    </div>
  );
};
