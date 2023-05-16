import React, { useEffect, useRef, useState } from "react";
import CategoryList from "./CategoryList/CategoryList";
import { Col, Row } from "react-bootstrap";
import ItemSection from "./ItemSection/ItemSection";
import CartSection from "./CartSection/CartSection";
import { getCategoryOutletVice } from "../../Service/categoryService";
import { getProductCategoryVice } from "../../Service/productService";
import PaymentModal from "./PaymentPages/PaymentModal";
import DiscountModal from "./DiscountModal/DiscountModal";
import { getDraftInvoiceList, getInvoiceData, getLatestInvoiceId, getShiftInvoiceReport, saveInvoice } from "../../Service/invoiceService";
import ChargesModal from "./ChargesModal/ChargesModal";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { BillLayout } from "./Bill/BillLayout";
import DraftModal from "./DraftModal/DraftModal";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import CustomerModal from "./CustomerModal/CustomerModal";
import { saveCustomer } from "../../Service/customerService";

const POSView = () => {

    const componentRef = useRef(null);

    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [chargesAmount, setChargesAmount] = useState(0);
    const [discountValue, onChangeDiscountValue] = useState(0);

    const [cartList, setCartList] = useState([]);
    const [draftList, setDraftList] = useState([]);
    const [chargesSet, setchargesSet] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [propductList, setProductList] = useState([]);
    const [categoryList, setcategoryList] = useState([]);
    const [cartPriceList, setCartPriceList] = useState([]);
    const [selectCategory, setSelectCategory] = useState({});

    const [isDraft, setIsDraft] = useState(false);
    const [draftModal, setDraftModal] = useState(false);
    const [chargesModal, setChargesModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [discountModal, setDiscountModal] = useState(false);
    const [customerModal, setCustomerModal] = useState(false);

    const [invoiceId, setInvoiceID] = useState(null);
    const [outletId, setOutletID] = useState(null);
    const [outletName, setOutletName] = useState(null);
    const [customerID, setCustomerID] = useState(null);

    const [orderId, setOrderID] = useState("");
    const [orderType, setOrderType] = useState("");
    const [cashAmount, setCashAmount] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [printLayout, setPrintLayout] = useState("BILL");
    const [customerVehicleNo, setCustomerVehicleNo] = useState("");

    useEffect(() => {
        setOutletID(localStorageGetItem("outlet").id);
        setOutletName(localStorageGetItem("outlet").outletName);
        getAllCategory(localStorageGetItem("outlet").id);
        getInvoiceReport(1);
        getLatestInvoice(localStorageGetItem("outlet").id);
    }, []);

    const getAllCategory = async (id) => {
        const response = await getCategoryOutletVice(id);
        if (response.status === 200) {
            setcategoryList(response.data);
            selectCategoryClick(response.data[0]);
        }
    }

    const getInvoiceReport = async (id) => {
        const response = await getShiftInvoiceReport(id);
        console.log(response);
        if (response.status === 200) {
        }
    }

    const getLatestInvoice = async (outlet_id) => {
        const response = await getLatestInvoiceId(outlet_id);
        if (response.status === 200) {
            setOrderID(response.data);
        }
    }

    const getAllDraftList = async () => {
        const response = await getDraftInvoiceList();
        if (response.status === 200) {
            setDraftList(response.data);
        }
    }

    const selectCategoryClick = async (data) => {
        setSelectCategory(data);
        const response = await getProductCategoryVice(data.id);
        if (response.status === 200) {
            setProductList(response.data);
        }
    }

    const selectProductClick = async (data) => {
        const cartDataList = cartList;
        const cartObj = {
            id: null,
            productId: data.id,
            productName: data.name,
            product_discount: data.discount,
            product_qty: 1,
            product_amount: data.price,
            img: data.imageId,
            remark: "",
        }

        if (cartDataList.length === 0) {
            cartDataList.push(cartObj);
        } else if (isCheckCartItem(cartDataList, data)) {
            for (let i = 0; i < cartDataList.length; i++) {
                if (cartDataList[i].productId === data.id) {
                    cartDataList[i].product_qty = 1 + cartDataList[i].product_qty;
                }
            }
        } else {
            cartDataList.push(cartObj);
        }
        setCartList(cartDataList);
        calculateCartPricedata(cartDataList);
    }

    const isCheckCartItem = (list, data) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].productId === data.id) {
                return true
            }
        }
        return false;
    }
    const calculateCartPricedata = (cartDataList) => {
        let amount = 0;
        let total_discount = 0;
        let discount = 0;
        let mainDiscount = discountValue;
        let tax = 0;
        for (let i = 0; i < cartDataList.length; i++) {
            amount = amount + cartDataList[i].product_amount * cartDataList[i].product_qty;
            if (cartDataList[i].product_discount) {
                total_discount = total_discount + (cartDataList[i].product_amount * cartDataList[i].product_discount / 100);
            }
        }
        tax = amount * 5 / 100;
        mainDiscount = amount * mainDiscount / 100;
        setSubTotal(amount);
        setDiscount(total_discount + mainDiscount);
        setTax(tax);
        setGrandTotal(amount + tax + chargesAmount - total_discount);
    }

    const calculateCharges = (chargesSet) => {
        let chargeAmount = 0;
        for (let i = 0; i < chargesSet.length; i++) {
            chargeAmount = chargeAmount + parseFloat(chargesSet[i].chargesAmount);
        }
        setChargesAmount(chargeAmount);
        setGrandTotal(subTotal + tax + chargeAmount - discount);
    }

    const removeCartItem = (index) => {
        const cartDataList = cartList;
        cartDataList.splice(index, 1);
        setCartList(cartDataList);
        calculateCartPricedata(cartDataList);
    }

    const plusCartItem = (index) => {
        const cartDataList = cartList;
        cartDataList[index].product_qty = 1 + cartDataList[index].product_qty;
        setCartList(cartDataList);
        calculateCartPricedata(cartDataList);
    }

    const minusCartItem = (index) => {
        const cartDataList = cartList;
        if (parseInt(cartDataList[index].product_qty) > 1) {
            cartDataList[index].product_qty = cartDataList[index].product_qty - 1;
        }
        setCartList(cartDataList);
        calculateCartPricedata(cartDataList);
    }
    const setRemark = (index, value) => {
        const cartDataList = cartList;
        cartDataList[index].remark = value;
        setCartList(cartDataList);
    }

    const addPayment = async () => {
        const payment = {
            payment_method: subTotal - discount + tax,
            payment_amount: paymentType
        }
        const paymentList = paymentList;
        paymentList.push(payment);
        await setPaymentList(paymentList);
        addInvoice();
    }

    const validateInvoice = async () => {
        if (cartList.length === 0) {
            alert("Please add item");
        } else if (!orderType) {
            alert("Please select order type");
        } else if (!paymentType) {
            alert("Please select payment method");
        } else {
            addInvoice();
        }
    }


    const addInvoice = async () => {
        const data = {
            id: invoiceId,
            total_qty: cartList.length,
            subTotalAmount: subTotal,
            grandTotalAmount: grandTotal,
            total_discount: discountValue,
            tax_amount: tax,
            is_draft: isDraft,
            remark: "",
            invoiceDetails: cartList,
            payment_method: paymentType,
            invoiceType: orderType,
            invoiceId: orderId,
            expensesList: chargesSet,
            outletId: outletId,
            customerId: customerID,
        }
        const response = await saveInvoice(data);
        if (response.status === 200) {
            console.log(response);
            if (!isDraft) {
                handlePrint();
            }
            setPaymentModal(false);
            clearData();
            getLatestInvoice(response.data.id);
        }
        console.log(data);
    }

    const addCustomer = async (customer) => {
        console.log(customer);
        const response = await saveCustomer(customer);
        if (response.status === 200) {
            setCustomerModal(false);
            setCustomerVehicleNo(customer.vehicleNo);
            setCustomerID(response.data.id);
        }
        console.log(customer);
    }

    const clearData = () => {
        setCartList([]);
        setchargesSet([]);
        setPaymentList([]);
        setCartPriceList([]);
        setTax(0);
        setSubTotal(0);
        setDiscount(0);
        setGrandTotal(0);
        setChargesAmount(0);
        onChangeDiscountValue(0);
        onChangeDiscountValue(0);
        setOrderType("");
        setCashAmount("");
        setPaymentType("");
        setCustomerVehicleNo("");
        setInvoiceID(null);
        setCustomerID(null);
        setPrintLayout("BILL");
    }

    const onClickNumberPadButton = (value) => {
        if (value === 'clear') {
            setCashAmount("")
        } else if (value >= 0 || value < 9) {
            setCashAmount(cashAmount + value)
        } else if (value === ".") {
            setCashAmount(cashAmount + "" + value)
        }
    }
    const onClickNoteButton = (value) => {
        setCashAmount(value);
    }

    const setSelectedDraftData = async (data) => {
        setDraftModal(false);
        const response = await getInvoiceData(data);
        if (response.status === 200) {
            setCartList(response.data.invoiceDetailsDetailModals);
            setDiscount(response.data.total_discount);
            setSubTotal(response.data.subTotalAmount);
            setGrandTotal(response.data.grandTotalAmount);
            setTax(response.data.tax_amount);
            // setChargesAmount(response.data);
            // setchargesSet(response.data);
            setInvoiceID(response.data.id);
            setPaymentType(response.data.payment_method);
            setOrderType(response.data.invoiceType);
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const calculateMainDiscount = (value) => {
        //     const total=subTotal;
        //     const disValue=total-total*(value/100);
        //     setDiscount(disValue);
        calculateCartPricedata(cartList);
    }

    return (
        <>
            {/* <ReactToPrint
                trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <a ref={hiddenFileInput}>Print this out!</a>;
                }}
                content={() => componentRef}
            /> */}
            {/* <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            /> */}
            {/* <button onClick={handlePrint}>Print this out!</button> */}
            <div style={{ display: 'none' }}>
                <BillLayout
                    layout={printLayout}
                    tax={tax}
                    orderId={orderId}
                    ref={componentRef}
                    subTotal={subTotal}
                    orderType={orderType}
                    cartDataList={cartList}
                    charges={chargesAmount}
                    grandTotal={grandTotal}
                    discount={discountValue}
                    paymentType={paymentType}
                    outletName={outletName}
                />
            </div>
            <Row>
                <Col lg={8}>
                    <CategoryList
                        dataList={categoryList}
                        selectCat={selectCategory}
                        onSelectCategory={(data) => selectCategoryClick(data)}
                    />
                    <ItemSection
                        dataList={propductList}
                        onSelectProductClick={(data) => selectProductClick(data)}
                    />
                </Col>
                <Col lg={4} style={{ background: "#1f1d2b", marginTop: "-15px" }}>
                    <CartSection
                        taxAmount={tax}
                        orderId={orderId}
                        orderType={orderType}
                        remarkValue={orderId}
                        cartDataList={cartList}
                        discountAmount={discount}
                        subTotalAmount={subTotal}
                        priceDataList={cartPriceList}
                        chargesAmount={chargesAmount}
                        grandTotalAmount={grandTotal}
                        customerVehicleNo={customerVehicleNo}
                        paymentIsDissable={!orderType || !cartList.length > 0}
                        onPlusClick={(index) => plusCartItem(index)}
                        onClickCustomer={() => setCustomerModal(true)}
                        onClickPayment={() => setPaymentModal(true)}
                        setChargesModal={() => setChargesModal(true)}
                        setOrderType={(value) => setOrderType(value)}
                        onMinusClick={(index) => minusCartItem(index)}
                        setDiscountModal={() => setDiscountModal(true)}
                        setCustomerVehicleNo={(index) => setCustomerVehicleNo(index)}
                        onClickDraft={() => { getAllDraftList(); setDraftModal(true) }}
                        onClickKOT={() => { setPrintLayout("KOT"); handlePrint(); }}
                        onRemoveClick={(index) => removeCartItem(index)}
                        onChenageRemark={(index, value) => setRemark(index, value)}
                    />
                </Col>
            </Row>
            <PaymentModal
                taxAmount={tax}
                show={paymentModal}
                cashAmount={cashAmount}
                subTotalAmount={subTotal}
                paymentType={paymentType}
                discountAmount={discount}
                grandTotalAmount={grandTotal}
                onClickSave={() => validateInvoice()}
                handleClose={() => setPaymentModal(false)}
                setCashAmount={(data) => setCashAmount(data)}
                changePaymentType={(data) => setPaymentType(data)}
                onClickNoteButton={(data) => onClickNoteButton(data)}
                onClickNumberButton={(data) => onClickNumberPadButton(data)}
                onClickAddDraft={() => { setIsDraft(true); validateInvoice() }}
            />
            <DraftModal
                show={draftModal}
                draftList={draftList}
                handleClose={() => setDraftModal(false)}
                getClickOrderData={(data) => setSelectedDraftData(data)}
            />
            <DiscountModal
                show={discountModal}
                discountValue={discountValue}
                handleClose={() => setDiscountModal(false)}
                onChangeDiscountValue={(value) => { onChangeDiscountValue(value) }}
                onAddDiscount={() => { calculateMainDiscount(discountValue); setDiscountModal(false); }}
            />
            <CustomerModal
                show={customerModal}
                discountValue={discountValue}
                handleClose={() => setCustomerModal(false)}
                onAddCustomer={(data) => { addCustomer(data); }}
            />
            <ChargesModal
                show={chargesModal}
                chargesList={chargesSet}
                handleClose={() => setChargesModal(false)}
                onChangeChargesList={(value) => { calculateCharges(value); setchargesSet(value) }}
            />
        </>
    )
}

export default POSView;