import { forwardRef, HTMLProps, ReactNode } from "react";

import styles from "../../Assets/Styles/Component/checkbox.module.scss";

/**
  * <summary>
  * creates the Checkbox UI used by App
  * </summary>
  * <param name="label,title,className">
  * </param> 
  * <returns>
  * customised checkbox UI
  * </returns> 
  */
export interface CheckBoxProps
  extends Omit<HTMLProps<HTMLInputElement>, "label" | "type"> {
  label?: ReactNode;
}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, title, className, ...props }, ref) => {
    return (
      <label className={styles?.container}>
        <input
          className={styles?.checkboxInput}
          {...props}
          type={"checkbox"}
          ref={ref}
        />
        <span title={title} className={styles?.checkmark}></span>
      </label>
    );
  }
);
