import { useState } from 'react'
import KartaPrac from './KartaPrac'
import Formularz from './Formularz'
import 'bootstrap/dist/css/bootstrap.css'

function Z6() {
	const [dziennikZadan, ustawDziennikZadan] = useState([])
	const dodajPrace = zadanie => {
		let zadania = [...dziennikZadan, zadanie]
		ustawDziennikZadan(zadania)
	}
	return (
		<section>
			<Formularz dodajPrace={dodajPrace} />
			<KartaPrac dziennik={dziennikZadan} />
		</section>
	)
}
export default Z6
