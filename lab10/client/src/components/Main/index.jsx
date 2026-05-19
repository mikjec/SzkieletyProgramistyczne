import styles from './styles.module.css'
import axios from 'axios'
import { useState } from 'react'
import Users from './Users'
import UserDetails from './UserDetails'

const Main = () => {
	const [users, setUsers] = useState([])
	const [userDetails, setUserDetails] = useState(null)
	const [title, setTitle] = useState('')

	const handleLogout = () => {
		localStorage.removeItem('token')
		window.location.reload()
	}

	const handleGetUsers = async e => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		if (token) {
			try {
				const config = {
					method: 'get',
					url: 'http://localhost:8080/api/users',
					headers: { 'Content-Type': 'application/json', 'x-access-token': token },
				}
				const { data: res } = await axios(config)
				setUsers(res.data)
				setUserDetails(null) // Ukryj szczegóły, gdy pokazujesz listę
				setTitle(res.message)
			} catch (error) {
				if (error.response && error.response.status >= 400 && error.response.status <= 500) {
					localStorage.removeItem('token')
					window.location.reload()
				}
			}
		} else {
			console.error('Brak tokena! Zaloguj się ponownie.')
		}
	}

	const handleUserDetails = async e => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		console.log('Token w localStorage:', token)
		if (token) {
			try {
				const { data: res } = await axios({
					method: 'get',
					url: 'http://localhost:8080/api/user',
					headers: { 'Content-Type': 'application/json', 'x-access-token': token },
				})
				setUsers([])
				setTitle(res.message)
				setUserDetails(res.data)
				console.log(userDetails.firstName)
			} catch (error) {
				if (error.response && error.response.status >= 400 && error.response.status <= 500) {
					// localStorage.removeItem('token')
					// window.location.reload()
				}
			}
		} else {
			console.error('Brak tokena! Zapytanie o szczegóły konta wstrzymane.')
		}
	}

	const deleteAccount = async e => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		if (!window.confirm('Czy na pewno chcesz usunąć swoje konto? Ta operacja jest nieodwracalna.')) return

		if (token) {
			try {
				await axios({
					method: 'delete',
					url: 'http://localhost:8080/api/user',
					headers: { 'Content-Type': 'application/json', 'x-access-token': token },
				})
				localStorage.removeItem('token')
				window.location.reload()
			} catch (error) {
				if (error.response && error.response.status >= 400 && error.response.status <= 500) {
					localStorage.removeItem('token')
					window.location.reload()
				}
			}
		} else {
			console.error('Brak tokena! Zapytanie o usunięcie konta wstrzymane.')
		}
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>MySite</h1>
				<button
					className={styles.white_btn}
					onClick={handleGetUsers}>
					Users
				</button>
				<button
					className={styles.white_btn}
					onClick={handleUserDetails}>
					Szczegóły konta
				</button>
				<button
					className={styles.white_btn}
					// Zmień to przypisanie na docelową funkcję usuwania konta
					onClick={deleteAccount}>
					Usuń konto
				</button>
				<button
					className={styles.white_btn}
					onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<h2>{title}</h2>
			{users.length > 0 && <Users users={users} />}
			{userDetails && <UserDetails user={userDetails} />}
		</div>
	)
}

export default Main
