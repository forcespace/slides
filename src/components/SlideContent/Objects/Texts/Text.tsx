import * as React from 'react';
import {Text} from '../../../../script/slide/slide'

type Props = {
    text: Text,
    isScale: boolean
}

export function TextSvg(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const styleSvg = {top: `'${props.text.leftTopPoint.x}px'`, left: `'${props.text.leftTopPoint.y}px'`}
    const widthSvg = props.text.width * scaleIndex
    const heightSvg = props.text.height * scaleIndex
    const xText = props.text.leftTopPoint.x * scaleIndex
    const yText = props.text.leftTopPoint.y * scaleIndex

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} width={widthSvg} height={heightSvg} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <text x={xText} y={yText}>{props.text.content}</text>
        </svg>
    )
}