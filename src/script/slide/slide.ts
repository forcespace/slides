const Priority: 'Image' | 'Color' = 'Color';
const SetFigure: 'Triangle' | 'Rectangle' | 'Ellipse' = 'Ellipse';
const Mode: 'View' | 'Editor' = 'Editor';

type Editor = {
    mode: string,
    palette: ColorSquares,
    history: string,
    presentation: Presentation,
}

type ColorSquares = {
    colorSquares: ColorSquare[],
}

type ColorSquare = {
    width: number,
    height: number,
    color: string,
    active: boolean,
}

type Presentation = {
    title: string,
    slides: Slides,
}

type Slides = {
    active: number,
    slides: Slide[],
}

type Slide = {
    title: string,
    background: Background,
    texts: Texts,
    images: Images,
    figures: Figures,
};

type Texts = {
    texts: TextSlide[],
}

type Images = {
    images: Image[],
}

type Figures = {
    figures: Figure[],
}

type Background = {
    color: string,
    image: string,
    priority: string,
};

type TextSlide = {
    content: string,
    fontsize: number,
    font: string,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    color: string,
    active: boolean,
    width: number,
    position: Position,
}

type Position = {
    x: number,
    y: number,
    z: number,
}

type Image = {
    src: string,
    active: boolean,
    width: number,
    height: number,
    position: Position,
}

type Figure = {
    type: string,
    active: boolean,
    fill: string,
    border: string,
    transform: Transform,
    width: number,
    height: number,
    position: Position,
}

type Transform = {
    rotate: number,
    scale: number,
}


export {
    Priority
};

export type {
    Editor,
    Presentation,
    Slides,
    Slide,
    Texts,
    TextSlide,
    Images,
    Image,
    Figures,
    Figure,
    Background,
    Position
};