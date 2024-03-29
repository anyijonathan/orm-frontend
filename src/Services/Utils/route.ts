import { UserRoles } from "../../@types/route";

/**
  * <summary>
  * provide User Roles
  * </summary>
  * <param name="request">
  * </param> 
  * <returns>
  *  'admin' as UserRoles;
  *  'user' as UserRoles;
  *  'supervisor' as UserRoles;
  * </returns> 
  */
export const getCurrentRole = (): UserRoles => {
  return window.location.pathname.split("/")[1] as UserRoles;
};
