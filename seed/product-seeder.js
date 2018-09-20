const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

const products = [
    new Product({
        id: 1,
        imagePath: ['https://c3.sunlight.net/media/products/84ad2aaa0ecab5ca3778fc75d76b0cad.jpg?2018-04-02T03:01:39.214230Z'],
        title: 'Золотое кольцо с бриллиантами',
        description: 'Бренд: SUNLIGHT Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'SUNLIGHT',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 74990,
        sale: 20,
        type: 'Колько',
        size: [16.5, 17, 17.5, 18],
        addInfo: 'Sale',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['http://www.art79.ru/postimages/lc5174_wc5174.jpg'],
        title: 'Coast Diamond',
        description: 'Бренд: SUNLIGHT Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'SUNLIGHT',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [16.5, 18],
        addInfo: 'New',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['http://media.tiffany.com/is/image/Tiffany/60409005_971059_ED_M?$EcomItemL2$&amp;id=4KpqW3&amp;fmt=jpg&amp;fit=constrain,1&amp;wid=1250&amp;hei=1250'],
        title: 'кольцо Diamond Hoop',
        description: 'Коллекция Diamond Hoop, вдохновленная красотой линий, — олицетворение современной простоты. Сочетание изящных изогнутых линий и сияющих бриллиантовых акцентов.Золото 18 карат с двумя бриллиантами круглой огранки общий вес бриллиантов – 0,10 карата авторский дизайн Эльзы Перетти',
        partDesc: {
            'Бренд': 'Diamond Hoop',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 18 карат',
            'Проба': 'Белое золото 585',
            'Вес': '32,9 г'
        },
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [19, 18],
        addInfo: 'Best Seller',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['https://zoloto585.ru/upload/iblock/9fc/4100058687.jpg'],
        title: 'Кольцо с одним камнем (аметист) из красного золота 585 пробы',
        description: 'Тип изделия кольцо Стиль мода Металл золото Проба 585 Цвет металла красный Вставка аметист ',
        partDesc: {
            'Вставка': 'Аметист',
            'Проба': 'Золото 585',
            'Вес': '32,9 г'
        },
        price: 6990,
        sale: 0,
        type: 'Колько',
        size: [12, 13],
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['https://c3.sunlight.net/media/products/84ad2aaa0ecab5ca3778fc75d76b0cad.jpg?2018-04-02T03:01:39.214230Z'],
        title: 'Золотое кольцо с бриллиантами',
        description: 'Бренд: SUNLIGHT Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'SUNLIGHT',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 74990,
        sale: 20,
        type: 'Колько',
        size: [16.5, 17, 17.5, 18],
        addInfo: 'Sale',
        owner: "5b4a3ad49d7f7d18e032c8c1",
        quantity: 1
    }),
    new Product({
        imagePath: ['http://www.art79.ru/postimages/lc5174_wc5174.jpg'],
        title: 'Coast Diamond',
        description: 'Бренд: Coast Diamond Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'Coast Diamond',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [16.5, 18],
        addInfo: 'New',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['http://media.tiffany.com/is/image/Tiffany/60409005_971059_ED_M?$EcomItemL2$&amp;id=4KpqW3&amp;fmt=jpg&amp;fit=constrain,1&amp;wid=1250&amp;hei=1250'],
        title: 'кольцо Diamond Hoop',
        partDesc: {
            'Бренд': 'Diamond Hoop',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 18 карат',
            'Проба': 'Белое золото 585',
            'Вес': '32,9 г'
        },
        description: 'Коллекция Diamond Hoop, вдохновленная красотой линий, — олицетворение современной простоты. Сочетание изящных изогнутых линий и сияющих бриллиантовых акцентов.Золото 18 карат с двумя бриллиантами круглой огранки общий вес бриллиантов – 0,10 карата авторский дизайн Эльзы Перетти',
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [19, 18],
        addInfo: 'Best Seller',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['https://zoloto585.ru/upload/iblock/9fc/4100058687.jpg'],
        title: 'Кольцо с одним камнем (аметист) из красного золота 585 пробы',
        description: 'Тип изделия кольцо Стиль мода Металл золото Проба 585 Цвет металла красный Вставка аметист ',
        partDesc: {
            'Вставка': 'Аметист',
            'Проба': 'Золото 585',
            'Вес': '32,9 г'
        },
        price: 6990,
        sale: 0,
        type: 'Колько',
        size: [12, 13],
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['https://c3.sunlight.net/media/products/84ad2aaa0ecab5ca3778fc75d76b0cad.jpg?2018-04-02T03:01:39.214230Z'],
        title: 'Золотое кольцо с бриллиантами',
        description: 'Бренд: SUNLIGHT Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'SUNLIGHT',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 74990,
        sale: 20,
        type: 'Колько',
        size: [16.5, 17, 17.5, 18],
        addInfo: 'Sale',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['http://www.art79.ru/postimages/lc5174_wc5174.jpg'],
        title: 'Coast Diamond',
        description: 'Бренд: SUNLIGHT Модель: 7461-K5W-01 Вставка: Бриллиант Кольцо с 1 бриллиантом, 0.04 карат, 4 бриллиантами, 0.24 карат, 4 бриллиантами, 0.33 карат; Белое золото 585 пробы. Минимальный вес изделия: 3,9 г',
        partDesc: {
            'Бренд': 'SUNLIGHT',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 0.04 карат; 4 бриллиантами - 0.24 карат; 4 бриллиантами - 0.33 карат',
            'Проба': 'Белое золото 585',
            'Вес': '3,9 г'
        },
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [16.5, 18],
        addInfo: 'New',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['http://media.tiffany.com/is/image/Tiffany/60409005_971059_ED_M?$EcomItemL2$&amp;id=4KpqW3&amp;fmt=jpg&amp;fit=constrain,1&amp;wid=1250&amp;hei=1250'],
        title: 'кольцо Diamond Hoop',
        description: 'Коллекция Diamond Hoop, вдохновленная красотой линий, — олицетворение современной простоты. Сочетание изящных изогнутых линий и сияющих бриллиантовых акцентов.Золото 18 карат с двумя бриллиантами круглой огранки общий вес бриллиантов – 0,10 карата авторский дизайн Эльзы Перетти',
        partDesc: {
            'Бренд': 'Diamond Hoop',
            'Модель': '7461-K5W-01',
            'Вставка': 'Бриллиант 1 - 18 карат',
            'Проба': 'Белое золото 585',
            'Вес': '32,9 г'
        },
        price: 3990,
        sale: 0,
        type: 'Колько',
        size: [19, 18],
        addInfo: 'Best Seller',
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
    new Product({
        imagePath: ['https://zoloto585.ru/upload/iblock/9fc/4100058687.jpg'],
        title: 'Кольцо с одним камнем (аметист) из красного золота 585 пробы',
        description: 'Тип изделия кольцо Стиль мода Металл золото Проба 585 Цвет металла красный Вставка аметист ',
        partDesc: {
            'Вставка': 'Аметист',
            'Проба': 'Золото 585',
            'Вес': '32,9 г'
        },
        price: 6990,
        sale: 0,
        type: 'Колько',
        size: [12, 13],
        quantity: 1,
        owner: "5b4a3ad49d7f7d18e032c8c1"
    }),
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save((err, result) => {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}