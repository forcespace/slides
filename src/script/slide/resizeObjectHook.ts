import React, {RefObject, useEffect, useRef} from 'react'

export function useResize(
    ref: RefObject<HTMLDivElement>,
    objectParams: { x: number, y: number, width: number, height: number },
    setWidth: React.Dispatch<React.SetStateAction<number>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setAcive: Function,
    onResizeEnd: Function,
    isMain: boolean,
    scaleIndex: number
): void {
    const slideProportion = 1.78
    const fullWidth = 1231
    const startPosition = useRef({x: 0, y: 0})
    const condition = useRef({width: objectParams.width, height: objectParams.height})

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

            const newWidth = objectParams.width + delta.x
            const newHeight = objectParams.height + delta.y

            if (newWidth + objectParams.x <= fullWidth * scaleIndex && newHeight + objectParams.y <= fullWidth / slideProportion * scaleIndex) {
                // console.log('newWidth = ', newWidth)
                // console.log('fullWidth * scaleIndex = ', fullWidth * scaleIndex)
                setWidth(newWidth)
                setHeight(newHeight)
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

