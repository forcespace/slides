import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Header} from "./header";
import {Workspace} from "./workspace";

ReactDOM.render(
    <React.StrictMode>
        <Header/>
    </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <React.StrictMode>
//         <Workspace/>
//     </React.StrictMode>,
//     document.getElementById('root')
// );
