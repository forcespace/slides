import React from 'react'
import {
    ExtendedAction,
    addEmptySlide,
    addObject,
    createEditor,
    deleteSlide,
    exportProject,
    importPresentation,
    moveSlideDownByStep,
    moveSlideTopByStep,
    ObjectType,
    undo,
    redo,
    setBackgroundColor,
    setBorderColor,
    importEditorActive,
    importHistory,
    importEditorColor,
    addImage,
    addText,
    deleteObject, viewShow, setBackgroundImage, changeFontSizeText
} from '../../script/slide/actionCreators'
import {Action} from 'redux'
import {connect, ConnectedProps} from 'react-redux'
import {NavTab} from './NavTab'
import {NavTabButtons} from './NavTabButtons'
import {store} from '../../store'
import styles from './nav.module.css'
import stylesButtonTabs from '../Button/button.module.css'
import {Text} from '../../script/slide/slide'
import {searchObject} from '../../script/slide/functions'

const TABS = {
    FILE: 'file',
    EDIT: 'edit',
    TEXT: 'text',
    PASTE: 'paste',
    OBJECTS: 'objects',
    COLOR: 'color',
    PRESENTATION: 'presentation',
}

const mapDispatchToProps = (dispatch: (arg0: Action) => ExtendedAction) => ({
    createEditor: () => dispatch(createEditor()),
    addEmptySlide: () => dispatch(addEmptySlide()),
    deleteSlide: () => dispatch(deleteSlide()),
    moveSlideTopByStep: () => dispatch(moveSlideTopByStep()),
    moveSlideDownByStep: () => dispatch(moveSlideDownByStep()),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    addObject: (object: ObjectType) => dispatch(addObject(object)),
    deleteObject: (idObject: string) => dispatch(deleteObject(idObject)),
    addImage: (data: string | ArrayBuffer | null) => dispatch(addImage(data)),
    addText: () => dispatch(addText()),
    setBackgroundColor: (id: string, color: string) => dispatch(setBackgroundColor(id, color)),
    setBackgroundImage: (data: string | ArrayBuffer | null) => dispatch(setBackgroundImage(data)),
    setBorderColor: (id: string, color: string) => dispatch(setBorderColor(id, color)),
    exportProject: () => dispatch(exportProject()),
    importPresentation: (data: string | ArrayBuffer | null) => dispatch(importPresentation(data)),
    importHistory: (data: string | ArrayBuffer | null) => dispatch(importHistory(data)),
    importEditorActive: (data: string | ArrayBuffer | null) => dispatch(importEditorActive(data)),
    importEditorColor: (data: string | ArrayBuffer | null) => dispatch(importEditorColor(data)),
    viewShow: () => dispatch(viewShow()),
    changeFontSizeText: (id: string, fontSize: number) => dispatch(changeFontSizeText(id, fontSize))
})

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

function Nav(props: Props) {
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

    function handleDeleteObject() {
        const state = store.getState()
        props.deleteObject(state.active)
    }

    function handleAddText() {
        props.addText()
    }

    function handleSetBackgroundColor() {
        const state = store.getState()
        props.setBackgroundColor(state.active, state.color!)
    }

    function handleSetSlideBackgroundImage(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target
        const file = input?.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = function () {
                props.setBackgroundImage(reader.result)
            }

            reader.onerror = function () {
            }
        }
    }

    function handleSetSlideBackgroundColor() {
        const state = store.getState()
        const activeSlideIndex = state.presentation.active
        props.setBackgroundColor(state.presentation.slides[activeSlideIndex].id, state.color!)
    }

    function handleSetBorderColor() {
        const state = store.getState()
        props.setBorderColor(state.active, state.color!)
    }

    function exportProject() {
        const storeState = store.getState()
        const fileName = 'slides.json'
        const content = JSON.stringify(storeState)
        download(content, fileName, 'text/plain')
    }

    function download(content: string, fileName: string, contentType: string) {
        const a = document.createElement('a')
        const file = new Blob([content], {type: contentType})
        a.href = URL.createObjectURL(file)
        a.download = fileName
        a.click()
    }

    function loadImage(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target
        const file = input?.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = function () {
                props.addImage(reader.result)
            }

            reader.onerror = function () {
            }
        }
    }

    function importProject(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target
        const file = input?.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.readAsText(file)

            reader.onload = function () {
                props.importPresentation(reader.result)
                props.importHistory(reader.result)
                props.importEditorActive(reader.result)
                props.importEditorColor(reader.result)
            }

            reader.onerror = function () {
            }
        }
    }

    function getActiveObjectFontSize() {
        const state = store.getState()
        const presentation = state.presentation
        const indexObject = searchObject(presentation, state.active)

        if (indexObject.objectIndex >= 0 && presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex].type === 'Text') {
            const textObject: Text = presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex] as Text

            return textObject.size
        }
        else {
            return 14
        }
    }

    function handleDecreaseFontSizeText() {
        props.changeFontSizeText(store.getState().active, getActiveObjectFontSize() - 4)
    }

    function handleIncreaseFontSizeText() {
        props.changeFontSizeText(store.getState().active, getActiveObjectFontSize() + 4)
    }

    const [activeTab, setActiveTab] = React.useState(TABS.FILE)

    return (
        <nav className={styles.content}>
            <NavTab active={activeTab} tabs={[
                {
                    id: TABS.FILE,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.FILE),
                    name: 'Файл'
                },
                {
                    id: TABS.EDIT,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.EDIT),
                    name: 'Правка'
                },
                {
                    id: TABS.TEXT,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.TEXT),
                    name: 'Текст'
                },
                {
                    id: TABS.PASTE,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.PASTE),
                    name: 'Вставка'
                },
                {
                    id: TABS.COLOR,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.COLOR),
                    name: 'Заливка'
                },
                {
                    id: TABS.PRESENTATION,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.PRESENTATION),
                    name: 'Презентация'
                },
            ]}/>

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
                },
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
            ]} hidden={activeTab !== TABS.FILE}/>

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
                    className: stylesButtonTabs.tab_slide_undo,
                    onClick: undo,
                    title: 'Undo'
                },
                {
                    className: stylesButtonTabs.tab_slide_redo,
                    onClick: redo,
                    title: 'Redo'
                }
            ]} hidden={activeTab !== TABS.EDIT}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_play,
                    onClick: props.viewShow,
                    title: 'Просмотр презентации'
                }
            ]} hidden={activeTab !== TABS.PRESENTATION}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_add_text,
                    onClick: handleAddText,
                    title: 'Добавить текст'
                },
                {
                    className: stylesButtonTabs.tab_font_size_decrease,
                    onClick: handleDecreaseFontSizeText,
                    title: '-'
                },
                {
                    className: stylesButtonTabs.tab_font_size_increase,
                    onClick: handleIncreaseFontSizeText,
                    title: '+'
                }
            ]} hidden={activeTab !== TABS.TEXT}/>

            <NavTabButtons buttons={[
                {
                    classNameParent: stylesButtonTabs.tab_add_img_wrapper,
                    className: stylesButtonTabs.tab_add_img,
                    titleLabel: 'Загрузить картинку',
                    onChange: loadImage,
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
                },
                {
                    className: stylesButtonTabs.tab_del_object,
                    onClick: handleDeleteObject,
                    title: 'Удалить активный объект'
                },
            ]} hidden={activeTab !== TABS.PASTE}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_add_color,
                    title: 'Выбрать цвет',
                    mode: 'input',
                    type: 'color'
                },
                {
                    className: stylesButtonTabs.tab_add_color_picker_background,
                    onClick: handleSetBackgroundColor,
                    title: 'Заливка фона'
                },
                {
                    className: stylesButtonTabs.tab_add_color_picker_border,
                    onClick: handleSetBorderColor,
                    title: 'Цвет бордера'
                },
                {
                    className: stylesButtonTabs.tab_add_color_picker_background,
                    onClick: handleSetSlideBackgroundColor,
                    title: 'Заливка фона слайда'
                },
                {
                    classNameParent: stylesButtonTabs.tab_add_img_wrapper,
                    className: stylesButtonTabs.tab_add_img,
                    onChange: handleSetSlideBackgroundImage,
                    title: 'Изображение в качестве фона слайда',
                    mode: 'input-file',
                    type: 'file'
                }
            ]} hidden={activeTab !== TABS.COLOR}/>
        </nav>
    )
}

export default connector(Nav)