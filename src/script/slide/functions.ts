import {Editor, ObjectType, Position, Presentation, Slide, History, UndoRedo} from './slide'

export function createUndoRedo(): UndoRedo {
    return {
        title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
        active: 0,
        slides: [createSlide()],
        activeElem: '0',
        color: '0'
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

export function importProject(data: string | ArrayBuffer | null): Presentation {
    if (typeof data === 'string') {
        const editor: Presentation = JSON.parse(data)
        return editor
    }

    return createPresentation()
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
    // const newSlides: Array<Slide> = presentation.slides.slice()
    // eslint-disable-next-line no-unused-vars
    let indexSlide = -1

    presentation.slides.forEach((slide, index) => {
        if (slide.id === id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            indexSlide = index
        }
    })

    if (indexSlide >= 0) {
        const newSlide: Slide = {
            ...presentation.slides[indexSlide],
            background: {
                priority: 0,
                color: newColor}
        }

        // eslint-disable-next-line no-negated-condition
        const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != indexSlide)
        newSlides.splice(Math.max(indexSlide, 0), 0, newSlide)

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

export function undo(history: History): History {
    history.redo.splice(0, 0, history.present)
    // eslint-disable-next-line no-negated-condition
    history.present = history.undo.length !== 0 ? history.undo[history.undo.length] : history.present
    history.undo.pop()
    console.log(history)
    return history
}

export function redo(history: History): History {
    history.undo.splice(history.undo.length, 0, history.present)
    // eslint-disable-next-line no-negated-condition
    history.present = history.redo.length !== 0 ? history.redo[0] : history.present
    history.redo.splice(0, 1)
    console.log(history)
    return history
}

export function historyUpdate(history: History): History {
    history.undo.splice(history.undo.length, 0, history.present)
    history.redo.slice(0, history.redo.length)
    console.log(history)
    return history
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