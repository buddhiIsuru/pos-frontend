import React, { useEffect, useState } from "react";
import { localStorageGetItem, localStorageSetItem } from "../../constance/LocalStorageManagement";
import { shiftCheck, shiftClose, shiftStart } from "../../Service/authService";
import './Dashboard.css'
import { Button, Row, Spinner } from "react-bootstrap";
import CloseCashModal from "../CloseCashModal/CloseCashModal";
import moment from "moment";
import StartCashModal from "../StartCashModal/StartCashModal";
import { useNavigate } from "react-router-dom";
import SummaryReport from "./ShiftReport/SummaryReport/SummaryReport";

const Dashboard = () => {

    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    const [startAmount, setStartAmount] = useState("");
    const [closeAmount, setCloseAmount] = useState("");
    const [start_time, setStartTime] = useState("");
    const [close_time, setCloseTime] = useState("");
    const [startCashModalShow, setStartCashModalShow] = useState(false);
    const [closeCashModalShow, setCloseCashModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        setUserRole(localStorageGetItem("role"));
        setUserId(localStorageGetItem("userId"));
        if (localStorageGetItem("role").name === "WAITOR") {
            checkShift(localStorageGetItem("userId"));
            // setStartCashModalShow(true);
        }
    }, []);

    const checkShift = async (id) => {
        setIsLoading(true);
        const response = await shiftCheck(id);
        console.log(response);
        if (response.status === 200) {
            if (response.data.id === 0) {
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
        setIsLoading(false);
    }
    const startShift = async (value) => {
        setIsLoading(true);
        const data = {
            userId: userId,
            startAmount: parseFloat(value).toFixed(3)
        }
        const response = await shiftStart(data);
        if (response.status === 200) {
            localStorageSetItem("user-shift", response.data);
            setStartCashModalShow(false);
            checkShift(userId);
        }
        setIsLoading(true);
    }
    const closeShift = async (value) => {
        setIsLoading(true);
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
            logoutUser();
        }
        setIsLoading(false);
    }

    const logoutUser = async () => {
        localStorage.clear();
        navigateTo("/");
    }

    return (
        <>
            <p className="header">Dashboard</p>
            {
                isLoading ?
                    <Spinner />
                    :
                    <>
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
                            startAmount || start_time ?
                                <Button onClick={() => setCloseCashModalShow(true)}>Close Shift</Button>
                                :
                                null
                        }

                        <br />
                        <br />

                        {/* <SummaryReport /> */}
                    </>
            }


            <StartCashModal
                show={startCashModalShow}
                handleClose={() => setStartCashModalShow(true)}
                handleStartShift={(value) => startShift(value)}
            />
            <CloseCashModal
                show={closeCashModalShow}
                handleClose={() => setCloseCashModalShow(false)}
                handleCloseShift={(value) => closeShift(value)}
            />
        </>
    )
}

export default Dashboard;