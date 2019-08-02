import React, { Component } from 'react';
import { Button, Input, Form, Layout, Icon, Menu } from 'antd';
import { Redirect } from 'react-router-dom';
import './login.css'
const { Header, Content } = Layout;


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            redirect: false,
            email: this.props.location.state,
            home: false,
        }
    }

    componentDidMount = () => {
        if (this.props.location.state === undefined) {
            this.setState({
                redirect: true,
                incorrectotp: false,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3002/api/users/verify/' + values.otp + '/' + this.props.location.state.email)
                    .then(response => {
                        if (response.status === 200) {
                            response.json()
                                .then(result => {
                                    this.setState({
                                        login: true,
                                        incorrectotp: false,
                                        servererror: false,
                                    });
                                })
                        }
                        else if (response.status === 404) {
                            this.setState({
                                servererror: false,
                                incorrectotp: true,
                            })
                        }
                        else if (response.status === 500) {
                            this.setState({
                                servererror: true,
                                incorrectotp: false,
                            })
                        }
                    }).catch(err => {
                        this.setState({
                            servererror: true,
                            incorrectotp: false,
                        })
                    })
            }
        })
    };

    onChange = (e) => {
        this.setState({
            incorrectotp: false,
            servererror: false,
        })
    }

    handleclick = () => {
        this.setState({
            home: true
        })
    }

    render() {
        if (this.state.login) {
            return <Redirect to='/home' />
        }
        if (this.state.redirect) {
            return <Redirect to='/register' />
        }
        if (this.state.home) {
            return <Redirect to='/' />
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout id="mydiv3">
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
                <Content style={{ backgroundColor: "white" }}>
                    <div id="mydiv">
                        <div className="success"> Complete Your Registration..!! </div>
                        <br />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="OTP">
                                {getFieldDecorator('otp', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input OTP',
                                        },
                                    ],
                                })(<Input prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={this.onchange} placeholder="Enter Received OTP" />)}
                            </Form.Item>

                            <Form.Item >

                                <Button type="primary" htmlType="submit">
                                    Verify
                                </Button>
                                {this.state.incorrectotp ? <div className="error"> InCorrect OTP Entered..!! </div> : null}
                                {this.state.servererror ? <div className="error"> Servers are down..!! </div> : null}
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Form.create()(Login);