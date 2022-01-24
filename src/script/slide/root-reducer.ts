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
        // const {past, present, future} = state
        const {history, presentation} = state
        switch (action.type) {
            case 'UNDO': {
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
                    return state
                }
            }
            case 'REDO': {
                if (history.future.length > 0) {
                    const next = history.future[0]
                    const newFuture = history.future.slice(1)
                    return {
                        history: {
                            past: [...history.past, presentation],
                            future: newFuture
                        },
                        presentation: next
                    }
                } else {
                    return state
                }
            }
            default: {
                const newPresent: Presentation = reducer(presentation, action)
                console.log('state = ', state)
                console.log('newPresent = ', newPresent)
                if (presentation === newPresent) {
                    console.log('Нет изменений')
                    return state
                }
                console.log('Заполнение undo')
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

// const color = (state: string = initColor, action: ExtendedAction): string => {
//     switch (action.type) {
//         case 'SET_EDITOR_COLOR': {
//             return action.color!
//         }
//         case 'IMPORT_EDITOR_COLOR': {
//             return importEditorColor(action.data!)
//         }
//         default: {
//             return state
//         }
//     }
// }

// const active = (state = '', action: ExtendedAction): string => {
//     switch (action.type) {
//         case 'SET_EDITOR_ACTIVE': {
//             return action.objectId!
//         }
//         case 'IMPORT_EDITOR_COLOR': {
//             return importEditorActive(action.data!)
//         }
//         default: {
//             return state
//         }
//     }
// }

// const history = (state: History = initHistory, action: ExtendedAction): History => {
//     switch (action.type) {
//         case 'ADD_STATE_UNDO': {
//             return addStateUndo(state, action.obj!)
//         }
//         case 'UNDO': {
//             return undo(state)
//         }
//         case 'REDO': {
//             return redo(state)
//         }
//         case 'HISTORY_UPDATE': {
//             return historyUpdate(state)
//         }
//         case 'IMPORT_HISTORY': {
//             return importHistory(action.data!)
//         }
//         default: {
//             return state
//         }
//     }
// }

// const editor = undoable(presentation)

export const rootReducer = undoable(presentation)