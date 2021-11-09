import React from 'react';
import {dispatch, dispatchWithoutParam} from "../../dispatch";
import {createEditor, addEmptySlide, deleteSlide, addObject, moveSlideTopByStep, moveSlideDownByStep} from "../../script/slide/functions";
import '../../style/block/nav/nav.css';
import '../../style/main.css';

const TABS = {
    MAIN: 'main',
    EDIT: 'edit',
    PASTE: 'paste',
    SETTINGS: 'settings'
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

    function handleMoveSlideUp()
    {
        dispatchWithoutParam(moveSlideTopByStep)
    }

    function handleMoveSlideDown()
    {
        dispatchWithoutParam(moveSlideDownByStep)
    }

    function handleAddRectClick()
    {
        dispatch(addObject, {objectType: 'Rect'})
    }

    function handleAddTriangleClick()
    {
        dispatch(addObject, {objectType: 'Triangle'})
    }

    function handleAddCircleClick()
    {
        dispatch(addObject, {objectType: 'Circle'})
    }

    const [activeTab, setActiveTab] = React.useState(TABS.MAIN);

    return (
        <nav className={'nav'}>
            <ul className={'nav__list'}>
                <li className={`nav__list-item${activeTab === TABS.MAIN ? " nav__list-item_active" : ""}`} onClick={() => setActiveTab(TABS.MAIN)}>
                    Главная
                </li>
                <li className={`nav__list-item${activeTab === TABS.EDIT ? " nav__list-item_active" : ""}`} onClick={() => setActiveTab(TABS.EDIT)}>
                    Редактирование
                </li>
                <li className={`nav__list-item${activeTab === TABS.PASTE ? " nav__list-item_active" : ""}`} onClick={() => setActiveTab(TABS.PASTE)}>
                    Вставка
                </li>
                <li className={`nav__list-item${activeTab === TABS.SETTINGS ? " nav__list-item_active" : ""}`} onClick={() => setActiveTab(TABS.SETTINGS)}>
                    Настройки вида
                </li>
            </ul>

            <div className={`nav__tabs${activeTab === TABS.MAIN ? "" : " nav__tabs_hidden"}`}>
                <button className={'nav__button nav__button_new-presentation'} onClick={handleNewPresentationClick} title={'Создать новую презентацию'}/>
                <button className={'nav__button nav__button_add-slide'} onClick={handleAddNewSlideClick} title={'Добавить новый слайд'}/>
                <button className={'nav__button nav__button_delete-slide'} onClick={handleRemoveSlideClick} title={'Удалить активный слайд'}/>
            </div>

            <div className={`nav__tabs${activeTab === TABS.EDIT ? "" : " nav__tabs_hidden"}`}>
                <button className={'nav__button nav__button_slide-up'} onClick={handleMoveSlideUp} title={'Переместить текущий слайд на позицию выше'}/>
                <button className={'nav__button nav__button_slide-down'} onClick={handleMoveSlideDown} title={'Переместить текущий слайд на позицию ниже'}/>
            </div>

            <div className={`nav__tabs${activeTab === TABS.PASTE ? "" : " nav__tabs_hidden"}`}>
                <button className={'nav__button nav__button_add-img'} onClick={handleAddRectClick} title={'Добавить картинку'}/>
                <button className={'nav__button nav__button_add-rect'} onClick={handleAddRectClick} title={'Добавить прямоугольник'}/>
                <button className={'nav__button nav__button_add-triangle'} onClick={handleAddTriangleClick} title={'Добавить треугольник'}/>
                <button className={'nav__button nav__button_add-circle'} onClick={handleAddCircleClick} title={'Добавить круг'}/>
            </div>

            <div className={`nav__tabs${activeTab === TABS.SETTINGS ? "" : " nav__tabs_hidden"}`}>
                <button className={'nav__button nav__button_mode-view'} title={'Настройки вида приложения'}/>
                <button className={'nav__button nav__button_theme'} title={'Смена темы'}/>
            </div>
        </nav>
    );
}