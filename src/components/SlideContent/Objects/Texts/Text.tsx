import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ExtendedAction, setEditorActive, setObjectPosition, setText} from '../../../../script/slide/actionCreators'
import {Editor, Position, Text} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type OwnProps = {
    text: Text,
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
    const textWidth = Math.ceil(props.text.width)
    const textHeight = Math.ceil(props.text.height)

    function parseText(text: string | null) : string {
        return text ? text.replace(/(?:\r\n|\r|\n)/gm, '<br>') : ''
    }

    const [text, setText] = React.useState(parseText(props.text.content))

    const changeText = (event: React.FocusEvent<HTMLInputElement>) => {
        const text = parseText(event.target.innerHTML ?? props.text.content)
        setText(text)
        props.setText(props.text.id, text)
    }

    const fontSize = Math.ceil(props.text.size)
    const styleText = {
        top: `${props.text.leftTopPoint.y}px`,
        left: `${props.text.leftTopPoint.x}px`,
        width: textWidth,
        height: textHeight,
        fontSize: fontSize
    }

    return (
        <p
            style={styleText}
            className={`${styles.slide_item_text}`}
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={changeText}
            dangerouslySetInnerHTML={{__html: text}}
        />
    )
}

export default connector(TextArea)