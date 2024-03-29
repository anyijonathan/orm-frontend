import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";
import { NavigateFunction } from "react-router-dom";
import styles from "../../Assets/Styles/Component/button.module.scss";
import {  ArrowUpIcon, ChevronLeft } from "../Icons";

/**
  * <summary>
  * creates the button UI used by the app
  * </summary>
  * <param name="loading,variant, color, className">
  * </param> 
  * <returns>
  * Customised button UI 
  * </returns> 
  */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  loading?: boolean;
  variant?: "contained" | "outlined" | "text" | "export";
  color?: "primary" | "error" | "neutral" | "purple";
  size?: "large" | "small" | "xsmall";
}

export const Button = ({
  loading,
  variant = "contained",
  className,
  color = "primary",
  size = "large",
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles?.button} ${styles?.[color]} ${props.disabled ? styles?.disabled : ""} ${
        styles?.[variant]
      } ${className} ${
        styles?.[size]
      }`}
      {...props}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export interface TextButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  loading?: boolean;
}

export const TextButton = ({ className, ...props }: TextButtonProps) => {
  return (
    <a className={`${styles?.textButton} ${className}`} {...props}>
      {props.children}
    </a>
  );
};

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  buttonTitle?: ReactNode;
  buttonTitleClassName?: string;
  iconPosition?: "left" | "right";
  variant?: "contained" | "outlined" | "textIconButtonOnly" | "remove";
  color?: "primary" | "neutral";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      buttonTitle,
      buttonTitleClassName,
      iconPosition = "left",
      variant = "outlined",
      color = "neutral",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles?.iconButtonContainer} ${styles?.[iconPosition]} ${styles?.[color]} ${styles?.[variant]}`}
        {...props}
      >
        {icon}
        {buttonTitle && <div className={`${styles?.title} ${buttonTitleClassName}`}>{buttonTitle}</div>}
      </button>
    );
  }
);

export const DropDownButton = ({
  open,
  ...props
}: Omit<IconButtonProps, "icon"> & { open: boolean }) => {
  return (
    <IconButton
      {...props}
      icon={
        <ArrowUpIcon
          className={`${styles?.dropdownIcon} ${
            open ? styles?.opened : styles?.closed
          }`}
        />
      }
    />
  );
};

export const BackButton = ({ navigate }: { navigate: NavigateFunction }) => {
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <IconButton
        icon={<ChevronLeft />}
        buttonTitle={"Back"}
        onClick={goBack}
        style={{ border: "none", paddingLeft: "0px", width: "fit-content" }}
      />
    </div>
  );
};

export const CancelButton = ({ navigate }: { navigate: NavigateFunction }) => {
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Button
        onClick={goBack}
        variant="outlined" color="neutral"
      >Cancel</Button>
    </div>
  );
};
