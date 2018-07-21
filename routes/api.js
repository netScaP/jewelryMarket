import express from 'express';

import Cart from '../models/cart';
import Product from '../models/product';
import User from '../models/user';
import Order from '../models/order';

import { checkRole, isLoggedIn } from '../authControl';

const router = express.Router();

router.get('/pagination', (req, res, next) => {
	console.log(req.query);
	Product.find({ confirmed: true }, (err, docs) => {
		const obj = docs;
		res.send(obj);
	}).sort({ $natural: 1 }).skip(+req.query.skip).limit(+req.query.limit);
});

router.get('/total', (req, res, next) => {
	Product.find((err, docs) => {
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

router.get('/userlist', /* isLoggedIn, checkRole['admin'], Doesn't work*/ (req, res, next) => {
	console.log('hi there');
	User.find({}, (err, users) => {
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

export default router;