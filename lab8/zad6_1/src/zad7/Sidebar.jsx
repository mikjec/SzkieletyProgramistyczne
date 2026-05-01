import { useState } from 'react'

function Sidebar({ myStyle, setMyStyle }) {
	const [sizeInput, setSizeInput] = useState(myStyle.fontSize)
	const [colorInput, setColorInput] = useState(myStyle.color)

	const handleSizeChange = e => {
		const value = e.target.value

		// walidacja
		if (!isNaN(value)) {
			setMyStyle({
				...myStyle,
				fontSize: value + 'px',
			})
			setSizeInput(value)
		}
	}

	const handleColorChange = e => {
		const value = e.target.value

		setMyStyle({
			...myStyle,
			color: value || 'green',
		})
		setColorInput(value)
	}

	const setPreset = () => {
		setMyStyle({
			color: 'pink',
			fontSize: '20px',
		})
		setSizeInput(20)
		setColorInput('pink')
	}

	return (
		<div className='sidebar'>
			<input
				type='text'
				value={sizeInput}
				onChange={handleSizeChange}
				placeholder='Rozmiar'
			/>

			<input
				type='text'
				value={colorInput}
				onChange={handleColorChange}
				placeholder='Kolor'
			/>

			<button onClick={setPreset}>Ustaw parametry tekstu na 20px i pink</button>
		</div>
	)
}

export default Sidebar
