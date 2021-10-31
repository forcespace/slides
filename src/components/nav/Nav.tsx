import React from 'react';
import {Editor} from "../../script/slide/slide";
import {dispatchWithoutParam} from "../../dispatch";
import {createEditor, addEmptySlide, deleteSlide} from "../../script/slide/functions";
import '../../style/block/nav/nav.css';
import '../../style/main.css';

export function Nav(props: Editor)
{

    function handleAddNewSlideClick()
    {
        dispatchWithoutParam(addEmptySlide)
    }

    function handleRemoveSlideClick()
    {
        dispatchWithoutParam(deleteSlide)
    }

    function handleNewPresentationClick()
    {
        dispatchWithoutParam(createEditor)
    }

    function handleAddRectClick()
    {
        dispatchWithoutParam(createEditor)
    }

    return (
        <nav className={'nav'}>
            <ul className={'nav__list'}>
                <li className={'nav__list-item'}>
                    Главная
                </li>
                <li className={'nav__list-item'}>
                    Вставка
                </li>
                <li className={'nav__list-item'}>
                    Вид
                </li>
            </ul>
            <button className={'nav__button nav__button_new-presentation'} onClick={handleNewPresentationClick}>
                New Presentation
            </button>
            <button className={'nav__button nav__button_add-slide'} onClick={handleAddNewSlideClick}>
                +1 slide
            </button>
            <button className={'nav__button nav__button_remove-slide'} onClick={handleRemoveSlideClick}>
                -1 slide
            </button>
            <button className={'nav__button nav__button_new-presentation'} onClick={handleAddRectClick}>
                add Rect
            </button>
        </nav>
    );
}