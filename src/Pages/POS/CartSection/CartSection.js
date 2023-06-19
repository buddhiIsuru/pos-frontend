import React from "react";
import "./CartSection.css"
import { Button, Row } from "react-bootstrap";
import CartItem from "./CartItem/CartItem";
import { BiUserPlus } from "@react-icons/all-files/bi/BiUserPlus";

function OrderSummery(props) {
    return (
        <div className="order-summery-section">
            <OrderSummeryItem label="Total" value={props.totalAmount} />
            <OrderSummeryItem label="Tax" value={props.taxAmount} />
            {
                props.chargesAmount > 0 ?
                    <OrderSummeryItem label="Charges" value={props.chargesAmount} />
                    : null
            }
            <OrderSummeryItem label="Sub Total" value={props.subTotalAmount} />
            <OrderSummeryItem label="Discount" value={props.discountAmount} />
        </div>
    )
}

function OrderSummeryItem({ label, value }) {
    return (
        <div className="order-summery-section-item">
            <div className="order-summery-section-left-item">{label}</div>
            <div className="order-summery-section-right-item">{parseFloat(value).toFixed(3)}</div>
        </div>
    )
}
function OrderGrandTotal({ label, value }) {
    return (
        <div className="order-summery-section-item-gt">
            <div className="order-summery-section-left-item-gt">{label}</div>
            <div className="order-summery-section-right-item-gt">{parseFloat(value).toFixed(3)}</div>
        </div>
    )
}

const CartSection = (props) => {
    return (
        <>
            <p className="order-id">Order Number : # {props.orderId}</p>
            <div className="tb-header">
                <div className="tb-header-item">
                    <input placeholder="Customer Vehicle No" value={props.customerVehicleNo} onChange={(e) => props.setCustomerVehicleNo(e.target.value)} className="customer-input" />
                </div>
                <div className="tb-header-price">
                    <Button onClick={props.onClickCustomer} style={{ background: "#ea7c69" }} className="customer-button"><BiUserPlus /></Button>
                </div>
                {/* <div className="tb-header-qty">QTY</div> */}
            </div>
            <div>
                <Button onClick={() => props.setOrderType("dine_in")} style={{ background: props.orderType === "dine_in" ? "#ea7c69" : "#1f1d2b" }} className="order-type-button">Dine in</Button>
                <Button onClick={() => props.setOrderType("pick_up")} style={{ background: props.orderType === "pick_up" ? "#ea7c69" : "#1f1d2b" }} className="order-type-button">Pick Up</Button>
                <Button onClick={() => props.setOrderType("delivery")} style={{ background: props.orderType === "delivery" ? "#ea7c69" : "#1f1d2b" }} className="order-type-button">Delivery</Button>
                <Button onClick={() => props.setOrderType("drive_thru")} style={{ background: props.orderType === "drive_thru" ? "#ea7c69" : "#1f1d2b" }} className="order-type-button">Drive Thru</Button>

                <div className="cart-item-scroll-section">
                    {
                        props.cartDataList.map((item, index) =>
                            <CartItem
                                dataObj={item}
                                onRemoveClick={() => props.onRemoveClick(index)}
                                onPlusClick={() => props.onPlusClick(index)}
                                onMinusClick={() => props.onMinusClick(index)}
                                onChenageRemark={(data) => props.onChenageRemark(index, data)}
                            />
                        )
                    }
                </div>
            </div>
            <div className="order-summery-section-main">
                <OrderSummery
                    totalAmount={props.totalAmount}
                    taxAmount={props.taxAmount}
                    subTotalAmount={props.subTotalAmount}
                    discountAmount={props.discountAmount}
                    chargesAmount={props.chargesAmount}
                />
                <OrderGrandTotal
                    label="Grand Total"
                    value={props.grandTotalAmount}
                />
                <div className="button-row">
                    <Button className="button-kot" disabled={props.cartDataList.length === 0} onClick={props.onClickKOT}>
                        {
                            props.isLoading ?
                                <div class="spinner-border text-light" role="status" />
                                :
                                <span class="sr-only">KOT</span>
                        }
                    </Button>
                    <Button className="button-payment" disabled={props.paymentIsDissable} onClick={props.onClickPayment}>Payment</Button>
                </div>
            </div>
        </>
    )
}

export default CartSection;