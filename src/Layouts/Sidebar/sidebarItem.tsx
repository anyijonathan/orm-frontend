import { cloneElement, ReactElement, ReactNode, useState } from "react";
import { LinkProps } from "react-router-dom";
import styles from "../../Assets/Styles/Component/sidebar.module.scss";
import { ArrowUpIcon } from "../../Components/Icons";
import { v4 as uuidv4 } from 'uuid';

export type SubMenu = {
  title: string;
  route: string;
};

export type MenuItem = {
  title: string;
  route?: string;
  icon: ReactElement;
  subMenu?: SubMenu[];
  infoWidget?: ReactElement;
};

/**
  * <summary>
  * This holds the menu links and display of submenus
  * </summary>
  * <action>
  * This provides the function to have sidebar with menus and submenus
  * </action> 
  */
export const SideBarItem = ({
  item,
  isActive,
  role,
  Link,
  parentCall,
}: {
  item: MenuItem;
  isActive: boolean;
  role: string;
  Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  parentCall:any;
}) => {
  const [subMenuToggle, setSubMenuToggle] = useState(false);

  const handleClick = () => {
    if (item.subMenu) {
      setSubMenuToggle(!subMenuToggle);
    } 
  };
  const handleClickSubmenu = () => {
    parentCall(true);
  };
  return (
    <>
      <LinkContainer
        Link={Link}
        link={item.subMenu ? undefined : item.route}
        role={role}
      >
        <div
          className={`${styles?.navItemContainer} ${
            isActive ? styles?.active : ""
          }`}
          onClick={handleClick}
        >
          <div className={`${styles?.details} ${isActive ? styles?.active : ""}`}>
            {cloneElement(item.icon)}
            <div className={styles?.title}>{item.title}</div>
          </div>
          {item.subMenu && (
            <ArrowUpIcon
              className={`${styles?.subMenuToggle} ${
                subMenuToggle ? styles?.closed : styles?.opened
              }`}
            />
          )}
          {item.infoWidget && cloneElement(item.infoWidget, { count: 7 })}
        </div>
      </LinkContainer>

      {item.subMenu && (
        <div
          className={`${styles?.subMenuContainer} ${
            subMenuToggle ? styles?.opened : styles?.closed
          }`}
        >
          {item.subMenu.map((item) => {
            const isActive = window.location.pathname?.includes(
              item.route.substring(1)
            );
            return (
              <LinkContainer key={uuidv4()} Link={Link} link={item.route} role={role}>
                <div
                  className={`${styles?.subMenuItemContainer} ${
                    isActive ? styles?.active : ""
                  }`}
                  key={item.title}
                  onClick={handleClickSubmenu} 
                >
                  {item.title}
                </div>
              </LinkContainer>
            );
          })}
        </div>
      )}
    </>
  );
};

export const LinkContainer = ({
  link,
  children,
  role,
  Link,
}: {
  link?: string;
  children: ReactNode;
  role: string;
  Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
}) => {
  return (
    <>
      {link ? <Link to={`/${role}${link}`}>{children}</Link> : <>{children}</>}
    </>
  );
};
