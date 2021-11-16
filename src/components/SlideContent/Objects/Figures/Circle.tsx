import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    scaleIndex: number
}

export function Circle(props: Props)
{
    const borderWidth = props.figure.border ? props.figure.border.borderSize : 0

    const widthSvg = Math.ceil((props.figure.width + borderWidth + 2) * props.scaleIndex)
    const heightSvg = Math.ceil((props.figure.height + borderWidth + 2) * props.scaleIndex)
    const xSvg = Math.ceil(props.figure.leftTopPoint.x * props.scaleIndex)
    const ySvg = Math.ceil(props.figure.leftTopPoint.y * props.scaleIndex)

    const widthCircle = Math.ceil(widthSvg * 0.5)
    const heightCircle = Math.ceil(heightSvg * 0.5)
    const radiusCircle = Math.ceil((props.figure.height) * props.scaleIndex * 0.5)

    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? (props.figure.border.borderSize * props.scaleIndex) : 0

    const styleSvg = {
        top: `${xSvg}px`,
        left: `${ySvg}px`,
        width: widthSvg,
        height: heightSvg,
        fill: fillColorSvg,
        stroke: strokeColorSvg,
        strokeWidth: strokeSizeSvg
    }

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="meet" xmlns="http://www.w3.org/2000/svg">
            <circle cx={widthCircle} cy={heightCircle} r={radiusCircle}/>
        </svg>
    )
}