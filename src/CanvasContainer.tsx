import React, {useRef, useEffect, useLayoutEffect} from 'react'
import {paint} from './CanvasPainter'
import './App.css';

const CanvasContainer = (props: { width: number; height: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (null !== canvasRef.current) {
            const canvas = canvasRef.current
            resizeCanvasToDisplaySize(canvas)
            const context = canvas.getContext('2d')
            canvas.width = props.width
            canvas.height = props.height
            if (null !== context) {
                paint(context)
            }
        }
    }, [paint])

    return <canvas className = "canvas" ref={canvasRef}/>;
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