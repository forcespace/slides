import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Action} from 'redux'
import {ExtendedAction, setBackgroundColor} from '../../script/slide/actionCreators'
import {Editor} from '../../script/slide/slide'

interface InputProps {
    className: string,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    title?: string,
    type?: string,
    value?: string
}

function mapStateToProps(state: { presentationReducer: Editor }, ownProps: InputProps): { state: { presentationReducer: Editor }, ownProps: InputProps } {
    return {
        state,
        ownProps
    }
}

const mapDispatchToProps = (dispatch: (arg0: Action) => ExtendedAction) => ({
    setBackgroundColor: (color: string) => dispatch(setBackgroundColor(color))
})

function Input(props: { state: { presentationReducer: Editor }, ownProps: InputProps } & ReturnType<typeof mapDispatchToProps>) {
    const [color, setColor] = useState('#000')
    useEffect(() => {
        if (props.state.presentationReducer.color !== color) {
            props.setBackgroundColor(color)
        }
    }, [color, props.state.presentationReducer.color, props.setBackgroundColor])

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

export default connect(mapStateToProps, mapDispatchToProps)(Input)