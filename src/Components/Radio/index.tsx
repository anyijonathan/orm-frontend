import { forwardRef, HTMLProps, ReactNode } from "react";
import styles from "../../Assets/Styles/Component/radio.module.scss";

export interface RadioProps
  extends Omit<HTMLProps<HTMLInputElement>, "label" | "type"> {
  label?: ReactNode;
  labelClassName?: string;
}

/**
  * <summary>
  * creates custom radio button used by App
  * </summary>
  * <param name="label, title, className, labelClassName, props">
  * </param> 
  * <returns>
  * custom radio button selecting the option clicked by user
  * </returns> 
  */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, title, className, labelClassName, ...props }, ref) => {
    return (
      <label className={styles?.container}>
        {label && (
          <div className={`${styles?.label} ${labelClassName ?? ""}`}>
            {label}
          </div>
        )}
        <input {...props} className={styles?.input} ref={ref} type={"radio"} />
        <span title={title} className={styles?.indicator}></span>
      </label>
    );
  }
);
