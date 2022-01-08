import {createStore, Store} from 'redux'
import {Editor} from './script/slide/slide'
import {rootReducer} from './script/slide/root-reducer'

export const store: Store<Editor> = createStore(rootReducer)