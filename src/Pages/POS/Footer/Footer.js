import React from 'react';
import './Footer.css'
import { Button, Col } from 'react-bootstrap';
import Receipt from '../Bill/Receipt';
import PrintButton from './PrintButton';

const Footer = (props) => {
    return (
        <div className='footer-class'>
            <Col lg={4} sm={6}>
                <Button variant="danger" onClick={props.clearCart} >Clear Cart</Button>{" "}
                <Button className="button-left-div" onClick={props.addDraft}>+ Draft</Button>{" "}
                <Button className="button-left-div" onClick={props.onClickDraft}>Draft Invoice List</Button>
            </Col>

            <Col lg={4} sm={6}>
                <Receipt/>
                <PrintButton/>
                {/* <Button className="button-discount" onClick={props.setDiscountModal} >Discount</Button>{" "}
                <Button className="button-discount" onClick={props.setChargesModal} >Charges</Button> */}
            </Col>

            <Col lg={4} sm={6}>
                <Button className="button-discount" onClick={props.setDiscountModal} >Discount</Button>{" "}
                <Button className="button-discount" onClick={props.setChargesModal} >Charges</Button>
            </Col>
        </div>
    );
}

export default Footer;