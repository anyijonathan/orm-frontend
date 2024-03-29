import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "../../Assets/Styles/Component/modal.scss";
import { CancelIcon } from "../Icons";

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
export const Modal = ({ position = "center", ...props }: any) => {
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return createPortal(
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      appear={true}
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={`modal ${position}`} onClick={props.onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: props.width ? props.width : "496px" }}
        >
          {props.children}
          {/* <div className="modal-header">
            <h4 className="modal-title titleText">{props.title}</h4>
            <h4 className="modal-close" onClick={props.onClose}>
              <CustomIconButton icon={<CloseIcon />} />
            </h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div
            className="modal-footer"
            style={{
              justifyContent: `${props.hasAction == false && "flex-end"}`,
            }}
          >
            <Button
              onClick={
                props.onCloseAction ? props.onCloseAction : props.onClose
              }
              style={{
                color: "white",
              }}
              style={{
                backgroundColor: props.closeBgColor
                  ? props.closeBgColor
                  : "transparent",
                color: props.closeBgColor ? "white" : "black",
              }}
            >
              {props.isClosing ? (
                <Spinner />
              ) : props.closeTitle ? (
                props.closeTitle
              ) : (
                "Close"
              )}
            </Button>
            {props.hasAction != false && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: props.actionBgColor
                    ? props.actionBgColor
                    : "#203044",
                  color: "white",
                }}
                type="submit"
                onClick={props.onSubmit}
              >
                {props.isLoading ? <Spinner /> : props.actionTitle}
              </Button>
            )}
          </div> */}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export const ModalCloseIcon = (props: any) => {
  return (
    <div className="modal-close-icon" onClick={props.onClose} data-testid="modal-close-icon">
      <CancelIcon />
    </div>
  );
};

interface ModalHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  subtitleType?: "normal" | "error";
  onClose?: () => void;
}

export const ModalHeader = ({
  title,
  subtitle,
  onClose,
  subtitleType,
  ...props
}: ModalHeaderProps) => {
  return (
    <div className="modal-header">
      <div className="modalTitleContainer">
        <h4
          className="modal-title"
          style={{
            borderBottom: subtitle ? "none" : "",
            paddingBottom: subtitle ? "0px" : "",
          }}
        >
          {title}
        </h4>
        {subtitle && (
          <p className={`modal-subTitle ${subtitleType}`}>{subtitle}</p>
        )}
      </div>
      <ModalCloseIcon onClose={onClose} />
    </div>
  );
};

export const ModalBody = (props: any) => {
  return <div className="modal-body">{props.children}</div>;
};
