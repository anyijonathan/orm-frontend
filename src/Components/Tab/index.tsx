import { v4 as uuidv4 } from 'uuid';

import styles from "../../Assets/Styles/Component/tab.module.scss";

/**
  * <summary>
  * craetes the Tab UI to be activated on click input for the App
  * </summary>
  * <param name="items, activeValue">
  * </param> 
  * <returns>
  * customised Tab UI activates on user click
  * </returns> 
  */
type TabItem = {
  label: string;
  value: string;
  type?: "normal" | "error";
};

interface ITab {
  items: TabItem[];
  activeValue?: string;
  onClick: (value: string) => void;
}

export const Tab = ({ items, activeValue, onClick }: ITab) => {
  return (
    <div className={styles?.container}>
      {items.map((item, index) => {
        const isActive = item.value === activeValue;
        return (
          <div
          key={uuidv4()}
            className={`${styles?.tabItem} ${
              isActive ? `${styles?.active} ${styles?.[item.type ?? ""]}` : ""
            }`}
            onClick={() => onClick(item.value)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
