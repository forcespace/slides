import {ChangeEvent, Ref, useEffect, useRef, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition, setText} from '../../../../script/slide/actionCreators'
import {useDragAndDrop} from '../../../../script/slide/dragAndDropHook'
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
    setEditorActive: (objectId: string) => dispatch(setEditorActive(objectId)),
    setText: (objectId: string, text: string) => dispatch(setText(objectId, text))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function TextArea(props: Props) {
    const textWidth = Math.ceil(props.text.width * props.scale.scaleIndex)
    const textHeight = Math.ceil(props.text.height * props.scale.scaleIndex)

    const [position, setPosition] = useState({
        x: Math.ceil(props.text.leftTopPoint.x * props.scale.scaleIndex),
        y: Math.ceil(props.text.leftTopPoint.y * props.scale.scaleIndex)
    })

    const [value, setValue] = useState(props.text.content)
    useEffect(() => {
        if (props.text.content !== value) {
            props.setText(props.text.id, value)
        }
    }, [value, props.text.content, props.setText])

    const changeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.toString)
    }

    const ref: Ref<HTMLDivElement> = useRef(null)

    const objectParameters = {
        ...position,
        width: textWidth,
        height: textHeight
    }

    const setNewPosition = (newPosition: Position) => {
        const statePosition: Position = {
            x: Math.ceil(newPosition.x / props.scale.scaleIndex),
            y: Math.ceil(newPosition.y / props.scale.scaleIndex)
        }
        props.setObjectPosition(statePosition)
        props.setEditorActive(props.text.id)
    }

    useDragAndDrop(
        ref,
        objectParameters,
        setPosition,
        setNewPosition,
        props.scale.isMain,
        props.scale.scaleIndex
    )

    let className = ''

    if (props.state.active === props.text.id) {
        className = `${styles.slide_item_active}`
    }

    const styleText = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: textWidth,
        height: textHeight,
        border: ''
    }

    const styleDiv = {
        top: `${position.y - 2}px`,
        left: `${position.x - 2}px`,
        width: textWidth + 4,
        height: textHeight + 4
    }

    return (
        <div>
            <div
                draggable={false}
                ref={ref}
                style={styleDiv}
                className={`${styles.slide_item} ${className}`}
            >
            </div>
            <textarea
                style={styleText}
                className={`${styles.slide_item}`}
                onChange={changeText}
            >
                {props.text.content}
            </textarea>
        </div>
    )
}

export default connector(TextArea)