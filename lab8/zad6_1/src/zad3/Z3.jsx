import { useState, useEffect } from 'react'

function Z3() {
	const [temperature, setTemperature] = useState(0)
	const [stateMatter, setStateMatter] = useState('')
	const handleChange = event => {
		setTemperature(event.target.value)
	}
	useEffect(() => {
		if (temperature <= 0) {
			setStateMatter('stały')
		} else if (temperature >= 100) {
			setStateMatter('gazowy')
		} else {
			setStateMatter('ciekły')
		}
	}, [temperature])
	return (
		<div
			className='temperature'
			style={
				stateMatter == 'ciekły'
					? { backgroundColor: 'blue' }
					: stateMatter == 'stały'
						? { backgroundColor: 'black' }
						: { backgroundColor: 'gray' }
			}>
			<label>
				Temperatura:&nbsp;
				<input
					type='text'
					onChange={handleChange}
					value={temperature}
					placeholder='Wprowadź temperaturę wody'
				/>
				&nbsp;°C
			</label>
			<div className={stateMatter}>
				<p>
					W temperaturze {temperature} °C woda jest w stanie
					<span> {stateMatter}m.</span>
				</p>
			</div>
		</div>
	)
}
export default Z3
