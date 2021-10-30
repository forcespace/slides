import React from 'react';
import '../../style/block/header/header.css';
import '../../style/main.css';
import {Editor} from "../../script/slide/slide";
import {dispatch} from "../../dispatch";
import {addEmptySlide, setTitle} from "../../script/slide/functions";

export function Header(props: Editor)
{
    const {title} = props.presentation;

    function handleTitleClick()
    {
        const newTitle = window.prompt('new title', title);

        if(newTitle)
        {
            dispatch(setTitle, newTitle)
        }
    }

    function handleAddNewSlideClick()
    {
        dispatch(addEmptySlide, {})
    }

    return (
        <header className={'b-header'}>
            <h1 className={'b-header__title'} onClick={handleTitleClick}>
                {title}
            </h1>
            <nav>
                <button onClick={handleAddNewSlideClick}>
                    +1 slide
                </button>
            </nav>
        </header>
    );
}