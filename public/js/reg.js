document.querySelector ('.btn').addEventListener ('click', async (event) => {
	event.preventDefault ()
	event.stopPropagation ()
	const username = document.querySelectorAll ('input')[0].value
	const email = document.querySelectorAll ('input')[1].value
	const password = document.querySelectorAll ('input')[2].value
	
	const response = await fetch (`/registration`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body:
			JSON.stringify ({ username, email, password }),
	})
	let errDiv = document.createElement ('div')
	errDiv.innerText = 'Такой пользователь уже существует!'
	errDiv.style.color = 'red'
	
	const { result } = await response.json ()
	if (!result) {
		document.querySelector('form').appendChild(errDiv)
	} else {
		window.location = 'http://localhost:3000/'
	}
})