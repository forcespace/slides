import {connect} from 'react-redux'
import {Editor, ObjectType} from '../../../../script/slide/slide'

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

function Rect(props: {state: {presentationReducer: Editor}, ownProps: Props})
{
    const rectWidth = Math.ceil(props.ownProps.figure.width * props.ownProps.scale.scaleIndex);
    const rectHeight = Math.ceil(props.ownProps.figure.height * props.ownProps.scale.scaleIndex);
    const rectStroke = props.ownProps.figure.border ? props.ownProps.figure.border.borderColor : '';
    const rectStrokeSize = props.ownProps.figure.border ? Math.ceil(props.ownProps.figure.border.borderSize * props.ownProps.scale.scaleIndex) : 0;
    const rectFill = props.ownProps.figure.background ? props.ownProps.figure.background.color : '';

    return (
        <rect x={rectStrokeSize} y={rectStrokeSize} width={rectWidth} height={rectHeight} stroke={rectStroke} fill={rectFill}/>
    )
}

export default connect(mapStateToProps)(Rect)