const express = require('express');

const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/order');
const Selling = require('../models/selling');

const { isLoggedIn, notLoggedIn, reqOld } = require('../authControl');

const router = express.Router();

/* GET home page. */
router.get('/', reqOld, (req, res, next) => {
	const Session = req.session;
	if (Session.hasOwnProperty('passport')) {
		var isLoggedIn = Session.passport.hasOwnProperty('user');
	} else {
		var isLoggedIn = false;
	}
	const cartQty = req.session.cart ? req.session.cart.totalQty || 0 : 0;
	const successMsg = req.flash('success')[0];
	res.render('product/collection', {
		title: 'Shopping Cart', 
		cartQty, 
		isLogin: isLoggedIn, 
		successMsg, 
		noMessages: !successMsg
	});
});

router.get('/checkout', reqOld, (req, res, next) => {
	const Session = req.session;
	if (Session.hasOwnProperty('passport')) {
		var isLoggedIn = Session.passport.hasOwnProperty('user');
	} else {
		var isLoggedIn = false;
	}
	
	req.session.cart = req.session.cart || {};

	const cart = new Cart(req.session.cart);
	const cartQty = req.session.cart ? req.session.cart.totalQty || 0 : 0;
	const errMsg = req.flash('error')[0];
	res.render('account/checkout', {
		cart, 
		errMsg, 
		cartQty, 
		noError: !errMsg, 
		isLogin: isLoggedIn
	});
});

router.put('/checkout', (req, res, next) => {
	const cart = new Cart(req.session.cart);
	let addInfo = {};
	console.log('put');
	for (var i = Object.keys(req.body).length - 1; i >= 0; i--) {
		if (+req.body[i].quantPut < 1) continue;
		
		addInfo['difQty'] = req.body[i].quantPut - cart.items[req.body[i]['id']][req.body[i]['size']].qty;
		addInfo['size'] = req.body[i]['size'];

		if (addInfo['difQty'] != 0) {
			cart.putItem(req.body[i]['id'], addInfo);
		}

		addInfo = {};
	};

	req.session.cart = cart;

	next();
});

router.post('/checkout', isLoggedIn, (req, res, next) => {
	if (!req.session.cart) {
		return res.redirect('/checkout');
	}

	let cartToJson = req.session.cart;
	cartToJson['items'] = JSON.stringify(cartToJson['items']);

	const cart = new Cart(cartToJson);

	console.log(req.body);

	console.log(cart);

	const order = new Order({
		user: req.user['_id'],
		cart,
		address: req.body.postCode,
		name: req.body.city,
		phone: req.body.phone
	});

	order.save((err, result) => {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/');
		}

		req.flash('success', 'Successfully bought product!');
		const sales = {};
		cart['items'] = JSON.parse(cart['items']);
		for (let id in cart['items']) {
			for (let item in cart['items'][id]) {
				console.log(cart['items'][id][item]['item']);
				if (cart['items'][id][item]['item']['quantity'] - cart['items'][id][item]['qty'] < 0) {
					continue;
				}
				sales[cart['items'][id][item]['item']['owner']] = sales[cart['items'][id][item]['item']['owner']] || [];
				sales[cart['items'][id][item]['item']['owner']].push({
					'customer': req.user['_id'],
					'price': cart['items'][id][item]['item']['price'],
					'size': item,
					'qty': cart['items'][id][item]['qty'],
					'image': cart['items'][id][item]['item'].imagePath[0],
					'unique': +cart['items'][id][item]['item'].unique,
					'time': new Date()
				});
			}
		}


		saveSellingFor(sales).then(() => {
			console.log('end');
			req.session.cart = null;
			return res.redirect('/');
		});
	});
});

router.post('/delete/:id', (req, res, next) => {
	const cart = new Cart(req.session.cart ? req.session.cart : {});
	const addInfo = req.body;
	cart.removeItem(addInfo.id, addInfo);

	req.session.cart = cart;
	console.log(cart);
	res.redirect('/checkout');
});

router.get('/:id', reqOld, (req, res, next) => {
	const Session = req.session;
	if (Session.hasOwnProperty('passport')) {
		var isLoggedIn = Session.passport.hasOwnProperty('user');
	} else {
		var isLoggedIn = false;
	}
	const product = req.params.id;
	const cartQty = req.session.cart ? req.session.cart.totalQty || 0 : 0;
	Product.findOne({ unique: product }, (err, doc) => {
		res.render('product/single', {
			title: 'Shopping Cart', 
			cartQty, 
			isLogin: isLoggedIn, 
			product: doc
		});
	});
});

router.post('/add-to-cart/:id', (req, res, next) => {
	const productId = req.params.id;
	const cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findOne({ unique: productId }, (err, product) => {
		if (err) {
			console.log(err);
			return res.redirect('/' + productId);
		}
		cart.add(product, product.id, req.body);
		req.session.cart = cart;
		console.log(cart);
		if (req.body.fromCol) return res.redirect('/');
		res.redirect('/' + productId);
	});
});

router.post('/updateCart', (req, res, next) => {
	let totalQty = 0;
	let totalPrice = 0;
	const newCart = req.body;
	for (var id in newCart['items']) {
		for (var item in newCart['items'][id]) {
			totalQty += +newCart['items'][id][item].qty;
			totalPrice += Math.ceil( (+newCart['items'][id][item]['item'].price / 100 * (100 - newCart['items'][id][item]['item'].sale)) * newCart['items'][id][item].qty );
		}
	}
	newCart.totalQty = totalQty;
	newCart.totalPrice = totalPrice;
	const cart = new Cart(newCart);

	req.session.cart = cart;
	res.redirect('/checkout');
});


module.exports = router;

async function saveSellingFor(sales) {
	for (let key in sales) {
		await Selling.updateOne(
			{ user: key },
			{ 
				$push: {
					cart: {
						$each: sales[key]
					}
				}
			},
			{ upsert: true }
		);

		for (var i = sales[key].length - 1; i >= 0; i--) {
			await Product.findOneAndUpdate(
				{ uniue: sales[key][i]['unique'] },
				{ $inc: { quantity: -sales[key][i].qty } }, // doesn't work
				(err, result) => {
					console.log(err);
					console.log(result);
				}
			);
		}

		console.log(key);
	}
	
}