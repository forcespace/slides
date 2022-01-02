import { Action } from "redux"

export type ExtendedAction = {
    type: string,
    newTitle?: string, 
    index?: number, 
}

function setTitle(newTitle: string): ExtendedAction {
    return {
      type: 'SET_TITLE',
      newTitle
    }
  }

function setActive(index: number): ExtendedAction {
  return {
    type: 'SET_ACTIVE',
    index
  }
}

function createEditor(): Action {
    return {
      type: 'CREATE_PRESENTATION'
    }
  }

function addEmptySlide(): Action {
  return {
    type: 'ADD_SLIDE'
  }
}

function deleteSlide(): Action {
  return {
    type: 'DELETE_SLIDE'
  }
}

export {
    setTitle,
    setActive,
    createEditor,
    addEmptySlide,
    deleteSlide,
}