import {Editor, ObjectType} from '../../../script/slide/slide'
import TextSvg from './Texts/Text'
import Img from './Images/Image'
import SvgFigure from './Figures/SvgFigure'
import {connect} from 'react-redux'

type Props = {
    object: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

function mapStateToProps(state: {presentationReducer: Editor}, ownProps: Props): {state: {presentationReducer: Editor}, ownProps: Props} {
    return {
        state,
        ownProps
    } 
}

function Objects(props: {state: {presentationReducer: Editor}, ownProps: Props})
{
    if (props.ownProps.object.type === 'Image')
    {
        return (
            <Img imgObject={props.ownProps.object} scale={props.ownProps.scale}/>
        )
    }
    else if (props.ownProps.object.type === 'Text')
    {
        return (
            <TextSvg text={props.ownProps.object} scale={props.ownProps.scale}/>
        )
    }
    else
    {
        return (
            <SvgFigure figure={props.ownProps.object} scale={props.ownProps.scale} />
        )
    }
}

export default connect(mapStateToProps)(Objects)