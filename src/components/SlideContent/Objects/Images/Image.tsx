import * as React from 'react';
import {Image} from '../../../../script/slide/slide'

type Props = {
    figure: Image,
    isScale: boolean
}

export function ImageSvg(props: Props)
{
    const styleSvg = {top: `'${props.figure.leftTopPoint.x}px'`, left: `'${props.figure.leftTopPoint.y}px'`}
    const scaleIndex = props.isScale ? 0.17 : 1
    const widthSvg = props.figure.width * scaleIndex
    const heightSvg = props.figure.height * scaleIndex
    const xText = props.figure.leftTopPoint.x * scaleIndex
    const yText = props.figure.leftTopPoint.y * scaleIndex

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <image xlinkHref={props.figure.src}  x={xText} y={yText} height={heightSvg} width={widthSvg}/>
        </svg>
    )
}