import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DiscountModal.css'

const DiscountModal = (props) => {
    return (
        <Modal size="md" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Discount</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <input className="discount-input" value={props.discountValue} onChange={(e)=>props.onChangeDiscountValue(e.target.value)} />
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onAddDiscount}>
                    Add Discount
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DiscountModal;