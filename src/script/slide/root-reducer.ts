import {ExtendedAction} from './actionCreators'
import {setTitle, setActive} from './functions'
import {Editor} from './slide'

const initState: Editor = {
    history: {},
    presentation: {
        title: '',
        slides: []
    },
    active: -1,
}

const rootReducer = (state: Editor = initState, action: ExtendedAction): Editor => {
    switch (action.type) {
        case 'SET_TITLE': {
            const newTitle = action.newTitle ?? state.presentation.title
            return setTitle(state, newTitle)
        }
        case 'SET_ACTIVE': {
            const activeIndex = action.index ?? state.active
            return setActive(state, activeIndex)
        }
        default: {
            return state
        }
    }
}

export {
    rootReducer,
}