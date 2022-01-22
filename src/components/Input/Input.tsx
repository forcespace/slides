import React, {useEffect, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {Action} from 'redux'
import {ExtendedAction, setEditorColor} from '../../script/slide/actionCreators'
import {Editor} from '../../script/slide/slide'

interface OwnProps {
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    // onChange?: React.ChangeEventHandler<HTMLInputElement>,
    title?: string,
    type?: string,
    value?: string
}

const mapStateToProps = (state: Editor): {state: Editor} => ({state})

const mapDispatchToProps = (dispatch: (arg0: Action) => ExtendedAction) => ({
    setEditorColor: (color: string) => dispatch(setEditorColor(color))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Input(props: Props) {
    const [color, setColor] = useState(props.state.color ?? '')
    useEffect(() => {
        if (props.state.color !== color) {
            props.setEditorColor(color)
        }
    }, [color, props.state.color, props.setEditorColor])

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
        // props.onChange?.(e);
    }

    return (
        <input
            contentEditable
            className={props.className}
            onClick={props.onClick}
            title={props.title}
            type={props.type}
            value={color}
            onChange={changeColor} />
    )
}

export default connector(Input)