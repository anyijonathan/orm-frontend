import { ReactNode } from "react";
import "../../Assets/Styles/Component/input.scss";

/**
  * <summary>
  * Creates the Form to get user Input in the App
  * </summary>
  * <param name="children, htmlFor,label, className">
  * </param> 
  * <returns>
  * custom Form UI based on user input
  * </returns> 
  */
export interface FormGroupProps {
  children: ReactNode;
  htmlFor?: string;
  label?: ReactNode;
  className?: string;
}

export const FormGroup = ({
  children,
  htmlFor,
  label,
  className,
}: FormGroupProps) => {
  return (
    <div className={`formGroup ${className ?? ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
};

export const Label = ({ label }: { label: string }) => {
  return <div className="itemLabel">{label}</div>;
};
