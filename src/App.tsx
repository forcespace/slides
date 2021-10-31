import React from 'react';
import {Header} from "./components/Header";
import {Workspace} from "./components/Workspace";
import {Footer} from "./components/Footer";
import {Editor} from "./script/slide/slide"
import {Nav} from "./components/nav";

export function App(props: {editor: Editor})
{
    return (
        <div className={'b-presentation'}>
            <Header {...props.editor} />
            <Nav {...props.editor}/>
            <Workspace {...props.editor} />
            <Footer {...props.editor} />
        </div>
    );
}