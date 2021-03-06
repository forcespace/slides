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
    deleteObject, viewShow
} from '../../script/slide/actionCreators';
import styles from './nav.module.css'
import stylesButtonTabs from '../Button/button.module.css'
import {Action} from 'redux'
import {connect, ConnectedProps} from 'react-redux'
import {NavTab} from './NavTab'
import {NavTabButtons} from './NavTabButtons'
import {store} from '../../store'

const TABS = {
    PRESENTATION: 'presentation',
    SLIDES: 'slides',
    OBJECTS: 'objects',
    COLOR_PICKER: 'color_picker',
    SAVE_LOAD: 'save_load',
    PLAY: 'play'
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
    setBorderColor: (id: string, color: string) => dispatch(setBorderColor(id, color)),
    exportProject: () => dispatch(exportProject()),
    importPresentation: (data: string | ArrayBuffer | null) => dispatch(importPresentation(data)),
    importHistory: (data: string | ArrayBuffer | null) => dispatch(importHistory(data)),
    importEditorActive: (data: string | ArrayBuffer | null) => dispatch(importEditorActive(data)),
    importEditorColor: (data: string | ArrayBuffer | null) => dispatch(importEditorColor(data)),
    viewShow: () => dispatch(viewShow())
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

            reader.onerror = function () {}
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

            reader.onerror = function () {}
        }
    }

    const [activeTab, setActiveTab] = React.useState(TABS.PRESENTATION)

    return (
        <nav className={styles.nav}>
            <NavTab active={activeTab} tabs={[
                {
                    id: TABS.PRESENTATION,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.PRESENTATION),
                    name: '??????????????????????'
                },
                {
                    id: TABS.SLIDES,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.SLIDES),
                    name: '????????????'
                },
                {
                    id: TABS.OBJECTS,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.OBJECTS),
                    name: '??????????????'
                },
                {
                    id: TABS.COLOR_PICKER,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.COLOR_PICKER),
                    name: '??????????????'
                },
                {
                    id: TABS.SAVE_LOAD,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.SAVE_LOAD),
                    name: '?????????????????? / ??????????????????'
                },
                {
                    id: TABS.PLAY,
                    className: `${styles.menu_list_item}`,
                    onClick: () => setActiveTab(TABS.PLAY),
                    name: '????????????????'
                }
            ]}/>

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_new_presentation,
                    onClick: handleNewPresentationClick,
                    title: '?????????????? ?????????? ??????????????????????'
                },
                {
                    className: stylesButtonTabs.tab_add_slide,
                    onClick: handleAddNewSlideClick,
                    title: '???????????????? ?????????? ??????????'
                },
                {
                    className: stylesButtonTabs.tab_delete_slide,
                    onClick: handleRemoveSlideClick,
                    title: '?????????????? ???????????????? ??????????'
                }
            ]} hidden={activeTab !== TABS.PRESENTATION} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_slide_undo,
                    onClick: undo,
                    title: 'Undo'
                },
                {
                    className: stylesButtonTabs.tab_slide_redo,
                    onClick: redo,
                    title: 'Redo'
                },
                {
                    className: stylesButtonTabs.tab_slide_up,
                    onClick: handleMoveSlideUp,
                    title: '?????????????????????? ?????????????? ?????????? ???? ?????????????? ????????'
                },
                {
                    className: stylesButtonTabs.tab_slide_down,
                    onClick: handleMoveSlideDown,
                    title: '?????????????????????? ?????????????? ?????????? ???? ?????????????? ????????'
                }
            ]} hidden={activeTab !== TABS.SLIDES} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_add_text,
                    onClick: handleAddText,
                    title: ' ???????????????? ??????????'
                },
                {
                    classNameParent: stylesButtonTabs.tab_add_img_wrapper,
                    className: stylesButtonTabs.tab_add_img,
                    titleLabel: '?????????????????? ????????????????',
                    onChange: loadImage,
                    mode: 'input-file',
                    type: 'file'
                },
                {
                    className: stylesButtonTabs.tab_add_rect,
                    onClick: handleAddRectClick,
                    title: '???????????????? ??????????????????????????'
                },
                {
                    className: stylesButtonTabs.tab_add_triangle,
                    onClick: handleAddTriangleClick,
                    title: '???????????????? ??????????????????????'
                },
                {
                    className: stylesButtonTabs.tab_add_circle,
                    onClick: handleAddCircleClick,
                    title: '???????????????? ????????'
                },
                {
                    className: stylesButtonTabs.tab_del_object,
                    onClick: handleDeleteObject,
                    title: '?????????????? ???????????????? ????????????'
                }
            ]} hidden={activeTab !== TABS.OBJECTS} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_add_color,
                    title: '?????????????? ????????',
                    mode: 'input',
                    type: 'color'
                },
                {
                    className: stylesButtonTabs.tab_add_color_picker_background,
                    onClick: handleSetBackgroundColor,
                    title: '?????????????? ????????'
                },
                {
                    className: stylesButtonTabs.tab_add_color_picker_border,
                    onClick: handleSetBorderColor,
                    title: '???????? ??????????????'
                }
            ]} hidden={activeTab !== TABS.COLOR_PICKER} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_exp_json,
                    onClick: exportProject,
                    title: '?????????????????? ???????????? ?? ?????????????? JSON'
                },
                {
                    classNameParent: stylesButtonTabs.tab_import_json_wrapper,
                    className: stylesButtonTabs.tab_import_json,
                    onChange: importProject,
                    titleLabel: '?????????????????? ???????????? ?? ?????????????? JSON',
                    mode: 'input-file',
                    type: 'file'
                }
            ]} hidden={activeTab !== TABS.SAVE_LOAD} />

            <NavTabButtons buttons={[
                {
                    className: stylesButtonTabs.tab_exp_json,
                    onClick: props.viewShow,
                    title: '????????????????'
                }
            ]} hidden={activeTab !== TABS.PLAY} />
        </nav>
    )
}

export default connector(Nav)