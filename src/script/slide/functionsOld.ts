import {Editor, Presentation, Slide, Background, Text, FontStyle, Position, ObjectType, Border, Object, Figure, Image} from './slide';

function createEditor(): Editor
{
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []},
        active: 0
    }
}

function createSlide(): Slide
{
    return {
        background: {color: '', image: '', priority: 0},
        objects: []
    }
}

function exportProjectToPdf(presentation: Editor): void
{
    // как генерить в пдф и сохранить
}

function saveProjectLocal(presentation: Editor): void
{
    // как сохранить в формате json
}

/*function importProject(filePath: string): Editor {
    // 1. скачать файл по выбранному пути
    // 2. взять данные
    // 3. создать едитор с данными из файла
    // const editor: Editor = createEditor()
    // return editor
}*/

export function setTitle(editor: Editor, newTitle: string): Editor
{
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

//Добавление пустого слайда в коллекцию после активного
function addEmptySlide(editor: Editor): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides
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
function deleteSlide(editor: Editor): Editor
{
    let newSlides: Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    let newIndex: number = 0;
    if (editor.active !== 0)
    {
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
function addSlide(slide: Slide, editor: Editor): Editor
{
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
function moveSlideDownByStep(editor: Editor): Editor
{
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== 0)
    {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active - 1
        addSlide(slide, newEditor)
    }
    return newEditor
}

function moveSlideTopByStep(editor: Editor): Editor
{
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== newEditor.presentation.slides.length - 1)
    {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active + 1
        addSlide(slide, newEditor)
    }
    return newEditor
}

// Функции пока можно не реализовывать, т.к. реализация связана с Буфером Браузера
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

//Пока не удаляю функции, который возвращают не Editor, на всякий случай.
//Вынесла типы в коллекцию и избавилась от extends в функциях
function addObject(slide: Slide, object: ObjectType): Slide
{
    return {
        ...slide,
        objects: [
            ...slide.objects,
            object
        ]
    }
}

function deleteObject(slide: Slide, index: number): Slide
{
    if (slide.objects.length > index)
    {
        const newObjects = [
            ...slide.objects
        ]

        newObjects.splice(index, 1)

        return {
            ...slide,
            objects: newObjects
        }
    }
    return slide
}

function replaceSlideObject(slide: Slide, index: number, object: ObjectType): Slide
{
    const newObjects = [
        ...slide.objects
    ]

    newObjects.splice(index, 1, object)

    return {
        ...slide,
        objects: newObjects
    }
}

function getSlideObject(slide: Slide, index: number): ObjectType
{
    return slide.objects[index] as ObjectType
}

function setObjectPosition(object: ObjectType, position: Position): ObjectType
{
    return {
        ...object,
        leftTopPoint: position
    }
}

function setObjectBackground(object: ObjectType, background: Background): ObjectType
{
    return {
        ...object,
        background: background
    }
}

// function makeObjectPropertyChanger(propertyName: keyof Object) {
//     return function(object: ObjectType, value: Pick<ObjectType, typeof propertyName>) {
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

function replaceActiveSlide(editor: Editor, newSlide: Slide): Editor
{
    let newSlides: Array<Slide> = {
        ...editor.presentation.slides
    }

    newSlides[editor.active] = newSlide

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

//Editor version
//переделала функции под Editor, нужна проверка на всякий случай.
function addObjectEditorVersion(editor: Editor, object: ObjectType): Editor
{
    const newSlide: Slide = {
        ...editor.presentation.slides[editor.active],
        objects: [
            ...editor.presentation.slides[editor.active].objects,
            object
        ]
    }

    return replaceActiveSlide(editor, newSlide)
}

function deleteObjectEditorVersion(editor: Editor, index: number): Editor
{
    if (editor.presentation.slides[editor.active].objects.length > index)
    {
        const newObjects = [
            ...editor.presentation.slides[editor.active].objects
        ]

        newObjects.splice(index, 1)

        const newSlide: Slide = {
            ...editor.presentation.slides[editor.active],
            objects: newObjects
        }

        return replaceActiveSlide(editor,newSlide)
    }
    return editor
}

function replaceSlideObjectEditorVersion(editor: Editor, index: number, object: ObjectType): Editor
{
    deleteObjectEditorVersion(editor,index);
    addObjectEditorVersion(editor,object);
    return editor
}

function replaceObjects(editor: Editor, indexActiveObject: number, newObject: ObjectType)
{
    const newObjects: Array<ObjectType> = {
        ...editor.presentation.slides[editor.active].objects
    }

    newObjects[indexActiveObject] = newObject

    const newSlide: Slide = {
        ...editor.presentation.slides[editor.active],
        objects: newObjects
    }

    return replaceActiveSlide(editor, newSlide)
}

//Здесь добавила index, т.к. пока непонятно какой элемент внутри слайда активный
function setObjectPositionEditorVersion(editor: Editor, indexActiveObject: number, position: Position): Editor
{
    const newObject: ObjectType = {
        ...editor.presentation.slides[editor.active].objects[indexActiveObject],
        leftTopPoint: position
    };

    return replaceObjects(editor, indexActiveObject, newObject)
}

function setObjectBackgroundEditorVersion(editor: Editor, indexActiveObject: number, background: Background): Editor
{
    const newObject: ObjectType = {
        ...editor.presentation.slides[editor.active].objects[indexActiveObject],
        background: background
    }

    return replaceObjects(editor, indexActiveObject, newObject)
}

//Непонятно как getSlideObject переделать в Editor Version, есть предположение, что функция должна менять,
//Список активных элементов. Хочется для активного объекта, куда-то вынести active, так же как это сделано для
//слайда

export {
    createEditor
}
//Вот тут все console.log

function createEditorForTest(): { presentation: { slides: Array<Slide>; title: string }; active: number; history: { undo: any[]; redo: any[] } }
{
    let text1: Text = {
        leftTopPoint: {x: 1, y: 1},
        background: {color: "#111", priority: 1, image: ''},
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: 12},
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
        border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: 12},
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

    // const slide31 = addObject(slide3, text2);
    // const slide32 = addObject(slide31, text2);
    // const slide33 = addObject(slide32, text1);
    // const slide34 = addObject(slide33, text2);
    // const slide35 = addObject(slide34, text2);
    // const slide37 = deleteObject(slide35, 1);
    // const currentObject = getSlideObject(slide37, 0);
    //const newObject = setObjectPosition(currentObject, {x: 10, y: 10});
    // setObjectBackground(currentObject, {color: 'fff', priority:1});
    //const slide38 = replaceSlideObject(slide37, 0, newObjectBack);

    let slides: Array<Slide> = [slide, slide2, slide3, slide4, slide5]

    return {
        history: {undo: [], redo: []},
        presentation: {title: 'test', slides: slides},
        active: 4
    }
}

let textNotEmptySlide: Text = {
    leftTopPoint: {x: 1, y: 1},
    background: {color: "#111", priority: 1, image: ''},
    border: {borderStyle: 'Dashed', borderColor: "#111", borderSize: 12},
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

//addObjectEditorVersion<Text>(editorToTest,textNotEmptySlide)
//console.log(setTitle("Hello", editorToPrint))
//editorToPrint = addEmptySlide(editorToTest)
//editorToPrint = deleteSlide(editorToTest)
//console.log(addSlide(slideNotEmpty,editorToPrint))
// console.log(moveSlideTopByStep(editorToTest))
//addEmptySlide(editorToPrint)
//console.log(moveSlideDownByStep(editorToTest))
let result = deleteObjectEditorVersion(editorToTest,1);
console.log(result.presentation.slides[result.active].objects);


//todo
// собрать все параметры в один объект