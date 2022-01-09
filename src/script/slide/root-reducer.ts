import {combineReducers} from 'redux'
import {ExtendedAction} from './actionCreators'
import {setBackgroundColor, addEmptySlide, addObject, createEditor, importProject, deleteSlide, moveSlideDownByStep, moveSlideTopByStep, setActive, setTitle, setObjectPositionEditorVersion, createPresentation, createHistory, undo, redo} from './functions'
import {Editor, Presentation, History} from './slide'

const initPresentation: Presentation = createPresentation()
const initState: Editor = createEditor()
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

const objectReducer = (state: Editor = initState, action: ExtendedAction): Editor => {
    switch (action.type) {
        case 'SET_POSITION': {
            return setObjectPositionEditorVersion(state, action.objectId!, action.position!)
        }
        default: {
            return state
        }
    }
}

const history = (state: History = initHistory, action: ExtendedAction): History => {
    switch (action.type) {
        case 'UNDO': {
            return undo(state)
        }
        case 'REDO': {
            return redo(state)
        }
        // case 'HISTORY_UPDATE': {
        //     return historyUpdate()
        // }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({presentation, color, objectReducer, history})
