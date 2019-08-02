import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Button} from 'antd';
import Form2 from './components/login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      registerclick: false,
      loginclick: false,
    }
  }

  handleclick = () => {
    this.setState({
      registerclick: !this.state.registerclick
    });
  }

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <Form2 />
        <a href="/forget"><Button> Recover Account </Button></a>
        <br/>
        <br />
        <a href="/register"><Button type="primary"> New User ? Register now </Button></a>
      </div>
    );
  }
}

export default App;