import React, { useState } from "react";
import MainNavbar from "../../Components/Navbar/Navbar";
import { Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentSection from "../../Components/ContentSection/ContentSection";
import ShiftModal from "../../Pages/ShiftModal/ShiftModal";
import ShiftListModal from "../../Pages/ShiftListModal/ShiftListModal";
import { getOutletShiftList } from "../../Service/authService";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import { getInvoiceOutlet } from "../../Service/invoiceService";
import InvoiceListModal from "../../Pages/InvoiceListModal/InvoiceListModal";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
    const [shiftModal, setShiftModal] = useState(false);
    const [shiftListModal, setShiftListModal] = useState(false);
    const [invoiceListModal, setInvoiceListModal] = useState(false);
    const navigateTo = useNavigate();

    const [dataList, setDataList] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);

    const handle = useFullScreenHandle();

    const getOutletShiftSet = async () => {
        const outletId = localStorageGetItem("outlet").id;
        const response = await getOutletShiftList(outletId);
        if (response.status === 200) {
            setDataList(response.data);
        }
    }
    const getOutletInvoiceList = async () => {
        const outletId = localStorageGetItem("outlet").id;
        const response = await getInvoiceOutlet(outletId);
        if (response.status === 200) {
            setInvoiceList(response.data);
        }
    }
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
                        shiftModalVisibility={shiftModal}
                        setShiftModalVisibility={() => setShiftModal(true)}
                        logOut={() => logoutUser()}
                        setShiftListVisibility={() => { setShiftListModal(true); getOutletShiftSet() }}
                        setInvoicetListVisibility={() => { setInvoiceListModal(true); getOutletInvoiceList() }}
                    />
                    <ContentSection />
                </Row>
                <ShiftModal
                    shiftModalVisibility={shiftModal}
                    handleClose={() => setShiftModal(false)}
                    handleGetSiftLis={() => { setShiftListModal(true); getOutletShiftSet() }}
                />
                <ShiftListModal
                    show={shiftListModal}
                    dataSet={dataList}
                    handleClose={() => setShiftListModal(false)}
                />
                <InvoiceListModal
                    show={invoiceListModal}
                    dataSet={invoiceList}
                    handleClose={() => setInvoiceListModal(false)}
                    cancelSuccess={() => { setInvoiceListModal(false); getOutletInvoiceList() }}
                />
            </FullScreen>
        </>
    )
}

export default MainLayout;