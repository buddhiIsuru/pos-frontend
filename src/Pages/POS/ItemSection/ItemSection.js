import React from "react";
import './ItemSection.css'
import ItemCard from "./ItemCard/ItemCard";
import { Row, Spinner } from "react-bootstrap";

const ItemSection = (props) => {
    return (
        <>
            <p className="dishes-header">Choose Dishes</p>
            {
                props.isLoading ?
                    <div style={{ textAlign: "center", marginTop: "50px" }}><Spinner animation="border" variant="primary" /></div>
                    :
                    <Row className="dishes-section">
                        {
                            props.dataList.map((item, index) => {
                                return (
                                    <ItemCard
                                        onClick={() => props.onSelectProductClick(item)}
                                        itemObj={item}
                                    />
                                )
                            })
                        }
                    </Row>
            }
        </>
    )
}

export default ItemSection;