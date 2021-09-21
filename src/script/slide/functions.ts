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
    Figure
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
function cutSlide(slides, index) {
}

/**
 * paste slide, поместить слайд из буффера в видимую коллекцию
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function pasteSlide(slides, index) {
}

/**
 * duplicate slide, поместить копию слайда следом
 * @param {Slides} slides
 * @param {string} index
 * @return {Slides} return new collection
 */
function duplicateSlide(slides, index) {
}

/**
 * get slide
 * @param {Slides} slides
 * @param {string} index
 * @return {Slide} return slide
 */
function getSlide(slides, index) {
}

//slide
/**
 * set background
 * @param {Slide} slide
 * @param {Background} background
 * @return {Slide}
 */
function setBackground(slide, background) {
}

/**
 * activate slide
 * @param {Slide} slide
 * @return {Slide}
 */
function activateSlide(slide) {
}

//content

/**
 * add content: Text
 * @param {Slide} slide
 * @param {Text} text
 * @return {Slide} return Slide
 */
function addText(slide, text) {
}

/**
 * delete content: Text
 * @param {Slide} slide
 * @param {string} textIndex
 * @return {Slide} return new Slide
 */
function deleteText(slide, textIndex) {
}

/**
 * set Position Text
 * @param {Slide} slide
 * @param {Text} text
 * @param {Position} position
 * @return {Text}
 */
function setPositionText(slide, text, position) {
}

/**
 * add content: Image
 * @param {Slide} slide
 * @param {Image} image
 * @return {Slide} return new Slide
 */
function addImage(slide, image) {
}

/**
 * delete content: Image
 * @param {Slide} slide
 * @param {string} imageIndex
 * @return {Slide} return new Slide
 */
function deleteImage(slide, imageIndex) {
}

/**
 * set Position Image
 * @param {Slide} slide
 * @param {Image} image
 * @param {Position} position
 * @return {Image}
 */
function setPositionImage(slide, image, position) {
}

/**
 * add content: Figure
 * @param {Slide} slide
 * @param {Figure} figure
 * @return {Slide} return new Slide
 */
function addFigure(slide, figure) {
}

/**
 * delete content: Figure
 * @param {Slide} slide
 * @param {string} figureIndex
 * @return {Slide} return new Slide
 */
function deleteFigure(slide, images) {
}

/**
 * set Position Figure
 * @param {Slide} slide
 * @param {Figure} figure
 * @param {Position} position
 * @return {Figure}
 */
function setPositionFigure(slide, figure, position) {
}

