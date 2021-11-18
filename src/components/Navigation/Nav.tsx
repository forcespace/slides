import React from 'react';
import {dispatch, dispatchWithoutParam} from "../../dispatch";
import {createEditor, addEmptySlide, deleteSlide, addObject, moveSlideTopByStep, moveSlideDownByStep} from "../../script/slide/functions";
import Button from '../TabsButton/Button'
import NavTabs from "../NavTabs/NavTabs";
import styles from './nav.module.css';
import stylesButtonTabs from '../TabsButton/button.module.css';

const TABS = {
    MAIN: 'main',
    EDIT: 'edit',
    PASTE: 'paste',
    SETTINGS: 'settings'
}

function NavTab2(props:{tabs: Array<any>})
{
    return(
        <NavTabs className={styles.list}>
            {props.tabs.map(tab =>
                <span className={tab.className} onClick={tab.onClick}>
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
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
        <nav className={styles.nav}>
            <NavTab2 tabs={[
                {
                    className: `${styles.list_item} ${activeTab === TABS.MAIN ? `${styles.active}` : ""}`,
                    onClick: () => setActiveTab(TABS.MAIN),
                    name: 'Главная'
                },
                {
                    className: `${styles.list_item} ${activeTab === TABS.EDIT ? `${styles.active}` : ""}`,
                    onClick: () => setActiveTab(TABS.EDIT),
                    name: 'Редактирование'
                },
                {
                    className: `${styles.list_item} ${activeTab === TABS.PASTE ? `${styles.active}` : ""}`,
                    onClick: () => setActiveTab(TABS.PASTE),
                    name: 'Вставка'
                },
                {
                    className: `${styles.list_item} ${activeTab === TABS.SETTINGS ? `${styles.active}` : ""}`,
                    onClick: () => setActiveTab(TABS.SETTINGS),
                    name: 'Настройки вида'
                },
            ]}/>

            <NavTabs className={`${styles.tabs} ${activeTab === TABS.MAIN ? "" : `${styles.tabs_hidden}`}`}>
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_new_presentation}`}
                    callback={handleNewPresentationClick}
                    title={'Создать новую презентацию'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_add_slide}`}
                    callback={handleAddNewSlideClick}
                    title={'Добавить новый слайд'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_delete_slide}`}
                    callback={handleRemoveSlideClick}
                    title={'Удалить активный слайд'}
                />
            </NavTabs>

            <NavTabs className={`${styles.tabs} ${activeTab === TABS.EDIT ? "" : `${styles.tabs_hidden}`}`}>
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_slide_up}`}
                    callback={handleMoveSlideUp}
                    title={'Переместить текущий слайд на позицию выше'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_slide_down}`}
                    callback={handleMoveSlideDown}
                    title={'Переместить текущий слайд на позицию ниже'}
                />
            </NavTabs>

            <NavTabs className={`${styles.tabs} ${activeTab === TABS.PASTE ? "" : `${styles.tabs_hidden}`}`}>
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_add_img}`}
                    callback={handleAddRectClick}
                    title={'Добавить картинку'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_add_rect}`}
                    callback={handleAddRectClick}
                    title={'Добавить прямоугольник'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_add_triangle}`}
                    callback={handleAddTriangleClick}
                    title={'Добавить треугольник'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_add_circle}`}
                    callback={handleAddCircleClick}
                    title={'Добавить круг'}
                />
            </NavTabs>

            <NavTabs className={`${styles.tabs} ${activeTab === TABS.SETTINGS ? "" : `${styles.tabs_hidden}`}`}>
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_mode_view}`}
                    callback={handleAddRectClick}
                    title={'Настройки вида приложения'}
                />
                <Button
                    className={`${stylesButtonTabs.tabs_button} ${stylesButtonTabs.tabs_button_change_theme}`}
                    callback={handleAddRectClick}
                    title={'Смена темы'}
                />
            </NavTabs>
        </nav>
    );
}