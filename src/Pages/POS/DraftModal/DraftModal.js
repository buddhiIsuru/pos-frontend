import React, { useState } from 'react';
import { Col, Form, Row, Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './DraftModal.css'
import moment from 'moment';

const DraftModal = (props) => {

    return (
        <Modal size="xl" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Draft Invoice List</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <Table responsive="xl">
                    <thead className='table-header'>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Invoice Type</th>
                            <th>Created Time</th>
                            <th>Grand Total Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {
                            props.draftList.map((item, index) =>
                                <tr>
                                    <td>{item.invoiceId}</td>
                                    <td>{item.invoiceType}</td>
                                    <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{parseFloat(item.grandTotalAmount).toFixed(3)}</td>
                                    <td>
                                        <Button className='proceed-button' onClick={() => props.getClickOrderData(item.id)}>Proceed</Button> {" "}
                                        <Button className='proceed-button' onClick={() => props.clickRemoveOrder(item.id)}> Remove </Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default DraftModal;