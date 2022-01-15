import {Editor, ObjectType, Position, Presentation, Slide, History, UndoRedo, Image, Text} from './slide'

export function createUndoRedo(): UndoRedo {
    return {
        presentation: createEditor(),
        active: '',
        color: ''
    }
}

export function createEditor(): Editor {
    return {
        history: {undo: [], present: createUndoRedo(), redo: [], flag: 'empty', test: []},
        presentation: {
            title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
            slides: [createSlide()],
            active: 0,
            viewShown: false
        },
        active: '0',
        viewShown: false
    }
}

export function createPresentation(): Presentation {
    return {
        title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
        active: 0,
        slides: [createSlide()],
        viewShown: false
    }
}

export function createHistory(): History {
    return {
        undo: [createUndoRedo()],
        present: createUndoRedo(),
        redo: [createUndoRedo()],
        flag: '',
        test:[]
    }
}

export function importPresentation(data: string | ArrayBuffer | null): Editor {
    if (typeof data === 'string') {
        const presentation: Editor = JSON.parse(data).presentation
        return presentation
    }

    return createEditor()
}

export function importHistory(data: string | ArrayBuffer | null): History {
    if (typeof data === 'string') {
        const history: History = JSON.parse(data).history
        return history
    }

    return {
        undo: [],
        present: {
            presentation: createEditor(),
            active: '',
            color: ''
        },
        redo: [],
        flag: 'empty',
        test: []
    }
}

export function importEditorColor(data: string | ArrayBuffer | null): string {
    if (typeof data === 'string') {
        const color: string = JSON.parse(data).color
        return color
    }

    return ''
}

export function importEditorActive(data: string | ArrayBuffer | null): string {
    if (typeof data === 'string') {
        const active: string = JSON.parse(data).active
        return active
    }

    return ''
}

// export function setColor(editor: Editor, color: string): Editor {
//     return {
//         ...editor,
//         color: color
//     }
// }

export function setTitle(editor: Editor, newTitle: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle
        }
    }
}

export function createSlide(): Slide {
    return {
        id: generateId(),
        background: {color: '', image: '', priority: 0},
        objects: []
    }
}

//Добавление пустого слайда в коллекцию после активного
export function addEmptySlide(editor: Editor): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    const slide: Slide = createSlide()
    const active: number = editor.presentation.active + 1
    newSlides.splice(active, 0, slide)
    // console.log('newPresentation = ', {
    //     ...presentation,
    //     slides: newSlides,
    //     active
    // })
    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides,
            active
        }
    }
}

//Удаление активного слайда из коллекции
export function deleteSlide(editor: Editor): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    const index: number = editor.presentation.active
    const slideArrayLenght: number = newSlides.length

    let active: number

    switch (slideArrayLenght) {
        case 0:
            active = -1
            break
        case 1:
            newSlides.splice(index, 1)
            active = -1
            break
        default:
            newSlides.splice(index, 1)
            active = index === slideArrayLenght - 1 ? index - 1 : index
    }

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides,
            active
        }
    }
}

//Добавление слайда через Editor
//Функция добавления какого-то заполненного слайда и она работает
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
// export function addSlide(editor: Editor, slide: Slide): Editor {
//     const newSlides: Array<Slide> = editor.presentation.slides.slice()
//     const index: number = editor.presentation.active
//     const active: number = editor.presentation.active + 1
//     newSlides.splice(index, 0, slide)
//
//     return {
//         ...editor,
//         presentation: {
//             ...editor.presentation,
//             active,
//             slides: newSlides
//         }
//     }
// }

export function setActive(editor: Editor, index: number): Editor {
    const active: number = index

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            active
        }
    }
}

//Перемещение слайда вверх в презентации
export function moveSlideTopByStep(editor: Editor): Editor {
    if (editor.presentation.slides.length === 0) {
        return {...editor}
    }

    const slide: Slide = editor.presentation.slides[editor.presentation.active]
    // eslint-disable-next-line no-negated-condition
    const active: number = editor.presentation.active !== 0 ? editor.presentation.active - 1 : editor.presentation.active
    const newSlides: Array<Slide> = editor.presentation.slides.filter((_, index) => index != editor.presentation.active)
    newSlides.splice(Math.max(editor.presentation.active - 1, 0), 0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            active
        }
    }
}

export function moveSlideDownByStep(editor: Editor): Editor {
    if (editor.presentation.slides.length === 0) {
        return {...editor}
    }

    const slide: Slide = editor.presentation.slides[editor.presentation.active]
    // eslint-disable-next-line no-negated-condition
    const active: number = editor.presentation.active !== editor.presentation.slides.length - 1 ? editor.presentation.active + 1 : editor.presentation.active
    const newSlides: Array<Slide> = editor.presentation.slides.filter((_, index) => index != editor.presentation.active)
    newSlides.splice(Math.min(editor.presentation.active + 1, editor.presentation.slides.length - 1), 0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            active
        }
    }
}

export function addObject(editor: Editor, object: {objectType: string}): Editor {
    if (editor.presentation.slides.length === 0) {
        return {...editor}
    }

    const newObjectArray: Array<ObjectType> = setNonActiveObject(editor.presentation.slides[editor.presentation.active].objects)

    newObjectArray.push(createObject(object.objectType, editor.presentation.slides[editor.presentation.active].objects.length))

    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    newSlides[editor.presentation.active].objects = newObjectArray

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export function addImage(editor: Editor, data: string | ArrayBuffer | null | undefined): Editor {
    if (typeof data === 'string' && editor.presentation.slides.length != 0) {
        const newObjectArray: Array<ObjectType> = editor.presentation.slides[editor.presentation.active].objects.slice()
        newObjectArray.push(createImage(data, editor.presentation.slides[editor.presentation.active].objects.length))

        const newSlides: Array<Slide> = editor.presentation.slides.slice()
        newSlides[editor.presentation.active].objects = newObjectArray

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    }

    return {...editor}
}

export function addText(editor: Editor): Editor {
    const newObjectArray: Array<ObjectType> = editor.presentation.slides[editor.presentation.active].objects.slice()
    newObjectArray.push(createText(editor.presentation.slides[editor.presentation.active].objects.length))

    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    newSlides[editor.presentation.active].objects = newObjectArray

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export function deleteObject(editor: Editor, id: string): Editor {
    const indexObject = searchObject(editor, id)

    if (indexObject.objectIndex >= 0) {
        const newObjects: Array<ObjectType> = editor.presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1)

        const newSlide: Slide = {
            ...editor.presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = editor.presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    } else {
        return {
            ...editor
        }
    }
}

export function setText(editor: Editor, id: string, text: string): Editor {
    const indexObject = searchObject(editor, id)

    if (indexObject.objectIndex >= 0 && editor.presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex].type === 'Text') {
        const textObject: Text = editor.presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex] as Text
        const newObject: ObjectType = {
            ...textObject,
            content: text
        }

        const newObjects: Array<ObjectType> = editor.presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1, newObject)

        const newSlide: Slide = {
            ...editor.presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = editor.presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    } else {
        return {
            ...editor
        }
    }
}

function setNonActiveObject(objectArray: Array<ObjectType>): Array<ObjectType> {
    const newObjectArray: Array<ObjectType> = objectArray.slice()
    newObjectArray.forEach(object => {
        object.active = false
    })
    return newObjectArray
}

function createObject(objectType: string, priority: number): ObjectType {
    switch (objectType) {
        case 'Rect': {
            return createRect(priority)
        }
        case 'Triangle': {
            return createTriangle(priority)
        }
        case 'Circle': {
            return createCircle(priority)
        }
        default: {
            return createRect(priority)
        }
    }
}

function createRect(priority: number): ObjectType {
    return {
        id: generateId(),
        type: 'Rect',
        leftTopPoint: {
            x: 100,
            y: 10
        },
        border: {
            borderSize: 2,
            borderColor: '#000000',
            borderStyle: 'Solid'
        },
        background: {
            color: '#ffffff',
            priority: 1
        },
        width: 100,
        height: 70,
        active: true,
        priority: priority
    }
}

function createTriangle(priority: number): ObjectType {
    return {
        id: generateId(),
        type: 'Triangle',
        leftTopPoint: {
            x: 100,
            y: 100
        },
        border: {
            borderSize: 2,
            borderColor: '#000000',
            borderStyle: 'Solid'
        },
        background: {
            color: '#ffffff',
            priority: 1
        },
        width: 100,
        height: 100,
        active: true,
        priority: priority
    }
}

function createCircle(priority: number): ObjectType {
    return {
        id: generateId(),
        type: 'Circle',
        leftTopPoint: {
            x: 100,
            y: 100
        },
        border: {
            borderSize: 2,
            borderColor: '#ffffff',
            borderStyle: 'Solid'
        },
        background: {
            color: '#0000ff',
            priority: 1
        },
        width: 100,
        height: 100,
        active: true,
        priority: priority
    }
}

function createImage(data: string, priority: number): Image {
    return {
        type: 'Image',
        src: data,
        id: generateId(),
        leftTopPoint: {
            x: 100,
            y: 100
        },
        background: {
            color: '#000000',
            priority: 1
        },
        width: 100,
        height: 100,
        active: true,
        priority: priority
    }
}

function createText(priority: number): Text {
    return {
        type: 'Text',
        content: 'Text',
        size: 24,
        id: generateId(),
        leftTopPoint: {
            x: 100,
            y: 100
        },
        background: {
            color: '#000000',
            priority: 1
        },
        width: 200,
        height: 50,
        active: true,
        priority: priority
    }
}

export function setObjectPosition(editor: Editor, objectId: string, position: Position): Editor {
    let objectIndex = -1
    const slide: Slide = editor.presentation.slides[editor.presentation.active]

    slide.objects.forEach((object, index) => {
        if (object.id === objectId) {
            objectIndex = index
        }
    })

    if (objectIndex !== -1) {
        const newObject: ObjectType = {
            ...editor.presentation.slides[editor.presentation.active].objects[objectIndex],
            leftTopPoint: position
        }

        return replaceActiveSlide(editor, replaceSlideObjects(slide, objectIndex, newObject))
    }

    return {
        ...editor
    }
}

function replaceSlideObjects(slide: Slide, objectIndex: number, newObject: ObjectType): Slide {
    const newObjects: Array<ObjectType> = slide.objects.slice()
    newObjects.splice(objectIndex, 1, newObject)
    return {
        ...slide,
        objects: newObjects
    }
}

function replaceActiveSlide(editor: Editor, newSlide: Slide): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    newSlides.splice(editor.presentation.active, 1, newSlide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export function setBackgroundColor(editor: Editor, id: string, newColor: string): Editor {
    const indexSlide = searchSlide(editor, id)
    const indexObject = searchObject(editor, id)

    if (indexSlide >= 0) {
        const newSlide: Slide = {
            ...editor.presentation.slides[indexSlide],
            background: {
                priority: 0,
                color: newColor}
        }

        const newSlides: Array<Slide> = editor.presentation.slides.filter((_, index) => index != indexSlide)
        newSlides.splice(Math.max(indexSlide, 0), 0, newSlide)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    } else if (indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...editor.presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            background: {
                priority: 0,
                color: newColor
            }
        }

        const newObjects: Array<ObjectType> = editor.presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1, newObject)

        const newSlide: Slide = {
            ...editor.presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = editor.presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    } else {
        return {
            ...editor
        }
    }
}

export function setBorderColor(editor: Editor, id: string, newColor: string): Editor {
    const indexObject = searchObject(editor, id)

    if (indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...editor.presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            border: {
                borderColor: newColor,
                borderSize: 2,
                borderStyle: 'Solid'
            }
        }

        const newObjects: Array<ObjectType> = editor.presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1, newObject)

        const newSlide: Slide = {
            ...editor.presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = editor.presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: newSlides
            }
        }
    } else {
        return {
            ...editor
        }
    }

}

function searchSlide(editor: Editor, id: string): number {
    let foundedSlideIndex = -1

    editor.presentation.slides.forEach((slide, slideIndex) => {
        if (slide.id === id) {
            foundedSlideIndex = slideIndex
        }
    })

    return foundedSlideIndex
}

function searchObject(editor: Editor, id: string): {slideindex: number, objectIndex: number} {
    let foundedSlideIndex = -1
    let foundedObjectIndex = -1

    editor.presentation.slides.forEach((slide, index) => {
        slide.objects.forEach((object, objectIndex) => {
            if (object.id === id) {
                foundedSlideIndex = index
                foundedObjectIndex = objectIndex
            }
        })
    })

    return {
        slideindex: foundedSlideIndex,
        objectIndex: foundedObjectIndex
    }
}

function generateId(): string {
    let result = ''
    const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const position = Math.floor(Math.random() * (words.length - 1))
            result += words.substring(position, position + 1)
        }
        if (i < 3) {
            result += '-'
        }
    }
    return result
}

export function addStateUndo(history: History, newState: UndoRedo): History {
    const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    newHistoryUndo.splice(newHistoryUndo.length - 1, 0, newState)

    const newHistory: History = {
        ...history,
        undo: newHistoryUndo,
        present: newState,
        flag: 'empty'
    }

    return newHistory
}

export function setPresentation(editor: Editor, newEditor: Editor): Editor {
    return {
        ...newEditor
    }
}

export function updateHistoryPresentAfterUndo(history: History): History {
    const newHistoryPresent: UndoRedo = history.undo[history.undo.length - 1]

    return {
        ...history,
        present: newHistoryPresent
    }
}

export function updateHistoryPresentAfterRedo(history: History): History {
    const newHistoryPresent: UndoRedo = history.redo[0]

    return {
        ...history,
        present: newHistoryPresent
    }
}

export function undo(history: History): History {
    const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
    newHistoryRedo.splice(0, 0, history.undo[history.undo.length - 1])

    const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    newHistoryUndo.splice(newHistoryUndo.length - 1, 1)

    const test: Array<number> = history.test.slice()
    test.push(1)

    return {
        undo: newHistoryUndo,
        present: history.present,
        redo: newHistoryRedo,
        flag: 'undo',
        test: test
    }
}

export function redo(history: History): History {
    const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
    const test: Array<number> = history.test.slice()

    if (newHistoryRedo.length > 0) {
        newHistoryUndo.splice(newHistoryUndo.length - 1, 0, newHistoryRedo[0])
        newHistoryRedo.splice(0, 1)
        test.pop()
    }
    // const newHistoryPresent: UndoRedo = newHistoryUndo[newHistoryUndo.length - 1]
    // console.log('newHistoryPresent = ', newHistoryPresent)

    return {
        undo: newHistoryUndo,
        present: history.present,
        redo: newHistoryRedo,
        flag: 'redo',
        test: test
    }
    // const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
    // const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    // let newHistoryPresent: UndoRedo = history.present
    // newHistoryUndo.splice(newHistoryUndo.length, 0, newHistoryPresent)
    // // eslint-disable-next-line no-negated-condition
    // newHistoryPresent = newHistoryRedo.length !== 0 ? newHistoryRedo[0] : newHistoryPresent
    // newHistoryRedo.splice(0, 1)
    // return {
    //     undo: newHistoryUndo,
    //     present: newHistoryPresent,
    //     redo: newHistoryRedo
    // }
}

// export function historyUpdate(history: History): History {
//     const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
//     const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
//     const newHistoryPresent: UndoRedo = history.present
//     newHistoryUndo.splice(newHistoryUndo.length, 0, newHistoryPresent)
//     newHistoryRedo.slice(0, newHistoryRedo.length)
//     return {
//         undo: newHistoryUndo,
//         present: newHistoryPresent,
//         redo: newHistoryRedo,
//         flag: 'empty'
//     }
// }