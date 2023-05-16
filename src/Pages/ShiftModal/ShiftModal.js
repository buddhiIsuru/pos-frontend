import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ShiftModal.css'
import ShiftManagement from '../ShiftManagement/ShiftManagement';
import { closeStore } from '../../Service/authService';
import { localStorageGetItem } from '../../constance/LocalStorageManagement';

const ShiftModal = (props) => {

    const storeClose = async () => {
        const shiftId = localStorageGetItem("shiftId");
        const response = await closeStore(shiftId);
        if(response.status===200){
            props.handleClose();
            props.handleGetSiftLis();
        }
    }

    return (
        <Modal size="md" show={props.shiftModalVisibility} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Close Shift</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <Button onClick={storeClose}>Close</Button>
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

export default ShiftModal;