import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import './Login.css'
import { login } from "../../Service/authService";
import { useNavigate } from "react-router-dom";
import { localStorageSetItem } from "../../constance/LocalStorageManagement";

const Login = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();

    const onCLickLogin = async () => {
        setIsLoading(true);
        const data = {
            userName: userName,
            password: password,
        }
        // navigateTo("/user");
        const response = await login(data);
        console.log(response);
        if (response.status === 200) {
            if (response.data.outletModal && response.data.roleModal) {
                localStorageSetItem("outlet", response.data.outletModal);
                localStorageSetItem("role", response.data.roleModal);
                localStorageSetItem("shiftId", response.data.shiftId);
                navigateTo("/user");
            } else {
                alert("Invalid Credencials");
            }
        }
        setIsLoading(false);

    }


    return (
        <>
            <Container>
                <Row>
                    <Col lg={8}>

                    </Col>
                    <Col lg={4} >
                        <div className="login-container">
                            <h4>Login</h4>
                            <input
                                required
                                autocomplete="new-username"
                                value={userName}
                                placeholder="User Name"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                autocomplete="new-password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                disabled={!userName && !password && !isLoading}
                                type="submit" onClick={onCLickLogin}>
                                {
                                    isLoading ?
                                        <div class="spinner-border text-light" role="status" />
                                        :
                                        <span class="sr-only">Login</span>
                                }
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;