import React from 'react';
//import {dispatch, dispatchWithoutParam} from '../../dispatch';
import {createEditor, addEmptySlide, deleteSlide, addObject, moveSlideTopByStep, moveSlideDownByStep} from '../../script/slide/functions';
import Button from '../Button/Button';
import NavTabs from '../NavTabs/NavTabs';
import Input from '../Input/Input';
import InputFile from '../InputFile/InputFile';
import styles from './nav.module.css';
import stylesButtonTabs from '../Button/button.module.css';

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
                <span key={Math.random()} className={`${tab.className} ${props.active === tab.id ? styles.active : ''}`} onClick={tab.onClick}>
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
}

interface NavTabButton
{
    classNameParent?: string,
    className: string,
    onClick?: () => void,
    title: string,
    mode?: 'button' | 'input' | 'input-file',
    type?: string,
    value?: string
}

function NavTabButtons(props: {buttons: Array<NavTabButton>, hidden: boolean})
{
    return (
        <NavTabs className={`${styles.tabs} ${props.hidden ? styles.tabs_hidden : ''}`}>
            {
                props.buttons.map((button) =>
                    {
                        if (button.mode === 'input')
                        {
                            return <Input {...button} key={Math.random()} type={button.type} className={`${stylesButtonTabs.tabs_button} ${button.className}`} value={button.value}/>
                        }

                        if (button.mode === 'input-file')
                        {
                            return (
                                <label className={button.classNameParent}>
                                    <InputFile {...button} key={Math.random()} className={`${stylesButtonTabs.tabs_button} ${button.className}`}/>
                                </label>
                            )
                        }

                        return <Button {...button} key={Math.random()} className={`${stylesButtonTabs.tabs_button} ${button.className}`}/>
                    }
                )}
        </NavTabs>
    )
}

export function Nav()
{
    function handleAddNewSlideClick()
    {
        // dispatchWithoutParam(addEmptySlide)
    }

    function handleRemoveSlideClick()
    {
        // dispatchWithoutParam(deleteSlide)
    }

    function handleNewPresentationClick()
    {
        // dispatchWithoutParam(createEditor)
    }

    function handleMoveSlideUp()
    {
        // dispatchWithoutParam(moveSlideTopByStep)
    }

    function handleMoveSlideDown()
    {
        // dispatchWithoutParam(moveSlideDownByStep)
    }

    function handleAddRectClick()
    {
        // dispatch(addObject, {objectType: 'Rect'})
    }

    function handleAddTriangleClick()
    {
        // dispatch(addObject, {objectType: 'Triangle'})
    }

    function handleAddCircleClick()
    {
        // dispatch(addObject, {objectType: 'Circle'})
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
                    classNameParent: stylesButtonTabs.tabs_button_add_img_wrapper,
                    className: stylesButtonTabs.tabs_button_add_img,
                    title: 'Загрузить картинку',
                    mode: 'input-file',
                    type: 'file'
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
                    className: stylesButtonTabs.tabs_button_add_color,
                    title: 'Выбрать цвет',
                    mode: 'input',
                    type: 'color'
                },
                {
                    className: stylesButtonTabs.tabs_button_mode_view,
                    title: 'Настройки вида приложения'
                },
                {
                    className: stylesButtonTabs.tabs_button_change_theme,
                    title: 'Смена темы'
                }
            ]} hidden={activeTab !== TABS.SETTINGS}/>
        </nav>
    );
}