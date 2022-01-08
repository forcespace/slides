import {createStore, Store} from 'redux'
import {rootReducer} from './script/slide/root-reducer'

export const store: Store = createStore(rootReducer)