import {Action} from 'redux'
import {Position, Presentation, UndoRedo} from '../slide/slide'

export type ExtendedAction = {
    type: string,
    newTitle?: string,
    index?: number,
    object?: ObjectType,
    objectId?: string,
    position?: Position,
    width?: number,
    height?: number,
    data?: string | ArrayBuffer | null,
    color?: string,
    undo?: Array<UndoRedo>,
    redo?: Array<UndoRedo>,
    obj?: UndoRedo,
    newPresentation?: Presentation,
    text?: string
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

export function setPresentation(newPresentation: Presentation): ExtendedAction {
    return {
        type: 'SET_PRESENTATION',
        newPresentation
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

export function addImage(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'ADD_IMAGE',
        data
    }
}

export function deleteObject(objectId: string): ExtendedAction {
    return {
        type: 'DELETE_OBJECT',
        objectId
    }
}

export function exportProject(): Action {
    return {
        type: 'EXPORT'
    }
}

export function importPresentation(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'IMPORT_PRESENTATION',
        data: data
    }
}

export function importHistory(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'IMPORT_HISTORY',
        data: data
    }
}

export function importEditorActive(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'IMPORT_EDITOR_ACTIVE',
        data: data
    }
}

export function importEditorColor(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'IMPORT_EDITOR_COLOR',
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

export function setObjectCondition(objectId: string, width: number, height: number): ExtendedAction {
    return {
        type: 'SET_CONDITION',
        objectId,
        width,
        height
    }
}

export function setEditorColor(color: string): ExtendedAction {
    return {
        type: 'SET_EDITOR_COLOR',
        color
    }
}

export function setBackgroundImage(data: string | ArrayBuffer | null): ExtendedAction {
    return {
        type: 'SET_BACKGROUND_IMAGE',
        data
    }
}

export function setBackgroundColor(objectId: string, color: string): ExtendedAction {
    return {
        type: 'SET_BACKGROUND_COLOR',
        objectId,
        color
    }
}

export function setBorderColor(objectId: string, color: string): ExtendedAction {
    return {
        type: 'SET_BORDER_COLOR',
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

export function updateHistoryPresentAfterUndo(): ExtendedAction {
    return {
        type: 'UPDATE_HISTORY_PRESENT_UNDO'
    }
}

export function updateHistoryPresentBeforeRedo(): ExtendedAction {
    return {
        type: 'UPDATE_HISTORY_PRESENT_REDO'
    }
}

export function addText(): ExtendedAction {
    return {
        type: 'ADD_TEXT'
    }
}

export function setText(objectId: string, text: string): ExtendedAction {
    return {
        type: 'SET_TEXT',
        objectId,
        text
    }
}

export function viewShow() {
    return {
        type: 'VIEW_SHOW'
    }
}

export function viewClose() {
    return {
        type: 'VIEW_CLOSE'
    }
}