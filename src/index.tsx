import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Header} from "./header";
import {Workspace} from "./workspace";

ReactDOM.render(
    <React.StrictMode>
        <Header/>
        <Workspace/>
    </React.StrictMode>,
    document.getElementById('root')
);