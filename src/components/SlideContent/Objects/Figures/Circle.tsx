import * as React from 'react';
import {ObjectType} from '../../../../script/slide/slide'

type Props = {
    figure: ObjectType,
    isScale: boolean
}

export function Circle(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1

    const borderWidth = props.figure.border ? props.figure.border.borderSize : 0

    const widthSvg = Math.round((props.figure.width + 2 * borderWidth) * scaleIndex)
    const heightSvg = Math.round((props.figure.height + 2 * borderWidth) * scaleIndex)
    const xSvg = Math.round(props.figure.leftTopPoint.x * scaleIndex)
    const ySvg = Math.round(props.figure.leftTopPoint.y * scaleIndex)

    const widthCircle = Math.round(widthSvg * 0.5)
    const heightCircle = Math.round(heightSvg * 0.5)
    const radiusCircle = Math.round((props.figure.height + borderWidth) * scaleIndex * 0.5)

    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? (props.figure.border.borderSize * scaleIndex) : 0

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