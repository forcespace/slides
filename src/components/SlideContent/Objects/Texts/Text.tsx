import {Ref, useRef, useState} from 'react'
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

    // const [value, setValue] = useState(props.text.content)
    // console.log('value = ', value)
    // console.log('props.text.content = ', props.text.content)

    const changeText = (event: React.FocusEvent<HTMLInputElement>) => {
        // setValue(event.target.value)
        props.setText(props.text.id, event.target.textContent ?? props.text.content)
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

    const fontSize = Math.ceil(props.text.size * props.scale.scaleIndex)
    const styleText = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: textWidth,
        height: textHeight,
        fontSize: fontSize
        // fontStyle: 'italic'
    }

    const styleDiv = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: textWidth,
        height: textHeight
    }

    return (
        <div>
            <div
                ref={ref}
                draggable={false}
                style={styleDiv}
                className={`${styles.slide_item} ${className}`}
            >
            </div>
            <p
                style={styleText}
                className={`${styles.slide_item}`}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={changeText}
            >{props.text.content}</p>
        </div>
    )
}

export default connector(TextArea)