import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { removeReplaceCharactors, vatNo, vatPercentage } from "../../../constance/Constance";
import { Image } from "react-bootstrap";

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
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {
                                props.logoId !== null ?
                                    <Image rounded src={props.logo} width={75} height={75} />
                                    : null
                            }
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
                                            removeReplaceCharactors(props.orderType)
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
                                    <tr>
                                        {/* <th colSpan={1} style={{ width: "50%", textAlign: "left" }}></th> */}
                                        <th colSpan={1} style={{ textAlign: "left" }}>QTY</th>
                                        <th colSpan={3} style={{ textAlign: "center" }}>Dis(%)</th>
                                        <th colSpan={1} style={{ textAlign: "right" }}>Price(OMR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.cartDataList.map((item, index) =>
                                            <>
                                                <tr>
                                                    <td colSpan={4} style={{ textAlign: "left" }}>{item.productName}</td>
                                                </tr>
                                                <tr style={{ borderBottom: "1px solid #bdb9b9" }}>
                                                    <td colSpan={1} style={{ textAlign: "left" }}>{item.product_qty}</td>
                                                    <td colSpan={3} style={{ textAlign: "center" }}>{isNaN(item.product_discount) ? "" : parseFloat(item.product_discount).toFixed(3)}</td>
                                                    <td colSpan={1} style={{ textAlign: "right" }}>{parseFloat(item.product_amount).toFixed(3)}</td>
                                                </tr>

                                            </>
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
                                    <td style={{ width: "80%", textAlign: "right" }}>VAT {vatNo} ({vatPercentage}%) </td>
                                    <td style={{ width: "20%", textAlign: "right" }}>{parseFloat(props.tax).toFixed(3)}</td>
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
                                            <td style={{ width: "20%", textAlign: "right" }}>{isNaN(props.discount) ? props.discount : 0}</td>
                                            {/* <td style={{ width: "20%", textAlign: "right" }}>{parseFloat(props.discount).toFixed(3)}</td> */}
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