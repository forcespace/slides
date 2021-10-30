import {Editor, Slide} from './slide';

function createEditor(): Editor
{
    return {
        history: {undo: [], redo: []},
        presentation: {title: '', slides: []},
        active: 0
    }
}

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

function createSlide(): Slide
{
    return {
        background: {color: '', image: '', priority: 0},
        objects: []
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
function addSlide(editor: Editor, slide: Slide): Editor
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
        addSlide(newEditor, slide)
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
        addSlide(newEditor, slide)
    }
    return newEditor
}
