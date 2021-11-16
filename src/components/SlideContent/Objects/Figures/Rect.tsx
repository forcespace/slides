import * as React from 'react'
import {ObjectType} from '../../../../script/slide/slide'
import {useRef, useState} from "react";

type Props = {
    figure: ObjectType,
    scaleIndex: number
}

export function Rect(props: Props)
{
    const widthSvg = Math.ceil(props.figure.width * props.scaleIndex)
    const heightSvg = Math.ceil(props.figure.height * props.scaleIndex)
    const xSvg = Math.ceil(props.figure.leftTopPoint.x * props.scaleIndex)
    const ySvg = Math.ceil(props.figure.leftTopPoint.y * props.scaleIndex)

    const rectStroke = props.figure.border ? props.figure.border.borderColor : ''
    const rectFill = props.figure.background ? props.figure.background.color : ''

    const [position, setPosition] = useState({x: xSvg, y: ySvg, coords: {x:0, y:0}})

    const handleMouseMove = useRef((e: { pageX: number; pageY: number; }) => {
        setPosition(position => {
            const xDiff = position.coords.x - e.pageX
            const yDiff = position.coords.y - e.pageY
            return {
                x: position.x + xDiff,
                y: position.y + yDiff,
                coords: {
                    x: e.pageX,
                    y: e.pageY,
                },
            }
        })
    })

    const handleMouseDown = (e: { pageX: number; pageY: number; }) => {
        const pageX = e.pageX
        const pageY = e.pageY
        setPosition(position =>
            Object.assign({}, position, {
                coords: {
                    x: pageX,
                    y: pageY,
                },
            }),
        )
        document.addEventListener('mousemove', handleMouseMove.current)
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove.current)
        setPosition(position => Object.assign({}, position, {coords: {}}))
    }

    const styleSvg = {
        top: `${position.x}px`,
        left: `${position.y}px`,
        width: widthSvg,
        height: heightSvg
    }

    return (
        <svg style={styleSvg} className={'b-slide__content-item'} preserveAspectRatio="slice" xmlns="http://www.w3.org/2000/svg">
            <rect x={0} y={0} width={widthSvg} height={heightSvg} stroke={rectStroke} 
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp} fill={rectFill}
            />
        </svg>
    )
}