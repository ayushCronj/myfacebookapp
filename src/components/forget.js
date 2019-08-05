import React, { Component } from 'react';
import './login.css';
import { Button, Input, Form, Icon, Menu } from 'antd';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Content } = Layout;

class Forget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonclicked: false,
            verifiedclick: false,
            redirect: false,
            confirmDirty: false,
            email: null,
            login: false,
            incorrect: false,
            servererror: false,
            incorrectotp: false,
            home: false,
            register: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(sessionStorage.getItem(values.email));
                fetch('http://localhost:3002/api/users/forgetpass/' + values.email ,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'bearer ' + sessionStorage.getItem(values.email),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                        if (response.status === 200) {
                            response.text().then((result) => {
                                if (result === "Redirect Change") {
                                    this.setState({
                                        // verifiedclick: true,
                                        buttonclicked: true,
                                        email: values.email,
                                        incorrect: false,
                                        servererror: false,
                                        incorrectotp: false,
                                    });
                                }
                                else if (result === "Redirect Register") {
                                    this.setState({
                                        register: true,
                                        email: values.email
                                    })
                                }

                            })

                            //     if (result === "Redirect Change") {
                            //         this.setState({
                            //             verifiedclick: true,
                            //             buttonclicked: false,
                            //             incorrect: false,
                            //             servererror: false,
                            //             incorrectotp: false,
                            //         });
                            //     }
                            //     else if (result === "Redirect Register") {
                            //         this.setState({ register: true })
                            //     }
                            // })
                            // response.json()
                            //     .then(result => {
                            //         this.setState({
                            //             buttonclicked: true,
                            //             email: values.email,
                            //             incorrect: false,
                            //             servererror: false,
                            //             incorrectotp: false,
                            //         });
                            //     })
                        }
                        else if (response.status === 404) {
                            this.setState({
                                incorrect: true,
                                servererror: false,
                                incorrectotp: false,
                            })
                        }
                        else if (response.status === 500) {
                            this.setState({
                                servererror: true,
                                incorrect: false,
                                incorrectotp: false,
                            })
                        }
                    }).catch(err => {
                        this.setState({
                            servererror: true,
                            incorrect: false,
                            incorrectotp: false,
                        })
                    })
            }
        })
    };

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3002/api/users/forgetotp/' + this.state.email + '/' + values.otp)
                    .then(response => {
                        if (response.status === 200) {
                            response.json()
                                .then(result => {
                                    this.setState({
                                        verifiedclick: true,
                                        buttonclicked: false,
                                        incorrect: false,
                                        servererror: false,
                                        incorrectotp: false,
                                    });
                                })
                        }
                        else if (response.status === 404) {
                            this.setState({
                                incorrect: false,
                                servererror: false,
                                incorrectotp: true,
                            })
                        }
                        else if (response.status === 500) {
                            this.setState({
                                servererror: true,
                                incorrect: false,
                                incorrectotp: false,
                            })
                        }
                    }).catch(err => {
                        this.setState({
                            servererror: true,
                            incorrect: false,
                            incorrectotp: false,
                        })
                    })
            }
        })
    };

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3002/api/users/changepass/' + this.state.email + '/' + values.password)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({
                            verifiedclick: true,
                            buttonclicked: false,
                            login: true,
                            servererror: false,
                            incorrect: false,
                            incorrectotp: false
                        });
                    }).catch(err => {
                        this.setState({
                            servererror: true,
                            incorrect: false,
                            incorrectotp: false,
                        })
                    })
            }
        });
    };

    handleclick = () => {
        this.setState({
            redirect: true
        });
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you entered are not same!!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleclick1 = () => {
        this.setState({
            home: true
        })
    }

    onchange = (e) => {
        this.setState({
            incorrectotp: false,
            servererror: false,
        })
    }

    onchange2 = (e) => {
        this.setState({
            incorrect: false,
            servererror: false,
        })
    }

    passwordcheck = (rule, value, callback) => {
        var regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])')
        if (!regex.test(value) && value.length > 0) {
            callback("Password should have atleast 1 uppercase, 1 lowercase and 1 digit ")
        }
        else{
            callback()
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/main' />
        }
        if (this.state.home) {
            return <Redirect to='/' />
        }
        if (this.state.register) {
            return <Redirect to={{ pathname: '/otpverify', state: { email: this.state.email } }} />
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
                        <Menu.Item> <Icon type="facebook" onClick={this.handleclick1} style={{ fontSize: "60px", color: "blue" }} /></Menu.Item>
                        <Menu.Item ><Icon type="login" onClick={this.handleclick} style={{ fontSize: "60px", color: "blue" }} /></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ backgroundColor: "white" }}>
                    <div id="mydiv">
                        <br />
                        {this.state.buttonclicked === false && this.state.verifiedclick === false ?
                            <div>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item label="E-mail">
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail',
                                                },
                                            ],
                                        })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email" onChange={this.onchange2} />)}
                                    </Form.Item>

                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            Send OTP
                                        </Button>
                                        <div> {this.state.incorrect ? <div className="error">Email Not Found..!! </div> : null}</div>
                                    </Form.Item>
                                </Form> </div> : null}

                        {this.state.buttonclicked === true ?
                            <Form onSubmit={this.handleSubmit1}>
                                <Form.Item label="OTP">
                                    {getFieldDecorator('otp', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the OTP',
                                            },
                                        ],
                                    })(<Input onChange={this.onchange} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter Received OTP" />)}
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Verify Account
                            </Button>
                                    <div> {this.state.incorrectotp ? <div className="error">OTP does not match..!! </div> : null}</div>
                                </Form.Item>
                            </Form> : null}

                        {this.state.buttonclicked === false && this.state.verifiedclick === true && this.state.login === false ?
                            <Form onSubmit={this.handleSubmit2}>
                                <Form.Item label="Password" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                            {
                                                validator: this.passwordcheck,
                                            },
                                            {
                                                min: 8,
                                                message: "Password should be atleast 8 characters long",
                                            }
                                        ],
                                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter New Password" />)}
                                </Form.Item>
                                <Form.Item label="Confirm Password" hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            },
                                            // {
                                            //     min: 8,
                                            //     message: "Password should be atleast 8 characters long",
                                            // }
                                        ],
                                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        onBlur={this.handleConfirmBlur} placeholder="Confirm New Password" />)}
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Change Password
                            </Button>
                                </Form.Item>
                            </Form> : null}
                        {this.state.servererror ? <div className="error">Our servers are not working..!! We will be Back Soon..!! </div> : null}
                        {/* <Button onClick={this.handleclick} type="primary"> Go Back to Login </Button> */}
                        {this.state.login ? <div className="success">Password Resetted Successfully. Please login again
                       <br /> <br /><Button type="primary" onClick={this.handleclick1}>
                                <Icon type="login"></Icon> Login
                            </Button>  </div> : null}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Form.create()(Forget);