import {Action} from 'redux'
import {Position, UndoRedo} from '../slide/slide'

export type ExtendedAction = {
    type: string,
    newTitle?: string,
    index?: number,
    object?: ObjectType,
    objectId?: string,
    position?: Position,
    data?: string | ArrayBuffer | null,
    color?: string,
    undo?: Array<UndoRedo>,
    present?: UndoRedo,
    redo?: Array<UndoRedo>,
    obj?: UndoRedo
}

export type ObjectType = {
    objectType: string
}

export function setTitle(newTitle: string): ExtendedAction {
    return {
        type: 'SET_TITLE',
        newTitle
    }
}

export function setActive(index: number): ExtendedAction {
    return {
        type: 'SET_ACTIVE',
        index
    }
}

export function createEditor(): Action {
    return {
        type: 'CREATE_PRESENTATION'
    }
}

export function addEmptySlide(): Action {
    return {
        type: 'ADD_SLIDE'
    }
}

export function deleteSlide(): Action {
    return {
        type: 'DELETE_SLIDE'
    }
}

export function moveSlideTopByStep(): Action {
    return {
        type: 'MOVE_SLIDE_TOP_BY_STEP'
    }
}

export function moveSlideDownByStep(): Action {
    return {
        type: 'MOVE_SLIDE_DOWN_BY_STEP'
    }
}

export function addObject(object: ObjectType): ExtendedAction {
    return {
        type: 'ADD_OBJECT',
        object
    }
}

export function exportProject(): Action {
    return {
        type: 'EXPORT'
    }
}

export function importProject(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'IMPORT',
        data: data
    }
}

export function setObjectPosition(objectId: string, position: Position): ExtendedAction {
    return {
        type: 'SET_POSITION',
        objectId,
        position
    }
}

export function setEditorColor(color: string): ExtendedAction {
    return {
        type: 'SET_COLOR',
        color
    }
}

export function setBackgroundColor(objectId: string, color: string): ExtendedAction {
    return {
        type: 'SET_BACKGROUND_COLOR',
        objectId,
        color
    }
}

export function setEditorActive(objectId: string): ExtendedAction {
    return {
        type: 'SET_EDITOR_ACTIVE',
        objectId
    }
}

export function addStateUndo(obj: UndoRedo): ExtendedAction {
    return {
        type: 'ADD_STATE_UNDO',
        obj
    }
}

export function undo(): ExtendedAction {
    return {
        type: 'UNDO'
    }
}

export function redo(): ExtendedAction {
    return {
        type: 'REDO'
    }
}

export function historyUpdate(): ExtendedAction {
    return {
        type: 'HISTORY_UPDATE'
    }
}