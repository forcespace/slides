import {ExtendedAction} from './actionCreators'
import {
    setBackgroundColor,
    setBackgroundImage,
    addEmptySlide,
    addObject,
    addImage,
    addText,
    setText,
    importPresentation,
    deleteSlide,
    moveSlideDownByStep,
    moveSlideTopByStep,
    setActive,
    setTitle,
    setObjectPosition,
    setObjectCondition,
    createPresentation,
    setObjectBorderColor,
    deleteObject,
    changeFontSizeText
} from './functions'
import {Editor, Presentation} from './slide'

const initPresentation: Presentation = createPresentation()

function undoable(reducer: Function) {
    const initialState = {
        history: {
            past: [],
            future: []
        },
        presentation: reducer(undefined, {})
    }

    return function (state: Editor = initialState, action: ExtendedAction) {
        const {history, presentation} = state
        switch (action.type) {
            case 'UNDO': {
                console.log('UNDO = ', history.past.length)
                if (history.past.length > 0) {
                    const previous = history.past[history.past.length - 1]
                    const newPast = history.past.slice(0, history.past.length - 1)

                    return {
                        history: {
                            past: newPast,
                            future: [presentation, ...history.future]
                        },
                        presentation: previous
                    }
                } else {
                    console.log('UNDO = 0')
                    return state
                }
            }
            case 'REDO': {
                if (history.future.length > 0) {
                    console.log('REDO = ', history.future.length)
                    const next = history.future[0]
                    const newFuture = history.future.slice(1)
                    console.log('OldColor = ', presentation.color)
                    console.log('NewColor = ', next.color)
                    return {
                        history: {
                            past: [...history.past, presentation],
                            future: newFuture
                        },
                        presentation: next
                    }
                } else {
                    console.log('REDO = 0')
                    return state
                }
            }
            default: {
                const newPresent: Presentation = reducer(presentation, action)
                if (presentation === newPresent) {
                    return state
                }
                console.log(
                    'Не совпадают newPresent === presentation = ')
                // console.log('newPresent = ', newPresent.slides[newPresent.active.slideIndex].objects[newPresent.slides[newPresent.active.slideIndex].objects.length - 1])
                // console.log('presentation = ', presentation.slides[presentation.active.slideIndex].objects[presentation.slides[presentation.active.slideIndex].objects.length - 1])
                // console.log('newPresent = ', newPresent.slides[newPresent.active.slideIndex])
                // console.log('presentation = ', presentation.slides[presentation.active.slideIndex])
                return {
                    history: {
                        past: [...history.past, presentation],
                        future: []
                    },
                    presentation: newPresent
                }
            }
        }
    }
}

const presentation = (state: Presentation = initPresentation, action: ExtendedAction): Presentation => {
    switch (action.type) {
        case 'SET_TITLE': {
            const newTitle = action.newTitle ?? state.title
            return setTitle(state, newTitle)
        }
        case 'SET_ACTIVE': {
            const activeIndex = action.index ?? state.active.slideIndex
            return setActive(state, activeIndex)
        }
        case 'CREATE_PRESENTATION': {
            return createPresentation()
        }
        case 'ADD_SLIDE': {
            return addEmptySlide(state)
        }
        case 'DELETE_SLIDE': {
            return deleteSlide(state)
        }
        case 'MOVE_SLIDE_TOP_BY_STEP': {
            return moveSlideTopByStep(state)
        }
        case 'MOVE_SLIDE_DOWN_BY_STEP': {
            return moveSlideDownByStep(state)
        }
        case 'ADD_OBJECT': {
            return addObject(state, action.object!)
        }
        case 'ADD_IMAGE': {
            return addImage(state, action.data!)
        }
        case 'ADD_TEXT': {
            return addText(state)
        }
        case 'DELETE_OBJECT': {
            return deleteObject(state, action.objectId!)
        }
        case 'SET_TEXT': {
            return setText(state, action.objectId!, action.text!)
        }
        case 'IMPORT_PRESENTATION': {
            return importPresentation(action.data!)
        }
        case 'SET_BACKGROUND_COLOR':
        {
            return setBackgroundColor(state, action.objectId!, action.color!)
        }
        case 'SET_BORDER_COLOR':
        {
            return setObjectBorderColor(state, action.objectId!, action.color!)
        }
        case 'SET_POSITION': {
            return setObjectPosition(state, action.objectId!, action.position!)
        }
        case 'SET_CONDITION': {
            return setObjectCondition(state, action.objectId!, action.width!, action.height!)
        }
        case 'SET_BACKGROUND_IMAGE': {
            return setBackgroundImage(state, action.data!)
        }
        case 'VIEW_SHOW': {
            return {
                ...state,
                viewShown: true
            }
        }
        case 'VIEW_CLOSE': {
            return {
                ...state,
                viewShown: false
            }
        }
        case 'CHANGE_FONT_SIZE_TEXT': {
            return changeFontSizeText(state, action.id!, action.fontSize!)
        }
        case 'SET_EDITOR_COLOR': {
            return {
                ...state,
                color: action.color!
            }
        }
        case 'SET_EDITOR_ACTIVE': {
            return {
                ...state,
                active: {
                    ...state.active,
                    activeObject: action.objectId!
                }
            }
        }
        default: {
            return state
        }
    }
}

export const rootReducer = undoable(presentation)