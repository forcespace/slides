export type Editor = {
    history: History,
    presentation: Presentation
}

export type History = {
    undo: Array<Presentation>
    redo: Array<Presentation>
}

export type Presentation = {
    title: string,
    slides: Array<Slide>
}

export type Slide = {
    background: SlideBackground,
    object: Object[],
    active: boolean
};

export type Object = {
    leftTopPoint: Position,
    background: string,
    border: Border,
    width: number,
    height: number,
    active: boolean,
    priority: number
}

export type Text = Object & {
    content: string,
    type: 'Text',
    color: string
    size: number,
    font: string,
    fontStyle: Array<FontStyle>
}

export type FontStyle = 'italic' | 'bold' | 'underline' | 'none'

export type Border = {
    borderSize: string,
    borderColor: string,
    borderStyle: 'Dashed' | 'Solid'
}

export type Image = Object & {
    type: 'Image',
    src: string
}

export type Triangle = Object & {
    type: 'Triangle'
}

export type Circle = Object & {
    type: 'Circle'
}

export type Square = Object & {
    type: 'Square'
}

export type SlideBackground = {
    color: string,
    image: string
};

export type Position = {
    x: number,
    y: number
}