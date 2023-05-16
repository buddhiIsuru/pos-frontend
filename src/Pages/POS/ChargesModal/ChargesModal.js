import React, { useState } from 'react';
import { Col, Form, Row, Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './ChargesModal.css'

const ChargesModal = (props) => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    const setChargesAmount = () => {
        if (name && amount) {
            const dataList = props.chargesList;
            const obj = {
                chargesName: name,
                chargesAmount: parseFloat(amount),
            }
            dataList.push(obj);
            props.onChangeChargesList(dataList);
            setAmount("");
            setName("");
        }
    }

    const removeItem = (index) => {
        const dataList = props.chargesList;
        dataList.splice(index, 1);
        props.onChangeChargesList(dataList);
    }

    return (
        <Modal size="md" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Charges</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <input className="discount-input" placeholder='Charges Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className="discount-input" placeholder='Charges Amount' type='number' step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button className="discount-button" onClick={setChargesAmount}>Add</Button>

                <Table responsive="xl">
                    <thead className='table-header'>
                        <tr>
                            <th>Charge</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {
                            props.chargesList.map((item, index) =>
                                <tr>
                                    <td>{item.chargesName}</td>
                                    <td>{item.chargesAmount}</td>
                                    <td>
                                        <Button className='remove-button' onClick={() => removeItem(index)}>X</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                <Button variant="danger" onClick={props.handleClose}>
                    Close
                </Button>
                <Button  onClick={props.handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChargesModal;