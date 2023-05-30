import React, { forwardRef } from "react";
import POSView from "../../Pages/POS/POSView";
import ShiftManagement from "../../Pages/ShiftManagement/ShiftManagement";

const style = {
    width: "92%",
    left: "8%",
    marginTop: "1%",
}

const ContentSection = forwardRef((props, ref) => {
    // const childMethod = () => {
    //     console.log('Child method 2 called');
    //     // Perform any actions for child method 2
    //   };

    return (
        <div className="position-relative" style={style} >
            <POSView
                ref={ref}
            />
            {/* <ShiftManagement/> */}
        </div>
    )
})

export default ContentSection;