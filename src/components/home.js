import React, { Component } from 'react';
import './login.css';
import { Button, Icon, Layout, Menu, Form, Input, Avatar, Modal } from 'antd'
import { Redirect } from 'react-router-dom';
import Posts from './posts'
const { Content, Sider } = Layout;
const { Search } = Input;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            home: false,
            redirect: false,
            visible: false,
            visible2: false,
            liked: false,
            confirmDirty: false,
            email: null,
            servererror: false,
            incorrect: false,
            changepass: false,
            profile: false,
            friend: false,
            content: null,
            posts: null
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    handleOk2 = (e) => {
        this.setState({
            visible2: false,
            servererror: false,
            incorrect: false,
            changepass: false
        })
    }

    handleOk = (e) => {
        var obj = JSON.parse(sessionStorage["1"]);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3002/api/profile/changepass/' + obj.email + '/' + values.old_password + '/' + values.user_password, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'bearer ' + obj.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(result => {
                            this.setState({
                                changepass: true,
                                incorrect: false,
                                servererror: false
                            });
                        })
                    }
                    else if (response.status === 500) {
                        this.setState({
                            servererror: true,
                            incorrect: false,
                            changepass: false,
                        })
                    }
                    else if (response.status === 404) {
                        this.setState({
                            servererror: false,
                            incorrect: true,
                            changepass: false,
                        })
                    }
                }).catch(err => {
                    this.setState({
                        servererror: true,
                        incorrect: false,
                        changepass: false,
                    })
                })
            }
        });
        this.props.form.resetFields();
        this.setState({
            visible: false,
            visible2: true,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount = () => {
        // console.log("hi");
        // this.render()
        // console.log("hello");
        var obj = JSON.parse(sessionStorage["1"]);

        fetch('http://localhost:3002/api/profile/home',
            {

                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + obj.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.status === 401) {
                    this.setState({
                        login: true,
                    })
                }
                else {
                    response.json().then((result) => {
                        var obj = JSON.parse(sessionStorage["1"]);
                        this.setState({
                            email: obj.email,
                            posts: result
                        })
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    componentDidUpdate(prevProps, prevState) {
        var obj = JSON.parse(sessionStorage["1"]);
        fetch('http://localhost:3002/api/profile/update',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + obj.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.status === 401) {
                    this.setState({
                        login: true,
                    })
                }
                else {
                    response.json().then((result) => {
                        if (prevState.posts === this.state.posts) {
                            this.setState({
                                posts: result
                            })
                        }
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
            liked: !this.state.liked
        })
    }

    handleclick1 = () => {
        this.setState({
            home: true,
        })
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

    profileclicked = () => {
        this.setState({
            profile: true,
        })
    }

    friendclicked = () => {
        this.setState({
            friend: true,
        })
    }

    handleSubmitpost = (e) => {
        // e.preventDefault();
        let cont = e.target.elements.content.value
        var obj = JSON.parse(sessionStorage["1"]);
        if (e.target.elements.content.value.length >= 1) {
            fetch('http://localhost:3002/api/posts/add/' + e.target.elements.content.value, {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + obj.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        content: cont
                    })
                }
            })
        }
        else {
            this.setState({
                content: null
            })
        }

    }
    render() {
        // console.log("hi dsnkqnsnkk");
        const { getFieldDecorator } = this.props.form;
        if (this.state.login) {
            return <Redirect to='/main' />
        }
        if (this.state.home) {
            return <Redirect to='/' />
        }
        if (this.state.profile) {
            return <Redirect to='/profile' />
        }
        if (this.state.friend) {
            return <Redirect to='/friendlist' />
        }
        if (this.state.posts !== null) {
            var posts = this.state.posts
            posts.sort(function (a, b) {
                return new Date(a.timestamp) - new Date(b.timestamp);
            });
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
                                        <Avatar style={{ backgroundColor: "blue" }} icon="user" />View Profile</Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                    </Menu.Item>

                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.friendclicked} > <Button style={{ width: "12vw" }} type="primary"> View Friends </Button> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> <Button style={{ width: "12vw" }} onClick={this.showModal} type="primary"> Change Password </Button></Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }}> </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: "black" }} onClick={this.handleclick} ><Icon style={{ fontSize: "30px", color: "blue" }} type="logout" />
                                        <span className="text-nav">Logout </span></Menu.Item>
                                </Menu>
                            </div>
                        </Sider>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div id="mydiv3">
                                {/* //hgch */}
                                <h2>Welcome To Home Page..!!! </h2>
                                <br />
                                <h3>What's on your mind today..?? </h3>
                                <form onSubmit={this.handleSubmitpost}>
                                    <input type="textarea" id="content" style={{
                                        border: "1px solid #d9d9d9", borderRadius: "8px",
                                        width: "100%", height: "70px", padding: "4px 11px", backgroundColor: "white",
                                    }}
                                        placeholder="Write Your Thoughts..." />
                                    <br />
                                    <br />
                                    <button style={{ backgroundColor: "#1890ff", color: "white", borderColor: "#1890ff", borderRadius: "4px", alignContent: "center" }} type="submit">
                                        Add Post
                                </button>
                                </form>


                                {this.state.posts !== null ? <div id="main">
                                    {posts.reverse().map((post, index) => (
                                        <div className="inside" key={index} style={{ position: "relative" }}>
                                            <Posts post={post} index={index} />
                                        </div>
                                    ))}
                                </div>
                                    : null}


                            </div>
                        </Content>
                    </Layout>
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
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Old Password!',
                                    },
                                ],
                            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Old Password" />)}

                        </Form.Item>

                        <Form.Item label="New Password" hasFeedback>
                            {getFieldDecorator('user_password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your New password!',
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
                            })(<Input.Password placeholder="New Password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                        </Form.Item>
                        <Form.Item label="Confirm New Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onBlur={this.handleConfirmBlur} placeholder="Confirm New Password" />)}
                        </Form.Item>
                    </Form>
                </Modal>


                <Modal
                    title="Change Password"
                    visible={this.state.visible2}
                    footer={[
                        <Button
                            key="Ok"
                            type="primary"
                            onClick={this.handleOk2}>
                            Ok
                        </Button>
                    ]}>
                    {this.state.incorrect ? <div className="error"> Incorrect Password..!! Please Try Again..!! </div> :
                        this.state.servererror ? <div className="error"> Server error.!! </div> :
                            this.state.changepass ? <div className="success"> Password Changed Successfully </div> : <div className="error"> Nothing Happened..!! </div>}
                </Modal>
            </div >

        );
    }
}

export default Form.create()(Home);