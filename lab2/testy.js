// import { calc } from './dane.js'
const { listaZadan, poniedzialek, wtorek, firmy } = require('./dane')
const { calc } = require('./dane.js')
// const { calc } = import('./dane.js')

function sum(...argumenty) {
	let sum = 0
	argumenty.forEach(liczba => {
		sum += liczba
	})
	return sum
}
console.log(sum(4, 6, 2, 6, 5, 3, 6, 5, 4))

function zad2() {
	listaZadan.forEach(zad => {
		console.log(zad.tekst)
	})

	const text = listaZadan.map(zad => {
		return zad.tekst
	})

	const temp2 = listaZadan.filter(zad => {
		return zad.zrealizowano
	})

	const text2 = temp2.map(zad => {
		return zad.tekst
	})

	console.log(text)
	console.log(text2)
}

function zad3() {
	const finalnyWynik = poniedzialek
		.concat(wtorek)
		.map(zad => zad.czas / 60)
		.filter(czas => czas >= 2)
		.map(czas => czas * 35)
		.reduce((suma, czas) => suma + czas, 0)

	console.log('Final: ', finalnyWynik)
}

zad3()

function zad4() {
	firmy
		.filter(firma => {
			return firma.kategoria === 'IT'
		})
		.forEach(firma => {
			console.log(firma)
		})

	console.log('====================================================')

	firmy
		.filter(firma => {
			return firma.poczatek >= 1990 && firma.koniec <= 1999
		})
		.forEach(firma => {
			console.log(firma)
		})

	console.log('====================================================')

	firmy
		.filter(firma => {
			return firma.koniec - firma.poczatek > 10
		})
		.forEach(firma => {
			console.log(firma)
		})
}

console.log(calc(1, 2, '-'))
