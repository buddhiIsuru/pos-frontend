import React from "react";
import './ItemSection.css'
import ItemCard from "./ItemCard/ItemCard";
import { Row } from "react-bootstrap";

const ItemSection = (props) => {
    return (
        <>
            <p className="dishes-header">Choose Dishes</p>
            <Row className="dishes-section">
                {
                    props.dataList.map((item, index) => {
                        return (
                            <ItemCard
                                onClick={()=>props.onSelectProductClick(item)}
                                itemObj={item}
                            />
                        )
                    })
                }
            </Row>
        </>
    )
}

export default ItemSection;