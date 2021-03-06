import {connect, ConnectedProps} from 'react-redux'
import {Editor, ObjectType, Position} from '../../../../script/slide/slide'

type OwnProps = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

const mapStateToProps = (state: Editor, ownProps: OwnProps) => ({
    state,
    ownProps
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnProps

export function Triangle(props: Props) {
    const widthSvg = Math.ceil(props.figure.width * props.scale.scaleIndex)
    const heightSvg = Math.ceil(props.figure.height * props.scale.scaleIndex)

    const v1: Position = {
        x: Math.ceil(widthSvg / 2),
        y: 0
    }

    const v2: Position = {
        x: 0,
        y: heightSvg
    }

    const v3: Position = {
        x: widthSvg,
        y: heightSvg
    }

    const trianglePath = `M ${v1.x} ${v1.y} L ${v2.x} ${v2.y} L ${v3.x} ${v3.y} Z`

    return (
        <path d={trianglePath} stroke={props.figure.border?.borderColor} fill={props.figure.background?.color} />
    )
}

export default connector(Triangle)