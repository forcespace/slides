import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {App} from './App'
import {store} from './store'
import {Action, AnyAction} from 'redux'
import {
    undo,
    redo,
    historyUpdate,
    addStateUndo,
    updateHistoryPresentAfterUndo,
    setPresentation
} from './script/slide/actionCreators'
import {Editor, UndoRedo} from './script/slide/slide'

const mapDispatchToProps = (dispatch: (arg0: Action) => AnyAction) => ({
    addStateUndo: (obj: UndoRedo) => dispatch(addStateUndo(obj)),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    historyUpdate: () => dispatch(historyUpdate())
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
    // console.log('state.history.undo.length = ', state.history.undo)
    // TODO: подписаться на нажатие клавиш функциями внутри index ctrl^s
    // поправить условие в subscribe изменения в презентации и в полях color и active
    // сравнивать с present состоянием

    // if (state.presentation !== state.history.present.presentation) {
    //     store.dispatch(addStateUndo(newHistory))
    // }

    // console.log('state.presentation !== state.history.present.presentation = ', state.presentation !== state.history.present.presentation)
    console.log('state.presentation ', state.presentation)
    console.log('state.history.present.presentation ', state.history.present.presentation)
    console.log('state.history.undo[state.history.undo.length - 1].presentation', state.history.undo[state.history.undo.length - 1].presentation)
    // console.log('before:', (state.presentation !== state.history.present.presentation), (state.presentation !== state.history.undo[state.history.undo.length - 1].presentation), (state.presentation !== state.history.redo[0].presentation))
    if ((state.presentation !== state.history.present.presentation) && (state.presentation !== state.history.undo[state.history.undo.length - 1].presentation) && state.history.undo.length < 10) {
        // console.log((state.presentation !== state.history.present.presentation), (state.presentation !== state.history.undo[state.history.undo.length - 1].presentation), (state.presentation !== state.history.redo[0].presentation))
        console.log('true')
        store.dispatch(addStateUndo(newHistory))
        state = store.getState()
        // console.log('state.presentation === state.history.present.presentation', state.presentation === state.history.present.presentation)
        // console.log('state.presentation === state.history.undo[state.history.undo.length - 1].presentation', state.presentation === state.history.undo[state.history.undo.length - 1].presentation)
    }
    // console.log('newHistoryUndoIndex = ', newHistory)
})

document.addEventListener('keydown', function (zEvent) {
    // console.log('undo1 = ')
    let state = store.getState()
    if (zEvent.ctrlKey && zEvent.key === 'z' && state.history.undo.length > 0) {
        store.dispatch(undo())
        // console.log('undo2 = ')
        state = store.getState()
        // console.log('state1 = ', state)
        store.dispatch(setPresentation(state.history.undo[state.history.undo.length - 1].presentation))
        // console.log('undo3 = ')
        state = store.getState()
        store.dispatch(updateHistoryPresentAfterUndo())
        // console.log('undo4 = ')
    }
})

export default connect(null, mapDispatchToProps)