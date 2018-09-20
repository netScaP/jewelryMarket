module.exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}

module.exports.reqOld = (req, res, next) => {
    req.session.oldUrl = req.url;
    next();
}

module.exports.checkRole = (roles) => {
	return (req, res, next) => {
		if (roles.indexOf(req.user.usertype) > -1 && req.user.confirmed) {
			return next();
		}

		return res.redirect('/admin');
	}
}

module.exports.isProductOwner = (req, res, next) => {
    if (req.user['_id'] == req.body.product['owner']) {
        return next();
    }

    return res.status(404).json({
        message: 'Вы не владелец товара'
    })
}