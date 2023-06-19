import React, { useEffect, useState } from "react";
import { localStorageGetItem, localStorageSetItem } from "../../constance/LocalStorageManagement";
import StartCashModal from "../StartCashModal/StartCashModal";
import { shiftCheck, shiftClose, shiftStart } from "../../Service/authService";
import './Dashboard.css'
import { Button, Row } from "react-bootstrap";
import CloseCashModal from "../StartCashModal/StartCashModal";
import moment from "moment";

const Dashboard = () => {

    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    const [startAmount, setStartAmount] = useState("");
    const [closeAmount, setCloseAmount] = useState("");
    const [start_time, setStartTime] = useState("");
    const [close_time, setCloseTime] = useState("");
    const [startCashModalShow, setStartCashModalShow] = useState(false);
    const [closeCashModalShow, setCloseCashModalShow] = useState(false);

    useEffect(() => {
        setUserRole(localStorageGetItem("role"));
        setUserId(localStorageGetItem("userId"));
        if (localStorageGetItem("role").name === "WAITOR") {
            checkShift(localStorageGetItem("userId"));
            // setStartCashModalShow(true);
        }
    }, []);

    const checkShift = async (id) => {
        const response = await shiftCheck(id);
        if (response.status === 200) {
            if (isNaN(response.data.id)) {
                setStartCashModalShow(true);
            } else {
                setStartAmount(response.data.startAmount);
                setStartTime(response.data.start_at);
                setCloseTime(response.data.close_at);
                setCloseAmount(response.data.closeAmount);
            }
            // localStorageSetItem("user-shift",response.data);
            // setStartCashModalShow(true);
        }
    }
    const startShift = async (value) => {
        const data = {
            userId: userId,
            startAmount: parseFloat(value).toFixed(3)
        }
        const response = await shiftStart(data);
        if (response.status === 200) {
            localStorageSetItem("user-shift", response.data);
            setStartCashModalShow(false);
        }
    }
    const closeShift = async (value) => {
        const data = {
            userId: userId,
            startAmount: value
        }
        const response = await shiftClose(data);
        if (response.status === 200) {
            checkShift(userId);
            localStorageSetItem("role", response.data);
            setCloseCashModalShow(false);
            localStorage.removeItem("user-shift");
        }
    }

    return (
        <>
            <p className="header">Dashboard</p>
            {
                startAmount || close_time ?
                    <Row className="ml-0 mr-0 pr-0 pl-0">
                        <p className="sub-header w-50">Start Amount :- OMR.{parseFloat(startAmount).toFixed(3)}</p>
                        <p className="sub-header w-50">Start Time :- {moment(start_time).format("YYYY-MM-DD hh:mm:ss")}</p>
                    </Row>
                    :
                    <p className="sub-header w-50">Shift Closed</p>
            }

            {
                closeAmount || close_time ?
                    <Row className="ml-0 mr-0 pr-0 pl-0">
                        <p className="sub-header w-50">Close Amount :- OMR.{parseFloat(closeAmount).toFixed(3)}</p>
                        <p className="sub-header w-50">Close Time :- {moment(close_time).format("YYYY-MM-DD hh:mm:ss")}</p>
                    </Row>
                    : null
            }
            {
                startAmount || close_time ?
                    <Button onClick={() => setCloseCashModalShow(true)}>Close Shift</Button>
                    :
                    null
            }

            <StartCashModal
                show={startCashModalShow}
                handleClose={() => setStartCashModalShow(true)}
                handleStartShift={(value) => startShift(value)}
            />
            <CloseCashModal
                show={closeCashModalShow}
                handleClose={() => setCloseCashModalShow(false)}
                handleStartShift={(value) => closeShift(value)}
            />
        </>
    )
}

export default Dashboard;