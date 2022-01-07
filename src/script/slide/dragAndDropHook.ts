import React, {RefObject, useEffect, useRef} from 'react'

export function useDragAndDrop(
    ref: RefObject<SVGSVGElement>, 
    objectParams: {x: number, y: number, width: number, height: number},
    setPosition: React.Dispatch<React.SetStateAction<{x: number, y: number}>>,
    setDragEnd: React.Dispatch<React.SetStateAction<boolean>>,
    isMain: boolean,
    scaleIndex: number,
): void {
    const slideProportion = 1.78
    const fullWidth = 1231
    const startPosition = useRef({x: 0, y: 0})

    useEffect(() => {
        const element: SVGSVGElement | null = ref ? ref.current : null
        if(element) {
            element.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            element && element.removeEventListener('mousedown', handleMouseDown)
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
        if (isMain)
        {
            delta = {x: e.pageX - startPosition.current.x, y: e.pageY - startPosition.current.y}
        }
        else
        {
            delta = {
                x: (e.pageX - startPosition.current.x) * scaleIndex,
                y: (e.pageY - startPosition.current.y) * scaleIndex
            }
        }

        const newPos = {
            x: objectParams.x + delta.x,
            y: objectParams.y + delta.y
        }

        if(newPos.x <= fullWidth * scaleIndex - objectParams.width && newPos.y <= fullWidth / slideProportion * scaleIndex - objectParams.height && newPos.x >= 0 && newPos.y >= 0) {
            setPosition(newPos)
        }
    })

    const handleMouseUp = (e: MouseEvent) =>
    {
        setDragEnd(true)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
}

