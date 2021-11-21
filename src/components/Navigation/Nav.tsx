import React from 'react';
import {dispatch, dispatchWithoutParam} from '../../dispatch';
import {createEditor, addEmptySlide, deleteSlide, addObject, moveSlideTopByStep, moveSlideDownByStep} from '../../script/slide/functions';
import Button from '../TabsButton/Button';
import NavTabs from '../NavTabs/NavTabs';
import styles from './nav.module.css';
import stylesButtonTabs from '../TabsButton/button.module.css';

const TABS = {
    MAIN: 'main',
    EDIT: 'edit',
    PASTE: 'paste',
    SETTINGS: 'settings'
}

interface NavTabMenu
{
    id: string,
    className: string,
    onClick: () => void,
    name: string
}

function NavTab(props: {tabs: Array<NavTabMenu>, active: string})
{
    return (
        <NavTabs className={styles.menu_list}>
            {props.tabs.map(tab =>
                <span key={tab.id} className={`${tab.className} ${props.active === tab.id ? styles.active : ''}`} onClick={tab.onClick}>
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
}

interface NavTabButton
{
    className: string,
    onClick: () => void,
    title: string
}

function NavTabButtons(props: {buttons: Array<NavTabButton>, hidden: boolean})
{
    return (
        <NavTabs className={`${styles.tabs} ${props.hidden ? styles.tabs_hidden : ''}`}>
            {props.buttons.map(button =>
                <Button {...button} key={button.title} className={`${stylesButtonTabs.tabs_button} ${button.className}`}/>
            )}
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
            <NavTab
                active={activeTab}
                tabs={[
                    {
                        id: TABS.MAIN,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.MAIN),
                        name: 'Главная'
                    },
                    {
                        id: TABS.EDIT,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.EDIT),
                        name: 'Редактирование'
                    },
                    {
                        id: TABS.PASTE,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.PASTE),
                        name: 'Вставка'
                    },
                    {
                        id: TABS.SETTINGS,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.SETTINGS),
                        name: 'Настройки вида'
                    }
                ]}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tabs_button_new_presentation,
                    onClick: handleNewPresentationClick,
                    title: 'Создать новую презентацию'
                },
                {
                    className: stylesButtonTabs.tabs_button_add_slide,
                    onClick: handleAddNewSlideClick,
                    title: 'Добавить новый слайд'
                },
                {
                    className: stylesButtonTabs.tabs_button_delete_slide,
                    onClick: handleRemoveSlideClick,
                    title: 'Удалить активный слайд'
                }
            ]} hidden={activeTab !== TABS.MAIN}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tabs_button_slide_up,
                    onClick: handleMoveSlideUp,
                    title: 'Переместить текущий слайд на позицию выше'
                },
                {
                    className: stylesButtonTabs.tabs_button_slide_down,
                    onClick: handleMoveSlideDown,
                    title: 'Переместить текущий слайд на позицию ниже'
                }
            ]} hidden={activeTab !== TABS.EDIT}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tabs_button_add_img,
                    onClick: handleAddRectClick,
                    title: 'Добавить картинку'
                },
                {
                    className: stylesButtonTabs.tabs_button_add_rect,
                    onClick: handleAddRectClick,
                    title: 'Добавить прямоугольник'
                },
                {
                    className: stylesButtonTabs.tabs_button_add_triangle,
                    onClick: handleAddTriangleClick,
                    title: 'Добавить треугольник'
                },
                {
                    className: stylesButtonTabs.tabs_button_add_circle,
                    onClick: handleAddCircleClick,
                    title: 'Добавить круг'
                }
            ]} hidden={activeTab !== TABS.PASTE}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tabs_button_mode_view,
                    onClick: handleMoveSlideUp,
                    title: 'Настройки вида приложения'
                },
                {
                    className: stylesButtonTabs.tabs_button_change_theme,
                    onClick: handleMoveSlideDown,
                    title: 'Смена темы'
                }
            ]} hidden={activeTab !== TABS.SETTINGS}/>
        </nav>
    );
}