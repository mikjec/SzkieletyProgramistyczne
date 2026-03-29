const express = require('express') //import frameworka express
const app = express() //utworzenie obiektu aplikacji app express
const PORT = 3000 //ustawienie portu
//routing:
app.get('/', function (req, res) {
	res.send('Prosty serwer oparty na szkielecie programistycznym Express!')
})

app.get('/about', function (req, res) {
	res.send('Autor strony: Mikołaj Jęczała')
})

app.get('/name/:imie/:imie2', function (request, response) {
	response.status(200)
	response.set('Content-Type', 'text/html')
	response.end(
		'<html><body>' + '<h1>Cześć ' + request.params.imie + ' i ' + request.params.imie2 + '</h1>' + '</body></html>',
	)
})
// inne endpointy
// ...
//ustawienie portu dla aplikacji i wyświetlenie informacji na konsoli
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`))
