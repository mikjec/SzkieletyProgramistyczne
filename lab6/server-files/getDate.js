const getDate = () => {
	const now = new Date()
	const d = String(now.getDate()).padStart(2, '0')
	const m = String(now.getMonth() + 1).padStart(2, '0')
	const y = now.getFullYear()
	const h = String(now.getHours()).padStart(2, '0')
	const min = String(now.getMinutes()).padStart(2, '0')
	const s = String(now.getSeconds()).padStart(2, '0')
	const ms = String(now.getMilliseconds()).padStart(3, '0')

	return `${d}.${m}.${y} ${h}:${min}:${s}.${ms}`
}

module.exports = getDate
