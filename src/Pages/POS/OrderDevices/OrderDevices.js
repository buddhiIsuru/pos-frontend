import React from "react";
import { Button, Row } from "react-bootstrap";
import './OrderDevices.css'

const OrderDevices = (props) => {
    return (
        <div className="device-list">
            {
                props.dataList?.map((devices, index) => {
                    return (
                        <Button className="device-btn"
                            style={{ background: props.select.deviceId === devices.deviceId ? "#ea7c69" : "white", color: props.select.deviceId === devices.deviceId ? "white" : "black" }}
                            onClick={() => props.onClick(devices)}>{devices.deviceName}</Button>
                    )
                })
            }
        </div>
    )
}

export default OrderDevices;