import { ReactNode, useEffect, useState } from "react";
import { SearchIcon } from "../../Components/Icons";
import { Input } from "../../Components/Input/input";
import { AuthFCMBLogo } from "../../Pages/Authentication/utils";
import styles from "../../Assets/Styles/Component/sidebar.module.scss";
import { MenuItem, SideBarItem } from "./sidebarItem";
import { Avatar } from "../../Components/Avatar";
import { LinkProps, Location, Link, useLocation } from "react-router-dom";
import { useMenuItems } from "./useMenuItems";
import { useAppStateSelector } from "../../Services/Store/hooks";
import LoginScreen from "../../Pages/Authentication/login";
import FloatingButton from "../../Components/PageShared/Location/FloatingButton";
import { getCurrentRole } from "../../Services/Utils/route";

/**
  * <summary>
  * This layout is to render the left bar menu on all screens
  * </summary>
  * <action>
  * User can click on any option based on user role "
  * and it will navigate user to appropriate page
  * </action> 
  */

export interface SideBarProps {
  userName?: string;
  lastLogin?: Date;
  menuItems: MenuItem[];
  subMenuItems: MenuItem[];
  appTitle: ReactNode;
  Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  location: Location;
}

export const SideBar = ({
  menuItems,
  subMenuItems,
  appTitle,
  Link,
  location,
  userName,
  lastLogin,
}: SideBarProps) => {
  const [toggleClass, setToggleClass] = useState(styles?.open);
  const authState:any = useAppStateSelector((state) => state.authState)  
  let locationState:any = useAppStateSelector((state) => state.locationDataState)
  const lastLoginTime= authState?.userData?.data?.data?.lastLoginTime
  useEffect(() => {
    setToggleClass(styles?.open);
  }, []);

  // State for FloatingButton

  const formatDate = (inDate:string) => {
    const today= new Date(inDate);
    const date = String(today.getDate()).padStart(2, '0');;
    const month = String(today.getMonth() + 1).padStart(2, '0');;
    const year = today.getFullYear();
    const formattedDate = `${date}-${month}-${year}`;
    return formattedDate;
  }
  const role = location.pathname.split("/")[1];
  const [burgerClass, setBurgerClass] = useState("burgerBar unclicked")
  const [menuClass, setMenuClass] = useState("hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const updateMenu = () => {
    if(!isMenuClicked) {
        setBurgerClass("burgerBar clicked")
        setMenuClass("visibleMenu")
    }
    else {
        setBurgerClass("burgerBar unclicked")
        setMenuClass("hiddenMenu")
    }
    setIsMenuClicked(!isMenuClicked)
}

const parentCall = (message:any) => {
  if(message)
  setMenuClass("hiddenMenu")
};
  return (
    <aside className={styles?.sidebarAndDrawerContainer}>
      <div className={`${styles?.container} ${toggleClass} `}>
        <div className={`${styles?.mobTopBar}`}>
          <div className={`${styles?.logo}`}>
              <AuthFCMBLogo
                style={{ width: "32.23px", height: "32px", marginBottom: "0px" }}
              />
            <p className={styles?.title}>ORM</p>:
          </div>
          <FloatingButton />
          <div className="burgerMenu" onClick={updateMenu} data-testid="burgerBtn">
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
          </div>
        </div>
        <div className={menuClass}>   
        
        <div className={styles?.mobMenuActive}>
        <div className={styles?.sidebarSearchContainer}>
          <Input
            className={styles?.sidebarSearch}
            iconLeft={<SearchIcon pathClassName={styles?.sidebarSearchIcon} />}
            placeholder="Search"
          />
        </div>

        <div className={styles?.navItemsContainer}>
          <div className={styles?.dynamicNavItemsContainer}>
            {menuItems.map((item) => {
              let isActive = false;
              if (item.route) {
                isActive = location.pathname.includes(
                  item.route
                );
              }
              return (
                <div onClick={updateMenu} className={styles?.burgerBtn}>
                  <SideBarItem
                  key={item.title}
                  isActive={isActive}
                  item={item}
                  role={role}
                  Link={Link}
                  parentCall={parentCall}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles?.subNavItemsContainer}>
            {subMenuItems.map((item) => {
              let isActive = false;
              if (item.route) {
                isActive = location.pathname.includes(
                  item.route
                );
              }
              return (  
                <SideBarItem
                  key={item.title}
                  isActive={isActive}
                  item={item}
                  role={role}
                  Link={Link}
                  parentCall={parentCall}
                />
              );
            })}
          </div>
        </div>
        <div className={styles?.userDetailsContainer}>
          <div className={styles?.profile}>
            <Avatar />
            <div className={styles?.nameAndIdContainer}>
              <div className={styles?.name}>{authState?.userData?.data?.data?.userName}</div>
              { getCurrentRole() !== "admin"
              &&
          <span className="badge"><div className="Submitted">{locationState?.currentLocation?.locationName}</div></span>}
            </div>
          </div>
          <div className={styles?.loginDetails}>
            <div>
              Last Login:<br />{lastLoginTime?.substring(11,16)} {formatDate(lastLoginTime)}
            </div>
          </div>
        </div>
        </div>
        </div>
        
      </div>
    </aside>
  );
};

export const AppSideBar = () => {
  const { menuItems, subMenuItems } = useMenuItems();
  const location = useLocation();
  const authState = useAppStateSelector((state) => state.authState);
  return (
<>
    {authState.isAuthenticated ? (
      // Render props.children if authState.isAuthenticated is true
    
      <SideBar
      menuItems={menuItems}
      subMenuItems={subMenuItems}
      appTitle="ORM"
      Link={Link}
      location={location}
      />
    
  
      ) : (
      // Render <LoginScreen /> if authState.isAuthenticated is false
      <LoginScreen />
      )}
  
      </>
  );
};
