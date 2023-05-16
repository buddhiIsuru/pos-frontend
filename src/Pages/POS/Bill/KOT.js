import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { vatNo, vatPercentage } from "../../../constance/Constance";

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
                        <td style={{ textAlign: "center" }}>
                            KOT
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            {moment(props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
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
                                            <>
                                                <tr style={{ width: "100%"}}> 
                                                    <td style={{ width: "10%", textAlign: "left" }}>{item.product_qty}</td>
                                                    <td style={{ width: "50%", textAlign: "left" }}>{item.productName}</td>
                                                    <td style={{ width: "10%", textAlign: "left" }}>{item.product_discount}</td>
                                                    <td style={{ width: "30%", textAlign: "right" }}>{item.product_amount}</td>
                                                </tr>
                                                <tr style={{ width: "100%", textAlign: "left" }}>
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