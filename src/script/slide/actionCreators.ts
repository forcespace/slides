import {Action} from 'redux'

export type ExtendedAction = {
    type: string,
    newTitle?: string,
    index?: number,
}

export function setTitle(newTitle: string): ExtendedAction
{
    return {
        type: 'SET_TITLE',
        newTitle
    }
}

export function setActive(index: number): ExtendedAction
{
    return {
        type: 'SET_ACTIVE',
        index
    }
}

export function createEditor(): Action
{
    return {
        type: 'CREATE_PRESENTATION'
    }
}

export function addEmptySlide(): Action
{
    return {
        type: 'ADD_SLIDE'
    }
}

export function deleteSlide(): Action
{
    return {
        type: 'DELETE_SLIDE'
    }
}

export function moveSlideTopByStep(index: number): ExtendedAction
{
    return {
        type: 'MOVE_SLIDE_TOP',
        index
    }
}