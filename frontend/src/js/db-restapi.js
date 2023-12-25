import { BACKEND_URL } from '../../server-settings.js';

export async function experiments_get(query) {
	let url = `${BACKEND_URL}/experiments`;
	if (query != null){
		url += "?"
		for (const [key, value] of query) {
			if (key != undefined && value != undefined)
			url +=  key + `=` + value + `&`;
		}
	}
	const res = await fetch(url);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function experiment_get(id) {
	const res = await fetch(`${BACKEND_URL}/experiment?id=${String(id)}`);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function experiment_post(data) {
	console.log(data)
	const res = await fetch(`${BACKEND_URL}/experiment`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}

export async function experiment_get_drones(id, sortBy, sortOrder) {
	let url = `${BACKEND_URL}/experiment/drones?id=${String(id)}`
	if(sortBy && sortOrder){
		url += `&sortBy=${String(sortBy)}&sortOrder=${String(sortOrder)}`
	}
	const res = await fetch(url);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drones_info_get() {
	const res = await fetch(`${BACKEND_URL}/drones-info`);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_info_get(id) {
	const res = await fetch(`${BACKEND_URL}/drone-info?id=${String(id)}`);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_info_post(data) {
	const res = await fetch(`${BACKEND_URL}/drone-info`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}

export async function drone_info_get_notes(id, sortBy, sortOrder) {
	let url = `${BACKEND_URL}/drone-info/notes?id=${String(id)}`
	if(sortBy && sortOrder){
		url += `&sortBy=${String(sortBy)}&sortOrder=${String(sortOrder)}`
	}
	const res = await fetch(url);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drones_note_get() {
	const res = await fetch(`${BACKEND_URL}/drones-note`);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_note_get(id) {
	const res = await fetch(`${BACKEND_URL}/drone-note?id=${String(id)}`);
	if (res.ok) {
		return res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return {};
	}
}

export async function drone_note_post(data) {
	const res = await fetch(`${BACKEND_URL}/drone-note`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}
