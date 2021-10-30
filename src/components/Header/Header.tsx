import React from 'react';
import '../../style/block/header/header.css';
import '../../style/main.css';
import {Editor} from "../../script/slide/slide";
import {dispatch, dispatchWithoutParam} from "../../dispatch";
import {setTitle, createEditor, addEmptySlide, deleteSlide} from "../../script/slide/functions";

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

    function handleAddNewSlideClick() {
        dispatchWithoutParam(addEmptySlide)
    }

    function handleRemoveSlideClick() {
        dispatchWithoutParam(deleteSlide)
    }

    function handleNewPresentationClick() {
        dispatchWithoutParam(createEditor)
    }

    function handleAddRectClick() {
        dispatchWithoutParam(createEditor)
    }

    return (
        <header className={'b-header'}>
            <h1 className={'b-header__title'} onClick={handleTitleClick}>
                {title}
            </h1>
            <nav>
                <button onClick={handleNewPresentationClick}>
                    New Presentation
                </button>
                <button onClick={handleAddNewSlideClick}>
                    +1 slide
                </button>
                <button onClick={handleRemoveSlideClick}>
                    -1 slide
                </button>
                <button onClick={handleAddRectClick}>
                    add Rect
                </button>
            </nav>
        </header>
    );
}