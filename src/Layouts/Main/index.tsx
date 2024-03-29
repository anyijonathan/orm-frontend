import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import styles from "../../Assets/Styles/Component/layout.module.scss";
import { AppSideBar } from "../Sidebar";

/**
  * <summary>
  * This is the main screen which holds the layout
  * </summary>
  * <action>
  * This screen is base for all other child pages
  * </action> 
  */

export const Layout: FC<PropsWithChildren> = () => {
  return (
    <div className={styles?.sidebarAndContentcontainer}>
      <AppSideBar />
      <section className={styles?.contentContainer}>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
