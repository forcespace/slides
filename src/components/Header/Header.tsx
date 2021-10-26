import React from 'react';
import '../../style/block/header/header.css';
import '../../style/main.css';
import {Editor} from "../../script/slide/slide";
import {dispatch} from "../../dispatch";
import {setTitle} from "../../script/slide/functions";

export function Header(props: Editor)
{
    function onClick()
    {
        dispatch(setTitle, 'new title')
    }

    return (
        <header className={'b-header'}>
            <h1 className={'b-header__title'} onClick={() => }>
                {props.presentation.title}
            </h1>
        </header>
    );
}