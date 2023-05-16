import React from "react";
import './ItemCard.css'
import { Badge, Col, Image } from "react-bootstrap";
import img1 from '../../../../assests/holder.png';
import { imageBaseUrl } from "../../../../constance/baseUrl";

const ItemCard = (props) => {
    return (
        <Col lg={3} xs={12} className="item-card" onClick={()=>props.onClick()}>
            {props.itemObj.discount ?
                <Badge bg="danger">{props.itemObj.discount}%</Badge>
                : 
                <Badge bg="transparent"> </Badge>
            }
            <div className="item-card-header">
                <Image rounded src={props.itemObj.imageId?imageBaseUrl+props.itemObj.imageId:img1} height={100} width={150} />
                {/* <Image rounded src={img1} width={150} /> */}
            </div>
            <div className="item-card-body">
                <p className="item-name">{props.itemObj.name}</p>
            </div>
            <div className="item-card-foter">
                <p className="item-price">OMR : {parseFloat(props.itemObj.price).toFixed(3)}</p>
            </div>
        </Col>
    )
}

export default ItemCard;