import React from "react";
import './NumberPad.css';
import { Button } from "react-bootstrap";

const numbers = [
    {
        lable: "9",
        value: "9",
    },
    {
        lable: "8",
        value: "8",
    },
    {
        lable: "7",
        value: "7",
    },
    {
        lable: "6",
        value: "6",
    },
    {
        lable: "5",
        value: "5",
    },
    {
        lable: "4",
        value: "4",
    },
    {
        lable: "3",
        value: "3",
    },
    {
        lable: "2",
        value: "2",
    },
    {
        lable: "1",
        value: "1",
    },
    {
        lable: "0",
        value: "0",
    },
    {
        lable: ".",
        value: ".",
    },
    {
        lable: "Clear",
        value: "clear",
    }
]

function NumberButton(props) {
    return (
            <Button className="number-button" onClick={() => props.onClickButton(props.value)} >{props.lable}</Button>
    )
}

function NumberRow(props) {
    return (
        <div className="number-row">
            {
                numbers.map((item, index) =>
                    <NumberButton
                        onClickButton={(data)=>props.onClickNumber(data)}
                        lable={item.lable}
                        value={item.value}
                    />
                )
            }

        </div>
    )
}
const NumberPad = (props) => {
    return (
        <NumberRow onClickNumber={(data)=>props.onClickNumber(data)}/>
    )
}

export default NumberPad;