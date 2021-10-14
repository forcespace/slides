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
    newSlides.splice(index + 1,0, slide)

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

function createEditorForTest(): { presentation: { slides: Array<Slide>; title: string }; active: number; history: { undo: any[]; redo: any[] } } {
    let text1 :Text = {
        leftTopPoint: {x:1, y:1},
        background: {color: "#111", priority: 1, image:''},
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: "12"},
        width: 1,
        height: 1,
        active: false,
        priority: 2,
        content: "string",
        type: 'Text',
        color:  "#111",
        size: 3,
        font: '',
        fontStyle: ['italic']
    }
    let text2 :Text = {
        leftTopPoint: {x:2, y:2},
        background: {color: "#222", priority: 1, image:''},
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: "12"},
        width: 2,
        height: 2,
        active: false,
        priority: 2,
        content: "string",
        type: 'Text',
        color:  "#222",
        size: 3,
        font: '',
        fontStyle: ['italic']
    }

    let slide : Slide  = {
        background: {color: "#ac00dd", priority: 1, image:''},
        objects: [[text1,text2],[],[]]
    }

    let slide2 :Slide = {
        background: {color: "#ac0eed", priority: 2, image:''},
        objects: [[text1],[],[]]
    }

    let slide3 :Slide = {
        background: {color: "#a3effd", priority: 3, image:''},
        objects: [[],[],[]]
    }

    let slide4 :Slide = {
        background: {color: "#000", priority: 4, image:''},
        objects: [[text2],[],[]]
    }

    let slide5 :Slide = {
        background: {color: "#fff", priority: 5, image:''},
        objects: [[text2,text1],[],[]]
    }

    let slides: Array<Slide> = [slide2,slide,slide3,slide4,slide5]

    return {
        history: {undo: [], redo: []},
        presentation: {title: 'test', slides: slides},
        active: 2
    }
}

let editorToTest: any = createEditorForTest()
let editorToPrint: Editor = createEditor()
console.log(editorToTest)
// console.log(editorToPrint)

//console.log(setTitle("Hello", editorToPrint))

//editorToPrint = addSlide(editorToTest)
//console.log(editorToPrint)
//console.log(editorToPrint.presentation.slides[3])

console.log(editorToPrint)
editorToPrint = deleteSlide(editorToTest)
console.log(editorToPrint)

console.log(editorToPrint.presentation.slides[2])

//editor = deleteSlide(editorToPrint)
//console.log(editor)
//editor = deleteSlide(editorToPrint)
//console.log(editor)



