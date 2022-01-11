import {Editor, ObjectType, Position, Presentation, Slide, History, UndoRedo, Image} from './slide'

export function createUndoRedo(): UndoRedo {
    return {
        presentation: createPresentation(),
        active: '',
        color: ''
    }
}

export function createEditor(): Editor {
    return {
        history: {undo: [], present: createUndoRedo(), redo: []},
        presentation: {
            title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
            slides: [createSlide()],
            active: 0
        },
        active: '0'
    }
}

export function createPresentation(): Presentation {
    return {
        title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
        active: 0,
        slides: [createSlide()]
    }
}

export function createHistory(): History {
    return {
        undo: [createUndoRedo()],
        present: createUndoRedo(),
        redo: [createUndoRedo()]
    }
}

export function importPresentation(data: string | ArrayBuffer | null): Presentation {
    if (typeof data === 'string') {
        const presentation: Presentation = JSON.parse(data).presentation
        return presentation
    }

    return createPresentation()
}

export function importHistory(data: string | ArrayBuffer | null): History {
    if (typeof data === 'string') {
        const history: History = JSON.parse(data).history
        return history
    }

    return {
        undo: [],
        present: {
            presentation: createPresentation(),
            active: '',
            color: ''
        },
        redo: []
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

export function setTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle
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
export function addEmptySlide(presentation: Presentation): Presentation {
    const newSlides: Array<Slide> = presentation.slides.slice()
    const slide: Slide = createSlide()
    const active: number = presentation.active + 1
    newSlides.splice(active, 0, slide)
    // console.log('newPresentation = ', {
    //     ...presentation,
    //     slides: newSlides,
    //     active
    // })
    return {
        ...presentation,
        slides: newSlides,
        active
    }
}

//Удаление активного слайда из коллекции
export function deleteSlide(presentation: Presentation): Presentation {
    const newSlides: Array<Slide> = presentation.slides.slice()
    const index: number = presentation.active
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
        ...presentation,
        slides: newSlides,
        active
    }
}

//Добавление слайда через Editor
//Функция добавления какого-то заполненного слайда и она работает
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars

export function addSlide(editor: Editor, slide: Slide): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    const index: number = editor.presentation.active
    const active: number = editor.presentation.active + 1
    newSlides.splice(index, 0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            active,
            slides: newSlides
        }
    }
}

export function setActive(presentation: Presentation, index: number): Presentation {
    const active: number = index

    return {
        ...presentation,
        active
    }
}

//Перемещение слайда вверх в презентации
export function moveSlideTopByStep(presentation: Presentation): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const slide: Slide = presentation.slides[presentation.active]
    // eslint-disable-next-line no-negated-condition
    const active: number = presentation.active !== 0 ? presentation.active - 1 : presentation.active
    const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != presentation.active)
    newSlides.splice(Math.max(presentation.active - 1, 0), 0, slide)

    return {
        ...presentation,
        slides: newSlides,
        active
    }
}

export function moveSlideDownByStep(presentation: Presentation): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const slide: Slide = presentation.slides[presentation.active]
    // eslint-disable-next-line no-negated-condition
    const active: number = presentation.active !== presentation.slides.length - 1 ? presentation.active + 1 : presentation.active
    const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != presentation.active)
    newSlides.splice(Math.min(presentation.active + 1, presentation.slides.length - 1), 0, slide)

    return {
        ...presentation,
        slides: newSlides,
        active
    }
}

export function addObject(presentation: Presentation, object: {objectType: string}): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const newObjectArray: Array<ObjectType> = setNonActiveObject(presentation.slides[presentation.active].objects)

    newObjectArray.push(createObject(object.objectType, presentation.slides[presentation.active].objects.length))

    const newSlides: Array<Slide> = presentation.slides.slice()
    newSlides[presentation.active].objects = newObjectArray

    return {
        ...presentation,
        slides: newSlides
    }
}

export function addImage(presentation: Presentation, data: string | ArrayBuffer | null | undefined): Presentation {
    if (typeof data === 'string' && presentation.slides.length != 0) {
        const newObjectArray: Array<ObjectType> = presentation.slides[presentation.active].objects.slice()
        newObjectArray.push(createImage(data, presentation.slides[presentation.active].objects.length))

        const newSlides: Array<Slide> = presentation.slides.slice()
        newSlides[presentation.active].objects = newObjectArray

        return {
            ...presentation,
            slides: newSlides
        }
    }

    return {...presentation}
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

export function setObjectPosition(presentation: Presentation, objectId: string, position: Position): Presentation {
    let objectIndex = -1
    const slide: Slide = presentation.slides[presentation.active]

    slide.objects.forEach((object, index) => {
        if (object.id === objectId) {
            objectIndex = index
        }
    })

    if (objectIndex !== -1) {
        const newObject: ObjectType = {
            ...presentation.slides[presentation.active].objects[objectIndex],
            leftTopPoint: position
        }

        return replaceActiveSlide(presentation, replaceSlideObjects(slide, objectIndex, newObject))
    }

    return {
        ...presentation
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

function replaceActiveSlide(presentation: Presentation, newSlide: Slide): Presentation {
    const newSlides: Array<Slide> = presentation.slides.slice()
    newSlides.splice(presentation.active, 1, newSlide)

    return {
        ...presentation,
        slides: newSlides
    }
}

export function setBackgroundColor(presentation: Presentation, id: string, newColor: string): Presentation {
    const indexSlide = searchSlide(presentation, id)
    const indexObject = searchObject(presentation, id)

    if (indexSlide >= 0) {
        const newSlide: Slide = {
            ...presentation.slides[indexSlide],
            background: {
                priority: 0,
                color: newColor}
        }

        const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != indexSlide)
        newSlides.splice(Math.max(indexSlide, 0), 0, newSlide)

        return {
            ...presentation,
            slides: newSlides
        }
    } else if (indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            background: {
                priority: 0,
                color: newColor
            }
        }

        const newObjects: Array<ObjectType> = presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1, newObject)

        const newSlide: Slide = {
            ...presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...presentation,
            slides: newSlides
        }
    } else {
        return {
            ...presentation
        }
    }
}

export function setBorderColor(presentation: Presentation, id: string, newColor: string): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            border: {
                borderColor: newColor,
                borderSize: 2,
                borderStyle: 'Solid'
            }
        }

        const newObjects: Array<ObjectType> = presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1, newObject)

        const newSlide: Slide = {
            ...presentation.slides[indexObject.slideindex],
            objects: newObjects
        }

        const newSlides: Array<Slide> = presentation.slides.slice()
        newSlides.splice(indexObject.slideindex, 1, newSlide)

        return {
            ...presentation,
            slides: newSlides
        }
    } else {
        return {
            ...presentation
        }
    }

}

function searchSlide(presentation: Presentation, id: string): number {
    let foundedSlideIndex = -1

    presentation.slides.forEach((slide, slideIndex) => {
        if (slide.id === id) {
            foundedSlideIndex = slideIndex
        }
    })

    return foundedSlideIndex
}

function searchObject(presentation: Presentation, id: string): {slideindex: number, objectIndex: number} {
    let foundedSlideIndex = -1
    let foundedObjectIndex = -1

    presentation.slides.forEach((slide, index) => {
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
    newHistoryUndo.push(newState)
    // console.log('newState = ', newState)
    const newHistory: History = {
        ...history,
        undo: newHistoryUndo,
        present: newState,
        redo: []
    }
    // console.log('newHistory: ', newHistory)
    return newHistory
}

export function setPresentation(presentation: Presentation, newPresentation: Presentation): Presentation {
    return {
        ...newPresentation
    }
}

export function updateHistoryPresentAfterUndo(history: History): History {
    const newHistoryPresent: UndoRedo = history.undo[history.undo.length - 1]

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

    //
    // const newHistoryPresent: UndoRedo = newHistoryUndo[newHistoryUndo.length - 1]
    // console.log('newHistoryPresent = ', newHistoryPresent)

    return {
        undo: newHistoryUndo,
        present: history.present,
        redo: newHistoryRedo
    }
}

export function redo(history: History): History {
    const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
    const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    let newHistoryPresent: UndoRedo = history.present
    newHistoryUndo.splice(newHistoryUndo.length, 0, newHistoryPresent)
    // eslint-disable-next-line no-negated-condition
    newHistoryPresent = newHistoryRedo.length !== 0 ? newHistoryRedo[0] : newHistoryPresent
    newHistoryRedo.splice(0, 1)
    return {
        undo: newHistoryUndo,
        present: newHistoryPresent,
        redo: newHistoryRedo
    }
}

export function historyUpdate(history: History): History {
    const newHistoryRedo: Array<UndoRedo> = history.redo.slice()
    const newHistoryUndo: Array<UndoRedo> = history.undo.slice()
    const newHistoryPresent: UndoRedo = history.present
    newHistoryUndo.splice(newHistoryUndo.length, 0, newHistoryPresent)
    newHistoryRedo.slice(0, newHistoryRedo.length)
    return {
        undo: newHistoryUndo,
        present: newHistoryPresent,
        redo: newHistoryRedo
    }
}

// const obj = {
//     a: 1,
//     b: 'hello',
// }

// const obj2 = obj

// obj2.a = 2

// const obj2 = {
//     ...obj,
//     a: 2,
// }