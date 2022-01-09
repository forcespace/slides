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
    setBorderColor
} from './functions'
import {Presentation} from './slide'

const initPresentation: Presentation = createPresentation()
const initColor = ''

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
        case 'SET_BORDER_COLOR':
        {
            return setBorderColor(state, action.objectId!, action.color!)
        }
        case 'SET_POSITION': {
            return setObjectPosition(state, action.objectId!, action.position!)
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

export const rootReducer = combineReducers({presentation, color, active})
