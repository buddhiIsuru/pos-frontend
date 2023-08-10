import React from "react";
import './SummaryReport.css';
import { Row } from "react-bootstrap";

const ReportRow=(params)=>{
    return (
        <div className="row report-row">
                <div className="report-row-left-child" style={params.style}>{params.label}</div>
                <div className="report-row-right-child" style={params.style}>{parseFloat(params.value).toFixed(3)}</div>
        </div>
    )

}

const SummaryReport = (props) => {
    return (
        <>
            <ReportRow
                label="Gross Sales"
                value={parseFloat(props.data?.grossSales).toFixed(3)}
            />
            <ReportRow
                label="Discount"
                value={parseFloat(props.data?.discount).toFixed(3)}
            />
            <ReportRow
                label="Refunds"
                value={parseFloat(props.data?.refunds).toFixed(3)}
            />
            <ReportRow
                label="Tax"
                value={parseFloat(props.data?.tax).toFixed(3)}
            />
            <ReportRow
                label="Net Sales"
                value={parseFloat(props.data?.netSales).toFixed(3)}
                style={{
                    fontSize:"18px",
                    fontWeight:"bold"
                }}
            />
        </>
    )
}

export default SummaryReport;