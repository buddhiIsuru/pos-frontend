import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { localStorageGetItem } from '../../constance/LocalStorageManagement';
import { cancelInvoiceOutlet, getInvoice, getInvoiceOutlet } from '../../Service/invoiceService';
import moment from 'moment';
import { removeReplaceCharactors } from '../../constance/Constance';
import './Invoice.css';
import InvoiceModal from './InvoiceModal/InvoiceModal';

const Invoice = () => {

  const [invoiceList, setInvoiceList] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [invoiceItemList, setInvoiceItemList] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(false);

  useEffect(() => {
    getOutletInvoiceList();
  }, []);

  const getOutletInvoiceList = async () => {
    const outletId = localStorageGetItem("outlet").id;
    const response = await getInvoiceOutlet(outletId);
    if (response.status === 200) {
      setInvoiceList(response.data);
    }
  }

  const cancelInvoice = async (id) => {
    const response = await cancelInvoiceOutlet(id);
    if (response.status === 200) {
      alert("Cancel Success");
      // setInvoiceModal(false);
    }
  }

  const getInvoiceData = async (id) => {
    setInvoiceModal(true);
    const response = await getInvoice(id);
    if (response.status === 200) {
      console.log(response.data);
      setInvoice(response.data);
      setInvoiceItemList(response.data.invoiceDetailsDetailModals);
    }
  }

  return (
    <div>
      <p className='breadcrumbs'>Invoice List</p>
      {
        invoiceList.length === 0 ?
        <Spinner animation="border" role="status" style={{color:"white"}}/>
        :
        <table className='table'>
        <thead className='table-header'>
          <tr>
            <th>Invoice Id</th>
            <th>Data/Time</th>
            <th>Grand Total</th>
            <th>Type</th>
            <th>Payment Method</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {
            invoiceList.map((item, index) =>
              <tr>
                <td>{(item.id)}</td>
                <td>{moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                <td>{(parseFloat(item.grandTotalAmount).toFixed(3))}</td>
                <td>{removeReplaceCharactors(item.invoiceType)}</td>
                <td>{removeReplaceCharactors(item.payment_method)}</td>
                <td>
                  {
                    <Button variant="primary" className='' onClick={() => getInvoiceData(item.id)}>View</Button>
                  }
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      }
      
      <InvoiceModal
        show={invoiceModal}
        data={invoice}
        dataList={invoiceItemList}
        invoiceCancel={(id) => cancelInvoice(id)}
        handleClose={() => {setInvoiceModal(false);setInvoice(null);setInvoiceItemList([])}}
      />
    </div>
  );
}

export default Invoice;