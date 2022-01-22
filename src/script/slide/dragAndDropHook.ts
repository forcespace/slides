import React, {RefObject, useEffect, useRef} from 'react'
import {ObjectType} from './slide'

export function useDragAndDrop(
    ref: RefObject<HTMLDivElement>,
    object: ObjectType,
    setNewObject: React.Dispatch<React.SetStateAction<ObjectType>>,
    setAcive: () => void,
    onDragEnd: Function,
    isMain: boolean,
    scaleIndex: number
): void {
    const slideProportion = 1.78
    const fullWidth = 1231
    const startPosition = useRef({x: 0, y: 0})
    const position = useRef({x: object.leftTopPoint.x, y: object.leftTopPoint.y})

    useEffect(() => {
        const element: SVGSVGElement | HTMLImageElement | HTMLDivElement | null = ref.current
        if (element) {
            element.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            element && element.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    const handleMouseDown = (e: Event) => {
        if (!e.defaultPrevented) {
            const mouseEvent = e as MouseEvent
            startPosition.current.x = mouseEvent.pageX
            startPosition.current.y = mouseEvent.pageY
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
    }

    const handleMouseMove = ((e: MouseEvent) => {
        if (!e.defaultPrevented) {
            let delta: { x: number, y: number }
            if (isMain) {
                delta = {
                    x: e.pageX - startPosition.current.x,
                    y: e.pageY - startPosition.current.y
                }
            } else {
                delta = {
                    x: (e.pageX - startPosition.current.x) * scaleIndex,
                    y: (e.pageY - startPosition.current.y) * scaleIndex
                }
            }

            const newPos = {
                x: object.leftTopPoint.x + delta.x,
                y: object.leftTopPoint.y + delta.y
            }

            if (newPos.x <= fullWidth * scaleIndex - object.width && newPos.y <= fullWidth / slideProportion * scaleIndex - object.height && newPos.x >= 0 && newPos.y >= 0) {
                setNewObject({
                    ...object,
                    leftTopPoint: newPos
                })
                position.current = newPos
            }
        }
    })

    const handleMouseUp = (e: MouseEvent) => {
        if (!e.defaultPrevented) {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            setAcive()
            onDragEnd(position.current)
        }
    }
}

