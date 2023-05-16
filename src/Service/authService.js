import { httpGET, httpPOST } from "./intercepter";
import { baseUrl } from './baseUrl';

export const login = (data) => {
  const url = baseUrl + "/api/v1/auth/login";
  return httpPOST(url, data);
};

export const createUsers = (data) => {
  const url = baseUrl + "/api/v1/auth/register";
  return httpPOST(url, data);
};

export const getUsers = (id) => {
  const url = baseUrl + "/api/v1/auth/get-all-users/"+id;
  return httpGET(url);
};
export const closeStore = (id) => {
  const url = baseUrl + "/api/v1/auth/close-store/"+id;
  return httpGET(url);
};

export const getUserRole = () => {
  const url = baseUrl + "/api/v1/auth/get-all-role";
  return httpGET(url);
};
export const getOutletShiftList = (id) => {
  const url = baseUrl + "/api/v1/auth/get-outlet-shift/"+id;
  return httpGET(url);
};
