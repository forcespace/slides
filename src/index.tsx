import React from 'react';
import ReactDOM from 'react-dom';

import {App} from "./App";

import './index.css';
import {getEditor} from "./script/slide/editor-new";

ReactDOM.render(
    <React.StrictMode>
        <App editor={getEditor()}/>
    </React.StrictMode>,
    document.getElementById('root')
);