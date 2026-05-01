const express = require('express')
const path = require('path')
const hbs = require('hbs')
const reactEngine = require('express-react-views')
const getDate = require('./server-files/getDate')

const app = express()
const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.engine('jsx', reactEngine.createEngine())

app.use((req, res, next) => {
	const url = req.url.slice(1) || 'index.html'
	console.log(`${getDate()}--- Klient wysłał zapytanie o plik ${url}.`)
	next()
})

app.get('/info', (req, res) => {
	res.render('info.hbs', {
		nazwisko: 'Kowalski',
		email: 'jan@hbs.pl',
		wiek: 25,
	})
})

app.get('/about', (req, res) => {
	res.render('about.jsx', {
		nazwisko: 'Nowak',
		email: 'adam@react.pl',
		wiek: 40,
	})
})

for (let i = 1; i <= 5; i++) {
	app.get(`/strona${i}`, (req, res) => {
		res.sendFile(path.join(__dirname, 'public', `strona${i}.html`))
	})
}

app.get('/convert', (req, res) => {
	const value = parseFloat(req.query.value)
	const toRad = req.query.toRad === 'true'
	if (isNaN(value)) return res.send('Podaj parametr value!')

	const result = toRad ? value * (Math.PI / 180) : value * (180 / Math.PI)
	res.send(`Wynik konwersji: ${result.toFixed(4)}`)
})

app.get('/color', (req, res) => {
	const bgColor = req.query.bg || 'white'
	res.send(`
        <html>
            <body style="background-color: ${bgColor};">
                <h1>Ustawiony kolor tła: ${bgColor}</h1>
            </body>
        </html>
    `)
})

app.listen(PORT, () => {
	console.log(`${getDate()} === Serwer zostaje uruchomiony na porcie ${PORT}.`)
})
