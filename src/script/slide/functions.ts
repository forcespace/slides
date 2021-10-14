import {Editor, Presentation, Slide, Background, Buffer, Text, FontStyle, Position, Border, Object} from './slide';

function createEditor(): Editor {
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []},
        active: 0
    }
}

function createSlide(): Slide {
    return {
        background: {color: '', image:'', priority: 0},
        objects: [[],[],[]]
    }
}

function exportProjectToPdf(presentation: Editor): void {
    // как генерить в пдф и сохранить
}

function saveProjectLocal(presentation: Editor): void {
    // как сохранить в формате json
}

/*function importProject(filePath: string): Editor {
    // 1. скачать файл по выбранному пути
    // 2. взять данные
    // 3. создать едитор с данными из файла
    // const editor: Editor = createEditor()
    // return editor
}*/

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
//Функция добавления какого-то заполненного слайда и она не работает
/*
    function addSlide(slide: Slide, editor: Editor): Editor {
    const newSlides : Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides.splice(index,0, slide)
        },
        active: index + 1
    }
}*/

//Добавление пустого слайда в коллекцию после активного
function addSlide(editor: Editor): Editor {
    let newSlides : Array<Slide> = editor.presentation.slides
    const slide: Slide = createSlide()
    const index: number = editor.active
    newSlides.splice(index,0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: index + 1
    }
}

//Удаление активного слайда из коллекции
function deleteSlide(editor: Editor): Editor {
    let newSlides : Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    let newIndex: number = 0;
    if (editor.active !== 0)
    {
        newIndex = editor.active - 1
        newSlides = newSlides.splice(index,1)
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
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

// function copySlide(index: number, editor: Editor): Editor {
//     return newEditor
// }
//
// function cutSlide(index: number, editor: Editor): Editor {
//     return newEditor
// }
//
// function pasteSlide(index: number, editor: Editor): Editor {
//     return newEditor
// }
//
// function duplicateSlide(index: number, editor: Editor): Editor {
//     return newEditor
// }
//
// // можно ли исп общую функцию? Что передавать?
// function getActiveEl(index: number, editor: Editor): Editor {
//     return newEditor
// }
//
// function setBackground(editor: Editor, background: SlideBackground): Editor {
//     return newEditor
// }
//
// //content
// //Относительно новой структуры не понимаю как элементы будут позиционироваться по z оси
//
// /!**
//  * add content: Text
//  * @param {Slide} slide
//  * @param {Text} text
//  * @return {Slide} return Slide
//  *!/
// function addText(slide: Slide, text: Text): Slide {
//     return slide
// }
//
// function addTextEditorVersion(editor: Editor, text: Text): Editor {
//     return newEditor
// }
//
// /!**
//  * delete content: Text
//  * @param {Slide} slide
//  * @param {string} textIndex
//  * @return {Slide} return new Slide
//  *!/
// function deleteText(slide:Slide, textIndex: string): Slide {
//     return slide
// }
//
// /!**
//  * set Position Text
//  * @param {Slide} slide
//  * @param {Text} text
//  * @param {Position} position
//  * @return {Text}
//  *!/
// function setPositionText(slide: Slide, text: Text, position: Position): Text {
//     return text
// }
//
// /!**
//  * add content: Image
//  * @param {Slide} slide
//  * @param {Image} image
//  * @return {Slide} return new Slide
//  *!/
// function addImage(slide: Slide, image: Image): Slide {
//     return slide
// }
//
// /!**
//  * delete content: Image
//  * @param {Slide} slide
//  * @param {string} imageIndex
//  * @return {Slide} return new Slide
//  *!/
// function deleteImage(slide: Slide, imageIndex: string): Slide {
//     return slide
// }
//
// /!**
//  * set Position Image
//  * @param {Slide} slide
//  * @param {Image} image
//  * @param {Position} position
//  * @return {Image}
//  *!/
// function setPositionImage(slide: Slide, image: Image, position: Position): Image {
//     return image
// }
//
// /!**
//  * add content: Figure
//  * @param {Slide} slide
//  * @param {Figure} figure
//  * @return {Slide} return new Slide
//  *!/
// function addFigure(slide: Slide, figure: Figure): Slide {
//     return slide
// }
//
// /!**
//  * delete content: Figure
//  * @param {Slide} slide
//  * @param {string} figureIndex
//  * @return {Slide} return new Slide
//  *!/
// function deleteFigure(slide: Slide, figureIndex: string): Slide {
//     return slide
// }
//
// /!**
//  * set Position Figure
//  * @param {Slide} slide
//  * @param {Figure} figure
//  * @param {Position} position
//  * @return {Figure}
//  *!/
// function setPositionFigure(slide: Slide, figure: Figure, position: Position): Figure {
//     return figure
// }


//Вот тут все console.log

function createEditorForTest(): Editor {
    let text1 :Text = {
        leftTopPoint: Position,
        background: Background,
        border: Border,
        width: number,
        height: number,
        active: boolean,
        priority: number,

    }
    let text2 :Text = {
        content: "2"
    }

    let slide : Slide  = {
        background: #fff,
        objects: [[],[],[]]

    }


    return {
        history: {undo: [], redo: []},
        presentation: {title: 'test', slides: slide},
        active: 5
    }
}

let editor: Editor = createEditor()
let editorToPrint: Editor = createEditor()

console.log(setTitle("Hello", editor))
editorToPrint = addSlide(editor)
console.log(editorToPrint)
editor = deleteSlide(editorToPrint)
console.log(editor)
editor = deleteSlide(editorToPrint)
console.log(editor)



