const express = require('express')
const path = require('path')
const { check, validationResult } = require('express-validator')
const { users } = require('./users')

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

let metoda = (req, res, next) => {
	let sciezka = 'Ścieżka: ' + req.protocol + '://' + req.get('host') + req.originalUrl
	let info = `Metoda: ${req.method} <br> ${sciezka}`

	res.send(info)
}

const isAuthorized = (req, res, next) => {
	const password = req.body.password

	if (password === 'secretpaswd') {
		next()
	} else {
		res.status(401).send('Dostęp zabroniony')
	}
}

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
			.withMessage('Nazwisko musi mieć od 3 do 25 znaków!')
			.isAlpha()
			.withMessage('Nazwisko może zawierać tylko litery alfabetu!')
			.bail(),

		check('email').trim().bail().isEmail().withMessage('Wprowadź poprawny adres email!').normalizeEmail().bail(),

		check('wiek')
			.trim()
			.bail()
			.isInt({ min: 0, max: 110 })
			.withMessage('Wiek musi być liczbą z zakresu 0 - 110!')
			.bail(),

		check('nazwisko').customSanitizer(value => {
			return value
		}),
	],
	(req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		const nazwisko = req.body.nazwisko
		const email = req.body.email
		const wiek = req.body.wiek

		const inicjaly = createInitials(nazwisko)

		res.send(`
        <h1>Dane po walidacji i sanityzacji:</h1>
        <p>Użytkownik (Nazwisko): ${nazwisko}</p>
        <p>Inicjały: ${inicjaly}</p>
        <p>Email: ${email}</p>
        <p>Wiek: ${wiek}</p>
    `)
	},
)

app.get('/api/users', isAuthorized, (req, res) => {
	res.json(users)
})

app.get('/api/users/:id', (req, res) => {
	const found = users.some(user => user.id === parseInt(req.params.id))
	if (found) {
		res.json(users.filter(user => user.id === parseInt(req.params.id)))
	} else {
		res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
	}
})

app.post('/api/users', (req, res) => {
	const lastId = users.length > 0 ? users[users.length - 1].id : 0

	const newUser = {
		id: lastId + 1,
		name: req.body.name,
		email: req.body.email,
		status: 'aktywny',
	}

	if (!newUser.name || !newUser.email) {
		return res.status(400).json({ msg: 'Wprowadź poprawne imię i nazwisko oraz email!' })
	}

	users.push(newUser)
	res.json(users)
})

app.patch('/api/users/:id', (req, res) => {
	const found = users.some(user => user.id === parseInt(req.params.id))
	if (found) {
		const updUser = req.body
		users.forEach(user => {
			if (user.id === parseInt(req.params.id)) {
				user.name = updUser.name ? updUser.name : user.name
				user.email = updUser.email ? updUser.email : user.email
				res.json({ msg: 'Dane użytkownika zaktualizowane', user })
			}
		})
	} else {
		res.status(400).json({ msg: `Użytk=> user.id === parseInt(req.params.idownik o id ${req.params.id} nie istnieje!` })
	}
})

app.delete('/api/users/:id', (req, res) => {
	const index = users.findIndex(user => user.id === parseInt(req.params.id))

	if (index !== -1) {
		users.splice(index, 1)
		res.json({ msg: 'Usunięto', users })
	} else {
		res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
	}
})

app.use(metoda)

app.listen(PORT, () => console.log(`Serwer dziala na porcie ${PORT}`))
