import {Editor, ObjectType, Position, Presentation, Slide, Image, Text} from './slide'

export function createEditor(): Editor {
    return {
        history: {past: [], future: []},
        presentation: {
            title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
            slides: [createSlide()],
            active: {
                slideIndex: 0,
                activeObject: ''
            },
            color: '#000000',
            viewShown: false
        }
    }
}

export function createPresentation(): Presentation {
    return {
        title: `Презентация от ${new Date().toLocaleString('ru-RU')}`,
        active: {
            slideIndex: 0,
            activeObject: ''
        },
        color: '#000000',
        slides: [createSlide()],
        viewShown: false
    }
}

export function importPresentation(data: string | ArrayBuffer | null): Presentation {
    console.log('data = ', data)
    if (typeof data === 'string') {
        const presentation: Presentation = JSON.parse(data).presentation
        return presentation
    }

    return createPresentation()
}

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

export function addEmptySlide(presentation: Presentation): Presentation {
    const newSlides: Array<Slide> = presentation.slides.slice()
    const slide: Slide = createSlide()
    const active: number = presentation.active.slideIndex + 1
    newSlides.splice(active, 0, slide)

    return {
        ...presentation,
        slides: newSlides,
        active: {
            ...presentation.active,
            slideIndex: active
        }
    }
}

export function deleteSlide(presentation: Presentation): Presentation {
    const newSlides: Array<Slide> = presentation.slides.slice()
    const index: number = presentation.active.slideIndex
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
        active: {
            ...presentation.active,
            slideIndex: active
        }
    }
}

export function addSlide(editor: Editor, slide: Slide): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides.slice()
    const index: number = editor.presentation.active.slideIndex
    const active: number = editor.presentation.active.slideIndex + 1
    newSlides.splice(index, 0, slide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            active: {
                ...editor.presentation.active,
                slideIndex: active
            }
        }
    }
}

export function setActive(presentation: Presentation, index: number): Presentation {
    const active: number = index

    return {
        ...presentation,
        active: {
            ...presentation.active,
            slideIndex: active
        }
    }
}

export function moveSlideTopByStep(presentation: Presentation): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const slide: Slide = presentation.slides[presentation.active.slideIndex]
    // eslint-disable-next-line no-negated-condition
    const active: number = presentation.active.slideIndex !== 0 ? presentation.active.slideIndex - 1 : presentation.active.slideIndex
    const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != presentation.active.slideIndex)
    newSlides.splice(Math.max(presentation.active.slideIndex - 1, 0), 0, slide)

    return {
        ...presentation,
        slides: newSlides,
        active: {
            ...presentation.active,
            slideIndex: active
        }
    }
}

export function moveSlideDownByStep(presentation: Presentation): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const slide: Slide = presentation.slides[presentation.active.slideIndex]
    // eslint-disable-next-line no-negated-condition
    const active: number = presentation.active.slideIndex !== presentation.slides.length - 1 ? presentation.active.slideIndex + 1 : presentation.active.slideIndex
    const newSlides: Array<Slide> = presentation.slides.filter((_, index) => index != presentation.active.slideIndex)
    newSlides.splice(Math.min(presentation.active.slideIndex + 1, presentation.slides.length - 1), 0, slide)

    return {
        ...presentation,
        slides: newSlides,
        active: {
            ...presentation.active,
            slideIndex: active
        }
    }
}

export function addObject(presentation: Presentation, object: {objectType: string}): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const newObject = createObject(object.objectType, presentation.slides[presentation.active.slideIndex].objects.length)

    const newObjects: ObjectType[] = updateObjects(
        presentation.slides[presentation.active.slideIndex].objects,
        newObject,
        presentation.slides[presentation.active.slideIndex].objects.length
    )

    const newSlide: Slide = {
        ...presentation.slides[presentation.active.slideIndex],
        objects: newObjects
    }

    return {
        ...presentation,
        slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex),
        active: {
            ...presentation.active,
            activeObject: newObject.id
        }
    }
}

export function addImage(presentation: Presentation, data: string | ArrayBuffer | null | undefined): Presentation {
    if (typeof data === 'string' && presentation.slides.length != 0) {
        if (presentation.slides.length === 0) {
            return {...presentation}
        }

        const newImage = createImage(data, presentation.slides[presentation.active.slideIndex].objects.length)

        const newObjects: ObjectType[] = updateObjects(
            presentation.slides[presentation.active.slideIndex].objects,
            newImage,
            presentation.slides[presentation.active.slideIndex].objects.length
        )

        const newSlide: Slide = {
            ...presentation.slides[presentation.active.slideIndex],
            objects: newObjects
        }

        return {
            ...presentation,
            slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex),
            active: {
                ...presentation.active,
                activeObject: newImage.id
            }
        }
    }

    return {
        ...presentation
    }
}

export function addText(presentation: Presentation): Presentation {
    if (presentation.slides.length === 0) {
        return {...presentation}
    }

    const newText = createText(presentation.slides[presentation.active.slideIndex].objects.length)

    const newObjects: ObjectType[] = updateObjects(
        presentation.slides[presentation.active.slideIndex].objects,
        newText,
        presentation.slides[presentation.active.slideIndex].objects.length
    )

    const newSlide: Slide = {
        ...presentation.slides[presentation.active.slideIndex],
        objects: newObjects
    }

    return {
        ...presentation,
        slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex),
        active: {
            ...presentation.active,
            activeObject: newText.id
        }
    }
}

export function deleteObject(presentation: Presentation, id: string): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.objectIndex >= 0) {
        const newObjects: Array<ObjectType> = presentation.slides[indexObject.slideindex].objects.slice()
        newObjects.splice(indexObject.objectIndex, 1)

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

export function setText(presentation: Presentation, id: string, text: string): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.objectIndex >= 0 && presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex].type === 'Text') {
        const textObject: Text = presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex] as Text
        const newObject: ObjectType = {
            ...textObject,
            content: text
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

export function setObjectPosition(presentation: Presentation, objectId: string, position: Position): Presentation {
    let objectIndex = -1
    const slide: Slide = presentation.slides[presentation.active.slideIndex]

    slide.objects.forEach((object, index) => {
        if (object.id === objectId) {
            objectIndex = index
        }
    })

    if (objectIndex !== -1) {
        const newObject: ObjectType = {
            ...presentation.slides[presentation.active.slideIndex].objects[objectIndex],
            leftTopPoint: position
        }

        return replaceActiveSlide(presentation, replaceSlideObjects(slide, objectIndex, newObject))
    }

    return {
        ...presentation
    }
}

export function setObjectCondition(presentation: Presentation, objectId: string, width: number, height: number): Presentation {
    let objectIndex = -1
    const slide: Slide = presentation.slides[presentation.active.slideIndex]

    slide.objects.forEach((object, index) => {
        if (object.id === objectId) {
            objectIndex = index
        }
    })

    if (objectIndex !== -1) {
        const newObject: ObjectType = {
            ...presentation.slides[presentation.active.slideIndex].objects[objectIndex],
            width: width,
            height: height
        }

        return replaceActiveSlide(presentation, replaceSlideObjects(slide, objectIndex, newObject))
    }

    return {
        ...presentation
    }
}

export function setSlideBackgroundColor(presentation: Presentation, newColor: string): Presentation {
    const newSlide: Slide = {
        ...presentation.slides[presentation.active.slideIndex],
        background: {
            priority: 0,
            color: newColor
        }
    }

    return {
        ...presentation,
        slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex)
    }
}

export function setBackgroundColor(presentation: Presentation, id: string, newColor: string): Presentation {
    if (presentation.slides[presentation.active.slideIndex].id === id) {
        return setSlideBackgroundColor(presentation, newColor)
    } else {
        return setObjectBackgroundColor(presentation, id, newColor)
    }
}

export function setBackgroundImage(presentation: Presentation, data: string | ArrayBuffer | null): Presentation {
    if (typeof data === 'string' && presentation.slides.length != 0) {
        const newSlide: Slide = {
            ...presentation.slides[presentation.active.slideIndex],
            background: {
                priority: 1,
                image: data
            }
        }

        return {
            ...presentation,
            slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex)
        }
    }

    return {
        ...presentation
    }
}

export function setObjectBorderColor(presentation: Presentation, id: string, newColor: string): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.slideindex === presentation.active.slideIndex && indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            border: {
                borderColor: newColor,
                borderSize: 2,
                borderStyle: 'Solid'
            }
        }

        const newSlide: Slide = {
            ...presentation.slides[indexObject.slideindex],
            objects: updateObjects(presentation.slides[indexObject.slideindex].objects, newObject, indexObject.objectIndex)
        }

        return {
            ...presentation,
            slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex)
        }
    } else {
        return {
            ...presentation
        }
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
    newSlides.splice(presentation.active.slideIndex, 1, newSlide)

    return {
        ...presentation,
        slides: newSlides
    }
}

function setObjectBackgroundColor(presentation: Presentation, id: string, newColor: string): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.slideindex === presentation.active.slideIndex && indexObject.objectIndex >= 0) {
        const newObject: ObjectType = {
            ...presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex],
            background: {
                priority: 0,
                color: newColor
            }
        }

        const newSlide: Slide = {
            ...presentation.slides[indexObject.slideindex],
            objects: updateObjects(presentation.slides[indexObject.slideindex].objects, newObject, indexObject.objectIndex)
        }

        return {
            ...presentation,
            slides: updateSlides(presentation.slides, newSlide, presentation.active.slideIndex)
        }
    } else {
        return {
            ...presentation
        }
    }
}

function updateSlides(slides: Slide[], newSlide: Slide, index: number): Slide[] {
    const newSlides: Slide[] = slides.slice()
    newSlides.splice(index, 1, newSlide)
    return newSlides
}

function updateObjects(objects: ObjectType[], newObject: ObjectType, index: number): ObjectType[] {
    const newObjects: ObjectType[] = objects.slice()
    newObjects.splice(index, 1, newObject)
    return newObjects
}

export function searchObject(presentation: Presentation, id: string): {slideindex: number, objectIndex: number} {
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

export function changeFontSizeText(presentation: Presentation, id: string, fontSize: number): Presentation {
    const indexObject = searchObject(presentation, id)

    if (indexObject.objectIndex >= 0 && presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex].type === 'Text') {
        const textObject: Text = presentation.slides[indexObject.slideindex].objects[indexObject.objectIndex] as Text
        const newObject: ObjectType = {
            ...textObject,
            size: fontSize
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