import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { localStorageGetItem } from '../../constance/LocalStorageManagement';

const CloseCashModal = (props) => {

    const [closeAmount, setCloseAmount] = useState(0);



    return (
        <Modal size="md" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Shift Close Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <input
                    style={{ background: "#252836", color: "white",border:"1px solid #ea7c69",padding:"5px 20px",borderRadius:"100px" }}
                    className='w-100'
                    value={closeAmount}
                    onChange={e => setCloseAmount(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="primary" onClick={() => { props.handleCloseShift(closeAmount) }}>
                    Close Shift
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CloseCashModal;