import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './store'
import {Action, AnyAction} from 'redux'
import {undo, redo, addStateUndo, updateHistoryPresentAfterUndo, updateHistoryPresentBeforeRedo, setPresentation} from './script/slide/actionCreators'
import {Editor, UndoRedo} from './script/slide/slide'

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    addStateUndo: (obj: UndoRedo) => dispatch(addStateUndo(obj)),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo())
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

store.subscribe(() => {
    let state: Editor = store.getState()
    const newHistory: UndoRedo = {
        presentation: state.presentation,
        active: state.active,
        color: state.color
    }

    if ((state.presentation !== state.history.present.presentation) && (state.history.flag !== 'redo') && (state.history.flag !== 'undo') &&
    state.history.undo.length < 400) {
        store.dispatch(addStateUndo(newHistory))
        state = store.getState()

    }
})

document.addEventListener('keydown', function (zEvent) {
    let state = store.getState()
    if (((zEvent.ctrlKey && zEvent.key === 'z') || (zEvent.ctrlKey && zEvent.key === 'Z')) && state.history.undo.length > 0) {
        state = store.getState()
        store.dispatch(undo())
        state = store.getState()
        store.dispatch(setPresentation(state.history.undo[0].presentation))

    }

    if (((zEvent.ctrlKey && zEvent.key === 'y') || (zEvent.ctrlKey && zEvent.key === 'Y')) && state.history.undo.length > 0) {
        store.dispatch(setPresentation(state.history.undo[0].presentation))
        state = store.getState()
        store.dispatch(redo())
        state = store.getState()
    }

})

export default connect(null, mapDispatchToProps)