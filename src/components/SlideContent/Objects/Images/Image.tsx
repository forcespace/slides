import * as React from 'react'
import {Image} from '../../../../script/slide/slide'

type Props = {
    imgObject: Image,
    scaleIndex: number
}

export function Img(props: Props)
{
    const imgSrc = props.imgObject.src
    const imgX = Math.round(props.imgObject.leftTopPoint.x * props.scaleIndex)
    const imgY = Math.round(props.imgObject.leftTopPoint.y * props.scaleIndex)

    const imgWidth = Math.round(props.imgObject.width * props.scaleIndex)
    const imgHeight = Math.round(props.imgObject.height * props.scaleIndex)

    return (
        <img className={'b-slide__content-item'} src={imgSrc} style={{width: `${imgWidth}px`, height: `${imgHeight}px`, top: `${imgX}px`, left: `${imgY}px`}}/>
    )
}