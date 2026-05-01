function Footer({ setMyStyle, likes, setLikes }) {
	const setSize30 = () => {
		setMyStyle(prev => ({
			...prev,
			fontSize: '30px',
		}))
	}

	return (
		<footer className='footer'>
			<p>
				Stopka <button onClick={setSize30}>Ustaw parametry tekstu na 30px</button>
			</p>

			<p>
				<button onClick={() => setLikes(likes + 1)}>Polub tę stronę!</button>
			</p>
		</footer>
	)
}

export default Footer
