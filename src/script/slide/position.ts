import {Dimensions, ObjectType, Position} from './slide'

function getSlideObjectСondition(object: ObjectType, scaleIndex: number): Position & Dimensions & {borderSize: number} {
    const originalBorderSize = object.border ? object.border.borderSize : 0
    return {
        x: object.leftTopPoint.x,
        y: object.leftTopPoint.y,
        width: (object.width + 2 * originalBorderSize) * scaleIndex,
        height: (object.width + 2 * originalBorderSize) * scaleIndex,
        borderSize: originalBorderSize * scaleIndex
    }
}

function getOriginPosition(position: Position, scaleIndex: number): Position {
    return {
        x: position.x / scaleIndex,
        y: position.y / scaleIndex
    }
}

export {
    getSlideObjectСondition,
    getOriginPosition
}