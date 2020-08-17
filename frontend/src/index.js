import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store'
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
