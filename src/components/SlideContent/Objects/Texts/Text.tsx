import React, {RefObject, useEffect, useRef, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectCondition, setObjectPosition, setText} from '../../../../script/slide/actionCreators'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
import {getRecalculatedObject} from '../../../../script/slide/objectConditions'
import {useResize} from '../../../../script/slide/resizeObjectHook'
import {Editor, Position, Text} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type OwnProps = {
    text: Text,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor) => ({
    state
})

const mapDispatchToProps = (dispatch: (arg0: ExtendedAction) => ExtendedAction, ownProps: OwnProps) => ({
    setObjectPosition: (position: Position) => dispatch(setObjectPosition(ownProps.text.id, position)),
    setObjectCondition: (width: number, height: number) => dispatch(setObjectCondition(ownProps.text.id, width, height)),
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId)),
    setText: (objectId: string, text: string) => dispatch(setText(objectId, text))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function TextArea(props: Props) {
    const [classNameDiv, setClassNameDivActive] = useState(`${styles.slide_item}`)
    const [classNameDnDDiv, setClassNameActive] = useState(`${styles.slide_item}`)
    const [classNameResizeDiv, setClassNameResizePonterSe] = useState(`${styles.slide_item_resize}`)
    const [newObject, setNewObject] = useState(getRecalculatedObject(props.text, props.scale.scaleIndex))

    const styleDiv = {
        top: `${newObject.leftTopPoint.y * props.scale.scaleIndex}px`,
        left: `${newObject.leftTopPoint.x * props.scale.scaleIndex}px`,
        width: newObject.width,
        height: newObject.height
    }

    const ref: RefObject<HTMLDivElement> = useRef(null)
    const refSe: RefObject<HTMLDivElement> = useRef(null)

    const setAcive = () => {
        props.setEditorActive(props.text.id)
    }

    const setNewPosition = (newPosition: Position) => {
        const statePosition: Position = {
            x: newPosition.x / props.scale.scaleIndex,
            y: newPosition.y / props.scale.scaleIndex
        }
        props.setObjectPosition(statePosition)
    }

    const setNewCondition = (width: number, height: number) => {
        props.setObjectCondition(width / props.scale.scaleIndex, height / props.scale.scaleIndex)
        props.setEditorActive(props.text.id)
    }

    useDragAndDrop(
        ref,
        newObject,
        setNewObject,
        setAcive,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    useResize(
        refSe,
        newObject,
        setNewObject,
        setAcive,
        setNewCondition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    const [isActive, setisActive] = useState(props.state.presentation.active.activeObject)

    useEffect(() => {
        if (isActive === props.text.id) {
            setClassNameDivActive(`${styles.slide_item} ${styles.slide_item_active}`)
            setClassNameActive(`${styles.slide_item} ${styles.slide_item_dnd}`)
            setClassNameResizePonterSe(`${styles.slide_item_resize} ${styles.se}`)
        }
    }, [isActive])

    function parseText(text: string | null) : string {
        return text ? text.replace(/(?:\r\n|\r|\n)/gm, '<br>') : ''
    }

    const [text, setText] = React.useState(parseText(props.text.content))

    const changeText = (event: React.FocusEvent<HTMLInputElement>) => {
        const newText = parseText(event.target.innerHTML ?? props.text.content)
        setText(newText)
        props.setText(props.text.id, newText)
        props.setEditorActive(props.text.id)
    }

    const fontSize = Math.round(props.text.size * props.scale.scaleIndex)

    const styleText = {
        top: `2px`,
        left: `2px`,
        width: props.text.width,
        height: props.text.height,
        fontSize: fontSize
    }

    return (
        <div
            className={classNameDiv}
            style={styleDiv}>
            <div ref={ref} className={classNameDnDDiv}></div>
            <div ref={refSe} className={classNameResizeDiv}></div>
            <p
                onClick={e => (props.scale.isMain ? setisActive(props.text.id) : e.preventDefault())}
                draggable={false}
                style={styleText}
                className={`${styles.slide_item_text}`}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={changeText}
                dangerouslySetInnerHTML={{__html: text}}
            />
        </div>
    )
}

export default connector(TextArea)