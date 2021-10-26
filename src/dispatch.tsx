import {Editor} from "./script/slide/slide";
import {getEditor, setEditor} from "./script/slide/editor-new";
import ReactDOM from "react-dom";
import React from "react";
import {App} from "./App";

export function dispatch(modifyFn: Function, payload: Object)
{
    const newState: Editor = modifyFn(getEditor(), payload);
    setEditor(newState);

    ReactDOM.render(
        <React.StrictMode>
            <App editor={newState}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}