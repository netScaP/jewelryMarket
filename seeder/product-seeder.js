const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect('mongodb://xnx:Bahmud20002004@ds111012.mlab.com:11012/jewelry', { useMongoClient: true });

const products = [
	new Product({
		imagePath: ['https://orientalforyou.com/wp-content/uploads/2017/12/019.jpg'],
		title: 'Кольцо из красного золота 585 пробы с фианитом',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 77800,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Кольцо',
		size: [17, 17.5, 18, 19],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['http://www.forzieri.com/butik/_im1/i/forzieri/to30158-004-1x?$FEEDM$', 'https://ae01.alicdn.com/kf/HTB19DG8MXXXXXa1XFXXq6xXFXXX7/S.jpg_640x640.jpg'],
		title: 'Супер красивый браслет',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 9500,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [16, 16.5, 17, 18],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://золотой-сфинкс.com/image/cache/catalog/data/20.1-1000x1000.png'],
		title: 'Золотое кольцо для помолвки',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 2100,
		partDesc: {
			'Коллекция': 'Свадьба',
			'Цвет металла': 'Белый',
			'Металл': 'Серебро 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [18, 19.5, 21],
		quantity: 10,
		addInfo: '',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://orientalforyou.com/wp-content/uploads/2017/12/019.jpg'],
		title: 'Кольцо из красного золота 585 пробы с фианитом',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 77800,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Кольцо',
		size: [17, 17.5, 18, 19],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['http://www.forzieri.com/butik/_im1/i/forzieri/to30158-004-1x?$FEEDM$', 'https://ae01.alicdn.com/kf/HTB19DG8MXXXXXa1XFXXq6xXFXXX7/S.jpg_640x640.jpg'],
		title: 'Супер красивый браслет',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 9500,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [16, 16.5, 17, 18],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://золотой-сфинкс.com/image/cache/catalog/data/20.1-1000x1000.png'],
		title: 'Золотое кольцо для помолвки',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 2100,
		partDesc: {
			'Коллекция': 'Свадьба',
			'Цвет металла': 'Белый',
			'Металл': 'Серебро 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [18, 19.5, 21],
		quantity: 10,
		addInfo: '',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://orientalforyou.com/wp-content/uploads/2017/12/019.jpg'],
		title: 'Кольцо из красного золота 585 пробы с фианитом',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 77800,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Кольцо',
		size: [17, 17.5, 18, 19],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['http://www.forzieri.com/butik/_im1/i/forzieri/to30158-004-1x?$FEEDM$', 'https://ae01.alicdn.com/kf/HTB19DG8MXXXXXa1XFXXq6xXFXXX7/S.jpg_640x640.jpg'],
		title: 'Супер красивый браслет',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 9500,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [16, 16.5, 17, 18],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://золотой-сфинкс.com/image/cache/catalog/data/20.1-1000x1000.png'],
		title: 'Золотое кольцо для помолвки',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 2100,
		partDesc: {
			'Коллекция': 'Свадьба',
			'Цвет металла': 'Белый',
			'Металл': 'Серебро 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [18, 19.5, 21],
		quantity: 10,
		addInfo: '',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://orientalforyou.com/wp-content/uploads/2017/12/019.jpg'],
		title: 'Кольцо из красного золота 585 пробы с фианитом',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 77800,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Кольцо',
		size: [17, 17.5, 18, 19],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['http://www.forzieri.com/butik/_im1/i/forzieri/to30158-004-1x?$FEEDM$', 'https://ae01.alicdn.com/kf/HTB19DG8MXXXXXa1XFXXq6xXFXXX7/S.jpg_640x640.jpg'],
		title: 'Супер красивый браслет',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 9500,
		partDesc: {
			'Коллекция': 'Шампань',
			'Цвет металла': 'Красный',
			'Металл': 'Золото 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [16, 16.5, 17, 18],
		quantity: 10,
		addInfo: 'BEST',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	}),
	new Product({
		imagePath: ['https://золотой-сфинкс.com/image/cache/catalog/data/20.1-1000x1000.png'],
		title: 'Золотое кольцо для помолвки',
		description: 'Это кольцо которое будет кольцом и кольцо что нужно всем кольцам так как кольцам нужны люди',
		price: 2100,
		partDesc: {
			'Коллекция': 'Свадьба',
			'Цвет металла': 'Белый',
			'Металл': 'Серебро 585',
			'Вставка': 'Фианит'
		},
		sale: 0,
		type: 'Браслет',
		size: [18, 19.5, 21],
		quantity: 10,
		addInfo: '',
        owner: "5b4a3ad49d7f7d18e032c8c1"
	})
];

let done = 0;
for (let i = 0; i < products.length; i++) {
	products[i].save((err, reuslt) => {
		done++;
		if (done === products.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}