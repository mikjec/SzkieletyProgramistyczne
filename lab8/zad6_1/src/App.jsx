// import './Card.css'
import Z1 from './zad1/Z1'
import Z2 from './zad2/Z2'
import Z3 from './zad3/Z3'
import Z4 from './zad4/Z4'
import Z5 from './zad5/Z5'
import Z6 from './zad6/Z6'
import Z7 from './zad7/Z7'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Z1 />}
			/>
			<Route
				path='/zad2'
				element={<Z2 />}
			/>
			<Route
				path='/zad3'
				element={<Z3 />}
			/>
			<Route
				path='/zad4'
				element={<Z4 />}
			/>
			<Route
				path='/zad5'
				element={<Z5 />}
			/>
			<Route
				path='/zad6'
				element={<Z6 />}
			/>
			<Route
				path='/zad7'
				element={<Z7 />}
			/>
		</Routes>
	)
}
export default App
