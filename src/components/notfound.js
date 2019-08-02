import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
    <div style={{ textAlign: "center" }}>
        <br />
        <br />
        <h2>This page does not exist </h2>
        <br />
        <br />
    <center><Link to="/">Return to Home Page</Link></center>
    </div >
);
export default NotFound;