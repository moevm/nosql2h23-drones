async function experiments_get() {
	fetch(`${BACKEND_URL}/experiments`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function experiment_get(id) {
	fetch(`${BACKEND_URL}/experiment?id=${id}`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function experiment_post(id, data) {
	const res = await fetch(`${BACKEND_URL}/experiment?id=${id}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}

async function drones_info_get() {
	fetch(`${BACKEND_URL}/drones-info`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function drone_info_get(id) {
	fetch(`${BACKEND_URL}/drone-info?id=${id}`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function drone_info_post(id, data) {
	const res = await fetch(`${BACKEND_URL}/drone-info?id=${id}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}

async function drones_note_get() {
	fetch(`${BACKEND_URL}/drones-note`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function drone_note_get(id) {
	fetch(`${BACKEND_URL}/drone-note?id=${id}`, res=>{
		if (res.ok) {
			const json = await res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

async function drone_note_post(id, data) {
	const res = await fetch(`${BACKEND_URL}/drone-note?id=${id}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}