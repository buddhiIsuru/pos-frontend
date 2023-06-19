import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import './Navbar.css'
import moment from "moment";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";
import { HiHome } from "@react-icons/all-files/hi/HiHome";
import { Link } from "react-router-dom";

const POSNavbar = (props) => {

    const [userName, setUserName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setCompanyName(localStorageGetItem("outlet").outletName);
        setUserName(localStorageGetItem("username"));
    }, [])

    useEffect(() => {
        // Update the time every second using setTimeout
        const timer = setTimeout(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [time]);

    return (
        <Navbar className="position-fixed w-100" style={{ background: "#1f1d2b", color: "white", zIndex: "10000" }} expand="lg">
            <Container fluid>
                <Navbar.Brand href="#" style={{ color: "white", fontSize: '20px' }}>
                    {companyName} <br />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className="date-div"><span className="date-span">{moment(new Date()).format('MMMM Do YYYY')}</span></div>
                        <div className="clock-div">{time.toLocaleTimeString()}</div>
                        <Link to="/main/dashboard">
                            <div className="home-div"> <HiHome /> </div>
                        </Link>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown"> */}
                        {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item> */}
                        {/* </NavDropdown> */}
                        {/* <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}
                    </Nav>
                    <div className="nav-button-row">
                        <Button className="username-button">
                            {userName}
                        </Button>

                        <Button className="nav-button" onClick={props.handle.enter}>
                            <BiFullscreen size={20} />
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default POSNavbar;