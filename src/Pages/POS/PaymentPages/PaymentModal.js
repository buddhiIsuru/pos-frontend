import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './PaymentModal.css'
import NumberPad from './NumberPad/NumberPad';

function PaymentSummeryItem({ label, value }) {
    return (
        <div className="payment-summery-section">
            <div className="payment-summery-section-left-item">{label}</div>
            <div className="payment-summery-section-right-item">{value}</div>
        </div>
    )
}

function PaymentType(props) {
    return (
        <div className="">
            <div className="payment-summery-section">
                <div className="payment-summery-section-left-item" style={{ width: "50%" }}>
                    Payment Type
                </div>
                <div className="payment-summery-section-right-item" style={{ width: "50%" }}>
                    <Form.Select aria-label="Default select example" onChange={(e) => props.changePaymentType(e.target.value)}>
                        <option value="">select payment method</option>
                        <option value="tm_done_card">TM Done Card</option>
                        <option value="tm_done_cash">TM Done Cash</option>
                        <option value="talabath_card">Talabath Card</option>
                        <option value="talabath_cash">Talabath Cash</option>
                        <option value="cash">Cash</option>
                        <option value="visa">Visa</option>
                    </Form.Select>
                </div>
            </div>
        </div>
    )
}
function CashSection(props) {
    return (
        <div className="payment-summery-section">
            <div className="payment-summery-section-left-item">
                Cash
            </div>
            <div className="payment-summery-section-right-item">
                <input className="balance-input" type='number' step="any" value={props.cashAmount} onChange={(e) => props.setCashAmount(e.target.value)} />
            </div>
        </div>
    )
}

function BalanceSection(props) {
    return (
        <div className="payment-summery-section">
            <div className="payment-summery-section-left-item">
                Balance
            </div>
            <div className="payment-summery-section-right-item">
                {parseFloat(props.cashAmount - props.grandTotalAmount).toFixed(3)}
            </div>
        </div>
    )
}


const PaymentModal = (props) => {
    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose} style={{ zIndex: 100000 }}>
            <Modal.Header closeButton style={{ background: "#252836", color: "white" }}>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#252836", color: "white" }}>
                <Row>
                    <Col lg={4}>
                        <div className="order-summery-section">
                            <PaymentSummeryItem label="Total" value={parseFloat(props.totalAmount).toFixed(3)} />
                            <PaymentSummeryItem label="Tax" value={parseFloat(props.taxAmount).toFixed(3)} />
                            <PaymentSummeryItem label="Charges Amount" value={parseFloat(props.chargesAmount).toFixed(3)} />
                            <PaymentSummeryItem label="Sub Total" value={parseFloat(props.subTotalAmount).toFixed(3)} />
                            <PaymentSummeryItem label="Discount" value={parseFloat(props.discountAmount).toFixed(3)} />
                            <PaymentSummeryItem label="Grand Total" value={parseFloat(props.grandTotalAmount).toFixed(3)} />
                            {/* <PaymentType changePaymentType={(data) => props.changePaymentType(data)} /> */}
                            {
                                props.paymentType === "tm_done_cash" || props.paymentType === "talabath_cash" || props.paymentType === "cash" ?
                                    <>
                                        <CashSection
                                            cashAmount={props.cashAmount}
                                            setCashAmount={(data) => props.setCashAmount(data)}
                                        />
                                    </>
                                    :
                                    null
                            }

                        </div>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <div style={{ width: "50%", textAlign: "center" }}>
                                <div style={{ width: "100%" }}>
                                    <NumberPad onClickNumber={(data) => props.onClickNumberButton(data)} />
                                </div>
                            </div>
                            <div style={{ width: "30%" }}>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "tm_done_card" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("tm_done_card")}>TM Done Card</Button>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "tm_done_cash" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("tm_done_cash")}>TM Done Cash</Button>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "talabath_card" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("talabath_card")}>Talabath Card</Button>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "talabath_cash" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("talabath_cash")}>Talabath Cash</Button>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "cash" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("cash")}>card</Button>
                                <Button className="number-button w-100" style={{ height: "40px", background: props.paymentType === "visa" ? "#ea7c69" : "#1f1d2b" }} onClick={() => props.changePaymentType("visa")}>Visa</Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ background: "#252836", color: "white" }}>
                {
                    props.paymentType === "tm_done_cash" || props.paymentType === "talabath_cash" || props.paymentType === "cash" ?
                        <>
                            <Button variant="transparent" style={{ fontWeight: "bold", color: "white" }}>
                                Balance : {parseFloat(props.cashAmount - props.grandTotalAmount < 0 ? 0 : props.cashAmount - props.grandTotalAmount).toFixed(3)}
                            </Button>
                            <Button variant="transparent" style={{ fontWeight: "bold", color: "white" }}>
                                |
                            </Button>
                            <Button variant="transparent" style={{ fontWeight: "bold", color: "white" }}>
                                Paid : {parseFloat(!props.cashAmount ? 0 : props.cashAmount).toFixed(3)}
                            </Button>
                            <Button variant="transparent" style={{ fontWeight: "bold", color: "white" }}>
                                |
                            </Button>
                            <Button variant="transparent" style={{ fontWeight: "bold", color: "white" }}>
                                Payable : {parseFloat(props.grandTotalAmount - props.cashAmount < 0 ? 0 : props.grandTotalAmount - props.cashAmount).toFixed(3)}
                            </Button>
                        </>
                        :
                        null
                }
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" disabled={props.isLoading} onClick={props.onClickAddDraft}>
                    {
                        props.isLoading ?
                            <div class="spinner-border text-light" role="status" />
                            :
                            <span class="sr-only">Add Draft</span>
                    }
                </Button>
                <Button variant="primary" onClick={props.onClickSave}>
                    {
                        props.isLoading ?
                            <div class="spinner-border text-light" role="status" />
                            :
                            <span class="sr-only">Submit</span>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PaymentModal;