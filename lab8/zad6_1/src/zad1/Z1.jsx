import Card from './Card'

function Z1() {
	return (
		<div>
			<h1>Słynni informatycy</h1>
			<Card
				name='Alan Turing'
				imageUrl='https://mdz.cs.pollub.pl/ai/alan_turing.jpg'
				imageAlt='Alan Turing'
				years='1912 - 1954'
				profession='Matematyk'
				country='Angilia'
			/>
			<Card
				name='Niklaus Wirth'
				imageUrl='https://mdz.cs.pollub.pl/ai/nicolas_wirth.jpg'
				imageAlt='Niklaus Wirth'
				years='1934 - ?'
				profession='Elektronik i informatyk'
				country='Szwajcaria'
			/>
			<Card
				name='Dennis Ritchie'
				imageUrl='https://mdz.cs.pollub.pl/ai/dennis_ritchie.jpg'
				imageAlt='Dennis Ritchie'
				years='1941 - 2011'
				profession='Matematyk, fizyk, informatyk'
				country='USA'
			/>
			<Card
				name='Bjarne Stroustrup'
				imageUrl='https://mdz.cs.pollub.pl/ai/bjarne_stroustrup.jpg'
				imageAlt='Bjarne Stroustrup'
				years='1949 - '
				profession='Programista, informatyk'
				country='USA'
			/>
			<Card
				name='Dennis Ritchie'
				imageUrl='https://mdz.cs.pollub.pl/ai/dennis_ritchie.jpg'
				imageAlt='Dennis Ritchie'
				years='1941 - 2011'
				profession='Matematyk, fizyk, informatyk'
				country='USA'
			/>
		</div>
	)
}

export default Z1
