import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CustomerModal.css'

const CustomerModal = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");

    const setCustomerData = () => {
        const data = {
            name: name,
            email: email,
            address: address,
            contactNo: contactNo,
            vehicleNo: vehicleNo
        }
        props.onAddCustomer(data);
    }

    return (
        <Modal size="md" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <input className="discount-input" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className="discount-input" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                <input className="discount-input" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="discount-input" placeholder='Contact No' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                <input className="discount-input" placeholder='Vehicle No' value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={setCustomerData}>
                    Add Customer
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerModal;