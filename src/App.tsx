import React from 'react';
import {Header} from './components/Header';
import {Workspace} from './components/Workspace';
import {Footer} from './components/Footer';
import {Editor} from './script/slide/slide';
import {Nav} from './components/Navigation';
import './App.css';

export function App(props: {editor: Editor})
{
    return (
        <div className={'presentation'}>
            <Header {...props.editor} />
            <Nav/>
            <Workspace {...props.editor} />
            <Footer {...props.editor} />
        </div>
    );
}