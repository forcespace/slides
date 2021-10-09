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
    //object: Array<Object>,
    objects: [Array<Text>, Array<Image>, Array<Figure>]
    active: boolean,
    //visible: boolean - для (не)видимости при копировании?
};

export type Object = {
    leftTopPoint: Position,
    background: Background,
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

export type Figure = Object & {
    type: shapeType,
}

export type shapeType = 'Triangle' | 'Circle' | 'Square'

export type Background = {

}

export type SlideBackground = {
    color: string,
    image: string,
    //что используется
};

export type Position = {
    x: number,
    y: number
}