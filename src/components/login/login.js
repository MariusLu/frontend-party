import React, { Component } from 'react'
import axios from 'axios';
import { Input, Col, Row, Container, Form, FormGroup, Button, FormFeedback } from 'reactstrap';
import WithLoading from "../common/WithLoading";
import logo from "../assets/logo-testio.svg";

const WithContainerLoading = WithLoading(Container);

export class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isUserNameValid: false,
            isPasswordValid: false,
            invalidPasswordOrUsername: false,
            errorText: "",
            formLoading: false,
        };
    }
    componentDidMount = () =>{
        document.body.classList.add('background');
    }

    getToken = (userName, password) => {
        const url = "http://playground.tesonet.lt/v1/tokens"
        axios.post(url, { "username": userName, "password": password }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
        ).then((response) => {
            document.body.classList.remove('background'); 
            localStorage.setItem("token", response.data.token);
            window.location = "/servers";
        })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 401) {
                    this.setState({
                        invalidPasswordOrUsername: true,
                        errorText: "Username or password are incorect",
                    })
                } else {
                    this.setState({
                        invalidPasswordOrUsername: true,
                        errorText: error.response.data.message,
                    })
                }
            });
    }

    handleUsernameChange = (event) => {
        this.setState({
            userName: event.target.value,
            isUserNameValid: false,
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            isPasswordValid: false,
        });
    }

    handleSubmit = () => {
        event.preventDefault();
        const userName = this.state.userName;
        const password = this.state.password;
        if (userName === '' || password === '') {
            if (userName === '') {
                this.setState({
                    isUserNameValid: true,
                })
            }
            if (password === '') {
                this.setState({
                    isPasswordValid: true,
                })
            }
            return;
        }
        this.setState({
            formLoading: true,
        })
        this.getToken(userName, password)
        this.setState({
            formLoading: false,
        })
    }

    render() {
        return (
            <WithContainerLoading isLoading={this.state.formLoading}>
                <Row className='padingTop'>
                    <Col sm="12" md={{ size: 6, offset: 3 }} className='text-center'>
                    <img src={logo} alt="Logo" className=""></img>
                    </Col>
                </Row>
                <Row style={{marginTop:"70px"}}>
                    <Col sm="12" md={{ size: 6, offset: 3 }} className='text-center'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input invalid={this.state.isUserNameValid} maxLength={50} type="username" value={this.state.userName} onChange={this.handleUsernameChange} placeholder="&#xf007;  Username" />
                                <FormFeedback>Username is empty</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input invalid={this.state.isPasswordValid} maxLength={50} type="Password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="&#xf023;  Password" />
                                <FormFeedback>Password is empty</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Button className="submit_button" type="submit" color="success" style={{ width: "100%" }}>Log In</Button>
                            </FormGroup>
                            <div hidden={!this.state.invalidPasswordOrUsername} className="invalid-feedback" style={{ display: "block" }}>Username or password are invalid</div>
                        </Form>
                    </Col>
                </Row>
                <Row></Row>

            </WithContainerLoading>
        )
    }
}

export default login
