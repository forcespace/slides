 import {Editor} from './slide'

// let editor: Editor = {
//     history: {},
//     presentation: {
//         title: 'Презентация онлайн',
//         slides: [
//             {
//                 id: '1',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '12',
//                         leftTopPoint: {x: 100, y: 114},
//                         width: 200,
//                         height: 10,
//                         active: true,
//                         priority: 1,
//                         content: 'Текст1',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '13',
//                         leftTopPoint: {x: 200, y: 100},
//                         width: 250,
//                         height: 20,
//                         active: false,
//                         priority: 2,
//                         content: 'Текст2',
//                         type: 'Text',
//                         color: '#112dea',
//                         size: 20,
//                         font: 'Times New Roman',
//                         fontStyle: ['italic', 'bold']
//                     },
//                     {
//                         id: '14',
//                         leftTopPoint: {x: 100, y: 100},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#00ff00',
//                                 borderStyle: 'Dashed'
//                             },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 3,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '15',
//                         leftTopPoint: {x: 300, y: 30},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#fff',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     }
//                 ]
//             },
//             {
//                 id: '2',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '16',
//                         leftTopPoint: {x: 25, y: 164},
//                         width: 160,
//                         height: 20,
//                         active: false,
//                         priority: 1,
//                         content: 'Текст со второго слайда',
//                         size: 22,
//                         type: 'Text'
//                     },
//                     {
//                         id: '17',
//                         leftTopPoint: {x: 41, y: 45},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#ff0000',
//                                 borderStyle: 'Solid'
//                             },
//                         width: 80,
//                         height: 90,
//                         active: true,
//                         priority: 2,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '18',
//                         leftTopPoint: {x: 20, y: 10},
//                         background: {
//                             color: '#dd00dd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 5,
//                             borderColor: '#ff0000',
//                             borderStyle: 'Solid'
//                         },
//                         width: 400,
//                         height: 400,
//                         active: false,
//                         priority: 3,
//                         type: 'Circle'
//                     },
//                     {
//                         id: '18',
//                         leftTopPoint: {x: 10, y: 10},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#ccaddc',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     },
//                     {
//                         id: '19',
//                         leftTopPoint: {x: 10, y: 140},
//                         width: 100,
//                         height: 10,
//                         active: true,
//                         priority: 5,
//                         content: 'Текст второго слайда 2',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '20',
//                         leftTopPoint: {x: 2, y: 2},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#eee',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 6,
//                         type: 'Triangle'
//                     }
//                 ]
//             },
//             {
//                 id: '3',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '21',
//                         leftTopPoint: {x: 25, y: 164},
//                         width: 160,
//                         height: 20,
//                         active: false,
//                         priority: 1,
//                         content: 'Текст со второго слайда',
//                         size: 22,
//                         type: 'Text'
//                     },
//                     {
//                         id: '22',
//                         leftTopPoint: {x: 41, y: 45},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#ff0000',
//                                 borderStyle: 'Solid'
//                             },
//                         width: 80,
//                         height: 90,
//                         active: true,
//                         priority: 2,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '23',
//                         leftTopPoint: {x: 20, y: 10},
//                         background: {
//                             color: '#dd00dd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 5,
//                             borderColor: '#ff0000',
//                             borderStyle: 'Solid'
//                         },
//                         width: 400,
//                         height: 400,
//                         active: false,
//                         priority: 3,
//                         type: 'Circle'
//                     },
//                     {
//                         id: '23',
//                         leftTopPoint: {x: 10, y: 10},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#ccaddc',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     },
//                     {
//                         id: '24',
//                         leftTopPoint: {x: 10, y: 140},
//                         width: 100,
//                         height: 10,
//                         active: true,
//                         priority: 5,
//                         content: 'Текст второго слайда 2',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '25',
//                         leftTopPoint: {x: 100, y: 50},
//                         background: {
//                             color: 'green',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#eee',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 6,
//                         type: 'Triangle'
//                     }
//                 ]
//             },
//             {
//                 id: '4',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '26',
//                         leftTopPoint: {x: 25, y: 164},
//                         width: 160,
//                         height: 20,
//                         active: false,
//                         priority: 1,
//                         content: 'Текст со второго слайда',
//                         size: 22,
//                         type: 'Text'
//                     },
//                     {
//                         id: '27',
//                         leftTopPoint: {x: 41, y: 45},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#ff0000',
//                                 borderStyle: 'Solid'
//                             },
//                         width: 80,
//                         height: 90,
//                         active: true,
//                         priority: 2,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '28',
//                         leftTopPoint: {x: 20, y: 10},
//                         background: {
//                             color: '#dd00dd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 5,
//                             borderColor: '#ff0000',
//                             borderStyle: 'Solid'
//                         },
//                         width: 400,
//                         height: 400,
//                         active: false,
//                         priority: 3,
//                         type: 'Circle'
//                     },
//                     {
//                         id: '29',
//                         leftTopPoint: {x: 10, y: 10},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#ccaddc',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     },
//                     {
//                         id: '30',
//                         leftTopPoint: {x: 10, y: 140},
//                         width: 100,
//                         height: 10,
//                         active: true,
//                         priority: 5,
//                         content: 'Текст второго слайда 2',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '31',
//                         leftTopPoint: {x: 2, y: 2},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#eee',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 6,
//                         type: 'Triangle'
//                     }
//                 ]
//             },
//             {
//                 id: '2',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '32',
//                         leftTopPoint: {x: 25, y: 164},
//                         width: 160,
//                         height: 20,
//                         active: false,
//                         priority: 1,
//                         content: 'Текст со второго слайда',
//                         size: 22,
//                         type: 'Text'
//                     },
//                     {
//                         id: '33',
//                         leftTopPoint: {x: 41, y: 45},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#ff0000',
//                                 borderStyle: 'Solid'
//                             },
//                         width: 80,
//                         height: 90,
//                         active: true,
//                         priority: 2,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '34',
//                         leftTopPoint: {x: 20, y: 10},
//                         background: {
//                             color: '#dd00dd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 5,
//                             borderColor: '#ff0000',
//                             borderStyle: 'Solid'
//                         },
//                         width: 400,
//                         height: 400,
//                         active: false,
//                         priority: 3,
//                         type: 'Circle'
//                     },
//                     {
//                         id: '35',
//                         leftTopPoint: {x: 10, y: 10},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#ccaddc',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     },
//                     {
//                         id: '36',
//                         leftTopPoint: {x: 10, y: 140},
//                         width: 100,
//                         height: 10,
//                         active: true,
//                         priority: 5,
//                         content: 'Текст второго слайда 2',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '37',
//                         leftTopPoint: {x: 2, y: 2},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#eee',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 6,
//                         type: 'Triangle'
//                     }
//                 ]
//             },
//             {
//                 id: '2',
//                 background: {
//                     color: '#fff',
//                     priority: 1
//                 },
//                 objects: [
//                     {
//                         id: '38',
//                         leftTopPoint: {x: 25, y: 164},
//                         width: 160,
//                         height: 20,
//                         active: false,
//                         priority: 1,
//                         content: 'Текст со второго слайда',
//                         size: 22,
//                         type: 'Text'
//                     },
//                     {
//                         id: '39',
//                         leftTopPoint: {x: 41, y: 45},
//                         border:
//                             {
//                                 borderSize: 0,
//                                 borderColor: '#ff0000',
//                                 borderStyle: 'Solid'
//                             },
//                         width: 80,
//                         height: 90,
//                         active: true,
//                         priority: 2,
//                         type: 'Image',
//                         src: '/image/1.png'
//                     },
//                     {
//                         id: '40',
//                         leftTopPoint: {x: 20, y: 10},
//                         background: {
//                             color: '#dd00dd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 5,
//                             borderColor: '#ff0000',
//                             borderStyle: 'Solid'
//                         },
//                         width: 400,
//                         height: 400,
//                         active: false,
//                         priority: 3,
//                         type: 'Circle'
//                     },
//                     {id: '41',
//                         leftTopPoint: {x: 10, y: 10},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#ccaddc',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 4,
//                         type: 'Rect'
//                     },
//                     {
//                         id: '42',
//                         leftTopPoint: {x: 10, y: 140},
//                         width: 100,
//                         height: 10,
//                         active: true,
//                         priority: 5,
//                         content: 'Текст второго слайда 2',
//                         size: 18,
//                         type: 'Text'
//                     },
//                     {
//                         id: '43',
//                         leftTopPoint: {x: 2, y: 2},
//                         background: {
//                             color: '#ddd',
//                             priority: 1
//                         },
//                         border: {
//                             borderSize: 2,
//                             borderColor: '#eee',
//                             borderStyle: 'Dashed'
//                         },
//                         width: 100,
//                         height: 100,
//                         active: false,
//                         priority: 6,
//                         type: 'Triangle'
//                     }
//                 ]
//             }
//         ]
//     },
//     active: 1
// }

// function getEditor(): Editor
// {
//     return editor
// }

// function setEditor(newEditor: Editor)
// {
//     editor = newEditor
// }

// export {
//     editor,
//     setEditor,
//     getEditor
// }