import {connect} from 'react-redux'
import {ObjectType, Position} from '../../../../script/slide/slide'
import styles from '../../slideContent.module.css'

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function Triangle(props: Props)
{
    const widthSvg = Math.ceil(props.figure.width * props.scale.scaleIndex)
    const heightSvg = Math.ceil(props.figure.height * props.scale.scaleIndex)
    const xSvg = Math.ceil(props.figure.leftTopPoint.x * props.scale.scaleIndex)
    const ySvg = Math.ceil(props.figure.leftTopPoint.y * props.scale.scaleIndex)

    const styleSvg = {
        top: `${xSvg}px`,
        left: `${ySvg}px`,
        width: widthSvg,
        height: heightSvg
    }

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
        <svg style={styleSvg}
             className={styles.slide_item}
             preserveAspectRatio="slice"
             xmlns="http://www.w3.org/2000/svg">
            <path d={trianglePath} stroke={props.figure.border?.borderColor} fill={props.figure.background?.color}/>
        </svg>
    )
}

export default connect()(Triangle)