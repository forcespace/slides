import React, {useRef, useEffect, useLayoutEffect} from 'react'
import {editor} from './script/slide/editor'

const slides = editor.presentation.slides
const activeSlide = slides.active

type Figure = {
    type: string,
    active: boolean,
    fill: string,
    border: string,
    transform: string,
    width: number
    height: number,
    position: {
        x: number,
        y: number,
        z: number,
    }
}

type TextBlock = {
    content: string,
    fontsize: number,
    font: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    color: string,
    active: boolean,
    width: number,
    position: {
        x: number,
        y: number,
        z: number
    }
}

function paint(ctx: CanvasRenderingContext2D) {
    paintFigure(ctx)
    paintText(ctx)
}

function paintFigure(ctx: CanvasRenderingContext2D) {
    slides.slide.forEach((slide) => {
        slide.figures.forEach((figure: Figure) => {
            switch (figure.type) {
                case 'треугольник': {
                    drawTriangle(ctx, figure)
                    break
                }
                case 'прямоугольник': {
                    drawRect(ctx, figure)
                    break
                }
            }
        })
    })
}

function paintText(ctx: CanvasRenderingContext2D) {
    slides.slide.forEach((slide) => {
        slide.texts.forEach((textBlock: TextBlock) => {
            drawText(ctx, textBlock)
        })
    })
}

function drawTriangle(ctx: CanvasRenderingContext2D, figure: Figure) {
    if (figure.fill !== '') {
        ctx.fillStyle = figure.fill
        ctx.beginPath()
        ctx.moveTo(figure.position.x + figure.width / 2, figure.position.y)
        ctx.lineTo(figure.position.x, figure.position.y + figure.height)
        ctx.lineTo(figure.position.x + figure.width, figure.position.y + figure.height)
        ctx.fill()
    }

    if (figure.border !== '') {
        ctx.fillStyle = figure.border
        ctx.beginPath()
        ctx.moveTo(figure.position.x + figure.width / 2, figure.position.y)
        ctx.lineTo(figure.position.x, figure.position.y + figure.height)
        ctx.lineTo(figure.position.x + figure.width, figure.position.y + figure.height)
        ctx.lineTo(figure.position.x + figure.width / 2, figure.position.y)
        ctx.stroke()
    }
}

function drawRect(ctx: CanvasRenderingContext2D, figure: Figure) {
    if (figure.fill !== '') {
        ctx.fillStyle = figure.fill
        ctx.beginPath()
        ctx.fillRect(figure.position.x, figure.position.y, figure.width, figure.height)
        ctx.fill()
    }

    if (figure.border !== '') {
        ctx.fillStyle = figure.border
        ctx.beginPath()
        ctx.fillRect(figure.position.x, figure.position.y, figure.width, figure.height)
        ctx.stroke()
    }
}

function drawText(ctx: CanvasRenderingContext2D, text: TextBlock) {
    if (text.color !== '') {
        ctx.fillStyle = text.color
        ctx.beginPath()
        ctx.font = `${text.fontsize} ${text.font}`
        ctx.fillText(text.content, text.position.x, text.position.y, text.width)
        ctx.fill()
    }

    if (text.color == '') {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.font = `${text.fontsize}px ${text.font}`
        ctx.fillText(text.content, text.position.x, text.position.y, text.width)
        ctx.stroke()
    }
}

export {
    paint,
}