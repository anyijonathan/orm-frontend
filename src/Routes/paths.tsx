/**
  * <summary>
  * It defines the variable for different route paths used by the app
  * </summary>
  * <param name="no parameters">
  * </param> 
  * <returns>
  */
export const routePaths = {
  
  admin: {


    KRICATEGORY: "/kri-category",
    MANAGESETTINGS: "/manage-settings",
    KRIINDICATOR: "/kri-indicator",
    DASHBOARD: "/dashboard",
    LOADINDICATOR: "/load-indicator",

    //Earlier Loss Data Screens
    LOSSDATA: "/lossdata",
    RLOLOSSDATA: "/rlo-loss-data",
    RLOLOSSVIEW: "/rlo-loss-view",
    LOSS_DATA: "/loss-data",
    LOSSDATAAPPROVAL: "/loss-data-approval",

    //Loss Data Screens URL as per FIGMA
    LOSSDATAINDEX: "/loss-data-index",
    LOSSDATAVIEW: "/loss-data-view",

    // RCSA
    RCSA: "/rcsa",
    CREATERCSA: "/create-rcsa",
    VIEWRCSA: "/view-rcsa",
    APPROVERCSA: "/approve-rcsa",
    REQUPDATERCSA: "/request-update-rcsa",
    EDITRCSA: "/edit-rcsa",

    KRI: "/kri-page",
    KRIVIEW: "/kri-view",
    CREATEKRI: "/create-kri",
    CREATEKRIDATA: "/create-kri-data",
    KRIRLOHOME: "/kri-rlo-home",

    KRIBRANCH: "/kri-branch",
    LOGKRIDATA: "/log-kri-data-branch",
    VIEWKRIDATA: "/view-kri-data-branch",
    KRIDEPARTMENT: "/kri-department",
    LOGKRIDATADEPARTMENT: "/log-kri-data-department",
    LogKriCreateEdit: "/log-Kri-Create-Edit",
    STARTKRIDATADEP: "/start-kri-data-department",
    PREVIEWKRIDEP: "/preview-kri-department",
    APPROVEKRI: "/approve-kri",
    ALLKRI: "/all-kri",
    VIEWKRIMETRICES: "/view-kri-metrices", 
    REPORTS: "/reports", 

    USERROLEMANAGEMENTDASHBOARD: "/user-role-management-dashboard",
    USERMANAGEMENT: "/user-management",
    ROLEMANAGEMENT: "/role-management",
    CREATEROLE: "/create-role",
    EDITROLE: "/edit-role",
    VIEWROLE: "/view-role",

    LOCATIONMANAGEMENT: "/location-management",

    LOGOUT: "/logout",
    // DASHBOARD_SUMMARY_PAGE: "/dashboard/summary/:summaryType",
    // DASHBOARD_SUMMARY_PAGE_DETAILS: "/dashboard/summary/:summaryType/:fileName",
    // REPORTING: "/reporting",
    // SALARY_UPLOADS: "/uploads/salary",
    // NON_SALARY_UPLOADS: "/uploads/non_salary",
    // DOD_UPLOADS: "/uploads/dod",
  },
  user: {
    DASHBOARD: "/dashboard",
    // DASHBOARD_SUMMARY_PAGE: "/dashboard/summary/:summaryType",
    // DASHBOARD_SUMMARY_PAGE_DETAILS: "/dashboard/summary/:summaryType/:fileName",
    // REPORTING: "/reporting",
    // SALARY_UPLOADS: "/uploads/salary",
    // NON_SALARY_UPLOADS: "/uploads/non_salary",
    // DOD_UPLOADS: "/uploads/dod",
    // NOTIFICATIONS: "/notification",
  },
  supervisor: {
    DASHBOARD: "/dashboard",
    // DASHBOARD_SUMMARY_PAGE: "/dashboard/summary/:summaryType",
    // DASHBOARD_SUMMARY_PAGE_DETAILS: "/dashboard/summary/:summaryType/:fileName",
    // NOTIFICATIONS: "/notification",
    // REPORTING: "/reporting",
    // SALARY_UPLOADS: "/uploads/salary",
    // NON_SALARY_UPLOADS: "/uploads/non_salary",
    // DOD_UPLOADS: "/uploads/dod",
  },
  auth: {
    LOGIN: "/login",
    VERIFICATION: "/verification",
    TWO_FA: "/2fa",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    LOCKED_OUT: "/locked-out",
    RESET_SUCCESS: "/password-reset-success",
    CHECK_EMAIL: "/check-email",
  },
};
