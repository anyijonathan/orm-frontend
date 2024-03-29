import { ReactNode } from "react";
import styles from "../../../../Assets/Styles/Pages/Admin/report.module.scss";
import { v4 as uuidv4 } from 'uuid';

/**
  * <summary>
  * Display the summary table for the dashboard
  * </summary>
  * <param name="items, title, value">
  * </param> 
  * <returns>
  * summary card for the dashboard with item and values for selected date range
  * </returns> 
  */
interface SummaryCardProps {
  title: ReactNode;
  value: ReactNode;
}

interface SummarySectionsProps {
  items: SummaryCardProps[];
}

export const SummarySection = ({ items }: SummarySectionsProps) => {
  return (
    <div className={styles?.summaryCardsContainer}>
      {items.map((item, index) => {
        return (
          <SummaryCard
            key={uuidv4()}
            title={item.title}
            value={item.value}
          />
        );
      })}
    </div>
  );
};

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className={styles?.summaryCard}>
      <div className={styles?.title}>{title}</div>
      <div className={styles?.value}>{value}</div>
    </div>
  );
};
