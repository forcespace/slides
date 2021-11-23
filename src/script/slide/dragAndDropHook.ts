import {useEffect, useState} from "react";

export function useDragAndDrop(ref: any, position: any, setPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number}>>) {

    let startPosition: {x: number, y: number}
    const offsetModel = {x: ref.current.getBoundingClientRect().left - position.x, y: ref.current.getBoundingClientRect().top - position.y}

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)

        console.log('x = ', ref.current.getBoundingClientRect().left)
        console.log('y = ', ref.current.getBoundingClientRect().top)
        console.log('offsetModel = ', offsetModel)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    })

    const handleMouseDown = (e: MouseEvent) => {
        startPosition = {x: e.pageX, y: e.pageY}
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = ((e: MouseEvent) => {
        const delta = {x: e.pageX - startPosition.x, y: e.pageY - startPosition.y}
        console.log('delta = ', delta)
        if (ref.current != null) {
            const newPos = {
                x: ref.current.getBoundingClientRect().left - offsetModel.x + delta.x,
                y: ref.current.getBoundingClientRect().top - offsetModel.y + delta.y
            }
            console.log('newPos = ', newPos)
            setPosition(newPos)
        }
    })

    const handleMouseUp = () => {
        setPosition(position => Object.assign({}, position, {coords: {}}))
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
}

