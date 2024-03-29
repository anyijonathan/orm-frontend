import { HTMLProps, ReactNode } from "react";
import styles from "../../Assets/Styles/pageShared.module.scss";
import { ChevronRight, SearchIcon } from "../Icons";
import { Input } from "../Input/input";

/**
  * <summary>
  * 
  * </summary>
  * <param name="request">
  * </param> 
  * <returns>
  * 
  * </returns> 
  */
export interface PageHeaderProps extends HTMLProps<HTMLDivElement> {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  children,
  ...props
}: PageHeaderProps) => {
  return (
    <div className={styles?.headerAndSubtitleContainer} {...props}>
      <div className={styles?.headerContainer}>
        <h2 className={styles?.pageHeader}>{title}</h2>
        {children}
      </div>
      {subtitle && <p className={styles?.subtitle}>{subtitle}</p>}
    </div>
  );
};

export const PageHeaderActions = ({ children }: { children?: ReactNode }) => {
  return <div className={styles?.headerActionsContainer}>{children}</div>;
};

export const SectionHeader = ({ title }: { title: string }) => {
  return <h3 className={styles?.sectionHeader}>{title}</h3>;
};

export const Dot = ({
  type,
  size = 8,
}: {
  type: "error" | "success" | "warning" | "primary";
  size?: number;
}) => {
  return (
    <div
      className={`${styles?.dot} ${styles?.[type]}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      data-testid="dot"></div>
  );
};

export const TableSearchInput = () => {
  return (
    <div>
      <Input
        // className={styles?.sidebarSearch}
        iconLeft={<SearchIcon />}
        placeholder="Search"
      />
    </div>
  );
};

export const TableBoldData = ({ title }: { title: string }) => {
  return <p className={styles?.tableBoldData}>{title}</p>;
};

export const TableNormalData = ({ title }: { title: string }) => {
  return <p className={styles?.tableNormalData}>{title}</p>;
};

export const TableLightData = ({ title }: { title: string }) => {
  return <p className={styles?.tableLightData}>{title}</p>;
};

export const TableDataButton = ({ ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={styles?.tableDataButton} {...props}>
      <ChevronRight />
    </div>
  );
};

export const StatusChip = ({
  title,
  type,
  showDot = true,
}: {
  title: string;
  type: "error" | "success" | "warning" | "primary";
  showDot?: boolean;
}) => {
  return (
    <div className={`${styles?.statusChip} ${styles?.[type]}`}>
      {showDot && <Dot type={type} size={6} />}
      <p className={`${styles?.title} ${styles?.[type]}`}>{title}</p>
    </div>
  );
};

export const TableFiltersContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className={styles?.tableFiltersContainer}>{children}</div>;
};

export const TableCard = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <section className={styles?.tableContainer}>
      {title && (
        <div className={styles?.header}>
          <SectionHeader title={title} />
        </div>
      )}
      {children}
    </section>
  );
};

export const Divider = ({
  height,
  color,
}: {
  height?: string;
  color?: string;
}) => {
  return <div className={styles?.divider} style={{ height, color }} data-testid="divider"></div>;
};

export const VerticalSpacer = ({ size }: { size: number }) => {
  return <span style={{ height: `${size}px`, display: `block` }} data-testid="Vspacer"></span>;
};

export const HorizontalSpacer = ({ size }: { size: number }) => {
  return <div style={{ width: `${size}px` }} data-testid="Hspacer"></div>;
};
