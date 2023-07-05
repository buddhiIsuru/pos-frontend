import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { removeReplaceCharactors, vatNo, vatPercentage } from "../../../constance/Constance";
import { imageBaseUrl } from "../../../constance/baseUrl";
import { Image } from "react-bootstrap";
import img1 from '../../../assests/holder.png';

const KOT = (props) => {
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
                        <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "28px" }}>
                            KOT
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
                                    <th style={{ width: "85%", textAlign: "left" }}>Item</th>
                                    <th style={{ width: "15%", textAlign: "left" }}>QTY</th>
                                </thead>
                                <tbody>
                                    {
                                        props.cartDataList.map((item, index) =>
                                            <>
                                                <tr style={{ width: "100%" }}>
                                                    <td style={{ width: "85%", textAlign: "left" }}>{item.productName}</td>
                                                    <td style={{ width: "15%", textAlign: "left" }}>{item.product_qty}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "100%", textAlign: "left" }}>{item.remark}</td>
                                                </tr>
                                            </>
                                        )
                                    }
                                </tbody>
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

export default KOT;