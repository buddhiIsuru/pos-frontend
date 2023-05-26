import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './Navbar.css'
import moment from "moment";
import { localStorageGetItem } from "../../constance/LocalStorageManagement";

const MainNavbar = (props) => {

    const[companyName,setCompanyName]=useState("");

    useEffect(()=>{
        setCompanyName(localStorageGetItem("outlet").outletName);
    },[])
    
    return (
        <Navbar className="position-fixed w-100" style={{ background: "#1f1d2b", color: "white",zIndex:"10000" }} expand="lg">
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
                        <Nav.Link href="#action1"><span className="date-span">{moment(new Date()).format('MMMM Do YYYY')}</span></Nav.Link>
                        {/* <Nav.Link href="#action2">{moment().format('MMMM Do YYYY, h:mm:ss a')}</Nav.Link> */}
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
                        <Button className="nav-button" onClick={props.handle.enter}>
                            <BiFullscreen size={20} />
                        </Button>
                        {/* <Button className="nav-button">
                            <FaCalculator size={20} />
                        </Button> */}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar;