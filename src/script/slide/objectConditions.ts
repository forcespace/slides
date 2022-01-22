import {ObjectType, Position} from './slide'

function getRecalculatedObject(object: ObjectType, scaleIndex: number): ObjectType {
    const strokeSize = object.border ? object.border.borderSize * scaleIndex : 0

    const leftTopPoint: Position = {
        x: object.leftTopPoint.x * scaleIndex,
        y: object.leftTopPoint.y * scaleIndex
    }

    const width = object.width * scaleIndex + 2 * strokeSize
    const height = object.height * scaleIndex + 2 * strokeSize

    return {
        ...object,
        leftTopPoint: leftTopPoint,
        width: width,
        height: height
    }
}

export {
    getRecalculatedObject
}