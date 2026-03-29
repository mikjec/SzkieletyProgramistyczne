const http = require('http')
const hostname = 'localhost'
const port = 3000
const fs = require('fs')
const server = http.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/html')

	function serveStaticFile(res, path, contentType, responseCode = 200) {
		fs.readFile(__dirname + path, (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' })
				return res.end('500 - Blad wewnetrzny')
			}
			res.writeHead(responseCode, { 'Content-Type': contentType })
			res.end(data)
		})
	}

	switch (req.url) {
		case '/home':
			serveStaticFile(res, '/public/home.html', 'text/html')
			break
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html')
			break
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404)
			break
	}
})
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
