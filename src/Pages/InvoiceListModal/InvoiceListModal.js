import React, { useEffect, useRef, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './InvoiceListModal.css';
import moment from 'moment';
import { removeReplaceCharactors } from '../../constance/Constance';
import { cancelInvoiceOutlet } from '../../Service/invoiceService';

const InvoiceListModal = (props) => {

    const cancelInvoice = async (id) => {
        const response = await cancelInvoiceOutlet(id);
        if (response.status === 200) {
            props.cancelSuccess();
            alert("Cancel Success");
        }
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Invoice List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <Table>
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
                            props.dataSet.map((item, index) =>
                                <tr>
                                    <td>{(item.invoice_id)}</td>
                                    <td>{moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                    <td>{(parseFloat(item.grandTotalAmount).toFixed(3))}</td>
                                    <td>{removeReplaceCharactors(item.invoiceType)}</td>
                                    <td>{removeReplaceCharactors(item.payment_method)}</td>
                                    <td>
                                        {
                                            <Button variant="warning" className='' onClick={() => cancelInvoice(item.id)}>Cancel</Button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            {/* <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Add Customer
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

export default InvoiceListModal;