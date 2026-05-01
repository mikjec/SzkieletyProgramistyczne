import { useState } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import MainArea from './MainArea'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css'
import './z7.css'

function App() {
	const [myStyle, setMyStyle] = useState({
		color: 'green',
		fontSize: '18px',
	})

	const [likes, setLikes] = useState(0)

	return (
		<div className='grid-parent'>
			<Header
				myStyle={myStyle}
				likes={likes}
			/>

			<Sidebar
				myStyle={myStyle}
				setMyStyle={setMyStyle}
			/>

			<MainArea myStyle={myStyle} />

			<Footer
				setMyStyle={setMyStyle}
				likes={likes}
				setLikes={setLikes}
			/>
		</div>
	)
}

export default App
