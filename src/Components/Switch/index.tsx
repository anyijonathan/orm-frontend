import styles from "../../Assets/Styles/Component/switch.module.scss";

export interface SwitchProps {
  checked?: boolean;
}

/**
  * <summary>
  * Provides the switch UI used by App
  * </summary>
  * <param name="checked">
  * </param> 
  * <returns>
  * Switch between options based on the value provided by user
  * </returns> 
  */
export const Switch = ({ checked = false }: SwitchProps) => {
  return (
    <div className={`${styles?.container} ${checked && styles?.checked}`}>
      <div className={styles?.dumbSpace}></div>
      <div className={styles?.ball}></div>
    </div>
  );
};
