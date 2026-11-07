import { clearCookie, getCookie, setCookie } from "../utils";

export const getAccessToken = () => getCookie("access_token");
export const getRefreshToken = () => getCookie("refresh_token");

export const saveTokens = (access: string, refresh: string) => {
  setCookie("access_token", access);
  setCookie("refresh_token", refresh);
};

export const clearTokens = () => {
  clearCookie("access_token");
  clearCookie("refresh_token");
};

/** Signs the user out on this device: removes the tokens and the cached role and name. */
export const clearSession = () => {
  clearTokens();
  clearCookie("user_role");
  clearCookie("user_name");
};
