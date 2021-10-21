import {Background, Border, Editor, Position} from '../slide/slide'

const editor: Editor = {
    history: {
    },
    presentation: {
        title: 'Microsoft PowerPoint',
        slides: [
            {
                title: "kdjfoidsgqwkhfepo",
                background: {
                    color: '#fff'
                },
                objects: [
                    {
                        leftTopPoint: {x:10, y:14},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 1,
                        content: 'Текст',
                        size: 18,
                        type: 'Text'
                    }
                ]
            },
            {
                title: "asda",
                background: {
                    color: '#fff'
                },
                objects: [
                    {
                        leftTopPoint: {x:10, y:14},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 1,
                        content: 'Текст',
                        size: 18,
                        type: 'Text'
                    }
                ]
            }
        ]
    },
    active: 1
}

export {
    editor
}