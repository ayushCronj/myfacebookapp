import React, { Component } from 'react';
import './login.css';
import { Icon, Card } from 'antd';
// import { Redirect } from 'react-router-dom';
// const { Content, Header } = Layout;


class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
        }
    }

    toggleLiked = () => {
        fetch('http://localhost:3002/api/posts/like/' + this.props.post.post_id + '/' + !this.state.liked).then(response => {
            if (response.status === 200) {
                this.setState({
                    liked: !this.state.liked
                })
            }
        })

    }

    render() {
        let timestamp = this.props.post.timestamp;
        var d = new Date(timestamp);
        //console.log(d);
        let time = d.getHours() + ":" + d.getMinutes()+ ":" +  d.getSeconds()
        let date = d.toLocaleDateString('en-GB');

        return (
            <Card
                size="small"
                style={{ margin: 20, backgroundColor: "#e2dcdc", border: "2px black dashed", borderRadius: "10px" }}
            >
                {this.props.post.user_name} updated their status on {date} at {time}
                <hr />
                <div className="content">
                    <h4>
                        {this.props.post.post_content}
                    </h4>
                </div>
                <hr />
                <div id="option">

                    <Icon onClick={this.toggleLiked} type="like" style={{ color: 'blue', fontSize: "25px" }} theme={this.state.liked ? 'filled' : 'outlined'} />
        {this.state.liked ?<p> {this.props.post.likes !== 0 ? <p>You and {this.props.post.likes} people have liked this post</p> :<p> You liked this post </p> }</p>: <p> {this.props.post.likes} people have liked this post </p>}
                </div>

            </Card>
        );
    }
}

export default Posts;