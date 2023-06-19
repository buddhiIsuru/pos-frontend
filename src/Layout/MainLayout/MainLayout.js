import React, { useRef, useState } from "react";
import { Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentSection from "../../Components/ContentSection/ContentSection";
import { getOutletShiftList } from "../../Service/authService";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import { cancelInvoiceOutlet, getInvoice, getInvoiceOutlet } from "../../Service/invoiceService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainNavbar from "../../Components/MainNavbar/Navbar";
import Invoice from "../../Pages/Invoice/Invoice";

const style = {
    position: "relative",
    width: "90%",
    left: "10%",
    top: "5vh",
}

const MainLayout = () => {
    const navigateTo = useNavigate();
    const handle = useFullScreenHandle();

    const logoutUser = async () => {
        localStorage.clear();
        navigateTo("/");
    }

    return (
        <>
            <FullScreen handle={handle}>
                <MainNavbar handle={handle} />
                <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <Sidebar
                        logOut={() => logoutUser()}
                    />
                    <div style={style}>
                        <Outlet />
                    </div>
                </Row>
            </FullScreen>
        </>
    )
}

export default MainLayout;