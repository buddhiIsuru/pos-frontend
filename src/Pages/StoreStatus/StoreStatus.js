import React from "react";
import './StoreStatus';
import { Button, Row, Table } from "react-bootstrap";
import { closeStore, getOutletShiftList } from "../../Service/authService";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import { useState } from "react";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal/ConfirmationModal";
import { useEffect } from "react";
import { BillLayout } from "../POS/Bill/BillLayout";
import moment from "moment";
import { useRef } from "react";
import { getShiftInvoiceReport } from "../../Service/invoiceService";
import { useReactToPrint } from "react-to-print";

const StoreStatus = () => {

    const [confirmationModal, setConfirmationModalVisibility] = useState(false);
    const [closed, setClosed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);

    const [startAt, setStartAt] = useState(0);
    const [closeAt, setCLoseAt] = useState(0);
    const [grossSales, setGrossSales] = useState(0);
    const [grossSalesWithoutTax, setGrossSalesWithoutTax] = useState(0);
    const [totalDiscounts, setTotalDiscounts] = useState(0);
    const [TotalCharges, setTotalCharges] = useState(0);
    const [totalTaxes, setTotalTaxes] = useState(0);
    const [netSales, setNetSales] = useState(0);
    const [netQTY, setNetQTY] = useState(0);
    const [netDiscountQTY, setNetDiscountQTY] = useState(0);

    const [dineINAmount, setDineINAmount] = useState(0);
    const [dineINQTY, setDineINQTY] = useState(0);

    const [pickUpAmount, setPickUpAmount] = useState(0);
    const [pickUpQTY, setPickUpQTY] = useState(0);

    const [DeliveryAmount, setDeliveryAmount] = useState(0);
    const [DeliveryQTY, setDeliveryQTY] = useState(0);

    const [driveThruAmount, setDriveThruAmount] = useState(0);
    const [driveThruQTY, setDriveThruQTY] = useState(0);

    // ---------------------------------

    const [tmDoneCardAmount, setTMDoneCardAmount] = useState(0);
    const [tmDoneCardQTY, setTMDoneCardQTY] = useState(0);

    const [tmDoneCashAmount, setTMDoneCashAmount] = useState(0);
    const [tmDoneCashQTY, setTMDoneCashQTY] = useState(0);

    const [thalabathCardAmount, setThalabathCardAmount] = useState(0);
    const [thalabathCardQTY, setThalabathCardQTY] = useState(0);

    const [thalabathCashAmount, setThalabathCashAmount] = useState(0);
    const [thalabathCashQTY, setThalabathCashQTY] = useState(0);

    const [cashAmount, setCashAmount] = useState(0);
    const [cashQTY, setCashQTY] = useState(0);

    const [visaAmount, setVisaAmount] = useState(0);
    const [visaQTY, setVisaQTY] = useState(0);

    const componentRef = useRef(null);

    const [outletName, setOutletName] = useState(null);

    useEffect(() => {
        getOutletShiftSet();
        if (isNaN(localStorageGetItem("shiftId"))) {
            setClosed(false);
        }
    }, [])

    const storeClose = async () => {
        setLoading(true);
        const shiftId = localStorageGetItem("shiftId");
        const response = await closeStore(shiftId);
        if (response.status === 200) {
            setConfirmationModalVisibility(false);
            localStorage.removeItem("shiftId");
            setClosed(response.status);
            // props.handleClose();
            // props.handleGetSiftLis();
        }
        setLoading(false);
    }



    const getReportData = async (item) => {
        setOutletName(localStorageGetItem("outlet").outletName);
        const response = await getShiftInvoiceReport(item.id);
        setStartAt(moment(item.start_at).format("MMMM Do YYYY, h:mm:ss a"));
        setCLoseAt(moment(item.close_at).format("MMMM Do YYYY, h:mm:ss a"));

        if (response.status === 200) {
            console.log(response.data);
            const array = response.data;
            let netDiscountQty = 0;
            let grosSales = 0;
            let totalDiscounts = 0;
            let totalTaxes = 0;
            let pickUpAmount = 0;
            let pickUpQTY = 0;
            let pickUpTax = 0;
            let dineINAmount = 0;
            let dineINQTY = 0;
            let dineINTax = 0;
            let DeliveryAmount = 0;
            let DeliveryQTY = 0;
            let DeliveryTax = 0;
            let driveThruAmount = 0;
            let driveThruQTY = 0;
            let driveThruTax = 0;
            let tmDoneCardAmount = 0;
            let tmDoneCardQTY = 0;
            let tmDoneCashAmount = 0;
            let tmDoneCashQTY = 0;
            let thalabathCardAmount = 0;
            let thalabathCardQTY = 0;
            let thalabathCashAmount = 0;
            let thalabathCashQTY = 0;
            let cashAmount = 0;
            let cashQTY = 0;
            let visaAmount = 0;
            let visaQTY = 0;
            array.forEach(element => {
                grosSales = grosSales + element.subTotalAmount;
                totalTaxes = totalTaxes + element.tax_amount;
                totalDiscounts = totalDiscounts + element.total_discount;
                if (element.total_discount > 0) {
                    netDiscountQty = netDiscountQty + 1;
                }
                if (element.invoiceType === "pick_up") {
                    pickUpAmount = pickUpAmount + element.subTotalAmount;
                    pickUpQTY = pickUpQTY + 1;
                    pickUpTax = pickUpTax + element.tax_amount;
                }
                if (element.invoiceType === "dine_in") {
                    dineINAmount = dineINAmount + element.subTotalAmount;
                    dineINQTY = dineINQTY + 1;
                    dineINTax = dineINTax + element.tax_amount;
                }
                if (element.invoiceType === "delivery") {
                    DeliveryAmount = DeliveryAmount + element.subTotalAmount;
                    DeliveryQTY = DeliveryQTY + 1;
                    DeliveryTax = DeliveryTax + element.tax_amount;
                }
                if (element.invoiceType === "drive_thru") {
                    driveThruAmount = driveThruAmount + element.subTotalAmount;
                    driveThruQTY = driveThruQTY + 1;
                    driveThruTax = driveThruTax + element.tax_amount;
                }
                if (element.payment_method === "tm_done_card") {
                    tmDoneCardAmount = tmDoneCardAmount + element.subTotalAmount;
                    tmDoneCardQTY = tmDoneCardQTY + 1;
                }
                if (element.payment_method === "tm_done_cash") {
                    tmDoneCashAmount = tmDoneCashAmount + element.subTotalAmount;
                    tmDoneCashQTY = tmDoneCashQTY + 1;
                }
                if (element.payment_method === "talabath_card") {
                    thalabathCardAmount = thalabathCardAmount + element.subTotalAmount;
                    thalabathCardQTY = thalabathCardQTY + 1;
                }
                if (element.payment_method === "talabath_cash") {
                    tmDoneCashAmount = tmDoneCashAmount + element.subTotalAmount;
                    tmDoneCashQTY = tmDoneCashQTY + 1;
                }
                if (element.payment_method === "cash") {
                    cashAmount = cashAmount + element.subTotalAmount;
                    cashQTY = cashQTY + 1;
                }
                if (element.payment_method === "visa") {
                    visaAmount = visaAmount + element.subTotalAmount;
                    visaQTY = visaQTY + 1;
                }
                setPickUpAmount(pickUpAmount - pickUpTax);
                setPickUpQTY(pickUpQTY);

                setDineINAmount(dineINAmount - dineINTax);
                setDineINQTY(dineINQTY);

                setDeliveryAmount(DeliveryAmount - DeliveryTax);
                setDeliveryQTY(DeliveryQTY);

                setDeliveryAmount(driveThruAmount - driveThruTax);
                setDeliveryQTY(driveThruQTY);

                setGrossSales(grosSales + totalTaxes);
                setGrossSalesWithoutTax(grosSales);
                setTotalDiscounts(totalDiscounts);
                setTotalTaxes(totalTaxes);
                setNetSales(grosSales - (totalDiscounts + totalTaxes));

                setTMDoneCardAmount(tmDoneCardAmount);
                setTMDoneCashAmount(tmDoneCashAmount);
                setTMDoneCardQTY(tmDoneCardQTY);
                setTMDoneCashQTY(tmDoneCashQTY);

                setThalabathCardAmount(thalabathCardAmount);
                setThalabathCardQTY(thalabathCardQTY);
                setThalabathCashAmount(thalabathCashAmount);
                setThalabathCashQTY(thalabathCashQTY);

                setVisaAmount(visaAmount);
                setVisaQTY(visaQTY);

                setCashAmount(cashAmount);
                setCashQTY(cashQTY);

            });
            setNetQTY(response.data.length);
            setNetDiscountQTY(netDiscountQty);
            const timer = setTimeout(() => handlePrint(), 1000);

        }
    }

    const getOutletShiftSet = async () => {
        const outletId = localStorageGetItem("outlet").id;
        const response = await getOutletShiftList(outletId);
        if (response.status === 200) {
            setDataList(response.data);
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    return (
        <>
            <div className="ml-0 mr-0 pl-0 pr-0">
                <p className="breadcrumbs">
                    Store Status
                </p>
                {
                    !closed ?
                        <>
                            <h1 className="text-light">Store Opend</h1>
                            <Button onClick={() => setConfirmationModalVisibility(true)}>Close</Button>
                        </>
                        :
                        <h1 className="text-light">Store Closed</h1>
                }
            </div>

            <div style={{ display: 'none' }}>
                <BillLayout
                    ref={componentRef}
                    layout="REPORT"
                    grossSales={grossSales}
                    outletName={outletName}
                    grossSalesWithoutTax={grossSalesWithoutTax}
                    totalDiscounts={totalDiscounts}
                    TotalCharges={TotalCharges}
                    totalTaxes={totalTaxes}
                    netSales={netSales}
                    startAt={startAt}
                    closeAt={closeAt}
                    netQTY={netQTY}
                    netDiscountQTY={netDiscountQTY}
                    pickUpAmount={pickUpAmount}
                    pickUpQTY={pickUpQTY}
                    dineINAmount={dineINAmount}
                    dineINQTY={dineINQTY}
                    DeliveryAmount={DeliveryAmount}
                    DeliveryQTY={DeliveryQTY}
                    driveThruAmount={driveThruAmount}
                    driveThruQTY={driveThruQTY}
                    tmDoneCardAmount={tmDoneCardAmount}
                    tmDoneCardQTY={tmDoneCardQTY}
                    tmDoneCashAmount={tmDoneCashAmount}
                    tmDoneCashQTY={tmDoneCashQTY}
                    thalabathCardAmount={thalabathCardAmount}
                    thalabathCardQTY={thalabathCardQTY}
                    thalabathCashAmount={thalabathCashAmount}
                    thalabathCashQTY={thalabathCashQTY}
                    cashAmount={cashAmount}
                    cashQTY={cashQTY}
                    visaAmount={visaAmount}
                    visaQTY={visaQTY}
                />
            </div>
            <Table>
                <thead className='table-header'>
                    <tr>
                        <th>Start Data</th>
                        <th>Close Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {
                        dataList.map((item, index) =>
                            <tr>
                                <td>{moment(item.start_at).format("YYYY-MM-DD")}</td>
                                <td>{moment(item.close_at).format("YYYY-MM-DD")}</td>
                                <td>
                                    {
                                        !item.status ?
                                            <Button variant="warning" className='' onClick={() => getReportData(item)}>Report</Button>
                                            : null
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <ConfirmationModal
                loading={loading}
                show={confirmationModal}
                handleClose={() => setConfirmationModalVisibility(false)}
                handleOk={() => storeClose(false)}
                title="Confirm"
                massage="Are you sure close store"
            />
        </>
    )
}

export default StoreStatus;