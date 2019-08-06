import React, { Component } from 'react';
import './login.css';
import { Button, Layout, Icon, Menu, Input, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';
const { Content, Sider } = Layout;
const { Search } = Input;


class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: false,
            login: false,
            profile: false,
        }
    }

    handleclick1 = () => {
        this.setState({
            home: true,
        })
    }

    handleclick = () => {
        sessionStorage.removeItem("1");
        this.setState({
            login: true,
        })
    }

    profileclicked = () => {
        this.setState({
            profile: true
        })
    }

    componentDidMount = () => {
            
    }

    render() {
        if (this.state.home) {
            return <Redirect to='/' />
        }
        if (this.state.login) {
            return <Redirect to='/main' />
        }
        if (this.state.profile) {
            return <Redirect to='/profile' />
        }
        return (
            <div>
                <Layout>
                    <Layout>
                        <Sider style={{ background: "black" }}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                style={{ background: "black" }} >
                            </Menu>
                        </Sider>
                    </Layout>
                    <Layout>
                        <Sider
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {

                            }}
                            onCollapse={(collapsed, type) => {

                            }}
                            style={{
                                height: '100vh',
                                background: "black",
                                position: "fixed"
                            }}
                        >
                            <div className="logo">
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    style={{ background: "black" }}
                                >
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.handleclick1}> <Icon type="facebook" style={{ fontSize: "40px", color: "blue" }} />
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.profileclicked}>
                                        <Avatar style={{ backgroundColor: "blue" }} icon="user" /><Button type="primary">View Profile</Button></Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.friendclicked} > <Button style={{ width: "12vw" }} type="primary"> View Friends </Button> </Menu.Item>
                                    {/* <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Button style={{ width: "12vw" }} onClick={this.showModal} type="primary"> Change Password </Button></Menu.Item> */}
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.handleclick} ><Icon style={{ fontSize: "30px", color: "blue" }} type="logout" />
                                        <span className="text-nav">Logout </span></Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div id="mydiv3">
                                <h2>Friends Page </h2>
                            </div>
                        </Content >
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Friend;