import React, { useRef, useState } from "react";
import MainNavbar from "../../Components/Navbar/Navbar";
import { Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentSection from "../../Components/ContentSection/ContentSection";
import ShiftModal from "../../Pages/ShiftModal/ShiftModal";
import ShiftListModal from "../../Pages/ShiftListModal/ShiftListModal";
import { getOutletShiftList } from "../../Service/authService";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import { cancelInvoiceOutlet, getInvoice, getInvoiceOutlet } from "../../Service/invoiceService";
import InvoiceListModal from "../../Pages/InvoiceListModal/InvoiceListModal";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from "react-router-dom";
import Footer from "../../Pages/POS/Footer/Footer";
import InvoiceModal from "../../Pages/InvoiceModal/InvoiceModal";

const MainLayout = () => {
    const [shiftModal, setShiftModal] = useState(false);
    const [shiftListModal, setShiftListModal] = useState(false);
    const [invoiceListModal, setInvoiceListModal] = useState(false);
    const [invoiceModal, setInvoiceModal] = useState(false);
    const navigateTo = useNavigate();

    const childRef = useRef();

    const [dataList, setDataList] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [invoiceItemList, setInvoiceItemList] = useState([]);

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
    const getInvoiceData = async (id) => {
        setInvoiceModal(true);
        const response = await getInvoice(id);
        if (response.status === 200) {
            console.log(response.data);
            setInvoice(response.data);
            setInvoiceItemList(response.data.invoiceDetailsDetailModals);
        }
    }
    const logoutUser = async () => {
        localStorage.clear();
        navigateTo("/");
    }

    const cancelInvoice = async (id) => {
        const response = await cancelInvoiceOutlet(id);
        if (response.status === 200) {
            alert("Cancel Success");
            setInvoiceModal(false);
        }
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
                    <ContentSection
                        ref={childRef}
                    />
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
                    selectInvoice={(id) => { setInvoiceListModal(false); getInvoiceData(id) }}
                />
                <InvoiceModal
                    show={invoiceModal}
                    data={invoice}
                    dataList={invoiceItemList}
                    invoiceCancel={(id) => cancelInvoice(id)}
                    handleClose={() => setInvoiceModal(false)}
                />
                <Footer
                    onClickDraft={() => childRef.current.setDraftModalVisibility()}
                    setChargesModal={() => childRef.current.setChargesModalVisibility()}
                    setDiscountModal={() => childRef.current.setDiscountModalVisibility()}
                    addDraft={() => childRef.current.onClickAddDraft()}
                    clearCart={() => childRef.current.onClickClearCart()}
                />
            </FullScreen>
        </>
    )
}

export default MainLayout;