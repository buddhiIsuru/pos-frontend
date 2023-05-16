import React from "react";
import POSView from "../../Pages/POS/POSView";
import ShiftManagement from "../../Pages/ShiftManagement/ShiftManagement";

const style={
    width:"92%",
    left:"8%",
    marginTop:"1%",
}

const ContentSection = () => {
    return (
        <div className="position-relative" style={style} >
            <POSView />
            {/* <ShiftManagement/> */}
        </div>
    )
}

export default ContentSection;