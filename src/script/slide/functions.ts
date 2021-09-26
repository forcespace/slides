import {
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
    Position,
} from "./slide";

//editor
/**
 * choice mode
 * @param {Editor} editor
 * @param {string} mode
 * @return {Editor}
 */
function choiceMode(mode: string, editor: Editor): Editor {
    return editor
}

//presentation
/**
 * create new
 * @return {Editor} //или возвращаем Presentation, у нас Editor включает в себя объект Presentation?
 */
function createEditor(): Editor {
    const editor: Editor = {mode = ''}

    return editor
}

//presentation
/**
 * create new
 * @param {Editor} editor
 * @return {Editor} //или возвращаем Presentation, у нас Editor включает в себя объект Presentation?
 */
function createProject(editor: Editor): Editor {
    return editor
}

/**
 * export presentation
 * @param {Presentation} presentation
 * @return {File}
 */
function exportProject(presentation: Presentation): string {
    return ''
}

/**
 * import presentation
 * @param {string} filePath
 * @return {Editor} //или возвращаем Presentation, у нас Editor включает в себя объект Presentation?
 */
function importProject(filePath: string): Editor {
    const editor: Editor = createEditor()
    return editor
}

// /**
//  * public presentation
//  * @param {Presentation} presentation
//  * @return {File}
//  */
// function publicProject(presentation) {}

/**
 * autosave - не факт что нужно добавлять функцию
 * @param {Presentation} presentation
 * @return {Presentation}
 */
function autoSavePresentation(presentation: Presentation): Presentation{
    return presentation
}

//title
/**
 * set title
 * @param {string} title
 * @param {Presentation} presentation
 * @return {Presentation}
 */
function setTitle(title: string, presentation: Presentation): Presentation {
    return presentation
}

//slides
/**
 * add slide
 * @param {Slides} slides
 * @param {string} index  //у нас индекс в модели данных - это строка?
 * @return {Slides} return new collection
 */
function addSlide(slides: Slides, index: string): Slides {
    return slides
}

/**
 * delete slide
 * @param {Slides} slides
 * @param {string} index  //у нас индекс в модели данных - это строка?
 * @return {Slides} return new collection
 */
function deleteSlide(slides: Slides, index: string): Slides {
    return slides
}

/**
 * move slide
 * @param {Slides} slides
 * @param {string} indexOut
 * @param {string} indexIn
 * @return {Slides} return new collection
 */
function moveSlide(slides: Slides, indexOut: string, indexIn: string): Slides {
    return slides
}

/**
 * copy slide, пометить слайд, как добавленный в буфер - добавить в конец слайдов еще один, невидимый с типом буфер?
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function copySlide(slides: Slides, index: string): Slides {
    return slides
}

/**
 * cut slide, пометить слайд, как добавленный в буфер, уменьшить видимую коллекцию на 1 слайд
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function cutSlide(slides: Slides, index: string): Slides {
    return slides
}

/**
 * paste slide, поместить слайд из буффера в видимую коллекцию
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function pasteSlide(slides: Slides, index: string): Slides{
    return slides
}

/**
 * duplicate slide, поместить копию слайда следом
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function duplicateSlide(slides: Slides, index: string): Slides {
    return slides
}

/**
 * get slide
 * @param {Slides} slides
 * @param {string} index
 * @return {Slide} return slide
 */
function getSlide(slides: Slides, index: string): Slides {
    return slides
}

//slide
/**
 * set background
 * @param {Slide} slide
 * @param {Background} background
 * @return {Slide}
 */
function setBackground(slide: Slide, background: Background): Slide {
    return slide
}

/**
 * activate slide
 * @param {Slide} slide
 * @return {Slide}
 */
function activateSlide(slide: Slide): Slide {
    return slide
}

//content

/**
 * add content: Text
 * @param {Slide} slide
 * @param {Text} text
 * @return {Slide} return Slide
 */
function addText(slide: Slide, text: Text): Slide {
    return slide
}

/**
 * delete content: Text
 * @param {Slide} slide
 * @param {string} textIndex
 * @return {Slide} return new Slide
 */
function deleteText(slide:Slide, textIndex: string): Slide {
    return slide
}

/**
 * set Position Text
 * @param {Slide} slide
 * @param {Text} text
 * @param {Position} position
 * @return {Text}
 */
function setPositionText(slide: Slide, text: Text, position: Position): Text {
    return text
}

/**
 * add content: Image
 * @param {Slide} slide
 * @param {Image} image
 * @return {Slide} return new Slide
 */
function addImage(slide: Slide, image: Image): Slide {
    return slide
}

/**
 * delete content: Image
 * @param {Slide} slide
 * @param {string} imageIndex
 * @return {Slide} return new Slide
 */
function deleteImage(slide: Slide, imageIndex: string): Slide {
    return slide
}

/**
 * set Position Image
 * @param {Slide} slide
 * @param {Image} image
 * @param {Position} position
 * @return {Image}
 */
function setPositionImage(slide: Slide, image: Image, position: Position): Image {
    return image
}

/**
 * add content: Figure
 * @param {Slide} slide
 * @param {Figure} figure
 * @return {Slide} return new Slide
 */
function addFigure(slide: Slide, figure: Figure): Slide {
    return slide
}

/**
 * delete content: Figure
 * @param {Slide} slide
 * @param {string} figureIndex
 * @return {Slide} return new Slide
 */
function deleteFigure(slide: Slide, figureIndex: string): Slide {
    return slide
}

/**
 * set Position Figure
 * @param {Slide} slide
 * @param {Figure} figure
 * @param {Position} position
 * @return {Figure}
 */
function setPositionFigure(slide: Slide, figure: Figure, position: Position): Figure {
    return figure
}

