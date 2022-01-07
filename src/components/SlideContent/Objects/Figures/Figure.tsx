import {Editor, ObjectType} from '../../../../script/slide/slide'
import Circle from './Circle'
import Triangle from './Triangle'
import Rect from './Rect'
import {connect} from 'react-redux'

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

function mapStateToProps(state: {presentationReducer: Editor}, ownProps: Props): {state: {presentationReducer: Editor}, ownProps: Props} {
    return {
        state,
        ownProps
    } 
}

function Figure(props: {state: {presentationReducer: Editor}, ownProps: Props})
{
    if (props.ownProps.figure.type === 'Rect')
    {
        return (
            <Rect figure={props.ownProps.figure} scale={props.ownProps.scale}/>
        )
    }
    else if (props.ownProps.figure.type === 'Circle')
    {
        return (
            <Circle figure={props.ownProps.figure} scale={props.ownProps.scale}/>
        )
    }
    else
    {
        return (
            <Triangle figure={props.ownProps.figure} scale={props.ownProps.scale}/>
        )
    }
}

export default connect(mapStateToProps)(Figure)