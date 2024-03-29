import {
  HTMLProps,
  ReactNode,
  forwardRef,
} from "react";

import "../../Assets/Styles/Component/input.scss";

/**
  * <summary>
  * provide input UI used by App 
  * </summary>
  * <param name="onChange, className, iconLeft, iconRight, style, error, props">
  * </param> 
  * <returns>
  * custom UI to get the Input from user
  * </returns> 
  */
export interface InputProps extends HTMLProps<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { onChange, className, iconLeft, iconRight, style, error, icon, ...props },
    ref
  ) => {
    return (
      <>
        <div
          className={`input ${className ?? ""} ${props.disabled ? "disabled" : ""} ${
            iconLeft ? "hasLeft" : ""
          } ${iconRight ? "hasRight" : ""}`}
          style={style}
        >
          {iconLeft && <div className="icon left">{iconLeft}</div>}
          <input value={props.value} onChange={onChange} {...props} ref={ref} />
          {iconRight && <div className="icon right">{iconRight}</div>}
        </div>
        {error && <p className="inputError">{error}</p>}
      </>
    );
  }
);
