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
				JSON.stringify ({ _id }),
		})

		let errDiv = document.createElement ('div')
		errDiv.innerText = 'Не хватает прав'
		errDiv.style.color = 'red'

		const { result } = await response.json ()
		if (result === true) {
			window.location = 'http://localhost:3000/'
		} else {
			document.querySelector ('form').appendChild (errDiv)
		}
	})

// document.querySelector ('.edit') && document.querySelector ('.edit').
// 	addEventListener ('click', async (event) => {
// 		event.preventDefault ()
// 		event.stopPropagation ()
// 		const _id = event.target.parentNode.classList.value
// 		let response = await fetch (`${_id}/edit`, {
// 			method: 'GET',
// 			_id,
// 		})
// 		let errDiv = document.createElement ('div')
// 		errDiv.innerText = 'У Вас нет прав на редактирование этой записи'
// 		errDiv.style.color = 'red'
//
// 		const { result, post } = await response.json ()
// 		if (!result) {
// 			document.querySelector ('form').appendChild (errDiv)
// 		} else {
// 			window.location = `http://localhost:3000/party/${_id}/edit`
// 		}
// 	})