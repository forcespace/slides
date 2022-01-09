import React from 'react'
import {addEmptySlide, addObject, createEditor, deleteSlide, exportProject, importProject, moveSlideDownByStep, moveSlideTopByStep, undo, redo, ObjectType} from '../../script/slide/actionCreators'
import Button from '../Button/Button'
import NavTabs from '../NavTabs/NavTabs'
import Input from '../Input/Input'
import InputFile from '../InputFile/InputFile'
import styles from './nav.module.css'
import stylesButtonTabs from '../Button/button.module.css'
import {Action, AnyAction} from 'redux'
import {connect} from 'react-redux'
// import {store} from '../../store'

const TABS = {
    SAVE: 'save',
    MAIN: 'presentation',
    EDIT: 'slides',
    PASTE: 'paste'
}

interface NavTabMenu {
    id: string,
    className: string,
    onClick: Function,
    name: string
}

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    createEditor: () => dispatch(createEditor()),
    addEmptySlide: () => dispatch(addEmptySlide()),
    deleteSlide: () => dispatch(deleteSlide()),
    moveSlideTopByStep: () => dispatch(moveSlideTopByStep()),
    moveSlideDownByStep: () => dispatch(moveSlideDownByStep()),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    addObject: (object: ObjectType) => dispatch(addObject(object)),
    exportProject: () => dispatch(exportProject()),
    importProject: (data: string | ArrayBuffer | null) => dispatch(importProject(data))
})

function NavTab(props: { tabs: Array<NavTabMenu>, active: string }) {
    return (
        <NavTabs className={styles.menu_list}>
            {props.tabs.map(tab =>
                <span key={Math.random()} className={`${tab.className} ${props.active === tab.id ? styles.active : ''}`}
                    onClick={() => (tab.onClick == undefined ? null : tab.onClick())}>
                    {tab.name}
                </span>)
            }
        </NavTabs>
    )
}

interface NavTabButton {
    classNameParent?: string,
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    titleLabel?: string,
    title?: string,
    mode?: 'button' | 'input' | 'input-file',
    type?: string,
    value?: string
}

function NavTabButtons(props: { buttons: Array<NavTabButton>, hidden: boolean }) {
    return (
        <NavTabs className={`${styles.tabs} ${props.hidden ? styles.tabs_hidden : ''}`}>
            {
                props.buttons.map(button => {
                    switch (button.mode) {
                        case 'input': {
                            return <Input {...button} key={Math.random()} type={button.type} className={`${stylesButtonTabs.tab} ${button.className}`}
                                value={button.value} />
                        }
                        case 'input-file': {
                            return (
                                <InputFile classNameLabel={`${stylesButtonTabs.tab_wrapper_file} ${button.classNameParent}`}
                                    titleLabel={button.titleLabel} {...button} key={Math.random()}
                                    className={`${stylesButtonTabs.tab} ${button.className}`} />
                            )
                        }
                        default: {
                            return <Button {...button} key={Math.random()} className={`${stylesButtonTabs.tab} ${button.className}`} />
                        }
                    }
                }
                )}
        </NavTabs>
    )
}

function Nav(props: ReturnType<typeof mapDispatchToProps>) {
    function handleAddNewSlideClick() {
        props.addEmptySlide()
    }

    function handleRemoveSlideClick() {
        props.deleteSlide()
    }

    function handleNewPresentationClick() {
        props.createEditor()
    }

    function handleMoveSlideUp() {
        props.moveSlideTopByStep()
    }

    function handleMoveSlideDown() {
        props.moveSlideDownByStep()
    }
    function undo() {
        props.undo()
    }
    function redo() {
        props.redo()
    }

    function handleAddRectClick() {
        props.addObject({objectType: 'Rect'})
    }

    function handleAddTriangleClick() {
        props.addObject({objectType: 'Triangle'})
    }

    function handleAddCircleClick() {
        props.addObject({objectType: 'Circle'})
    }

    function exportProject() {
        // const storeState = store.getState()
        // const fileName = 'slides.json'
        // const content = JSON.stringify(storeState)
        // download(content, fileName, 'text/plain')

        const fileName = 'slides.json'
        const content = JSON.stringify('storeState')
        download(content, fileName, 'text/plain')
    }

    function download(content: string, fileName: string, contentType: string) {
        const a = document.createElement('a')
        const file = new Blob([content], {type: contentType})
        a.href = URL.createObjectURL(file)
        a.download = fileName
        a.click()
    }

    function importProject(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target
        const file = input?.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.readAsText(file)

            reader.onload = function () {
                props.importProject(reader.result)
            }

            // eslint-disable-next-line @typescript-eslint/no-empty-function
            reader.onerror = function () {}
        }
    }

    const [activeTab, setActiveTab] = React.useState(TABS.MAIN)

    return (
        <nav className={styles.nav}>
            <NavTab
                active={activeTab}
                tabs={[
                    {
                        id: TABS.SAVE,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.SAVE),
                        name: 'Сохранить / Загрузить'
                    },
                    {
                        id: TABS.MAIN,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.MAIN),
                        name: 'Презентация'
                    },
                    {
                        id: TABS.EDIT,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.EDIT),
                        name: 'Слайды'
                    },
                    {
                        id: TABS.PASTE,
                        className: `${styles.menu_list_item}`,
                        onClick: () => setActiveTab(TABS.PASTE),
                        name: 'Вставка'
                    }
                ]} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_exp_json,
                    onClick: exportProject,
                    title: 'Сохранить проект в формате JSON'
                },
                {
                    classNameParent: stylesButtonTabs.tab_import_json_wrapper,
                    className: stylesButtonTabs.tab_import_json,
                    onChange: importProject,
                    titleLabel: 'Загрузить проект в формате JSON',
                    mode: 'input-file',
                    type: 'file'
                }
            ]} hidden={activeTab !== TABS.SAVE} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_new_presentation,
                    onClick: handleNewPresentationClick,
                    title: 'Создать новую презентацию'
                },
                {
                    className: stylesButtonTabs.tab_add_slide,
                    onClick: handleAddNewSlideClick,
                    title: 'Добавить новый слайд'
                },
                {
                    className: stylesButtonTabs.tab_delete_slide,
                    onClick: handleRemoveSlideClick,
                    title: 'Удалить активный слайд'
                }
            ]} hidden={activeTab !== TABS.MAIN} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_slide_up,
                    onClick: handleMoveSlideUp,
                    title: 'Переместить текущий слайд на позицию выше'
                },
                {
                    className: stylesButtonTabs.tab_slide_down,
                    onClick: handleMoveSlideDown,
                    title: 'Переместить текущий слайд на позицию ниже'
                },
                {
                    className: stylesButtonTabs.tab_slide_up,
                    onClick: undo,
                    title: 'Undo'
                },
                {
                    className: stylesButtonTabs.tab_slide_down,
                    onClick: redo,
                    title: 'Redo'
                }
            ]} hidden={activeTab !== TABS.EDIT} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_add_color,
                    title: 'Выбрать цвет',
                    mode: 'input',
                    type: 'color'
                },
                {
                    classNameParent: stylesButtonTabs.tab_add_img_wrapper,
                    className: stylesButtonTabs.tab_add_img,
                    titleLabel: 'Загрузить картинку',
                    mode: 'input-file',
                    type: 'file'
                },
                {
                    className: stylesButtonTabs.tab_add_rect,
                    onClick: handleAddRectClick,
                    title: 'Добавить прямоугольник'
                },
                {
                    className: stylesButtonTabs.tab_add_triangle,
                    onClick: handleAddTriangleClick,
                    title: 'Добавить треугольник'
                },
                {
                    className: stylesButtonTabs.tab_add_circle,
                    onClick: handleAddCircleClick,
                    title: 'Добавить круг'
                }
            ]} hidden={activeTab !== TABS.PASTE} />
        </nav>
    )
}

export default connect(null, mapDispatchToProps)(Nav)