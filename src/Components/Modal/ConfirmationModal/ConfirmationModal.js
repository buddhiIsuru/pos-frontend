import React from "react";
import "./ConfirmationModal.css";
import { Button, Modal, Spinner } from "react-bootstrap";

const ConfirmationModal = (props) => {
    return (
        <Modal size="sm" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                {props.massage}
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={props.handleOk} disabled={props.loading}>
                    {
                        props.loading?
                        <Spinner/>
                        :
                        "Confirm"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal;