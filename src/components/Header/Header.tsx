import React from 'react';
import '../../style/block/header/header.css';
import '../../style/main.css';
import {Editor} from "../../script/slide/slide";

export function Header(props: Editor)
{
    return (
        <header className={'b-header'}>
            <h1 className={'b-header__title'}>
                {props.presentation.title}
            </h1>
        </header>
    );
}