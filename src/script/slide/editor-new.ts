import {Editor} from './slide'

let editor: Editor = {
    history: {},
    presentation: {
        title: 'Microsoft PowerPoint',
        slides: [
        ]
    },
    active: -1
}

function getEditor()
{
    return editor
}

function setEditor(newEditor: Editor)
{
    editor = newEditor
}

export {
    setEditor,
    getEditor
}