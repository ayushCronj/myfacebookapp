import React, { Component } from 'react';
import '../App.css';
import './login.css';
import { Button, Input, Form, Icon, Menu } from 'antd';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content } = Layout;


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectotp: false,
            redirecthome: false,
            servererror: false,
            emailnot: false,
            incorrect: false,
            email: null,
            back: false,
            forget: false,
            register: false,
            token: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3002/api/users/login/' + values.email + '/' + values.password)
                    .then(response => {
                        if (response.status === 200) {
                            response.json().then(result => {
                                if (result.message === "redirect OTP") {
                                    this.setState({
                                        redirectotp: true,
                                        redirecthome: false,
                                        servererror: false,
                                        emailnot: false,
                                        incorrect: false,
                                        email: values.email
                                    });
                                }
                                else if (result.message === "Redirect Home") {
                                    this.setState({
                                        redirectotp: false,
                                        redirecthome: true,
                                        servererror: false,
                                        emailnot: false,
                                        incorrect: false,
                                        email: values.email,
                                        token: result.token
                                    })
                                }
                            })
                            // console.log(response.json().then((result)=> console.log(result.message)));
                        }
                        else if (response.status === 404) {
                            response.text().then(result => {
                                if (result === "Email does not exist..!!") {
                                    this.setState({
                                        redirectotp: false,
                                        redirecthome: false,
                                        servererror: false,
                                        emailnot: true,
                                        incorrect: false
                                    });
                                }
                                else if (result === "Email and Password does not match") {
                                    this.setState({
                                        redirectotp: false,
                                        redirecthome: false,
                                        servererror: false,
                                        emailnot: false,
                                        incorrect: true
                                    })
                                }
                            })
                        }
                        else if (response.status === 500) {
                            this.setState({
                                redirectotp: false,
                                redirecthome: false,
                                servererror: true,
                                emailnot: false,
                                incorrect: false
                            })
                        }
                    }).catch(err => {
                        this.setState({
                            redirectotp: false,
                            redirecthome: false,
                            servererror: true,
                            emailnot: false,
                            incorrect: false
                        })
                    })
            }
        });
    }

    handleclick = () => {
        this.setState({
            back: true
        })
    }

    onchange = () => {
        this.setState({
            servererror: false,
            incorrect: false,
            emailnot: false,
        })
    }

    loginclicked = () => {
        this.setState({
            forget: true, 
        })
    }

    registerclicked = () => {
        this.setState({
            register: true, 
        })
    }

    render() {
        if (this.state.redirecthome) {
            sessionStorage.setItem(this.state.email , this.state.token)
            return <Redirect to='/home' />
        }
        if (this.state.redirectotp) {
            return <Redirect to={{ pathname: '/otpverify', state: { email: this.state.email } }} />
        }
        if (this.state.back) {
            return <Redirect to='/' />
        }
        if (this.state.forget) {
            return <Redirect to='/forget' />
        }
        if (this.state.register) {
            return <Redirect to='/register' />
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item> <Icon type="facebook" onClick={this.handleclick} style={{ fontSize: "60px", color: "blue" }} /></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ backgroundColor: "white", textAlign: "center" }}>

                    <div id="mydiv">
                        {/* <div className="error" style= {this.state.incorrect ?{display:"block"}:{display:"none"}}> Incorrect Credentials </div> */}
                        {/* {this.state.incorrect ? <div className="error"> Incorrect Credentials..!! </div> : <div className="success"> Login Form </div>}
                        {this.state.emailnot ? <div className="error"> Email does not exist..!! </div> : null}
                        {this.state.servererror ? <div className="error"> Our servers are not responding. We will be back soon. </div> : null} */}
                        {this.state.incorrect ? <div className="error"> Incorrect Credentials..!! </div> :
                            this.state.emailnot ? <div className="error"> Email does not exist..!! </div> :
                                this.state.servererror ? <div className="error"> Servers are Down..!! </div> :
                                    <div className="success"> Login Form </div>}
                        <Form onSubmit={this.handleSubmit} >
                            <br />
                            <Form.Item label="E-mail" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail',
                                        },
                                        {
                                            type: 'email',
                                            message: "The email entered is not valid"
                                        }
                                    ],
                                })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email" onChange={this.onchange}
                                />)}
                            </Form.Item>
                            <Form.Item label="Password">
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onchange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item >
                                {/* <a href="/forget">
                                    Forgot password
                                </a>  */}
                                <button onClick={this.loginclicked} className="button"> <u>Forgot password</u> </button>
                                <br />
                                <Button type="primary" htmlType="submit" >
                                    <Icon type="login"></Icon>  Log in
                                </Button>
                                <br />
                                Or <button onClick={this.registerclicked} className="button"><u> Register Now..!! </u></button> 
                                {/* <a href="/register">Register now..!!</a> */}
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Form.create()(Login);