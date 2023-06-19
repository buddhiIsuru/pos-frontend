import React, { useRef, useState } from "react";
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
import InvoiceModal from "../../Pages/Invoice/InvoiceModal/InvoiceModal";
import POSNavbar from "../../Components/POSNavbar/Navbar";

const POSMainLayout = () => {

    const [shiftModal, setShiftModal] = useState(false);
    const [shiftListModal, setShiftListModal] = useState(false);
    const [invoiceListModal, setInvoiceListModal] = useState(false);
    
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
    
    const logoutUser = async () => {
        localStorage.clear();
        navigateTo("/");
    }



    return (
        <>
            <FullScreen handle={handle}>
                <POSNavbar handle={handle} />
                {/* <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <Sidebar
                        shiftModalVisibility={shiftModal}
                        setShiftModalVisibility={() => setShiftModal(true)}
                        logOut={() => logoutUser()}
                        setShiftListVisibility={() => { setShiftListModal(true); getOutletShiftSet() }}
                        setInvoicetListVisibility={() => { setInvoiceListModal(true); getOutletInvoiceList() }}
                    />
                </Row> */}
                <br/>
                <br/>
                <br/>
                <ContentSection
                    ref={childRef}
                />
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
                    // selectInvoice={(id) => { setInvoiceListModal(false); getInvoiceData(id) }}
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
    );
}

export default POSMainLayout;