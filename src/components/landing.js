import React, { Component } from 'react';
import './login.css';
import { Button, Layout, Icon , Menu} from 'antd';
import { Redirect } from 'react-router-dom';
const { Content, Header } = Layout;


class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            register: false,
            home: false,
        }
    }

    loginclicked = () => {
        this.setState({
            login: true
        })
    }

    registerclicked = () => {
        this.setState({
            register: true
        })
    }

    handleclick = () => {
        this.setState({
            login: false,
            register: false
        })
    }

    render() {
        if (this.state.login) {
            return <Redirect to='/main' />
        }
        if (this.state.register) {
            return <Redirect to='/register' />
        }

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
                    <div>
                        <div id="mydiv">
                            <h1> <b> <u>Welcome to MyFacebookApp </u></b></h1>
                            <br />
                            <br />
                            <h3 style={{ color: "blue" }}> <i>Already a user? </i>
                                <Button type="primary" onClick={this.loginclicked}>
                                    <Icon type="login"></Icon> Login
                            </Button> </h3>
                            <br />
                            <h3 style={{ color: "blue" }}> <i>New User? </i>
                                <Button type="primary" onClick={this.registerclicked}>
                                    <Icon type="save"></Icon> Register
                            </Button> </h3>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default (Landing);