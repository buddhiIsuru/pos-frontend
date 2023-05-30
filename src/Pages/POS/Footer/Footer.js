import React from 'react';
import './Footer.css'
import { Button } from 'react-bootstrap';

const Footer = (props) => {
    return (
        <div className='footer-class'>
            <div className='footer-left'>
                <Button variant="danger" onClick={props.clearCart} >Clear Cart</Button>{" "}
                <Button className="button-left-div" onClick={props.addDraft}>+ Draft</Button>{" "}
                <Button className="button-left-div" onClick={props.onClickDraft}>Draft Invoice List</Button>
            </div>
            <div className='footer-midle'>
                {/* <Button>Clear Cart</Button>{" "} */}
                {/* <Button>+ Draft</Button>{" "} */}
                {/* <Button>Draft Invoice List</Button> */}
            </div>
            <div className='footer-right'>
                {/* <Button className="button-discount" >Clear Cart</Button> */}
                <Button className="button-discount" onClick={props.setDiscountModal} >Discount</Button>
                <Button className="button-discount" onClick={props.setChargesModal} >Charges</Button>
            </div>
        </div>
    );
}

export default Footer;