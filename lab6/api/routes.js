const express = require('express')
const router = express.Router()
const { users } = require('../users')

router.get('/', (req, res) => {
	res.json(users)
})

router.get('/:id', (req, res) => {
	const found = users.some(user => user.id === parseInt(req.params.id))
	if (found) {
		res.json(users.filter(user => user.id === parseInt(req.params.id)))
	} else {
		res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
	}
})

router.post('/', (req, res) => {
	const lastId = users.length > 0 ? users[users.length - 1].id : 0
	const newUser = {
		id: lastId + 1,
		name: req.body.name,
		email: req.body.email,
		status: 'aktywny',
	}
	if (!newUser.name || !newUser.email) {
		return res.status(400).json({ msg: 'Wprowadź poprawne dane!' })
	}
	users.push(newUser)
	res.json(users)
})

router.patch('/:id', (req, res) => {
	const found = users.some(user => user.id === parseInt(req.params.id))
	if (found) {
		const updUser = req.body
		users.forEach(user => {
			if (user.id === parseInt(req.params.id)) {
				user.name = updUser.name ? updUser.name : user.name
				user.email = updUser.email ? updUser.email : user.email
				res.json({ msg: 'Dane zaktualizowane', user })
			}
		})
	} else {
		res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
	}
})

router.delete('/:id', (req, res) => {
	const index = users.findIndex(user => user.id === parseInt(req.params.id))
	if (index !== -1) {
		users.splice(index, 1)
		res.json({ msg: 'Usunięto', users })
	} else {
		res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
	}
})

module.exports = router
