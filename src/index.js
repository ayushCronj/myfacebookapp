import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './routes/Routes'
import { render } from "react-dom";
import store from "./store/store";


render(<Root store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
