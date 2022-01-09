import {combineReducers} from 'redux'
import {ExtendedAction} from './actionCreators'
import {
    setBackgroundColor,
    addEmptySlide,
    addObject,
    importProject,
    deleteSlide,
    moveSlideDownByStep,
    moveSlideTopByStep,
    setActive,
    setTitle,
    setObjectPosition,
    createPresentation,
    createHistory,
    undo,
    redo,
    historyUpdate,
    addStateUndo
} from './functions'
import {Presentation, History} from './slide'

const initPresentation: Presentation = createPresentation()
const initHistory: History = createHistory()

const presentation = (state: Presentation = initPresentation, action: ExtendedAction): Presentation => {
    switch (action.type) {
        case 'SET_TITLE': {
            const newTitle = action.newTitle ?? state.title
            return setTitle(state, newTitle)
        }
        case 'SET_ACTIVE': {
            const activeIndex = action.index ?? state.active
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
        case 'IMPORT': {
            return importProject(action.data!)
        }
        case 'SET_BACKGROUND_COLOR':
        {
            return setBackgroundColor(state, action.objectId!, action.color!)
        }
        case 'SET_POSITION': {
            return setObjectPosition(state, action.objectId!, action.position!)
        }
        default: {
            return state
        }
    }
}

const color = (state = '', action: ExtendedAction): string => {
    switch (action.type) {
        case 'SET_COLOR': {
            return action.color!
        }
        default: {
            return state
        }
    }
}

const active = (state = '', action: ExtendedAction): string => {
    switch (action.type) {
        case 'SET_EDITOR_ACTIVE': {
            return action.objectId!
        }
        default: {
            return state
        }
    }
}

const history = (state: History = initHistory, action: ExtendedAction): History => {
    switch (action.type) {
        case 'ADD_STATE_UNDO': {
            console.log('action.obj!', action.obj!)
            return addStateUndo(state, action.obj!)
        }
        case 'UNDO': {
            return undo(state)
        }
        case 'REDO': {
            return redo(state)
        }
        case 'HISTORY_UPDATE': {
            return historyUpdate(state)
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({presentation, color, active, history})
