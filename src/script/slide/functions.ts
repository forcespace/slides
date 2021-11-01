import {Background, Border, Editor, FontStyle, ObjectType, Position, shapeType, Slide} from './slide';

export function createEditor(): Editor {
    return {
        history: {undo: [], redo: []},
        presentation: {title: 'Default Title', slides: [createSlide()]},
        active: 0
    }
}

export function setTitle(editor: Editor, newTitle: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}

function createSlide(): Slide
{
    return {
        background: {color: '', image: '', priority: 0},
        objects: []
    }
}

//Добавление пустого слайда в коллекцию после активного
export function addEmptySlide(editor: Editor): Editor {
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
export function deleteSlide(editor: Editor): Editor {
    let newSlides: Array<Slide> = editor.presentation.slides
    const index: number = editor.active

    let newIndex: number = 0;
    if ((editor.presentation.slides.length !== 1 && editor.active > 0) || editor.presentation.slides.length === 1) {
        newIndex = editor.active - 1
    } else if (editor.presentation.slides.length !== 1 && editor.active === 0) {
        newIndex = editor.active
    } else if (editor.presentation.slides.length === 0) {
        newIndex = -1
    }

    if (editor.presentation.slides.length !== 0) {
        newSlides.splice(index, 1)
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

//Добавление слайда через Editor
// Функция добавления какого-то заполненного слайда и она работает
function addSlide(editor: Editor, slide: Slide): Editor {
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

export function setActive(editor: Editor, index: number): Editor {
    return {
        ...editor,
        active: index
    }
}

//Перемещение слайда вверх в презентации
export function moveSlideDownByStep(editor: Editor): Editor {
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== 0) {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active - 1
        addSlide(newEditor, slide)
    }
    return newEditor
}

export function moveSlideTopByStep(editor: Editor): Editor {
    const newEditor: Editor = editor
    const slide: Slide = editor.presentation.slides[editor.active]
    if (editor.active !== newEditor.presentation.slides.length - 1) {
        deleteSlide(newEditor)
        newEditor.active = newEditor.active + 1
        addSlide(newEditor, slide)
    }
    return newEditor
}

export function addObject(editor: Editor, object: {objectType: string}): Editor {
    const newObjectArray = editor.presentation.slides[editor.active].objects
    newObjectArray.push(createObject(object.objectType, editor.presentation.slides[editor.active].objects.length))

    const newSlides = editor.presentation.slides
    newSlides[editor.active].objects = newObjectArray

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function createObject(objectType: string, priority: number): ObjectType {
    switch (objectType) {
        case 'Rect': {
            return createRect(priority)
        }
        default: {
            return createRect(priority)
        }
    }
}

function createRect(priority: number): ObjectType {
    return {
        type: 'Rect',
        leftTopPoint: {
            x: 100,
            y: 100},
        border: {
            borderSize: '2',
            borderColor: '#000000',
            borderStyle: 'Solid'
        },
        background: {
            color: '#ffffff',
            priority: 1},
        width: 100,
        height: 70,
        active: true,
        priority: priority
    }
}

