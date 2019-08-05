import React, { Component } from 'react';
import './login.css';
import { Button, Icon, Layout, Menu, Form, Input, Avatar, Modal , Card} from 'antd'
import { Redirect } from 'react-router-dom';
const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            home: false,
            redirect: false,
            visible: false,
            liked: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount = () => {
        fetch('http://localhost:3002/api/profile/home',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + sessionStorage.getItem("1"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                // console.log(response.status);
                if (response.status === 401) {
                    this.setState({
                        login: true,
                    })
                }
                else {
                    response.text().then((result) => {
                        // console.log(result);
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    handleclick = () => {
        sessionStorage.removeItem("1");
        this.setState({
            login: true,
        })
    }

    toggleLiked = () => {
        this.setState({
            liked : !this.state.liked
        })
    }

    handleclick1 = () => {
        this.setState({
            home: true,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.login) {
            return <Redirect to='/main' />
        }
        if (this.state.home) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Layout>
                    {/* <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item> <Icon type="facebook" onClick={this.handleclick1} style={{ fontSize: "60px", color: "blue" }} /></Menu.Item>
                        <Menu.Item> <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                        </Menu.Item>
                        <Menu.Item>
                            <Avatar style={{ backgroundColor: "blue" }} icon="user" />Name</Menu.Item>
                        <Menu.Item> </Menu.Item>
                        <Menu.Item> </Menu.Item>
                        <Menu.Item> </Menu.Item>
                        <Menu.Item> </Menu.Item>
                        <Menu.Item> <Button type="primary"> Change Password </Button></Menu.Item>
                        <Menu.Item ><Icon type="logout" onClick={this.handleclick} style={{ fontSize: "60px", color: "blue" }} /></Menu.Item>
                    </Menu>
                </Header> */}
                    {/* <Header className="myflex">
                    <div>
                        <Icon type="facebook" onClick={this.handleclick1} style={{ fontSize: "60px", color: "blue" }} />
                    </div><div>
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </div><div>

                        <Avatar style={{ backgroundColor: "blue" }} icon="user" />
                    </div><div>
                        <Button onClick={this.showModal} type="primary"> Change Password </Button>
                    </div>
                    <div>
                        <Icon type="logout" onClick={this.handleclick} style={{ fontSize: "60px", color: "blue" }} />
                    </div>
                </Header> */}
                    {/* <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >  */}
                    <Layout>
                        <Sider style={{ background: "black" }}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                style={{ background: "black" }}
                            >     <Menu.Item style={{ backgroundColor: "black" }} onClick={this.handleclick1}> <Icon type="facebook" style={{ fontSize: "40px", color: "blue" }} />
                                </Menu.Item>
                            </Menu>
                        </Sider>

                        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                    </Layout>
                    <Layout>
                        <Sider
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                            style={{
                                height: '93vh',
                                background: "black"
                            }}
                        >
                            <div className="logo">
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    style={{ background: "black" }}
                                >
                                    {/* <Menu.Item style={{backgroundColor: "black"}} onClick={this.handleclick1}> <Icon type="facebook" style={{ fontSize: "30px", color: "blue" }} />

                                    <span className="nav-text"> Home </span></Menu.Item> */}
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}>
                                        <Avatar style={{ backgroundColor: "blue" }} icon="user" />View Profile</Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Button type="primary"> View Friends </Button> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Button className="button1" onClick={this.showModal} type="primary"> Change Password </Button></Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.handleclick} ><Icon style={{ fontSize: "30px", color: "blue" }} type="logout" />
                                        <span className="text-nav">Logout </span></Menu.Item>
                                </Menu>
                            </div>
                        </Sider>


                        <Content style={{ margin: '24px 16px 0' }}>
                            <div id="mydiv">
                                Welcome To Home Page..!!!
                                <Card
                                    style={{ margin: 20 }}
                                    cover={
                                        <div className="photo">
                                            Post1 Title
                                        </div>
                                    }
                                >

                                    <hr />
                                    <div style={{ opacity: 0.9 }} >
                                        <h4>Post1 Content</h4>
                                        <div>
                                        </div>
                                        <br />
                                        <hr />
                                        <br />
                                        <div id="main1">
            <Icon onClick={this.toggleLiked} type="like" style={{ color: 'blue', fontSize: "25px"  }} theme={this.state.liked ? 'filled' : 'outlined'} />
  </div>                                  </div>
                                </Card>
                            </div>
                        </Content>
                    </Layout>
                    {/* <Footer> This is Footer </Footer> */}
                </Layout>


                <Modal
                    title="Change Password"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Old Password">
                            {getFieldDecorator('old_password', {
                                // rules: [
                                //     {
                                //         type: 'email',
                                //         message: 'The input is not valid E-mail!',
                                //     },
                                //     {
                                //         required: true,
                                //         message: 'Please input your E-mail!',
                                //     },
                                // ],
                            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Old Password" />)}

                        </Form.Item>

                        <Form.Item label="New Password">
                            {getFieldDecorator('user_password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    // {
                                    //     validator: this.validateToNextPassword,
                                    // },
                                    // {
                                    //     validator: this.passwordcheck
                                    // },
                                    {
                                        min: 8,
                                        message: "Password should be atleast 8 characters long",
                                    }
                                ],
                            })(<Input.Password placeholder="New Password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                        </Form.Item>
                        <Form.Item label="Confirm New Password">
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    // {
                                    //     validator: this.compareToFirstPassword,
                                    // },
                                ],
                            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Confirm New Password" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

export default Form.create()(Home);