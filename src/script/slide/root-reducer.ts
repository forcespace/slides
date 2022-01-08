import {combineReducers} from 'redux';
import {ExtendedAction} from './actionCreators';
import {setBackgroundColor, addEmptySlide, addObject, createEditor, importProject, deleteSlide, moveSlideDownByStep, moveSlideTopByStep, setActive, setTitle, setObjectPositionEditorVersion, setColor} from './functions';
import {Editor} from './slide';

const initState: Editor = createEditor();

const presentationReducer = (state: Editor = initState, action: ExtendedAction): Editor =>
{
    switch (action.type)
    {
        case 'SET_TITLE':
        {
            const newTitle = action.newTitle ?? state.presentation.title;
            return setTitle(state, newTitle);
        }
        case 'SET_ACTIVE':
        {
            const activeIndex = action.index ?? state.active;
            return setActive(state, activeIndex);
        }
        case 'CREATE_PRESENTATION':
        {
            return createEditor();
        }
        case 'ADD_SLIDE':
        {
            return addEmptySlide(state);
        }
        case 'DELETE_SLIDE':
        {
            return deleteSlide(state);
        }
        case 'MOVE_SLIDE_TOP_BY_STEP':
        {
            return moveSlideTopByStep(state);
        }
        case 'MOVE_SLIDE_DOWN_BY_STEP':
        {
            return moveSlideDownByStep(state);
        }
        case 'ADD_OBJECT':
        {
            return addObject(state, action.object!)
        }
        case 'IMPORT':
        {
            // try
            // {
            //     return JSON.parse(action.data!).presentationReducer;
            // }
            // catch (error)
            // {

            // }

            return importProject(action.data!)
        }
        case 'SET_COLOR':
        {
            return setColor(state, action.color!)
        }
        case 'SET_BACKGROUND_COLOR':
        {
            return setBackgroundColor(state, action.objectId!)
        }
        default:
        {
            return state;
        }
    }
};

const objectReducer = (state: Editor = initState, action: ExtendedAction): Editor =>
{
    switch (action.type)
    {
        case 'SET_POSITION':
        {
            return setObjectPositionEditorVersion(state, action.objectId!, action.position!)
        }
        default:
        {
            return state
        }
    }
};

export const rootReducer = combineReducers({presentationReducer, objectReducer})