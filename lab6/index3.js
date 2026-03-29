const express = require('express')
const path = require('path')
const { check, validationResult } = require('express-validator')

const routes = require('./api/routes')
const metoda = require('./middleware/method')
const isAuthorized = require('./middleware/authorize')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3000

const createInitials = value => {
	return value
		.split(' ')
		.map(word => word[0])
		.join('')
		.toUpperCase()
}

app.use(metoda)

app.get('/form', (req, res) => {
	res.sendFile(path.join(__dirname, 'form2.html'))
})

app.post(
	'/form',
	[
		check('nazwisko')
			.trim()
			.stripLow()
			.bail()
			.isLength({ min: 3, max: 25 })
			.withMessage('Błąd nazwiska')
			.isAlpha()
			.bail(),
		check('email').trim().isEmail().normalizeEmail(),
		check('wiek').isInt({ min: 0, max: 110 }),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

		const { nazwisko, email, wiek } = req.body
		res.send(`Użytkownik: ${nazwisko}, Inicjały: ${createInitials(nazwisko)}, Email: ${email}, Wiek: ${wiek}`)
	},
)

app.use('/api/users', isAuthorized)
app.use('/api/users', routes)

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`))
