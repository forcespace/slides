export type Editor = {
    history: History,
    presentation: Presentation,
    active: number
}

export type History = {
    undo?: Array<Presentation>
    redo?: Array<Presentation>
}

export type Presentation = {
    title: string,
    slides: Array<Slide>
}

export type Slide = {
    id: string,
    background: Background,
    objects: Array<ObjectType>
}

export type Object = {
    id: string,
    leftTopPoint: Position,
    background?: Background,
    border?: Border,
    width: number,
    height: number,
    active: boolean,
    priority: number
}

export type Text = Object & {
    content: string,
    type: 'Text',
    color?: string,
    size: number,
    font?: string,
    fontStyle?: Array<FontStyle>
}

export type FontStyle = 'italic' | 'bold' | 'underline' | 'none'

export type Border = {
    borderSize: number,
    borderColor: string,
    borderStyle: 'Dashed' | 'Solid'
}

export type Image = Object & {
    type: 'Image',
    src: string
}

export type Figure = Object & {
    type: shapeType,
}

export type shapeType = 'Triangle' | 'Circle' | 'Rect'

export type Background = {
    color?: string,
    image?: string,
    priority: number
}

export type Position = {
    x: number,
    y: number
}

export type ObjectType = Text | Image | Figure