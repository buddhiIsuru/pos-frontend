
import { baseUrl } from '../constance/baseUrl';
import { httpGET } from './intercepter';

export const getProductCategoryVice = (id) => {
    const url = baseUrl + "/product/get-all-product-by-category/"+id;
    return httpGET(url);
};
