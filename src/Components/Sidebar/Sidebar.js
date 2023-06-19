import React from "react";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { HiHome } from "@react-icons/all-files/hi/HiHome";
import { HiUserCircle } from "@react-icons/all-files/hi/HiUserCircle";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { FaFileInvoice } from "@react-icons/all-files/fa/FaFileInvoice";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { DiOpenshift } from "@react-icons/all-files/di/DiOpenshift";
import { ImDrawer2 } from "@react-icons/all-files/im/ImDrawer2";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className="side-component">
            <div className="content-componet">
                <Link to="/main/dashboard">
                    <Button className="sidebar-button sidebar-button-select">
                        <HiHome />
                    </Button>
                </Link>
                <Button className="sidebar-button sidebar-button-unselect">
                    <HiUserCircle />
                </Button>
                <Link to="/main/close-store">
                    <Button
                        className="sidebar-button sidebar-button-unselect"
                    >
                        <DiOpenshift />
                    </Button>
                </Link>

                <Button
                    className="sidebar-button sidebar-button-unselect"
                >
                    <AiFillSetting />
                </Button>
                <Button
                    className="sidebar-button sidebar-button-unselect"
                >
                    <ImDrawer2 />
                </Button>
                <Link to="/main/invoice">
                    <Button
                        className="sidebar-button sidebar-button-unselect"
                    >
                        <FaFileInvoice />
                    </Button>
                </Link>
                <Button className="sidebar-button sidebar-button-unselect"
                    onClick={props.logOut}
                >
                    <AiOutlineLogout />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar;