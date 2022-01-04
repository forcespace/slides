import {Editor, ObjectType, Position, Slide} from './slide';

export function createEditor(): Editor
{
    return {
        history: {undo: [], redo: []},
        presentation: {title: `Презентация от ${new Date().toLocaleString('ru-RU')}`, slides: [createSlide()]},
        active: 0
    };
}

export function setTitle(editor: Editor, newTitle: string): Editor
{
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle
        }
    };
}

export function createSlide(): Slide
{
    return {
        id: generateId(),
        background: {color: '', image: '', priority: 0},
        objects: []
    };
}

//Добавление пустого слайда в коллекцию после активного
export function addEmptySlide(editor: Editor): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides;
    const slide: Slide = createSlide();
    const index: number = editor.active;
    newSlides.splice(index + 1, 0, slide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: index + 1
    };
}

//Удаление активного слайда из коллекции
export function deleteSlide(editor: Editor): Editor
{
    let newSlides: Array<Slide> = editor.presentation.slides;
    const index: number = editor.active;
    const slideArrayLenght: number = editor.presentation.slides.length;

    let newIndex: number;
    if (slideArrayLenght > 1 && index === 0)
    {
        newIndex = index;
    }
    else if (slideArrayLenght === 0)
    {
        newIndex = -1;
    }
    else
    {
        newIndex = index - 1;
    }

    if (slideArrayLenght > 0)
    {
        newSlides.splice(index, 1);
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: newIndex
    };
}

//Добавление слайда через Editor
// Функция добавления какого-то заполненного слайда и она работает
function addSlide(editor: Editor, slide: Slide): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides;
    const index: number = editor.active;
    newSlides.splice(index, 0, slide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        active: index + 1
    };
}

export function setActive(editor: Editor, index: number): Editor
{
    return {
        ...editor,
        active: index
    };
}

//Перемещение слайда вверх в презентации
export function moveSlideTopByStep(editor: Editor): Editor
{
    const newEditor: Editor = editor;
    const slide: Slide = editor.presentation.slides[editor.active];
    if (editor.active !== 0)
    {
        deleteSlide(newEditor);
        newEditor.active = newEditor.active - 1;
        addSlide(newEditor, slide);
    }
    return newEditor;
}

export function moveSlideDownByStep(editor: Editor): Editor
{
    const newEditor: Editor = editor;
    const slide: Slide = editor.presentation.slides[editor.active];
    if (editor.active !== newEditor.presentation.slides.length - 1)
    {
        deleteSlide(newEditor);
        newEditor.active = newEditor.active + 1;
        addSlide(newEditor, slide);
    }
    return newEditor;
}

export function addObject(editor: Editor, object: {objectType: string}): Editor
{
    const newObjectArray = setNonActiveObject(editor.presentation.slides[editor.active].objects);

    newObjectArray.push(createObject(object.objectType, editor.presentation.slides[editor.active].objects.length));

    const newSlides = editor.presentation.slides;
    newSlides[editor.active].objects = newObjectArray;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

function setNonActiveObject(objectArray: Array<ObjectType>): Array<ObjectType>
{
    const newObjectArray = objectArray;
    newObjectArray.forEach(object =>
    {
        object.active = false;
    });
    return newObjectArray;
}

function createObject(objectType: string, priority: number): ObjectType
{
    switch (objectType)
    {
        case 'Rect':
        {
            return createRect(priority);
        }
        case 'Triangle':
        {
            return createTriangle(priority);
        }
        case 'Circle':
        {
            return createCircle(priority);
        }
        default:
        {
            return createRect(priority);
        }
    }
}

function createRect(priority: number): ObjectType
{
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
    };
}

function createTriangle(priority: number): ObjectType
{
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
    };
}

function createCircle(priority: number): ObjectType
{
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
    };
}

//Здесь добавила index, т.к. пока непонятно какой элемент внутри слайда активный
export function setObjectPositionEditorVersion(editor: Editor, indexActiveObject: number, position: Position): Editor
{
    const newObject: ObjectType = {
        ...editor.presentation.slides[editor.active].objects[indexActiveObject],
        leftTopPoint: position
    };

    return replaceObjects(editor, indexActiveObject, newObject);
}


function replaceObjects(editor: Editor, indexActiveObject: number, newObject: ObjectType)
{
    const newObjects: Array<ObjectType> = {
        ...editor.presentation.slides[editor.active].objects
    };

    newObjects[indexActiveObject] = newObject;

    const newSlide: Slide = {
        ...editor.presentation.slides[editor.active],
        objects: newObjects
    };

    return replaceActiveSlide(editor, newSlide);
}

function replaceActiveSlide(editor: Editor, newSlide: Slide): Editor
{
    let newSlides: Array<Slide> = {
        ...editor.presentation.slides
    };

    newSlides[editor.active] = newSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

function generateId(): string
{
    let result = '';
    const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            const position = Math.floor(Math.random() * (words.length - 1));
            result += words.substring(position, position + 1);
        }
        if (i < 3)
        {
            result += '-';
        }
    }
    return result;
}