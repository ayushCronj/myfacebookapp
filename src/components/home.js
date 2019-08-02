import React, { Component } from 'react';
import '../App.css';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false
        }
    }

    render() {
        return (
            <div style={{ marginLeft: "20rem", marginRight: "20rem" }}>
                Hello
            </div>
        );
    }
}

export default Home;