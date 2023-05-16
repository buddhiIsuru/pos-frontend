import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { vatNo, vatPercentage } from "../../../constance/Constance";

const Report = (props) => {
    const [printedDate, setPrinteddate] = useState(null);
    useEffect(() => {
        setPrinteddate(moment(new Date()).format('MMMM Do YYYY'));
    }, [])
    return (
        <div style={{ width: "300px", padding: '10px' }}>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {props.outletName}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", fontWeight: "bold" }}>
                            Order Summary
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            Business Date: - {props.startAt}
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td style={{ textAlign: "center", fontSize: "14px" }}>
                            Opened at: - {props.startAt}
                        </td>
                    </tr>
                    <tr style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                        <td style={{ textAlign: "center", fontSize: "14px" }}>
                            Closed at: - {props.closeAt}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                            General
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Gross Sales</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.netQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.grossSales).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Gross Sales Without Tax</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.netQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.grossSalesWithoutTax).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Total Discounts</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.netQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.totalDiscounts).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Total Charges</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>0</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.TotalCharges).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Total Taxes</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.totalTaxes).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Net Sales</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.netQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.netSales).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Guest Count</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.netQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>-</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Average Per Order</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.netSales / props.netQTY).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Average Per Guest</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.netSales / props.netQTY).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center", paddingTop: 0, paddingBottom: 0, margin: 0 }}>Order Charges</td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Gross Sales</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", paddingTop: 0, paddingBottom: 0, margin: 0 }}>Order Types</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Dine IN</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.dineINQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.dineINAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Pick Up</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.pickUpQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.pickUpAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Delivery</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.DeliveryQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.DeliveryAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Drive Thru</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.driveThruQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.driveThruAmount).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", paddingTop: 0, paddingBottom: 0, margin: 0 }}>Discount Summary</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Open Discounts</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", paddingTop: 0, paddingBottom: 0, margin: 0 }}>Payments</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>TM Done Card</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.tmDoneCardQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.tmDoneCardAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>TM Done Cash</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.tmDoneCashQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.tmDoneCashAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Talabath Card</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.thalabathCardQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.thalabathCardAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Talabath Cash</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.thalabathCashQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.thalabathCashAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Cash</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.cashQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.cashAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Visa</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>{props.visaQTY}</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.visaAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Total Payments</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.tmDoneCardAmount+props.tmDoneCashAmount+props.thalabathCardAmount+props.thalabathCashAmount+props.cashAmount+props.visaAmount).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Total Returns</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(0).toFixed(3)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Net Payments</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>-</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>{parseFloat(props.tmDoneCardAmount+props.tmDoneCashAmount+props.thalabathCardAmount+props.thalabathCashAmount+props.cashAmount+props.visaAmount).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style={{ textAlign: "center", height: '20px' }}>
                        <td style={{ textAlign: "center", height: '20px' }}>Net Payments by Type</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center", borderBottom: "1px solid #bdb9b9" }} >
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "70%", textAlign: "center", fontSize: "14px" }}>Name</th>
                                    <th style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>Quantity</th>
                                    <th style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>Amount (OMR)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Cash</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Visa</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Other</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "70%", textAlign: "left", fontSize: "14px" }}>Gift Crad</td>
                                        <td style={{ width: "10%", textAlign: "center", fontSize: "14px" }}>15</td>
                                        <td style={{ width: "20%", textAlign: "right", fontSize: "14px" }}>72.283</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            End Of Report
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Report;