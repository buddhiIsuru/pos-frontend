import React from "react";
import { Badge, Button, Image } from "react-bootstrap";
import img1 from '../../../../assests/holder.png';
import './CartItem.css';
import { HiTrash } from "@react-icons/all-files/hi/HiTrash";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import { imageBaseUrl } from "../../../../constance/baseUrl";

const CartItem = (props) => {
    const onChenageRemark = (index,data) => {
        props.cartDataList[index].remark=data;
    }
    return (
        <div className="cart-card">
            <div className="item-desc-section">
                <Image rounded src={props.dataObj.img?imageBaseUrl+props.dataObj.img:img1}  width={50} height={50} />
                {/* <Image rounded src={img1} width={50} height={50} /> */}
                <div className="cart-item-name">
                    <p>{props.dataObj.productName}</p>
                    {
                        props.dataObj.product_discount ?
                            <Badge bg="danger">{props.dataObj.product_discount}%</Badge>
                            :
                            null
                    }
                </div>
                <div className="cart-item-price">
                    {parseFloat(props.dataObj.product_amount).toFixed(3)}
                </div>

                <Button className="trash-button" onClick={() => { props.onRemoveClick() }}>
                    <HiTrash />
                </Button>

            </div>
            <div className="remark-section">
                <input onChange={(e) => props.onChenageRemark(e.target.value)} value={props.dataObj.remark} />
                <div className="qty-agesment-section">
                    <Button onClick={() => { props.onMinusClick() }}>
                        <AiOutlineMinus />
                    </Button>
                    <div className="cart-item-qty">
                        {props.dataObj.product_qty}
                    </div>
                    <Button onClick={() => { props.onPlusClick() }}>
                        <AiOutlinePlus />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;