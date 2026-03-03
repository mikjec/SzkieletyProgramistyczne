document.addEventListener('DOMContentLoaded', () => {
	getAllProducts()
	var bdodaj = document.getElementById('add')
	bdodaj.addEventListener('click', () => {
		//Dodawanie
		dodaj()
	})
	// Kolejne instrukcje do modyfikacji danych
	// . . .
})
function dodaj() {
	console.log('Dodawanie nowego produktu')
	const errElement = document.getElementById('err') // upewnij się, że masz <div id="err"></div>
	errElement.innerHTML = '' // czyścimy stare błędy

	var st = {
		name: document.getElementById('name').value,
		price: document.getElementById('price').value,
	}

	fetch('http://localhost:8000/products', {
		method: 'post',
		body: JSON.stringify(st),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			Accept: 'application/json',
		},
	})
		.then(response => {
			// Jeśli status to 422 lub inny błąd (nie 2xx)
			if (!response.ok) {
				// Jeśli status to 422 (błąd walidacji Laravela)
				if (response.status === 422) {
					// Musimy zwrócić obietnicę jsona, żeby wyciągnąć błędy
					return response.json().then(data => {
						// Rzucamy obiektem danych - to wpadnie do catch jako 'error'
						throw data
					})
				}
				throw new Error('Błąd: ' + response.status)
			}
			return response.json()
		})
		.then(data => {
			console.log('Dodano produkt:', data)
			getAllProducts()
			document.getElementById('name').value = ''
			document.getElementById('price').value = ''
		})
		.catch(error => {
			console.error('Błąd:', error)

			// Jeśli Laravel zwrócił błędy walidacji (status 422)
			if (error.errors) {
				// Sklejamy wszystkie błędy w jeden tekst
				let messages = Object.values(error.errors).flat().join('<br>')
				errElement.innerHTML = `<strong>Błąd walidacji:</strong><br>${messages}`
			} else {
				// Inne błędy (np. serwer nie działa)
				errElement.innerHTML = error.message || 'Wystąpił nieoczekiwany błąd'
			}
		})
}

function edytuj(id, name, price) {
	var x = document.getElementById('divedit')
	document.getElementById('editId').value = id
	document.getElementById('editName').value = name
	document.getElementById('editPrice').value = price
	x.style.visibility = 'visible'
}
function update() {
	const errElement = document.getElementById('err') // upewnij się, że masz <div id="err"></div>
	errElement.innerHTML = '' // czyścimy stare błędy
	fetch('http://localhost:8000/products/' + document.getElementById('editId').value, {
		method: 'put',
		body: JSON.stringify({
			name: document.getElementById('editName').value,
			price: parseInt(document.getElementById('editPrice').value),
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			Accept: 'application/json',
		},
	})
		.then(response => {
			if (!response.ok) {
				// Jeśli status to 422 (błąd walidacji Laravela)
				if (response.status === 422) {
					// Musimy zwrócić obietnicę jsona, żeby wyciągnąć błędy
					return response.json().then(data => {
						// Rzucamy obiektem danych - to wpadnie do catch jako 'error'
						throw data
					})
				}
				throw new Error('Błąd: ' + response.status)
			}
			return response.json()
		})
		.then(response => {
			console.log('Zaktualizowano produkt:')
			console.log(response)
			getAllProducts()
			document.getElementById('divedit').style.visibility = 'hidden'
		})
		.catch(error => {
			console.error('Błąd:', error)

			// Jeśli Laravel zwrócił błędy walidacji (status 422)
			if (error.errors) {
				// Sklejamy wszystkie błędy w jeden tekst
				let messages = Object.values(error.errors).flat().join('<br>')
				errElement.innerHTML = `<strong>Błąd walidacji:</strong><br>${messages}`
			} else {
				// Inne błędy (np. serwer nie działa)
				errElement.innerHTML = error.message || 'Wystąpił nieoczekiwany błąd'
			}
		})
}
function getAllProducts() {
	fetch('http://localhost:8000/products')
		.then(response => {
			if (!response.ok) {
				return Promise.reject('Coś poszło nie tak!')
			}
			return response.json()
		})
		.then(data => {
			pokazTabele(data)
			console.log(data)
		})
		.catch(error => {
			console.log(error)
			err.innerHTML = error
		})
}
function usun(id) {
	fetch('http://localhost:8000/products/' + id, {
		method: 'delete',
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})
		.then(response => {
			if (!response.ok) {
				return Promise.reject('Problem z usunięciem danych!')
			}
			return response.json()
		})
		.then(response => {
			console.log('Usunięto produkt o id:' + id)
			console.log(response)
			getAllProducts()
		})
		.catch(error => {
			console.log(error)
			err.innerHTML = error
		})
}
function pokazTabele(response) {
	var main = document.getElementById('main')
	var content = "<table border='1'> <thead> <tr> <th>Id</th><th> Name</th>" + '<th>Price</th></tr></thead><tbody>'
	for (var st in response) {
		var name = response[st].name
		var price = response[st].price
		var id = response[st].id
		content += '<tr><td>' + id + '</td><td>' + name + '</td><td>' + price + '</td>'
		content += "<td><button onclick='usun(" + id + ")'>Usuń</button></td>"
		content += "<td> <button onclick='edytuj(" + id + ',"' + name + '",' + price + ")'>Edytuj</button></td></tr>"
	}
	content += '</tbody></table>'
	main.innerHTML = content
}
