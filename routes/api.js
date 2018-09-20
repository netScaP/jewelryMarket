const express = require('express');

const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Selling = require('../models/selling');

const { checkRole, isLoggedIn } = require('../authControl');

const router = express.Router();

router.get('/pagination', (req, res, next) => {
	console.log(req.query);
	Product.find({ confirmed: true }, (err, docs) => {
		const obj = docs;
		res.send(obj);
	}).sort({ $natural: 1 }).skip(+req.query.skip).limit(+req.query.limit);
});

router.get('/total', (req, res, next) => {
	Product.find({ confirmed: true }, (err, docs) => {
		res.send(docs);
	});
});

router.get('/singleProduct', (req, res, next) => {
	Product.findOne({ unique: req.query.id }, (err, product) => {
		res.send(product);
	});
})

router.get('/cart', (req, res, next) => {
	const cart = new Cart(req.session.cart || {});
	res.send(cart);
});

router.get('/userlist', isLoggedIn, checkRole(['admin']), (req, res, next) => {
	console.log('hi there');
	User.find((err, users) => {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/');
		}

		res.send(users);
	}).sort( { confirmed: 1 } );
});

router.get('/orders', (req, res, next) => {
	Order.find({ user: req.user['_id'] }, (err, result) => {
		let orders = result;
		for (let i = orders.length - 1; i >= 0; i--) {
			console.log(orders[i]);
			orders[i]['cart']['items'] = JSON.parse(orders[i]['cart']['items']);
		}
		console.log(orders);
		res.send(orders);
	});
});

router.get('/sellings', (req, res, next) => {
	Selling.aggregate([
		{
			'$match': {
				'user': req.user['_id']
			}
		},
		{
			'$unwind': '$cart'
		},
		{
			'$project': {
				"y": {
					"$year": "$cart.time"
				},
				"m": {
					"$month": "$cart.time"
				},
				"d": {
					"$dayOfMonth": "$cart.time"
				},
				"qty": "$cart.qty",
				"price": "$cart.price",
				"unique": "$cart.unique"
			}
		},
		{
			'$group': {
				'_id': {
					'y': '$y',
					'm': '$m',
					'd': '$d'
				},
				'sum': { "$sum": "$qty" }
			}
		},
		{
			$sort: {
				"_id.y": 1,
				"_id.m": 1,
				"_id.d": 1
			}
		}
	]).then(result => {
		res.send(result);
	}).catch(err => {
		res.json({
			message: err.message
		})
	});
});

module.exports = router;