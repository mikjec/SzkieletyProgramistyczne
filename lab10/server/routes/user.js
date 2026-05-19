const router = require('express').Router()
const { User } = require('../models/user')
const bcrypt = require('bcrypt')

router.delete('/', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.user._id)

		if (!user) {
			return res.status(404).send({ message: 'Nie znaleziono użytkownika' })
		}

		res.status(200).send({ message: 'Konto zostało pomyślnie usunięte' })
	} catch (error) {
		console.error('Błąd w endpointcie DELETE /user:', error)
		res.status(500).send({ message: 'Wewnętrzny błąd serwera', error: error.message })
	}
})

router.get('/', async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (!user) {
			return res.status(404).send({ message: 'Nie znaleziono użytkownika' })
		}

		res.status(200).send({ data: user, message: 'Szczegóły konta' })
	} catch (error) {
		console.error('Błąd w endpointcie GET /user:', error)
		res.status(500).send({ message: 'Wewnętrzny błąd serwera', error: error.message })
	}
})

module.exports = router
