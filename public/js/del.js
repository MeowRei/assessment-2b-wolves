document.querySelector ('.delete') && document.querySelector ('.delete').
	addEventListener ('click', async (event) => {
		event.preventDefault ()
		event.stopPropagation ()
		const _id = event.target.parentNode.classList.value
		const response = await fetch (`${_id}/delete`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
			body:
				JSON.stringify ({_id}),
		})
		const {result} = await response.json()
		if (result === '1') {
		window.location = 'http://localhost:3000/'}
	})
