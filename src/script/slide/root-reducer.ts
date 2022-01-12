import {combineReducers} from 'redux'
import {ExtendedAction} from './actionCreators'
import {
    setBackgroundColor,
    addEmptySlide,
    addObject,
    addImage,
    importPresentation,
    importEditorActive,
    importEditorColor,
    importHistory,
    deleteSlide,
    moveSlideDownByStep,
    moveSlideTopByStep,
    setActive,
    setTitle,
    setObjectPosition,
    createPresentation,
    setBorderColor,
    createHistory,
    undo,
    redo,
    historyUpdate,
    addStateUndo,
    setPresentation,
    updateHistoryPresentAfterUndo,
    updateHistoryPresentAfterRedo
} from './functions'
import {Presentation, History} from './slide'

const initPresentation: Presentation = createPresentation()
const initColor = ''
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
        case 'ADD_IMAGE': {
            return addImage(state, action.data!)
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
            return setBorderColor(state, action.objectId!, action.color!)
        }
        case 'SET_POSITION': {
            return setObjectPosition(state, action.objectId!, action.position!)
        }

        case 'SET_PRESENTATION': {
            // console.log('action.newPresentation', action.newPresentation)
            return setPresentation(state, action.newPresentation!)
        }
        default: {
            return state
        }
    }
}

const color = (state: string = initColor, action: ExtendedAction): string => {
    switch (action.type) {
        case 'SET_EDITOR_COLOR': {
            return action.color!
        }
        case 'IMPORT_EDITOR_COLOR': {
            return importEditorColor(action.data!)
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
        case 'IMPORT_EDITOR_COLOR': {
            return importEditorActive(action.data!)
        }
        default: {
            return state
        }
    }
}

const history = (state: History = initHistory, action: ExtendedAction): History => {
    switch (action.type) {
        case 'ADD_STATE_UNDO': {
            // console.log('action.obj!', action.obj!)
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
        case 'IMPORT_HISTORY': {
            return importHistory(action.data!)
        }
        case 'UPDATE_HISTORY_PRESENT_UNDO': {
            return updateHistoryPresentAfterUndo(state)
        }
        case 'UPDATE_HISTORY_PRESENT_REDO': {
            return updateHistoryPresentAfterRedo(state)
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({presentation, color, active, history})
