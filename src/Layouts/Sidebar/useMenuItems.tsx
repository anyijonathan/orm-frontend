import { ReactElement } from "react";
import styles from "../../Assets/Styles/Component/sidebar.module.scss";
import { getCurrentRole } from "../../Services/Utils/route";
import { routePaths } from "../../Routes/paths";
import { AuditIcon, CheckSquare } from "../../Components/Icons";
import { BarChatIcon, Database, DocumentIcon, KRI, LossData, RCSA, REPORTS, SettingsIcon, SignOutIcon, UsersIcon } from "../../Layouts/Sidebar/icons";
import { useAppStateSelector } from "../../Services/Store/hooks";
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

export const NotificationWidget = ({ count = 0 }) => {
  return <div className={styles?.notificationWidget}>{count.toString()}</div>;
};

const generateMenuItems = (role:string) => {
  var roletile = role?.toLocaleUpperCase();
  return [
    {
      title: `${roletile} Dashboard`,
      icon: <BarChatIcon />,
      route: routePaths["admin"].DASHBOARD,
    },
    // {
    //   title: "Manage User/Role",
    //   icon: <UsersIcon />,
    //   subMenu: [

    //     {

    //       title: "User/Role Dashboard",

    //       route: "/user-role-management-dashboard",

    //     },
    //     {

    //       title: "User Management",

    //       route: "/user-management",

    //     },
    //     {

    //       title: "Role Management",

    //       route: "/role-management",

    //     },

    //   ],
    // },
    {
      title: "KRI",
      icon: <KRI />,
      route: "/kri-department",
    },
    {
      title: "Loss Data",
      icon: <LossData />,
      route: "/rlo-loss-data",
    },
    {
      title: "RCSA",
      icon: <RCSA />,
      route: "/rcsa",
    },
  ];
};
const generateMenuItemsAdmin = (role:string) => {
  var roletile = role?.toLocaleUpperCase();
  return [
    {
      title: `${roletile} Dashboard`,
      icon: <BarChatIcon />,
      route: routePaths["admin"].DASHBOARD,
    },
    {
      title: "Manage User/Role",
      icon: <UsersIcon />,
      subMenu: [

        // {

        //   title: "User/Role Dashboard",

        //   route: "/user-role-management-dashboard",

        // },
        {

          title: "User Management",

          route: "/user-management",

        },
        // {

        //   title: "Role Management",

        //   route: "/role-management",

        // },
        {

          title: "Location Management",

          route: "/location-management",

        },

      ],
    },
    {
      title: "KRI",
      icon: <KRI />,
      route: "/kri-department",
    },
    {
      title: "Loss Data",
      icon: <LossData />,
      route: "/rlo-loss-data",
    },
    {
      title: "RCSA",
      icon: <RCSA />,
      route: "/rcsa",
    },
    {
      title: "Reports",
      icon: <REPORTS />,
      route: "/reports",
    },
  ];
};
const generateSubMenuItems = (role:string) => {
  return [
    {
      title: "Logout",
      icon: <SignOutIcon />,
      route: '/logout',
    },
  ]
};

export const useMenuItems = () => {
  let dynamicRole:string = getCurrentRole();
  dynamicRole=dynamicRole.toLocaleLowerCase();
  let dynamicMenuItems:any[]=[];
  if(dynamicRole === "admin"){
     dynamicMenuItems = generateMenuItemsAdmin(dynamicRole);
  }else{
   dynamicMenuItems = generateMenuItems(dynamicRole);
  }
  const dynamicSubMenuItems = generateSubMenuItems(dynamicRole);

  const menuItems = {
    [dynamicRole]: dynamicMenuItems,
    };


  const subMenuItems = {
    [dynamicRole]: dynamicSubMenuItems,
  };

  return {
    menuItems: menuItems[getCurrentRole()],
    subMenuItems: subMenuItems[getCurrentRole()],
  };
};
