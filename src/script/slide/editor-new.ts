import {Editor} from './slide'

const editor: Editor = {
    history: {},
    presentation: {
        title: 'Microsoft PowerPoint',
        slides: [
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 100, y: 14},
                        width: 200,
                        height: 10,
                        active: true,
                        priority: 1,
                        content: 'Текст1',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 0, y: 100},
                        width: 250,
                        height: 20,
                        active: false,
                        priority: 2,
                        content: 'Текст2',
                        type: 'Text',
                        color: '#112dea',
                        size: 20,
                        font: 'Times New Roman',
                        fontStyle: ['italic', 'bold']
                    },
                    {
                        leftTopPoint: {x: 100, y: 100},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#00ff00',
                                borderStyle: 'Dashed'
                            },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 3,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 300, y: 30},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#fff',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    }
                ]
            },
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 25, y: 164},
                        width: 160,
                        height: 20,
                        active: false,
                        priority: 1,
                        content: 'Текст со второго слайда',
                        size: 22,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 41, y: 45},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#ff0000',
                                borderStyle: 'Solid'
                            },
                        width: 80,
                        height: 90,
                        active: true,
                        priority: 2,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 20, y: 10},
                        background: {
                            color: '#dd00dd',
                            priority: 1
                        },
                        border: {
                            borderSize: '5',
                            borderColor: '#ff0000',
                            borderStyle: 'Solid'
                        },
                        width: 400,
                        height: 400,
                        active: false,
                        priority: 3,
                        type: 'Circle'
                    },
                    {
                        leftTopPoint: {x: 10, y: 10},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#ccaddc',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    },
                    {
                        leftTopPoint: {x: 10, y: 140},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 5,
                        content: 'Текст второго слайда 2',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 2, y: 2},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#eee',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 6,
                        type: 'Triangle'
                    }
                ]
            },
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 25, y: 164},
                        width: 160,
                        height: 20,
                        active: false,
                        priority: 1,
                        content: 'Текст со второго слайда',
                        size: 22,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 41, y: 45},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#ff0000',
                                borderStyle: 'Solid'
                            },
                        width: 80,
                        height: 90,
                        active: true,
                        priority: 2,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 20, y: 10},
                        background: {
                            color: '#dd00dd',
                            priority: 1
                        },
                        border: {
                            borderSize: '5',
                            borderColor: '#ff0000',
                            borderStyle: 'Solid'
                        },
                        width: 400,
                        height: 400,
                        active: false,
                        priority: 3,
                        type: 'Circle'
                    },
                    {
                        leftTopPoint: {x: 10, y: 10},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#ccaddc',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    },
                    {
                        leftTopPoint: {x: 10, y: 140},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 5,
                        content: 'Текст второго слайда 2',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 100, y: 50},
                        background: {
                            color: 'green',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#eee',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 6,
                        type: 'Triangle'
                    }
                ]
            },
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 25, y: 164},
                        width: 160,
                        height: 20,
                        active: false,
                        priority: 1,
                        content: 'Текст со второго слайда',
                        size: 22,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 41, y: 45},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#ff0000',
                                borderStyle: 'Solid'
                            },
                        width: 80,
                        height: 90,
                        active: true,
                        priority: 2,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 20, y: 10},
                        background: {
                            color: '#dd00dd',
                            priority: 1
                        },
                        border: {
                            borderSize: '5',
                            borderColor: '#ff0000',
                            borderStyle: 'Solid'
                        },
                        width: 400,
                        height: 400,
                        active: false,
                        priority: 3,
                        type: 'Circle'
                    },
                    {
                        leftTopPoint: {x: 10, y: 10},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#ccaddc',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    },
                    {
                        leftTopPoint: {x: 10, y: 140},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 5,
                        content: 'Текст второго слайда 2',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 2, y: 2},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#eee',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 6,
                        type: 'Triangle'
                    }
                ]
            },
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 25, y: 164},
                        width: 160,
                        height: 20,
                        active: false,
                        priority: 1,
                        content: 'Текст со второго слайда',
                        size: 22,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 41, y: 45},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#ff0000',
                                borderStyle: 'Solid'
                            },
                        width: 80,
                        height: 90,
                        active: true,
                        priority: 2,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 20, y: 10},
                        background: {
                            color: '#dd00dd',
                            priority: 1
                        },
                        border: {
                            borderSize: '5',
                            borderColor: '#ff0000',
                            borderStyle: 'Solid'
                        },
                        width: 400,
                        height: 400,
                        active: false,
                        priority: 3,
                        type: 'Circle'
                    },
                    {
                        leftTopPoint: {x: 10, y: 10},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#ccaddc',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    },
                    {
                        leftTopPoint: {x: 10, y: 140},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 5,
                        content: 'Текст второго слайда 2',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 2, y: 2},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#eee',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 6,
                        type: 'Triangle'
                    }
                ]
            },
            {
                background: {
                    color: '#fff',
                    priority: 1
                },
                objects: [
                    {
                        leftTopPoint: {x: 25, y: 164},
                        width: 160,
                        height: 20,
                        active: false,
                        priority: 1,
                        content: 'Текст со второго слайда',
                        size: 22,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 41, y: 45},
                        border:
                            {
                                borderSize: '',
                                borderColor: '#ff0000',
                                borderStyle: 'Solid'
                            },
                        width: 80,
                        height: 90,
                        active: true,
                        priority: 2,
                        type: 'Image',
                        src: ''
                    },
                    {
                        leftTopPoint: {x: 20, y: 10},
                        background: {
                            color: '#dd00dd',
                            priority: 1
                        },
                        border: {
                            borderSize: '5',
                            borderColor: '#ff0000',
                            borderStyle: 'Solid'
                        },
                        width: 400,
                        height: 400,
                        active: false,
                        priority: 3,
                        type: 'Circle'
                    },
                    {
                        leftTopPoint: {x: 10, y: 10},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#ccaddc',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 4,
                        type: 'Rect'
                    },
                    {
                        leftTopPoint: {x: 10, y: 140},
                        width: 100,
                        height: 10,
                        active: true,
                        priority: 5,
                        content: 'Текст второго слайда 2',
                        size: 18,
                        type: 'Text'
                    },
                    {
                        leftTopPoint: {x: 2, y: 2},
                        background: {
                            color: '#ddd',
                            priority: 1
                        },
                        border: {
                            borderSize: '2',
                            borderColor: '#eee',
                            borderStyle: 'Dashed'
                        },
                        width: 100,
                        height: 100,
                        active: false,
                        priority: 6,
                        type: 'Triangle'
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