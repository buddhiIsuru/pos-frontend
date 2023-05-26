import React from "react";
import Bill80 from "./Bill80";
import Report from "./Report";
import KOT from "./KOT";

export const BillLayout = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {
        props.layout === "BILL" ?
          <Bill80
            subTotal={props.subTotal}
            grandTotal={props.grandTotal}
            discount={props.discountValue}
            tax={props.tax}
            charges={props.charges}
            orderType={props.orderType}
            paymentType={props.paymentType}
            cartDataList={props.cartDataList}
            orderId={props.orderId}
            outletName={props.outletName}
            logo={props.logo}
          />
          : props.layout === "REPORT" ?
            <Report
              outletName={props.outletName}
              grossSales={props.grossSales}
              grossSalesWithoutTax={props.grossSalesWithoutTax}
              totalDiscounts={props.totalDiscounts}
              TotalCharges={props.TotalCharges}
              totalTaxes={props.totalTaxes}
              netSales={props.netSales}
              startAt={props.startAt}
              closeAt={props.closeAt}
              netQTY={props.netQTY}
              netDiscountQTY={props.netDiscountQTY}
              pickUpAmount={props.pickUpAmount}
              pickUpQTY={props.pickUpQTY}
              dineINAmount={props.dineINAmount}
              dineINQTY={props.dineINQTY}
              DeliveryAmount={props.DeliveryAmount}
              DeliveryQTY={props.DeliveryQTY}
              driveThruAmount={props.driveThruAmount}
              driveThruQTY={props.driveThruQTY}

              tmDoneCardAmount={props.tmDoneCardAmount}
              tmDoneCardQTY={props.tmDoneCardQTY}
              tmDoneCashAmount={props.tmDoneCashAmount}
              tmDoneCashQTY={props.tmDoneCashQTY}
              thalabathCardAmount={props.thalabathCardAmount}
              thalabathCardQTY={props.thalabathCardQTY}
              thalabathCashAmount={props.thalabathCashAmount}
              thalabathCashQTY={props.thalabathCashQTY}
              cashAmount={props.cashAmount}
              cashQTY={props.cashQTY}
              visaAmount={props.visaAmount}
              visaQTY={props.visaQTY}
            />
            : props.layout === "KOT" ?
              <KOT
                subTotal={props.subTotal}
                grandTotal={props.grandTotal}
                discount={props.discountValue}
                tax={props.tax}
                logo={props.logo}
                charges={props.chargesAmount}
                orderType={props.orderType}
                paymentType={props.paymentType}
                cartDataList={props.cartDataList}
                orderId={props.orderId}
                outletName={props.outletName}
              />
              :
              null
      }
    </div>
  );
});
