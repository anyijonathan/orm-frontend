import { HTMLProps, ReactNode } from "react";
import { Radio } from "../Radio";
import { v4 as uuidv4 } from 'uuid';
interface ModelWidgetsProps extends HTMLProps<HTMLDivElement> {}

/**
  * <summary>
  * creates itemcard used by App
  * </summary>
  * <param name="children, className, props">
  * </param> 
  * <returns>
  * custom Itemcard for props provided by user
  * </returns> 
  */
export const ModalItemCard = ({
  children,
  className,
  ...props
}: ModelWidgetsProps) => {
  return (
    <div className={`modalItemCard ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export const ModalItemsContainer = ({
  children,
  className,
  ...props
}: ModelWidgetsProps) => {
  return (
    <div
      className={`modalItemsContainer ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ModalItemContentsContainer = ({
  children,
  className,
  ...props
}: ModelWidgetsProps) => {
  return (
    <div
      className={`modalItemContentsContainer ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface ModalItemContentProps extends Omit<ModelWidgetsProps, "title"> {
  title?: ReactNode;
  rightContent?: ReactNode;
  header?: boolean;
}

export const ModalItemContent = ({
  title,
  rightContent,
  header = false,
  ...props
}: ModalItemContentProps) => {
  return (
    <div className="modalItemContent" {...props}>
      <div className={`title ${header && "header"}`}>{title}</div>
      {rightContent && <div className="rightContent">{rightContent}</div>}
    </div>
  );
};

interface RadioDataOptions {
  label?: ReactNode;
  value: string;
}

interface ModalRadioProps {
  title?: ReactNode;
  name: string;
  options: RadioDataOptions[];
  onChange: (e: any) => void;
}

export const ModalRadioOptions = ({
  title,
  name,
  options,
  onChange,
}: ModalRadioProps) => {
  return (
    <div className="modalRadioOptionsContainer">
      {title && <h2 className="title">{title}</h2>}
      <div className="modalRadioOptions">
        {options.map(({ label, value }) => {  
          return (
            <Radio
              key={uuidv4()}
              label={label}
              name={name}
              value={value}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
};
