import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import "./scss/style.scss"
import store from './js/store/index';
import App from "./js/App";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);