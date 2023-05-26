import React from 'react';
import './Footer.css'
import { Button } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='footer-class'>
            <div className='footer-left'>
                <Button>Clear Cart</Button>
                <Button>+ Draft</Button>
                <Button>Draft Invoice List</Button>
            </div>
            <div className='footer-right'></div>    
        </div>
    );
}

export default Footer;