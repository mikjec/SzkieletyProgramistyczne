const isAuthorized = (req, res, next) => {
	const password = req.body.password

	if (password === 'secretpaswd') {
		next()
	} else {
		next()
	}
}

module.exports = isAuthorized
