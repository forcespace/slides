document.addEventListener('DOMContentLoaded', function ()
{

});

const editor = {
    mode: 'view',
    palette:
        {
            colorSquare: [
                {
                    width: '20px',
                    height: '20px',
                    color: '#fff',
                    active: true
                },
                {
                    width: '20px',
                    height: '20px',
                    color: '#000',
                    active: false
                },
                {
                    width: '20px',
                    height: '20px',
                    color: '#eee',
                    active: false
                },
                {
                    width: '20px',
                    height: '20px',
                    color: '#ddd',
                    active: false
                }
            ],
        },
    history: 'history log',
    presentation: {
        title: 'Заголовок презентации',
        slides: [
            {
                active: 'Индекс слайда',
                slide: {
                    title: 'Заголовок слада 1',
                    background: {
                        color: 'код цвета',
                        image: 'ссылка на картинку',
                        priority: 'Приоритет картинки'
                    },
                    texts: [
                        {
                            content: 'Текст',
                            fontsize: 18,
                            font: 'Times New Roman',
                            bold: true,
                            italic: false,
                            underline: true,
                            color: 'код цвета',
                            active: true,
                            width: 250,
                            position: {
                                x: 100,
                                y: 100,
                                z: 0
                            }
                        },
                        {
                            content: 'Текст',
                            fontsize: 18,
                            font: 'Times New Roman',
                            bold: true,
                            italic: false,
                            underline: true,
                            color: 'код цвета',
                            active: true,
                            width: 250,
                            position: {
                                x: 100,
                                y: 100,
                                z: 0
                            }
                        }
                    ],
                    images: [
                        {
                            src: 'ссылка',
                            active: true,
                            width: 100,
                            height: 100,
                            position: {
                                x: 100,
                                y: 100,
                                z: 0
                            }
                        },
                        {
                            src: 'ссылка',
                            active: false,
                            width: 100,
                            height: 100,
                            position: {
                                x: 100,
                                y: 100,
                                z: 0
                            }
                        }
                    ],
                    figures: [
                        {
                            type: 'треугольник',
                            active: true,
                            fill: '#ddd',
                            border: '#eee',
                            transform: 'rotate, scale',
                            width: 100,
                            height: 100,
                            position: {
                                x: 100,
                                y: 100,
                                z: 0
                            }
                        }
                    ]
                }
            }
        ],
    }
}