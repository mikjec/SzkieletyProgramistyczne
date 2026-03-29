const metoda = (req, res, next) => {
	let sciezka = 'Ścieżka: ' + req.protocol + '://' + req.get('host') + req.originalUrl
	console.log('Metoda: ', req.method)
	console.log(sciezka)
	next()
}

module.exports = metoda
