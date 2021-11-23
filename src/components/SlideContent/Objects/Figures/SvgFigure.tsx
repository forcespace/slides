import React, {Ref, RefObject, useEffect} from 'react';
import {ObjectType} from '../../../../script/slide/slide';
import {useRef, useState} from 'react';
import {Figure} from './Figure';
import styles from '../../slideContent.module.css';

type Props = {
    figure: ObjectType,
    scale: {
        isMain: boolean,
        scaleIndex: number
    },
}

export function SvgFigure(props: Props)
{
    const fillColorSvg = props.figure.background ? props.figure.background.color : '';
    const strokeColorSvg = props.figure.border ? props.figure.border.borderColor : '';
    const strokeSizeSvg = props.figure.border ? props.figure.border.borderSize * props.scale.scaleIndex : 0;
    const widthSvg = Math.ceil(props.figure.width * props.scale.scaleIndex + 2 * strokeSizeSvg);
    const heightSvg = Math.ceil(props.figure.height * props.scale.scaleIndex + 2 * strokeSizeSvg);

    const [position, setPosition] = useState({
        x: Math.ceil(props.figure.leftTopPoint.x * props.scale.scaleIndex),
        y: Math.ceil(props.figure.leftTopPoint.y * props.scale.scaleIndex)
    })
    const ref: Ref<SVGSVGElement> = useRef(null)

    const startPosition = useRef({x: 0, y: 0})

    useEffect(() => {
        if (!ref.current)
        {
            return
        }
        ref.current.addEventListener('mousedown', handleMouseDown)
        return () => {
            ref.current && ref.current.removeEventListener('mousedown', handleMouseDown)
        }
    })

    const handleMouseDown = (e: Event) =>
    {
        const mouseEvent = e as MouseEvent
        startPosition.current.x = mouseEvent.pageX
        startPosition.current.y = mouseEvent.pageY
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = ((e: MouseEvent) =>
    {
        let delta: {x: number, y: number}
        if (props.scale.isMain)
        {
            delta = {x: e.pageX - startPosition.current.x, y: e.pageY - startPosition.current.y}
        }
        else
        {
            delta = {
                x: (e.pageX - startPosition.current.x) * props.scale.scaleIndex,
                y: (e.pageY - startPosition.current.y) * props.scale.scaleIndex
            }
        }

        if (ref.current != null)
        {
            const newPos = {
                x: position.x + delta.x,
                y: position.y + delta.y
            }
            setPosition(newPos)
        }
    })

    const handleMouseUp = () =>
    {
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
        <svg
             ref={ref}
             style={styleSvg}
             className={styles.slide_item}
             xmlns="http://www.w3.org/2000/svg">
            <Figure figure={props.figure} scale={props.scale}/>
        </svg>
    )
}