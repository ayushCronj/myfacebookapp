import React, { Component } from 'react';
import './login.css';
import { Button, Input, Form, DatePicker, Icon, Menu } from 'antd';
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import { Layout } from 'antd';

const { Header, Content } = Layout;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            register: false,
            email: null,
            servererror: false,
            incorrect: false,
            home: false,
            login: false,
            redirecthome1: false,
        };
    }

    componentDidMount = () => {
        if (sessionStorage.getItem("1") !== null) {
            this.setState({
                redirecthome1: true
            })
        }
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('user_password')) {
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

    passwordcheck = (rule, value, callback) => {
        var regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])')
        if (!regex.test(value) && value.length > 0) {
            callback("Password should have atleast 1 uppercase, 1 lowercase and 1 digit")
        }
        else {
            callback()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // && this.state.incorrectuser === false
        this.props.form.validateFields((err, values) => {
            if (!err ) {
                values.dob = moment(values.dob).format("YYYY-MM-DD")
                fetch('http://localhost:3002/api/users/register', {
                    method: 'POST',
                    headers: {
                        // 'Authorization': 'bearer ' + sessionStorage.getItem(values.user_email),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        values
                    })
                }).then(response => {
                    if (response.status === 200) {
                        response.text().then(result => {
                            if (result === "Added") {
                                this.setState({
                                    register: true,
                                    email: values.user_email,
                                    incorrect: false,
                                    servererror: false
                                });
                            }
                            else if (result === "Email Already exists") {
                                this.setState({
                                    incorrect: true,
                                    servererror: false
                                })
                            }
                        })
                    }
                    else if (response.status === 500) {
                        this.setState({
                            servererror: true,
                            incorrect: false
                        })
                    }
                }).catch(err => {
                    this.setState({
                        servererror: true,
                        incorrect: false
                    })
                })
            }
        });
    }

    onChange = (e) => {
        this.setState({
            incorrect: false,
            servererror: false,
            incorrectuser: false,
        })
    }

    handleclick = () => {
        this.setState({
            home: true
        })
    }

    loginclicked = () => {
        this.setState({
            login: true
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.register) {
            return <Redirect to={{ pathname: '/otpverify', state: { email: this.state.email } }} />
        }
        if (this.state.home) {
            return <Redirect to='/' />
        }
        if (this.state.redirecthome1) {
            return <Redirect to='/home' />
        }
        if (this.state.login) {
            return <Redirect to='/main' />
        }

        function disabledDate(current) {
            return current && current.valueOf() >= Date.now();
        }

        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item> <Icon type="facebook" onClick={this.handleclick} style={{ fontSize: "50px", color: "blue" }} /></Menu.Item>
                            <Menu.Item ><Icon type="login" onClick={this.loginclicked} style={{ fontSize: "50px", color: "blue" }} /></Menu.Item>
                        </Menu>
                    </Header>

                    <Content style={{ backgroundColor: "white" }}>
                        <div id="mydiv3">
                            <br />
                            <br />
                            <div id="mydiv2">
                                <h2 style={{ color: "blue" }}> <u> Create Your Account </u></h2>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Item label="E-mail">
                                        {getFieldDecorator('user_email', {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ],
                                        })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            onChange={this.onChange} placeholder="Email" />)}

                                    </Form.Item>

                                    <Form.Item label="Password" hasFeedback>
                                        {getFieldDecorator('user_password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                                {
                                                    validator: this.passwordcheck
                                                },
                                                {
                                                    min: 8,
                                                    message: "Password should be atleast 8 characters long",
                                                }
                                            ],
                                        })(<Input.Password placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
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
                                            onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />)}
                                    </Form.Item>
                                    <Form.Item label="First Name">
                                        {getFieldDecorator('first_name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your firstname',
                                                },
                                            ],
                                        })(<Input placeholder="Enter First Name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                                    </Form.Item>
                                    <Form.Item label="Last Name">
                                        {getFieldDecorator('last_name', {
                                        })(<Input placeholder="Enter Last Name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                                    </Form.Item>
                                    <Form.Item label="DOB">
                                        {getFieldDecorator('dob', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your Date of Birth!',
                                                },
                                            ],
                                        })(<DatePicker disabledDate={disabledDate}
                                            placeholder="Select DOB" format="YYYY-MM-DD" />)}
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit">
                                            <Icon type="save"></Icon> Register
                                        </Button>
                                        {/* {this.state.incorrect ? <div className="error"> E-mail Already Exists..!! </div> : null} */}
                                        {this.state.servererror ? <div className="error"> Servers are down..!! </div> : null}
                                        <div className="error" style={this.state.incorrect ? { display: "block" } : { display: "none" }}> E-mail Already Exists..!! </div>
                                    </Form.Item>
                                    {/* <Form.Item >
                                        Already a User? <Button onClick={this.loginclicked} type="primary"><Icon type="login"></Icon> Login</Button>
                                    </Form.Item> */}
                                </Form>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Form.create()(Register);