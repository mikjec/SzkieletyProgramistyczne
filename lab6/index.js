const express = require('express')
const path = require('path')
const { check, validationResult } = require('express-validator')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 3000

app.get('/form', (req, res) => {
	res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/result', (req, res) => {
	let username = req.body.username
	let password = req.body.password
	if (username == '' || password == '') res.send('Uzupełnij dane!')
	else {
		res.send('Użytkownik: ' + username + '<br>Hasło: ' + password)
	}
})
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`))

app.post(
	'/form',
	[check('nazwisko').isLength({ min: 3 }), check('email').isEmail(), check('wiek').isNumeric()],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}
		const nazwisko = req.body.nazwisko
		const email = req.body.email
		const wiek = req.body.wiek
		res.send('Użytkownik: ' + nazwisko + '<br>Email: ' + email + '<br>Wiek: ' + wiek)
	},
)
