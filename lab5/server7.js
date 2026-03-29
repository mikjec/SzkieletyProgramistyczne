const http = require('http')
let items = []

function show(res) {
	let html =
		'<html><head><title>Lista zadan</title></head><body>' +
		'<h1>Lista zadan</h1>' +
		'<form method="post" action="/add">' +
		'<p><input type="text" name="item" />' +
		'<input type="submit" value="Dodaj" /></p>' +
		'</form>' +
		'<form method="post" action="/delete">' +
		'<input type="submit" value="Usun wszystkie zadania" />' +
		'</form>' +
		'<ul>' +
		items
			.map(function (item) {
				return '<li>' + item + '</li>'
			})
			.join('') +
		'</ul>' +
		'</body></html>'

	res.setHeader('Content-Type', 'text/html')
	res.setHeader('Content-Length', Buffer.byteLength(html))
	res.end(html)
}

function notFound(res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain')
	res.end('Not Found')
}

function badRequest(res) {
	res.statusCode = 400
	res.setHeader('Content-Type', 'text/plain')
	res.end('Bad Request')
}

let qs = require('querystring')

function add(req, res) {
	let body = ''
	req.setEncoding('utf8')

	req.on('data', function (chunk) {
		body += chunk
	})

	req.on('end', function () {
		let obj = qs.parse(body)
		items.push(obj.item)
		show(res)
	})
}

function clear(res) {
	items = []
	show(res)
}

const server = http.createServer(function (req, res) {
	switch (req.method) {
		case 'GET':
			if (req.url === '/') show(res)
			else notFound(res)
			break

		case 'POST':
			if (req.url === '/add') add(req, res)
			else if (req.url === '/delete') clear(res)
			else badRequest(res)
			break

		default:
			badRequest(res)
	}
})

server.listen(3000)
