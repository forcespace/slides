import React from 'react'
import {addEmptySlide, addObject, createEditor, deleteSlide, exportProject, ExtendedAction, importProject, moveSlideDownByStep, moveSlideTopByStep, ObjectType, setBackgroundColor, setBorderColor} from '../../script/slide/actionCreators'
import styles from './nav.module.css'
import stylesButtonTabs from '../Button/button.module.css'
import {Action} from 'redux'
import {connect, ConnectedProps} from 'react-redux'
import {Editor} from '../../script/slide/slide'
import NavTab from './NavTab'
import NavTabButtons from './NavTabButtons'

const TABS = {
    SAVE: 'save',
    MAIN: 'presentation',
    EDIT: 'slides',
    PASTE: 'paste'
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: Action) => ExtendedAction) => ({
    createEditor: () => dispatch(createEditor()),
    addEmptySlide: () => dispatch(addEmptySlide()),
    deleteSlide: () => dispatch(deleteSlide()),
    moveSlideTopByStep: () => dispatch(moveSlideTopByStep()),
    moveSlideDownByStep: () => dispatch(moveSlideDownByStep()),
    addObject: (object: ObjectType) => dispatch(addObject(object)),
    setBackgroundColor: (id: string, color: string) => dispatch(setBackgroundColor(id, color)),
    setBorderColor: (id: string, color: string) => dispatch(setBorderColor(id, color)),
    exportProject: () => dispatch(exportProject()),
    importProject: (data: string | ArrayBuffer | null) => dispatch(importProject(data))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

function Nav(props: Props) {
    console.log('Nav props.state.color = ', props.state.color)
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

    function handleAddRectClick() {
        props.addObject({objectType: 'Rect'})
    }

    function handleAddTriangleClick() {
        props.addObject({objectType: 'Triangle'})
    }

    function handleAddCircleClick() {
        props.addObject({objectType: 'Circle'})
    }

    function handleSetBackgroundColor() {
        props.setBackgroundColor(props.state.active, props.state.color!)
    }

    function handleSetBorderColor() {
        props.setBorderColor(props.state.active, props.state.color!)
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
                },
                {
                    className: stylesButtonTabs.tab_add_circle,
                    onClick: handleSetBackgroundColor,
                    title: 'Заливка фона'
                },
                {
                    className: stylesButtonTabs.tab_add_circle,
                    onClick: handleSetBorderColor,
                    title: 'Цвет границы'
                }
            ]} hidden={activeTab !== TABS.PASTE} />
        </nav>
    )
}

export default connector(Nav)