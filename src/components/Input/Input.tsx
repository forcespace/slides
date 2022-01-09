import React, {useEffect, useState} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {Action} from 'redux'
import {ExtendedAction, setEditorColor} from '../../script/slide/actionCreators'
import {Editor} from '../../script/slide/slide'

interface OwnProps {
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    title?: string,
    type?: string,
    value?: string
}

const mapStateToProps = (state: Editor, ownProps: OwnProps): {state: Editor, ownProps: OwnProps} => ({
    state,
    ownProps
})

const mapDispatchToProps = (dispatch: (arg0: Action) => ExtendedAction) => ({
    setEditorColor: (color: string) => dispatch(setEditorColor(color))
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Input(props: Props) {
    console.log('Input props.state.color = ', props.state.color)
    const [color, setColor] = useState('#000000')

    useEffect(() => {
        if (props.state.color !== color) {
            props.setEditorColor(color)
        }
    }, [color, props.state.color, props.setEditorColor])

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    return (
        <input
            contentEditable
            className={props.ownProps.className}
            onClick={props.ownProps.onClick}
            title={props.ownProps.title}
            type={props.ownProps.type}
            value={props.ownProps.value}
            onChange={changeColor} />
    )
}

export default connector(Input)