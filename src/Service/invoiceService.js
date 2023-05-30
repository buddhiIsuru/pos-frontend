
import { baseUrl } from '../constance/baseUrl';
import { httpGET, httpPOST } from './intercepter';

export const saveInvoice = (body) => {
    const url = baseUrl + "/invoice/save-invoice";
    return httpPOST(url,body);
};
export const getDraftInvoiceList = (id) => {
    const url = baseUrl + "/invoice/get-outlet-draft-invoice-set/"+id;
    return httpGET(url);
};

export const getLatestInvoiceId = (id) => {
    const url = baseUrl + "/invoice/get-outlet-latest-invoice-id/"+id;
    return httpGET(url);
};
export const getInvoiceData = (id) => {
    const url = baseUrl + "/invoice/get-outlet-invoice-data/"+id;
    return httpGET(url);
};
export const getShiftInvoiceReport = (id) => {
    const url = baseUrl + "/invoice/get-daily-report/"+id;
    return httpGET(url);
};
export const getInvoiceOutlet = (id) => {
    const url = baseUrl + "/invoice/get-invoice-outlet/"+id;
    console.log(url);
    return httpGET(url);
};
export const getInvoice = (id) => {
    const url = baseUrl + "/invoice/get-outlet-invoice-data/"+id;
    console.log(url);
    return httpGET(url);
};
export const cancelInvoiceOutlet = (id) => {
    const url = baseUrl + "/invoice/cancel-invoice/"+id;
    return httpGET(url);
};
