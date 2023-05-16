import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { vatNo, vatPercentage } from "../../../constance/Constance";

const Bill80 = (props) => {
    const [printedDate, setPrinteddate] = useState(null);
    useEffect(() => {
        setPrinteddate(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'));
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
                    <tr style={{ borderBottom: "1px solid #bdb9b9" }}>
                        <td style={{ textAlign: "center" }}>
                            Receipt Print
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {moment(props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #bdb9b9" }} >
                        <td style={{ textAlign: "center" }}>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "50%", textAlign: "left" }}>
                                        {
                                            props.orderType === "dine_in" ?
                                                "Dine In"
                                                : props.orderType === "pick_up" ?
                                                    "Pick Up" :
                                                    props.orderType === "delivery" ?
                                                        "Delivery" :
                                                        props.orderType === "drive_thru" ?
                                                            "Trive Thru" :
                                                            null
                                        }
                                    </td>
                                    <td style={{ width: "50%", textAlign: "right" }}>
                                        <p style={{ marginBottom: "0" }}>
                                            Check# {props.orderId}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <table style={{ width: "100%" }}>
                                <thead style={{ borderBottom: "1px solid #bdb9b9" }}>
                                    <th style={{ width: "10%", textAlign: "left" }}>QTY</th>
                                    <th style={{ width: "50%", textAlign: "left" }}>Item</th>
                                    <th style={{ width: "10%", textAlign: "left" }}>Dis(%)</th>
                                    <th style={{ width: "30%", textAlign: "right" }}>Price(OMR)</th>
                                </thead>
                                <tbody>
                                    {
                                        props.cartDataList.map((item, index) =>
                                            <tr style={{ borderBottom: "1px solid #bdb9b9" }}>
                                                <td style={{ width: "10%", textAlign: "left" }}>{item.product_qty}</td>
                                                <td style={{ width: "50%", textAlign: "left" }}>{item.productName}</td>
                                                <td style={{ width: "10%", textAlign: "left" }}>{item.product_discount}</td>
                                                <td style={{ width: "30%", textAlign: "right" }}>{item.product_amount}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <table style={{ width: "100%" }}>
                                <tr>
                                    <td style={{ width: "80%", textAlign: "right" }}>VAT {vatNo} ({parseFloat(vatPercentage)}%) </td>
                                    <td style={{ width: "20%", textAlign: "right" }}>{props.tax}</td>
                                </tr>
                                {
                                    props.charges ?
                                        <tr>
                                            <td style={{ width: "80%", textAlign: "right" }}>Charges  </td>
                                            <td style={{ width: "20%", textAlign: "right" }}>{parseFloat(props.charges).toFixed(3)}</td>
                                        </tr>
                                        : null
                                }
                                <tr>
                                    <td style={{ width: "80%", textAlign: "right" }}>Sub Total  </td>
                                    <td style={{ width: "20%", textAlign: "right" }}>{parseFloat(props.subTotal).toFixed(3)}</td>
                                </tr>
                                {
                                    props.discount ?
                                        <tr>
                                            <td style={{ width: "80%", textAlign: "right" }}>Discount  </td>
                                            <td style={{ width: "20%", textAlign: "right" }}>{parseFloat(props.discount).toFixed(3)}</td>
                                        </tr>
                                        : null
                                }
                                <tr>
                                    <td style={{ width: "80%", textAlign: "right", fontWeight: "bold", fontSize: "16px" }}>Total  </td>
                                    <td style={{ width: "20%", textAlign: "right", fontWeight: "bold", fontSize: "16px" }}>{parseFloat(props.grandTotal).toFixed(3)}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "80%", textAlign: "right" }}>Payment - {props.paymentType}  </td>
                                    {/* <td style={{ width: "20%", textAlign: "right" }}>150</td> */}
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <hr />
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            Product Count: - {props.cartDataList.length}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            Thank You
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Bill80;