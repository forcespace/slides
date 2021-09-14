document.addEventListener('DOMContentLoaded', function ()
{

});

const editor = {
    mode: 'view',
}

const presentation = {
    title: 'Заголовок',
    slides: [
        {
            active: 'Индекс слайда',
            slide: {
                title: 'Заголовок слада 1',
                index: 'Индекс слайда 1',
                active: true,
                background: {
                    color: 'код цвета',
                    image: 'ссылка на картинку',
                    last: 'Приоритет картинки'
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