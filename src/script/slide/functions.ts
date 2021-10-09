import {Editor, Presentation, Slide, Background, Buffer} from './slide';

function createEditor(): Editor {
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []},
        active: 0
    }
}

function exportProjectToPdf(presentation: Editor): void {
    // как генерить в пдф и сохранить
}

function saveProjectLocal(presentation: Editor): void {
    // как сохранить в формате json
}

function importProject(filePath: string): Editor {
    // 1. скачать файл по выбранному пути
    // 2. взять данные
    // 3. создать едитор с данными из файла
    // const editor: Editor = createEditor()
    // return editor
}

//!!Основной вопрос: везде ли должен возвращаться Editor?
//На этот случай продублировала функции с <name>EditorVersion
//Начала расписывать реализацию
//если через Editor
function setTitle(newTitle: string, editor: Editor): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

//Добавление слайда через Editor
function addSlide(slide: Slide, editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides.splice(index,0, slide)
        }
    }
}

//Удаление слайда через Editor
function deleteSlide(editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    let newIndex: number = 0;

    if (editor.active !== 0)
    {
        newIndex = editor.active - 1
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides.splice(index,1)
        },
        active: newIndex
    }
}

//Перемещение слайда в презентации
function moveSlideTopByStep(editor: Editor): Editor {
    // const newSlides : Array<Slide> = editor.presentation.slides
    let newEditor: Editor = editor
    deleteSlide(newEditor);
    const index: number = editor.active - 1

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newEditor.presentation.slides.splice(index,0, editor.presentation.slides[editor.active])
        },
        active: index
    }
}

function copySlide(index: number, editor: Editor): Editor {
    return newEditor
}

function cutSlide(index: number, editor: Editor): Editor {
    return newEditor
}

function pasteSlide(index: number, editor: Editor): Editor {
    return newEditor
}

function duplicateSlide(index: number, editor: Editor): Editor {
    return newEditor
}

// можно ли исп общую функцию? Что передавать?
function getActiveEl(index: number, editor: Editor): Editor {
    return newEditor
}

function setBackground(editor: Editor, background: SlideBackground): Editor {
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