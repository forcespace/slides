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

export {
    setTitle,
    setActive,
}