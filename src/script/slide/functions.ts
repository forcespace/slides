import {Editor, Presentation, Slide, Background, Buffer, Text, FontStyle, Position, Border, Object, Figure, Image} from './slide';

function createEditor(): Editor {
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []},
        active: 0
    }
}

function createSlide(): Slide {
    return {
        background: {color: '', image: '', priority: 0},
        objects: []
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

//Добавление пустого слайда в коллекцию после активного
function addEmptySlide(editor: Editor): Editor {
    let newSlides: Array<Slide> = editor.presentation.slides
    const slide: Slide = createSlide()
    const index: number = editor.active
    newSlides.splice(index + 1, 0, slide)

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
    let newSlides: Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    let newIndex: number = 0;
    if (editor.active !== 0) {
        newIndex = editor.active - 1
    }
    newSlides.splice(index, 1)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: newIndex
    }
}

//Добавление слайда через Editor
// Функция добавления какого-то заполненного слайда и она работает
function addSlide(slide: Slide, editor: Editor): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides
    const index: number = editor.active
    newSlides.splice(index, 0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: index + 1
    }
}

//Перемещение слайда вверх в презентации
function moveSlideDownByStep(editor: Editor): Editor {
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== 0) {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active - 1
        addSlide(slide, newEditor)
    }
    return newEditor
}

function moveSlideTopByStep(editor: Editor): Editor {
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== newEditor.presentation.slides.length - 1) {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active + 1
        addSlide(slide, newEditor)
    }
    return newEditor
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

//
// function addTextEditorVersion(editor: Editor, text: Text): Editor {
//     return newEditor
// }

function addObject<ObjectType extends Text | Image | Figure>(slide: Slide, object: ObjectType): Slide
{
    const newSlide: Slide = {
        ...slide,
        objects: [
            ...slide.objects,
            object
        ]
    }
    return newSlide
}

function deleteObject(slide: Slide, index: number): Slide
{
    if (slide.objects.length > index) {
        const newObjects = [
            ...slide.objects
        ]

        newObjects.splice(index, 1)

        const newSlide: Slide = {
            ...slide,
            objects: newObjects
        }
        return newSlide
    }
    return slide
}

function replaceSlideObject<ObjectType extends Text | Image | Figure>(slide: Slide, index: number, object: ObjectType): Slide
{
    const newObjects = [
        ...slide.objects
    ]

    newObjects.splice(index, 1, object)

    const newSlide: Slide = {
        ...slide,
        objects: newObjects
    }

    return newSlide
}

function getSlideObject<ObjectType extends Text | Image | Figure>(slide: Slide, index: number): ObjectType
{
    return slide.objects[index] as ObjectType
}

function setObjectPosition<ObjectType>(object: ObjectType, position: Position): ObjectType
{
    const newObject = {
        ...object,
        leftTopPoint: position
    }
    return newObject
}

function setObjectBackground<ObjectType>(object: ObjectType, background: Background): ObjectType
{
    const newObject = {
        ...object,
        background: background
    }
    return newObject
}

// function makeObjectPropertyChanger(propertyName: keyof Object) {
//     return function<ObjectType extends Text | Image | Figure>(object: ObjectType, value: Pick<ObjectType, typeof propertyName>) {
//         return {
//             ...object,
//             [propertyName]: value
//         };
//     }
// }
//
// const setObjectPosition = makeObjectPropertyChanger("leftTopPoint");
// const setObjectBackground = makeObjectPropertyChanger("background");
// const setObjectBorder = makeObjectPropertyChanger("border");


//Вот тут все console.log

function createEditorForTest(): { presentation: { slides: Array<Slide>; title: string }; active: number; history: { undo: any[]; redo: any[] } } {
    let text1: Text = {
        leftTopPoint: {x: 1, y: 1},
        background: {color: "#111", priority: 1, image: ''},
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: "12"},
        width: 1,
        height: 1,
        active: false,
        priority: 2,
        content: "text target",
        type: 'Text',
        color: "#111",
        size: 3,
        font: '',
        fontStyle: ['italic']
    }

    let text2: Text = {
        leftTopPoint: {x: 2, y: 2},
        background: {color: "#222", priority: 1, image: ''},
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: "12"},
        width: 2,
        height: 2,
        active: false,
        priority: 2,
        content: "string",
        type: 'Text',
        color: "#222",
        size: 3,
        font: '',
        fontStyle: ['italic']
    }

    let slide: Slide = {
        background: {color: "#ac00dd", priority: 0, image: ''},
        objects: [text1, text2]
    }

    let slide2: Slide = {
        background: {color: "#ac0eed", priority: 1, image: ''},
        objects: [text1]
    }

    let slide3: Slide = {
        background: {color: "#a3effd", priority: 2, image: ''},
        objects: []
    }

    let slide4: Slide = {
        background: {color: "#000", priority: 3, image: ''},
        objects: [text2]
    }

    let slide5: Slide = {
        background: {color: "#fff", priority: 4, image: ''},
        objects: [text2, text1]
    }

    const slide31 = addObject<Text>(slide3, text2);
    const slide32 = addObject<Text>(slide31, text2);
    const slide33 = addObject<Text>(slide32, text1);
    const slide34 = addObject<Text>(slide33, text2);
    const slide35 = addObject<Text>(slide34, text2);

    const slide37 = deleteObject(slide35, 1);

    const currentObject = getSlideObject(slide37, 0);
    const newObject = setObjectPosition(currentObject, {x: 10, y: 10});
    const newObjectBack = setObjectBackground(currentObject, { color: 'fff'});
    const slide38 = replaceSlideObject(slide37, 0, newObjectBack);

    let slides: Array<Slide> = [slide, slide2, slide3, slide4, slide5]

    return {
        history: {undo: [], redo: []},
        presentation: {title: 'test', slides: slides},
        active: 2
    }
}

let textNotEmptySlide: Text = {
    leftTopPoint: {x: 1, y: 1},
    background: {color: "#111", priority: 1, image: ''},
    border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: "12"},
    width: 1,
    height: 1,
    active: false,
    priority: 2,
    content: "string",
    type: 'Text',
    color: "#111",
    size: 3,
    font: '',
    fontStyle: ['italic']
}

let slideNotEmpty: Slide = {
    background: {color: "#ac0eed", priority: 2, image: ''},
    objects: [textNotEmptySlide]
}

let editorToTest: any = createEditorForTest()
let editorToPrint: Editor = createEditor()

//console.log(setTitle("Hello", editorToPrint))
//editorToPrint = addEmptySlide(editorToTest)
//editorToPrint = deleteSlide(editorToTest)
//console.log(addSlide(slideNotEmpty,editorToPrint))
// console.log(moveSlideTopByStep(editorToTest))
//addEmptySlide(editorToPrint)
//console.log(moveSlideDownByStep(editorToTest))
let result = moveSlideTopByStep(editorToTest);
console.log(result);