import React from "react";
import { Button, Row } from "react-bootstrap";
import './CategoryList.css'

const CategoryList = (props) => {
    return (
        <div className="category-list">
            <div className="category-sub-list">
                {
                    props.dataList.map((category, index) => {
                        return (
                            <Button className="category-btn" style={{ background: props.selectCat.id === category.id ? "#ea7c69" : "#1f1d2b" }} onClick={() => { props.onSelectCategory(category) }}>{category.name}</Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryList;