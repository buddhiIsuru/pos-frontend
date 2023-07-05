
import { baseUrl } from '../constance/baseUrl';
import { httpGET } from './intercepter';

export const getProductCategoryVice = (cat_id,device_id) => {
    const url = baseUrl + "/product/get-all-product-by-category-and-device/"+cat_id+"/"+device_id;
    return httpGET(url);
};
export const getProductDeviceAndCategoryVice = (id) => {
    const url = baseUrl + "/product/filters?category="+2+"&device="+52;
    return httpGET(url);
};
