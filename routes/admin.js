import express from 'express';

import User from '../models/user';
import Product from '../models/product';
import Selling from '../models/selling';

import { checkRole, isLoggedIn } from '../authControl';

const router = express.Router();

router.use(isLoggedIn);
router.use(checkRole(['seller', 'admin']));

router.get('/', (req, res, next) => {
	res.redirect('/admin/products');
});

router.get('/products', (req, res, next) => {
	Product.find({ ownder: req.user['_id'] }, (err, products) => {
		//throw new Error("Cann't get products from DB");
		res.render('admin/products', {
			products
		}).sort({ confirmed: 1 });
	});
});

router.get('/products/:id', (req, res, next) => {
	const messages = req.flash('error');
	res.render('admin/singleProduct', {
		messages, 
        hasErrors: messages.length > 0
	});
});

router.post('/products/:id', (req, res, next) => {
	const updatedData = req.body;
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

	Product.updateOne(
		{ unique: updatedData.unique },
		{ $set: updatedData },
		(err, result) => {
			if (err) req.flash('error', err.message)
			res.redirect('/admin/products/' + req.params.id);
		}
	);

});

router.get('/addProduct', (req, res, next) => {
	const messages = req.flash('error');
	res.render('admin/singleProduct', {
		messages, 
        hasErrors: messages.length > 0
	});
});

router.post('/addProduct', (req, res, next) => {
	const product = req.body;
	product.confirmed = req.user.confirmed;
	product.owner = req.user || product.owner;
	
	Product.create(product, (err, result) => {
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
		{ $set: { confirmed: true } },
		(err, result) => {
			if (err) {
				req.flash('error', err.message);
			}
			console.log(result);
			res.redirect('/admin/userList');
		}
	)
});

router.get('/rejectuser/:id', checkRole(['admin']), (req, res, next) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $set: { confirmed: false } }
	);
	Product.update(
		{ owner: req.params.id },
		{ $set: { confirmed: false } }
	);
});

router.get('/confirmproduct/:id', checkRole(['admin']), (req, res, next) => {
	Product.updateOne(
		{ unique: req.params.id },
		{ $set: { confirmed: true } }
	);
});

router.get('/rejectproduct/:id', checkRole(['admin']), (req, res, next) => {
	Product.updateOne(
		{ unique: req.params.id },
		{ $set: { confirmed: false } }
	);
});

router.get('/sellings', (req, res, next) => {
	Selling.findOne({ user: req.user['_id'] }, (err, sellings) => {
		res.render('admin/sellings', {
			'sellings': sellings['cart']
		});
	});
});

export default router;