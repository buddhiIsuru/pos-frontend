import React from "react";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { HiHome } from "@react-icons/all-files/hi/HiHome";
import { HiUserCircle } from "@react-icons/all-files/hi/HiUserCircle";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { DiOpenshift } from "@react-icons/all-files/di/DiOpenshift";

const Sidebar = (props) => {
    return (
        <div className="side-component">
            <div className="content-componet">
                <Button className="sidebar-button sidebar-button-select">
                    <HiHome />
                </Button>
                <Button className="sidebar-button sidebar-button-unselect">
                    <HiUserCircle />
                </Button>
                <Button
                    className="sidebar-button sidebar-button-unselect"
                    onClick={props.setShiftModalVisibility}
                >
                    <DiOpenshift />
                </Button>
                <Button
                    className="sidebar-button sidebar-button-unselect"
                    onClick={props.setShiftListVisibility}
                >
                    <AiFillSetting />
                </Button>
                <Button
                    className="sidebar-button sidebar-button-unselect"
                    onClick={props.setInvoicetListVisibility}
                >
                    <AiFillSetting />
                </Button>
                <Button className="sidebar-button sidebar-button-unselect">
                    <AiOutlineLogout />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar;