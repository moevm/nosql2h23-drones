import { BACKEND_URL } from '../../server-settings.js';

export async function experiments_get() {
	const res = await fetch(`${BACKEND_URL}/experiments`);
	if (res.ok) {
		return await res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function experiment_get(id) {
	const res = await fetch(`${BACKEND_URL}/experiment?id=${String(id)}`);
	if (res.ok) {
		return await res.json();
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

export async function drones_info_get() {
	const res = await fetch(`${BACKEND_URL}/drones-info`);
	if (res.ok) {
		return await res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_info_get(id) {
	const res = await fetch(`${BACKEND_URL}/drone-info?id=${id}`);
	if (res.ok) {
		return await res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_info_post(id, data) {
	const res = await fetch(`${BACKEND_URL}/drone-info?id=${id}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}

export async function drones_note_get() {
	const res = await fetch(`${BACKEND_URL}/drones-note`);
	if (res.ok) {
		return await res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return [];
	}
}

export async function drone_note_get(id) {
	const res = await fetch(`${BACKEND_URL}/drone-note?id=${id}`);
	if (res.ok) {
		return await res.json();
	} else {
		alert(`Ошибка запроса: ${res.status}`);
		return {};
	}
}

export async function drone_note_post(id, data) {
	const res = await fetch(`${BACKEND_URL}/drone-note?id=${id}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});
}
