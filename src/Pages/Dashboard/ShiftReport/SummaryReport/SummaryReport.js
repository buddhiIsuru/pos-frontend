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

const SummaryReport = () => {
    return (
        <>
            <ReportRow
                label="Gross Sales"
                value="808"
            />
            <ReportRow
                label="Total Tendered"
                value="808"
                style={{
                    fontSize:"18px",
                    fontWeight:"bold"
                }}
            />
        </>
    )
}

export default SummaryReport;