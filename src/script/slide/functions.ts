import {Editor, Presentation, Slide, SlideBackground} from './slide';

function createEditor(): Editor {
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []}
    }
}

function exportProjectToPdf(presentation: Presentation): void {
    // как генерить в пдф и сохранить
}

function saveProjectLocal(presentation: Presentation): void {
    // как сохранить в формате json
}

function importProject(filePath: string): Editor {
    // 1. скачать файл по выбранному пути
    // 2. взять данные
    // 3. создать едитор с данными из файла
    // const editor: Editor = createEditor()
    // return editor
}

function setTitle(newTitle: string, presentation: Presentation): Presentation {
    return {
        title: newTitle,
        slides: presentation.slides
    }
}

//!!Основной вопрос: везде ли должен возвращаться Editor?
//На этот случай продублировала функции с <name>EditorVersion
//Начала расписывать реализацию
//если через Editor
function setTitleEditorVersion(newTitle: string, editor: Editor): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

//Добавление слайда в конец коллекции
function addSlideToEnd(slide: Slide, presentation: Presentation): Presentation {
    const newSlides : Array<Slide> = presentation.slides
    newSlides.push(slide)

    return {
        ...presentation,
        slides: newSlides
    }
}

//Добавление слайда в конец коллекции через Editor
function addSlideToEndEditorVersion(slide: Slide, editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides
    newSlides.push(slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

//Добавление слайда
function addSlideByIndex(slide: Slide, index: number, presentation: Presentation): Presentation {
    const newSlides : Array<Slide> = presentation.slides

    return {
        ...presentation,
        slides: newSlides.splice(index,0, slide)
    }
}

//Добавление слайда через Editor
function addSlideEditorVersion(slide: Slide, index: number, editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides.splice(index,0, slide)
        }
    }
}

//Удаление слайда из презентации
function deleteSlide(index: number, presentation: Presentation): Presentation {
    const newSlides : Array<Slide> = presentation.slides
    return {
        ...presentation,
        slides: newSlides.splice(index,1)
    }
}

//Удаление слайда через Editor
function deleteSlideEditorVersion(index: number, editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides.splice(index,1)
        }
    }
}

//Перемещение слайда в презентации
function moveSlide(slideIndex: number, finalIndex: number, presentation: Presentation): Presentation {
    return newPresentation
}

//Перемещение слайда в презентации
function moveSlideEditorVersion(slideIndex: number, finalIndex: number, editor: Editor): Editor {
    return newEditor
}

//Копирование слайда
function copySlide(index: number, presentation: Presentation): Presentation {
    return newPresentation
}

function copySlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

function cutSlide(index: number, presentation: Presentation): Presentation {
    return newPresentation
}

function cutSlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

function pasteSlide(index: number, presentation: Presentation): Presentation{
    return newPresentation
}

function pasteSlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

function duplicateSlide(index: number, presentation: Presentation): Presentation{
    return newPresentation
}

function duplicateSlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

//Устанавливает Слайду active?
function getSlide(index: number, presentation: Presentation): Presentation {
    return newPresentation
}

function getSlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

function setBackground(presentation: Presentation, background: SlideBackground): Presentation {
    return newPresentation
}
function setBackgroundEditorVersion(editor: Editor, background: SlideBackground): Editor {
    return newEditor
}

function activateSlide(slide: Slide): Slide {
    return newSlide
}
function activateSlideEditorVersion(index: number, editor: Editor): Editor {
    return newEditor
}

//content
//Относительно новой структуры не понимаю как элементы будут позиционироваться по z оси

/**
 * add content: Text
 * @param {Slide} slide
 * @param {Text} text
 * @return {Slide} return Slide
 */
function addText(slide: Slide, text: Text): Slide {
    return slide
}

function addTextEditorVersion(editor: Editor, text: Text): Editor {
    return newEditor
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