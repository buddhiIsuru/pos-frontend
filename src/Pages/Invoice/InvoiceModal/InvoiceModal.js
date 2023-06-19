import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './InvoiceModal.css';
import moment from 'moment';
import { removeReplaceCharactors } from '../../../constance/Constance';
import { cancelInvoiceOutlet } from '../../../Service/invoiceService';

const InvoiceModal = (props) => {
    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Invoice List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836" }}>
                {
                    props.data?.id ?
                        <>
                            <table style={{ width: "100%", background: "#252836", color: "white" }}>
                                <tbody className='table-body' style={{ background: "#252836", color: "white" }}>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Invoice Id :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{props.data?.id}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Invoiced date :</td>
                                        <td colSpan={1} style={{ textAlign: "right", width: "40%" }}>{moment(props.data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Payment method :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{props.data ? removeReplaceCharactors(props.data?.payment_method) : ""}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Invoice Type :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{props.data ? removeReplaceCharactors(props.data.invoiceType) : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: "100%", borderTop: "1px solid white", borderBottom: "1px solid white", margin: "15px 0" }}>
                                <thead className='table-header' style={{ background: "#252836", color: "white" }}>
                                    <tr>
                                        <th>Product Id</th>
                                        <th>Name</th>
                                        <th>Discount</th>
                                        <th>QTY</th>
                                        <th style={{ textAlign: "right" }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className='table-body' style={{ background: "#252836", color: "white" }}>
                                    {
                                        props.dataList.map((item, index) =>
                                            <tr>
                                                <td>{(item.productId)}</td>
                                                <td>{(item.productName)}</td>
                                                <td>{item.product_discount ? parseFloat(item.product_discount).toFixed(3) : ""}</td>
                                                <td>{(item.product_qty)}</td>
                                                <td style={{ textAlign: "right" }}>{parseFloat(item.product_amount).toFixed(3)}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <table style={{ width: "100%", background: "#252836", color: "white" }}>
                                <tbody className='table-body' style={{ background: "#252836", color: "white" }}>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Number of products :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{props.data?.total_qty}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Sub total :</td>
                                        <td colSpan={1} style={{ textAlign: "right", width: "40%" }}>{parseFloat(props.data?.subTotalAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Discount :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{parseFloat(props.data?.total_discount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right" }}>Tax :</td>
                                        <td colSpan={1} style={{ textAlign: "right" }}>{parseFloat(props.data?.tax_amount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "right", fontSize: "20px", fontWeight: "bold" }}>Grand Amount(OMR) :</td>
                                        <td colSpan={1} style={{ textAlign: "right", fontSize: "20px", fontWeight: "bold" }}>{parseFloat(props.data?.grandTotalAmount).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        :
                        <Spinner animation="border" role="status" style={{ color: "white" }} />

                }
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => props.invoiceCancel(props.data?.id)}>
                    Cancel Invoice
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InvoiceModal;