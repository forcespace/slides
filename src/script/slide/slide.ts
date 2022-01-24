export type Editor = {
    history: History,
    presentation: Presentation
}

export type History = {
    past: Array<Presentation>,
    future: Array<Presentation>
}

export type Presentation = {
    title: string,
    color?: string,
    active: {
        slideIndex: number,
        activeObject: string
    }
    slides: Array<Slide>,
    viewShown: boolean
}

export type Slide = {
    id: string,
    background: Background,
    objects: Array<ObjectType>
}

export type Object = {
    id: string,
    leftTopPoint: Position,
    background: Background,
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

export type Dimensions = {
    width: number,
    height: number
}

export type ObjectType = Text | Image | Figure