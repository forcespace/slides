import {connect, ConnectedProps} from 'react-redux'
import {Editor, ObjectType} from '../../../../script/slide/slide'

type OwnProps = {
    figure: ObjectType,
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

function Circle(props: Props) {
    const borderWidth = props.figure.border ? props.figure.border.borderSize : 0
    const circleWidth = Math.ceil((props.figure.width + borderWidth + 2))
    const circleHeight = Math.ceil((props.figure.height + borderWidth + 2))
    const cx = Math.ceil(circleWidth * 0.5)
    const cy = Math.ceil(circleHeight * 0.5)
    const circleRadius = Math.min(Math.max((props.figure.height) * 0.5, 0), Math.max((props.figure.width) * 0.5, 0))

    return (
        <circle cx={cx} cy={cy} r={circleRadius} />
    )
}

export default connector(Circle)