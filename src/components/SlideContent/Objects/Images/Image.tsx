import * as React from 'react'
import {Image} from '../../../../script/slide/slide'

type Props = {
    imgObject: Image,
    isScale: boolean
}

export function Img(props: Props)
{
    const scaleIndex = props.isScale ? 0.17 : 1
    const imgSrc = props.imgObject.src
    const imgX = props.imgObject.leftTopPoint.x * scaleIndex
    const imgY = props.imgObject.leftTopPoint.y * scaleIndex

    const imgWidth = props.imgObject.width * scaleIndex
    const imgHeight = props.imgObject.height * scaleIndex

    return (
        <img className={'b-slide__content-item'} src={imgSrc} style={{width: `${imgWidth}px`, height: `${imgHeight}px`, top: `${imgX}px`, left: `${imgY}px`}}/>
    )
}