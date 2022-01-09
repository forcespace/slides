import {connect, ConnectedProps} from 'react-redux'
import {Editor, ObjectType} from '../../../../script/slide/slide'

type OwnProps = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: {presentationReducer: Editor}, ownProps: OwnProps) => ({
    state,
    ownProps
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Rect(props: Props) {
    const rectWidth = Math.round(props.ownProps.figure.width * props.ownProps.scale.scaleIndex)
    const rectHeight = Math.round(props.ownProps.figure.height * props.ownProps.scale.scaleIndex)
    const rectStroke = props.ownProps.figure.border ? props.ownProps.figure.border.borderColor : ''
    const rectStrokeSize = props.ownProps.figure.border ? Math.round(props.ownProps.figure.border.borderSize * props.ownProps.scale.scaleIndex) : 0
    const rectFill = props.ownProps.figure.background ? props.ownProps.figure.background.color : ''

    return (
        <rect x={rectStrokeSize} y={rectStrokeSize} width={rectWidth} height={rectHeight} stroke={rectStroke} fill={rectFill}/>
    )
}

export default connector(Rect)