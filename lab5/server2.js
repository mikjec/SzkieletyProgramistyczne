const http = require('http')
const url = require('url')

http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' })

		let q = url.parse(req.url, true).query

		let a = parseFloat(q.a)
		let b = parseFloat(q.b)
		let c = parseFloat(q.c)

		if (isNaN(a) || isNaN(b) || isNaN(c)) {
			res.end('Blad: podaj same liczby')
			return
		}

		if (a + b <= c || a + c <= b || b + c <= a) {
			res.end('Blad: z podanych bokow nie da sie zbudowac trojkata')
			return
		}

		let p = (a + b + c) / 2
		let area = Math.sqrt(p * (p - a) * (p - b) * (p - c))

		let txt = 'Boki trojkata: ' + a + ', ' + b + ', ' + c + '<br>Pole trojkata (wzor Herona): ' + area

		res.end(txt)
	})
	.listen(3000)
