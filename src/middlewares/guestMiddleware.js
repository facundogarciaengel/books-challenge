function guestMiddleware(req, res, next) {
    // Si el usuario está logueado, lo redirijo
    if (req.session.userLogged) {
        return res.redirect('/');
    }
    next();
}

module.exports = guestMiddleware;