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

export async function experiment_get_drones(query) {
	let url = `${BACKEND_URL}/experiment/drones?id=${String(query.id)}`
	if(query.sortBy && query.sortOrder){
		url += `&sortBy=${String(query.sortBy)}&sortOrder=${String(query.sortOrder)}`
	}
	if(query.name){
		url += `&name=${String(query.name)}`
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

export async function drone_info_get_notes(query) {
	let url = `${BACKEND_URL}/drone-info/notes?id=${String(query.id)}`
	if(query.sortBy && query.sortOrder){
		url += `&sortBy=${String(query.sortBy)}&sortOrder=${String(query.sortOrder)}`
	}
	if(query.time){
		url += `&time=${String(query.time)}`
	}
	if(query.pos_x){
		url += `&pos_x=${String(query.pos_x)}`
	}
	if(query.pos_y){
		url += `&pos_y=${String(query.pos_y)}`
	}
	if(query.pos_z){
		url += `&pos_z=${String(query.pos_z)}`
	}
	if(query.vel_x){
		url += `&vel_x=${String(query.vel_x)}`
	}
	if(query.vel_y){
		url += `&vel_y=${String(query.vel_y)}`
	}
	if(query.vel_z){
		url += `&vel_z=${String(query.vel_z)}`
	}
	if(query.roll){
		url += `&roll=${String(query.roll)}`
	}
	if(query.pitch){
		url += `&pitch=${String(query.pitch)}`
	}
	if(query.yawl){
		url += `&yawl=${String(query.yawl)}`
	}
	if(query.ang_vel_x){
		url += `&ang_vel_x=${String(query.ang_vel_x)}`
	}
	if(query.ang_vel_y){
		url += `&ang_vel_y=${String(query.ang_vel_y)}`
	}
	if(query.ang_vel_z){
		url += `&ang_vel_z=${String(query.ang_vel_z)}`
	}
	if(query.rpm0){
		url += `&rpm0=${String(query.rpm0)}`
	}
	if(query.rpm1){
		url += `&rpm1=${String(query.rpm1)}`
	}
	if(query.rpm2){
		url += `&rpm2=${String(query.rpm2)}`
	}
	if(query.rpm3){
		url += `&rpm3=${String(query.rpm3)}`
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
