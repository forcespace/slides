import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function Circle(props: Props)
{
    const borderWidth = props.figure.border ? props.figure.border.borderSize : 0

    const circleWidth = Math.ceil((props.figure.width + borderWidth + 2) * props.scale.scaleIndex)
    const circleHeight = Math.ceil((props.figure.height + borderWidth + 2) * props.scale.scaleIndex)

    const cx = Math.ceil(circleWidth * 0.5)
    const cy = Math.ceil(circleHeight * 0.5)
    const circleRadius = Math.ceil((props.figure.height) * props.scale.scaleIndex * 0.5)

    return (
        <circle cx={cx} cy={cy} r={circleRadius}/>
    )
}