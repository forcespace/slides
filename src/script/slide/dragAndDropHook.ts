import React, {RefObject, useEffect, useRef} from 'react'

export function useDragAndDrop(
    ref: RefObject<SVGSVGElement>, //Ref<SVGSVGElement>,
    position: {x: number, y: number},
    setPosition: React.Dispatch<React.SetStateAction<{x: number, y: number}>>,
    isMain: boolean,
    scaleIndex: number,
): void {
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
            x: position.x + delta.x,
            y: position.y + delta.y
        }
        setPosition(newPos)
    })

    const handleMouseUp = (e: MouseEvent) =>
    {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
}

