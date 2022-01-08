import {Editor, ObjectType, Position, Slide} from './slide';

export function createEditor(): Editor
{
    return {
        history: {undo: [], redo: []},
        presentation: {title: `Презентация от ${new Date().toLocaleString('ru-RU')}`, slides: [createSlide()]},
        active: 0
    };
}

export function importProject(data: string | ArrayBuffer | null): Editor {
    if(typeof data === 'string') {
        const editor: Editor = JSON.parse(data).presentationReducer
        return editor
    }

    return createEditor()
}

export function setColor(editor: Editor, color: string): Editor
{
    return {
        ...editor,
        color: color
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
    const newSlides: Array<Slide> = editor.presentation.slides.slice();
    const slide: Slide = createSlide();
    const active: number = editor.active + 1;
    newSlides.splice(active, 0, slide);

    return {
        ...editor,
        active,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

//Удаление активного слайда из коллекции
export function deleteSlide(editor: Editor): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides.slice();
    const index: number = editor.active;
    const slideArrayLenght: number = newSlides.length;

    let active: number;

    switch (slideArrayLenght)
    {
        case 0:
            active = -1;
            break;
        case 1:
            newSlides.splice(index, 1);
            active = -1;
            break;
        default:
            newSlides.splice(index, 1);
            active = index === slideArrayLenght - 1 ? index - 1 : index
    }

    return {
        ...editor,
        active,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

//Добавление слайда через Editor
//Функция добавления какого-то заполненного слайда и она работает
function addSlide(editor: Editor, slide: Slide): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides.slice();
    const index: number = editor.active;
    const active: number = editor.active + 1;
    newSlides.splice(index, 0, slide);

    return {
        ...editor,
        active,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

export function setActive(editor: Editor, index: number): Editor
{
    const active: number = index

    return {
        ...editor,
        active
    };
}

//Перемещение слайда вверх в презентации
export function moveSlideTopByStep(editor: Editor): Editor
{
    if (editor.presentation.slides.length === 0)
    {
        return {...editor}
    }

    const slide: Slide = editor.presentation.slides[editor.active];
    const active: number = editor.active !== 0 ? editor.active - 1 : editor.active
    const newSlides: Array<Slide> = editor.presentation.slides.filter((_, index) => index != editor.active)
    newSlides.splice(Math.max(editor.active - 1, 0), 0, slide)

    return {
        ...editor,
        active,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export function moveSlideDownByStep(editor: Editor): Editor
{
    if (editor.presentation.slides.length === 0)
    {
        return {...editor}
    }

    const slide: Slide = editor.presentation.slides[editor.active];
    const active: number = editor.active !== editor.presentation.slides.length - 1 ? editor.active + 1 : editor.active
    const newSlides: Array<Slide> = editor.presentation.slides.filter((_, index) => index != editor.active)
    newSlides.splice(Math.min(editor.active + 1, editor.presentation.slides.length - 1), 0, slide)

    return {
        ...editor,
        active,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export function addObject(editor: Editor, object: {objectType: string}): Editor
{
    if (editor.presentation.slides.length === 0)
    {
        return {...editor}
    }

    const newObjectArray: Array<ObjectType> = setNonActiveObject(editor.presentation.slides[editor.active].objects);

    newObjectArray.push(createObject(object.objectType, editor.presentation.slides[editor.active].objects.length));

    const newSlides: Array<Slide> = editor.presentation.slides.slice();
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
    const newObjectArray: Array<ObjectType> = objectArray.slice();
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

export function setObjectPositionEditorVersion(editor: Editor, objectId: string, position: Position): Editor {
    let objectIndex : number = -1;

    const objects: Array<ObjectType> = editor.presentation.slides[editor.active].objects.slice();

    objects.forEach((object, index) => {
        if (object.id === objectId) {
            objectIndex = index
        }
    })

    if (objectIndex !== -1) {
        const newObject: ObjectType = editor.presentation.slides[editor.active].objects[objectIndex];
        newObject.leftTopPoint = position;

        return replaceObjects({...editor}, objectIndex, newObject)
    }

    return {...editor}
}

function replaceObjects(editor: Editor, objectIndex: number, newObject: ObjectType): Editor
{
    const newObjects: Array<ObjectType> = editor.presentation.slides[editor.active].objects.slice();

    newObjects[objectIndex] = newObject;

    const newSlide: Slide = editor.presentation.slides[editor.active];

    newSlide.objects = newObjects;

    return replaceActiveSlide({...editor}, newSlide);
}

function replaceActiveSlide(editor: Editor, newSlide: Slide): Editor
{
    const newSlides: Array<Slide> = editor.presentation.slides.slice();

    newSlides[editor.active] = newSlide;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    };
}

export function setBackgroundColor(editor:Editor, id: string): Editor {
    console.log('id = ', id)
    const newSlides: Array<Slide> = editor.presentation.slides.slice();

    newSlides.forEach((slide) => {
        if(slide.id === id) {
            slide.background.color = editor.color
        } else {
            slide.objects.forEach((object) => {
                if(object.id === id) {
                    object.background.color = editor.color
                }
            })
        }
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
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