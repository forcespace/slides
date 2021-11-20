import * as React from 'react'
import {ObjectType} from '../../../../script/slide/slide'
import {useRef, useState} from 'react'
import {Figure} from "./Figure";

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    }
}

export function SvgFigure(props: Props) {
    const fillColorSvg = props.figure.background ? props.figure.background.color : ''
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : ''
    const strokeSizeSvg = props.figure.border ? props.figure.border.borderSize * props.scale.scaleIndex : 0

    const widthSvg = Math.ceil(props.figure.width * props.scale.scaleIndex + 2 * strokeSizeSvg)
    const heightSvg = Math.ceil(props.figure.height * props.scale.scaleIndex + 2 * strokeSizeSvg)

    const [position, setPosition] = useState({
        x: Math.ceil(props.figure.leftTopPoint.x * props.scale.scaleIndex),
        y: Math.ceil(props.figure.leftTopPoint.y * props.scale.scaleIndex)
    })
    const ref = useRef(null)

    let startPosition = {x: 0, y: 0}

    // useEffect(() => {
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleMouseDown)
    //     }
    // })

    const handleMouseDown = (coord: {x: number, y: number}) => {
        console.log('ЗДЕСЬ')
        console.log(coord)
        startPosition = {x: coord.x, y: coord.y}
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = ((e: MouseEvent) => {
        let delta: { x: number, y: number }
        if (props.scale.isMain) {
            delta = {x: e.pageX - startPosition.x, y: e.pageY - startPosition.y}
        } else {
            delta = {
                x: (e.pageX - startPosition.x) * props.scale.scaleIndex,
                y: (e.pageY - startPosition.y) * props.scale.scaleIndex
            }
        }

        if (ref.current != null) {
            const newPos = {
                x: position.x + delta.x,
                y: position.y + delta.y
            }
            setPosition(newPos)
        }
    })

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const styleSvg = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: widthSvg,
        height: heightSvg,
        fill: fillColorSvg,
        stroke: strokeColorSvg,
        strokeWidth: strokeSizeSvg
    }

    return (
        <svg onMouseDown={(e) => handleMouseDown({x: e.pageX, y: e.pageY})} ref={ref} style={styleSvg} className={'b-slide__content-item'} xmlns="http://www.w3.org/2000/svg">
            <Figure figure={props.figure} scale={props.scale}/>
        </svg>
    )
}