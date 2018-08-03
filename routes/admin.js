import express from 'express';

import User from '../models/user';
import Product from '../models/product';
import Selling from '../models/selling';

import { checkRole, isLoggedIn, isProductOwner } from '../authControl';

const router = express.Router();

router.use(isLoggedIn);
router.use(checkRole(['seller', 'admin']));

router.get('/', (req, res, next) => {
	res.redirect('/admin/products');
});

router.get('/products', (req, res, next) => {
	let query = null;
	if (req.user['usertype'] == 'admin') {
		query = { $exists: true };
	} else {
		query = req.user['_id'];
	}
	console.log(query);
	Product.find({ owner: query }, (err, products) => {
		//throw new Error("Cann't get products from DB");
		res.render('admin/products', {
			products
		});
	}).sort({ confirmed: 1 });
});

router.get('/products/:id', (req, res, next) => {
	console.log(req.params);
	const messages = req.flash('error');
	res.render('admin/singleProduct', {
		messages, 
        hasErrors: messages.length > 0
	});
});

router.post('/products/:id', isProductOwner, (req, res, next) => {
	console.log('post');
	console.log(req.body);
	let updatedData = req.body.params.product;
	for (var i = updatedData.size.length - 1; i >= 0; i--) {
		if (!Number.isInteger(+updatedData.size[i]) || updatedData.size[i] == '') {
			updatedData.size.splice(i, 1);
		}
	};

	for (let key in updatedData.partDesc) {
		if (key == '' || updatedData.partDesc[key] == '') {
			delete updatedData.partDesc[key];
		}
	}

	updatedData.confirmed = false;

	console.log(updatedData);

	Product.updateOne(
		{ unique: updatedData.unique },
		updatedData
	)
	.then(result => {
		console.log(result);
	});

});

router.get('/addProduct', (req, res, next) => {
	const messages = req.flash('error');
	res.render('admin/singleProduct', {
		messages, 
        hasErrors: messages.length > 0
	});
});

router.post('/addProduct', (req, res, next) => {
	const product = req.body.product;
	product.confirmed = false;
	product.owner = req.user;
	
	Product.create(product, (err, result) => {
		console.log(result);
		console.log(err);
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/admin/addProduct');
		}
		res.redirect('/admin/products');
	});
});

router.get('/userlist', checkRole(['admin']), (req, res, next) => {
	res.render('admin/userList');
});

router.get('/confirmuser/:id', checkRole(['admin']), (req, res, next) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $set: { confirmed: true } }
	)
	.then(result => {
		res.redirect('/admin/userlist');
	});
});

router.get('/rejectuser/:id', checkRole(['admin']), (req, res, next) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $set: { confirmed: false } }
	)
	.then(() => {
		return Product.update(
			{ owner: req.params.id },
			{ $set: { confirmed: false } }
		);
	})
	.then(() => {
		res.redirect('/admin/userlist');
	});
});

router.get('/confirmproduct/:id', checkRole(['admin']), (req, res, next) => {
	console.log(req.params);
	Product.updateOne(
		{ unique: req.params.id },
		{ $set: { confirmed: true } }
	)
	.then(result => {
		res.redirect('/admin/products');
	});
});

router.get('/rejectproduct/:id', checkRole(['admin']), (req, res, next) => {
	Product.updateOne(
		{ unique: req.params.id },
		{ $set: { confirmed: false } }
	)
	.then(result => {
		res.redirect('/admin/products');
	});
});

router.get('/sellings', (req, res, next) => {
	console.log(req.user['_id']);
	Selling.findOne({ user: req.user['_id'] })
	.select('cart')
	.populate({ path: 'cart.item'})
	.exec((err, sellings) => {
		let data = sellings ? sellings['cart'] : [];
		console.log(sellings);
		res.render('admin/sellings', {
			'sellings': data
		});
	});
});

export default router;