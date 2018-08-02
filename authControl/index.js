export function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}

export function reqOld(req, res, next) {
    req.session.oldUrl = req.url;
    next();
}

export function checkRole(roles) {
	return (req, res, next) => {
		if (roles.indexOf(req.user.usertype) > -1 && req.user.confirmed) {
			return next();
		}

		return res.redirect('/admin');
	}
}

export function isProductOwner(req, res, next) {
    console.log(req.body);
    console.log('middleware');
    console.log(req.user);
    console.log(req.user['_id'] == req.body.params.product['owner']);
    if (req.user['_id'] == req.body.params.product['owner']) {
        return next();
    }

    return res.redirect('/admin');
}