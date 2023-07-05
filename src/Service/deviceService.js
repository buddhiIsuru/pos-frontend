
import { baseUrl } from '../constance/baseUrl';
import { httpGET } from './intercepter';

export const getDevicesOutletId = (outlet_id) => {
    const url = baseUrl + "/api/v1/custom-devices/get-devices/"+outlet_id;
    return httpGET(url);
};