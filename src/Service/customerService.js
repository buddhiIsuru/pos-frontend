
import { baseUrl } from '../constance/baseUrl';
import { httpGET, httpPOST } from './intercepter';

export const saveCustomer = (data) => {
    const url = baseUrl + "/customer/save-customer";
    return httpPOST(url,data);
};