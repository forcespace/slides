import {Action} from 'redux';

export type ExtendedAction = {
    type: string,
    newTitle?: string,
    index?: number,
    object?: ObjectType,
    data?: string
}

export type ObjectType = {
    objectType: string
}

export function setTitle(newTitle: string): ExtendedAction
{
    return {
        type: 'SET_TITLE',
        newTitle
    };
}

export function setActive(index: number): ExtendedAction
{
    return {
        type: 'SET_ACTIVE',
        index
    };
}

export function createEditor(): Action
{
    return {
        type: 'CREATE_PRESENTATION'
    };
}

export function addEmptySlide(): Action
{
    return {
        type: 'ADD_SLIDE'
    };
}

export function deleteSlide(): Action
{
    return {
        type: 'DELETE_SLIDE'
    };
}

export function moveSlideTopByStep(): Action
{
    return {
        type: 'MOVE_SLIDE_TOP_BY_STEP'
    };
}

export function moveSlideDownByStep(): Action
{
    return {
        type: 'MOVE_SLIDE_DOWN_BY_STEP'
    };
}

export function addObject(object: ObjectType): ExtendedAction
{
    return {
        type: 'ADD_OBJECT',
        object
    };
}

export function exportProject(): Action
{
    return {
        type: 'EXPORT'
    };
}

export function importProject(data: string | ArrayBuffer | null): {data: string | ArrayBuffer | null; type: string}
{
    return {
        type: 'IMPORT',
        data: data
    };
}