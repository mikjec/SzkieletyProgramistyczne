function Card({ name, imageUrl, imageAlt, years, profession, country }) {
	return (
		<div className='Card'>
			<h2>{name}</h2>
			<img src={imageUrl} alt={imageAlt} />
			<p>{years}</p>
			<p>{profession}</p>
			<p>{country}</p>
		</div>
	)
}

export default Card
