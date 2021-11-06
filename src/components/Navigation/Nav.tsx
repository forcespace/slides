import React from 'react';
import {Editor} from "../../script/slide/slide";
import {dispatch, dispatchWithoutParam} from "../../dispatch";
import {createEditor, addEmptySlide, deleteSlide, addObject} from "../../script/slide/functions";
import '../../style/block/nav/nav.css';
import '../../style/main.css';

const TABS = {
    MAIN: "main",
    PASTE: "paste"
}

export function Nav()
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
        dispatch(addObject, {objectType: 'Rect'})
    }

    const [active, setActive] = React.useState(TABS.MAIN);

    return (
        <nav className={'nav'}>
            <ul className={'nav__list'}>
                <li className={'nav__list-item'} onClick={() => setActive(TABS.MAIN)}>
                    Главная
                    <ul className={`nav__list_hidden${active === TABS.MAIN ? "" : "  hidden"}`}>
                        <li className={'nav__list-item_hidden'}>
                            <button className={'nav__button nav__button_new-presentation'} onClick={handleNewPresentationClick}>
                                New Presentation
                            </button>
                        </li>
                        <li className={'nav__list-item_hidden'}>
                            <button className={'nav__button nav__button_add-slide'} onClick={handleAddNewSlideClick}>
                                +1 slide
                            </button>
                        </li>
                        <li className={'nav__list-item_hidden'}>
                            <button className={'nav__button nav__button_remove-slide'} onClick={handleRemoveSlideClick}>
                                -1 slide
                            </button>
                        </li>
                    </ul>
                </li>
                <li className={'nav__list-item'} onClick={() => setActive(TABS.PASTE)}>
                    Вставка
                    <ul className={`nav__list_hidden${active === TABS.PASTE ? "" : "  hidden"}`}>
                        <li className={'nav__list-item_hidden'}>
                            <button className={'nav__button nav__button_add'} onClick={handleAddRectClick}>
                                add Rect
                            </button>
                        </li>
                    </ul>
                </li>
                <li className={'nav__list-item'}>
                    Вид
                </li>
            </ul>
        </nav>
    );
}