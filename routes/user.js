import express from 'express';
import csrf from 'csurf';
import passport from 'passport';

import Order from '../models/order';
import Cart from '../models/cart';

import { isLoggedIn, notLoggedIn, reqOld } from '../authControl';

const router = express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, reqOld, (req, res, next) => {
    Order.find({user: req.user},(err, orders) => {
        if (err) {
            return res.write('Error!');
        }
        let cart;
        orders.forEach((order) => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders });
    });
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
});
// USE USE USE USE USE USE NOT GET OR POST
router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

router.get('/signup', (req, res, next) => {
    const messages = req.flash('error');
    res.render('account/create', {
        csrfToken: req.csrfToken(), 
        messages: messages, 
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    successRedirect: '/',
    failureFlash: true
}), (req, res, next) => {
    console.log(req.body);
    if (req.session.oldUrl) {
        console.log(req.session.oldUrl);
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
});

router.get('/signin', (req, res, next) => {
    const messages = req.flash('error');
    res.render('account/login', {
        csrfToken: req.csrfToken(), 
        messages: messages, 
        hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true,
    successRedirect: '/'
}), (req, res, next) => {
    if (req.session.oldUrl) {
        console.log(req.session.oldUrl);
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

export default router;