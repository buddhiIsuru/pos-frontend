
import { baseUrl } from '../constance/baseUrl';
import { httpGET } from './intercepter';

export const getCategoryOutletVice = (id) => {
    const url = baseUrl + "/category/get-all-category";
    // const url = baseUrl + "/category/get-category-by-outlet/"+id;
    return httpGET(url);
};