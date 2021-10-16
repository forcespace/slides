import React, {useRef, useEffect, useLayoutEffect} from 'react'
import {paint} from './CanvasPainter'

const CanvasContainer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (null !== canvasRef.current) {
            const canvas = canvasRef.current
            resizeCanvasToDisplaySize(canvas)
            const context = canvas.getContext('2d')
            canvas.width = 500
            canvas.height = 300
            if (null !== context) {
                paint(context)
            }
        }
    }, [paint])

    return <canvas ref={canvasRef}/>;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    const {width, height} = canvas.getBoundingClientRect()
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        return true
    }
    return false
}


export {
    CanvasContainer,
}