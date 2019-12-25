document.querySelector ('.btn').addEventListener ('click', async (event) => {
	event.preventDefault ()
	event.stopPropagation ()
	const email = document.querySelectorAll ('input')[0].value
	const password = document.querySelectorAll ('input')[1].value
	const response = await fetch (`/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body:
			JSON.stringify ({ email, password }),
	})
	let errDiv = document.createElement ('div')
	errDiv.innerText = 'Неверный логин или пароль!'
	errDiv.style.color = 'red'
	
	const { result } = await response.json ()
	if (!result) {
		document.querySelector('form').appendChild(errDiv)
	}
})