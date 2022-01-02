import {combineReducers} from 'redux'
import {ExtendedAction} from './actionCreators'
import {editor} from './editor-new'
import {setTitle, setActive, createEditor, addEmptySlide, deleteSlide} from './functions'
import {Editor} from './slide'

const initState: Editor = createEditor()

const presentationReducer = (state: Editor = initState, action: ExtendedAction): Editor => {
    switch (action.type) {
        case 'SET_TITLE': {
            const newTitle = action.newTitle ?? state.presentation.title
            return setTitle(state, newTitle)
        }
        case 'SET_ACTIVE': {
            const activeIndex = action.index ?? state.active
            return setActive(state, activeIndex)
        }
        case 'CREATE_PRESENTATION': {
            return createEditor()
        }
        case 'ADD_SLIDE': {
            return addEmptySlide(state)
        }
        case 'DELETE_SLIDE': {
            return deleteSlide(state)
        }
        default: {
            return state
        }
    }
}

const rootReducer = combineReducers({presentationReducer})

export {
    rootReducer,
}

