const React = require('react')

const HelloMessage = props => {
	return (
		<div>
			<h1>Profil użytkownika</h1>
			<div>Nazwisko: {props.nazwisko}</div>
			<div>Email: {props.email}</div>
			<div>Wiek: {props.wiek}</div>
		</div>
	)
}

module.exports = HelloMessage
