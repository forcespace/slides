import React, {RefObject, useEffect, useRef} from 'react'
import {ObjectType} from './slide'

export function useResize(
    ref: RefObject<HTMLDivElement>,
    object: ObjectType,
    setNewObject: React.Dispatch<React.SetStateAction<ObjectType>>,
    setAcive: () => void,
    onResizeEnd: Function,
    isMain: boolean,
    scaleIndex: number
): void {
    const slideProportion = 1.78
    const fullWidth = 1231
    const startPosition = useRef({x: 0, y: 0})
    const condition = useRef({width: object.width, height: object.height})

    useEffect(() => {
        const element: HTMLDivElement | null = ref.current
        if (element) {
            element.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            element && element.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    const handleMouseDown = (e: Event) => {
        e.preventDefault()
        if (e.defaultPrevented) {
            setAcive()
            const mouseEvent = e as MouseEvent
            startPosition.current.x = mouseEvent.pageX
            startPosition.current.y = mouseEvent.pageY
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
    }

    const handleMouseMove = ((e: MouseEvent) => {
        e.preventDefault()
        if (e.defaultPrevented) {
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

            const newWidth = object.width + delta.x
            const newHeight = object.height + delta.y

            if (newWidth + object.leftTopPoint.x <= fullWidth * scaleIndex && newHeight + object.leftTopPoint.y <= fullWidth / slideProportion * scaleIndex) {
                setNewObject({
                    ...object,
                    width: newWidth,
                    height: newHeight
                })
                condition.current = {
                    width: newWidth,
                    height: newHeight
                }
            }
        }
    })

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        onResizeEnd(condition.current.width, condition.current.height)
    }
}

