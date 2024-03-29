import {
  createRef,
  useEffect,
  useState,
  ReactNode,
  HTMLProps,
  useMemo,
} from "react";

import { v4 as uuidv4 } from 'uuid';
import styles from "../../Assets/Styles/Component/dropdown.module.scss";
import { DropDownButton } from "../Buttons";

/**
  * <summary>
  * Creates Dropdown UI used by App
  * </summary>
  * <param name="children, content, contentClassName, externalToggle, open, contentWidth">
  * </param> 
  * <returns>
  * custom Dropdown Menu UI based on the input provided by user
  * </returns> 
  */
export interface DropdownProps
  extends Omit<HTMLProps<HTMLDivElement>, "content" | "onClick"> {
  content: ReactNode;
  contentClassName?: string;
  externalToggle?: boolean;
  open?: boolean;
  handleClose?: () => void;

  contentWidth?: boolean;
}

export const Dropdown = ({
  children,
  content,
  contentClassName,
  externalToggle = false,
  open,
  contentWidth = false,
  handleClose,
  ...props
}: DropdownProps & { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(styles?.left);

  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      if (rect.right > screenWidth / 2) {
        setPosition(styles?.right);
      } else {
        setPosition(styles?.left);
      }
    }
    const handleClick = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        if (externalToggle) {
          externalToggle && handleClose?.();
        } else {
          setVisible(false);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, setVisible]);

  const show = externalToggle ? open : visible;

  return (
    <div className={`${styles?.dropdown}`} ref={ref} {...props}>
      <div
        className={`${styles?.children}`}
      >
        {children}
      </div>
      {show && (
        <div
          className={`${styles?.dropdownContent} ${
            contentWidth && styles?.contentWidth
          } ${position} ${contentClassName}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export const DropdownContentContaner = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className={styles?.dropdownContentContainer}>{children}</div>;
};

export const MenuItemContainer = ({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`${styles?.item} ${className}`} {...props}>
      {props.children}
    </div>
  );
};

export interface SelectDropdownOption {
  label: string;
  value: string;
}
export interface SelectDropdownProps {
  open: boolean;
  setOpen: any;
  options: SelectDropdownOption[];
  onChange: (value: string) => void;
  selectedValue?: string;
  placeholder?: string;
  name?: string;
  disabled?:boolean;
}
export const MenuItem = MenuItemContainer;

export const SelectDropDown = ({
  open,
  setOpen,
  options,
  onChange,
  placeholder,
  selectedValue,
  name,
  disabled,
}: SelectDropdownProps) => {

  const selectedLabel = useMemo(
    () => options.find((item) => item.value === selectedValue)?.label,
    [selectedValue]
  );

  return (
    <Dropdown
      externalToggle={true}
      handleClose={() => setOpen(false)}
      open={open}
      disabled={disabled}
      content={
        <DropdownContentContaner>
          {options.map((option, index) => {
            return (
              <MenuItemContainer
                key={uuidv4()}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </MenuItemContainer>
            );
          })}
        </DropdownContentContaner>
      }
    >
      <DropDownButton
        open={open}
        buttonTitle={selectedLabel ?? placeholder ?? name}
        onClick={() => setOpen(!open)}
        iconPosition="right"
        type="button"
        buttonTitleClassName={styles?.selectDropDownButton}
      />
    </Dropdown>
  );
};
