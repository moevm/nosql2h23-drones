import * as table from './table.js';
import { drone_info_get_notes, drone_note_post } from './db-restapi.js';

async function fetchDroneInfo() {
	const query = {
		id: new URLSearchParams(window.location.search).get('drone_info_id'),
		time: new URLSearchParams(window.location.search).get('time'),
		pos_x: new URLSearchParams(window.location.search).get('pos_x'),
		pos_y: new URLSearchParams(window.location.search).get('pos_y'),
		pos_z: new URLSearchParams(window.location.search).get('pos_z'),
		vel_x: new URLSearchParams(window.location.search).get('vel_x'),
		vel_y: new URLSearchParams(window.location.search).get('vel_y'),
		vel_z: new URLSearchParams(window.location.search).get('vel_z'),
		roll: new URLSearchParams(window.location.search).get('roll'),
		pitch: new URLSearchParams(window.location.search).get('pitch'),
		yawl: new URLSearchParams(window.location.search).get('yawl'),
		ang_vel_x: new URLSearchParams(window.location.search).get('ang_vel_x'),
		ang_vel_y: new URLSearchParams(window.location.search).get('ang_vel_y'),
		ang_vel_z: new URLSearchParams(window.location.search).get('ang_vel_z'),
		rpm0: new URLSearchParams(window.location.search).get('rpm0'),
		rpm1: new URLSearchParams(window.location.search).get('rpm1'),
		rpm2: new URLSearchParams(window.location.search).get('rpm2'),
		rpm3: new URLSearchParams(window.location.search).get('rpm3'),
		sortBy: new URLSearchParams(window.location.search).get('sortBy'),
		sortOrder: new URLSearchParams(window.location.search).get('sortOrder'),
	}
	return await drone_info_get_notes(query);
}

function notesGet() {
	document.getElementById("table").getElementsByTagName('tbody')[0].innerHTML = '';
	fetchDroneInfo().then(data => {
		let i = 0;
		for ( const row of data )
		{
			table.add_row(
				'table',
				[
					row.time,
					row.pos_x,
					row.pos_y,
					row.pos_z,
					row.vel_x,
					row.vel_y,
					row.vel_z,
					row.roll,
					row.pitch,
					row.yawl,
					row.ang_vel_x,
					row.ang_vel_y,
					row.ang_vel_z,
					row.rpm0,
					row.rpm1,
					row.rpm2,
					row.rpm3
				]
			);
		}
	});
}

function clearURLParams() {
    history.replaceState({}, document.title, window.location.pathname);
}

window.onload = () => {
	notesGet()

	document.getElementById('back').onclick = () => {
		window.location.href = `/experiment?id=${new URLSearchParams(window.location.search).get('experiment_id')}`;
	}

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
	}

	document.getElementById('sort_up_time').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'time')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_time').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'time')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_pos_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_x')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_pos_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_x')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_pos_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_y')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_pos_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_y')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_pos_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_z')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_pos_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pos_z')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_vel_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_x')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_vel_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_x')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_vel_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_y')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_vel_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_y')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_vel_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_z')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_vel_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'vel_z')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_roll').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'roll')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_roll').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'roll')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_pitch').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pitch')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_pitch').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'pitch')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_yaw').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'yawl')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_yaw').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'yawl')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_ang_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_x')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_ang_x').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_x')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_ang_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_y')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_ang_y').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_y')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_ang_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_z')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_ang_z').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'ang_vel_z')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_rpm0').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm0')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_rpm0').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm0')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_rpm1').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm1')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_rpm1').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm1')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_rpm2').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm2')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_rpm2').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm2')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_rpm3').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm3')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_rpm3').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'rpm3')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	const dialog_add_ok = document.getElementById("dialog_add_ok");
	dialog_add_ok.onclick = () => {
		const form_data = new FormData(document.getElementById('dialog_add_form_data'))
		const data = {
			'id': new URLSearchParams(window.location.search).get('drone_info_id'),
			'value': {
				'name': form_data.get('name'),
				'time': form_data.get('time'),
				'pos_x': form_data.get('pos_x'),
				'pos_y': form_data.get('pos_y'),
				'pos_z': form_data.get('pos_z'),
				'vel_x': form_data.get('vel_x'),
				'vel_y': form_data.get('vel_y'),
				'vel_z': form_data.get('vel_z'),
				'roll': form_data.get('roll'),
				'pitch': form_data.get('pitch'),
				'yawl': form_data.get('yawl'),
				'ang_vel_x': form_data.get('ang_vel_x'),
				'ang_vel_y': form_data.get('ang_vel_y'),
				'ang_vel_z': form_data.get('ang_vel_z'),
				'rpm0': form_data.get('rpm0'),
				'rpm1': form_data.get('rpm1'),
				'rpm2': form_data.get('rpm2'),
				'rpm3': form_data.get('rpm3'),
			}
		}
		drone_note_post(data).then(no_data => {
			notesGet()
		})
	}

	const button = document.getElementById('find');
    button.addEventListener('click', function(event) {
    	event.preventDefault();
    	let url = new URL(window.location.href);
    	let experiment_id = url.searchParams.get('experiment_id');
    	let drone_info_id = url.searchParams.get('drone_info_id');
    	clearURLParams();
    	url = new URL(window.location.href);
    	url.searchParams.set('experiment_id', experiment_id);
    	url.searchParams.set('drone_info_id', drone_info_id);
    	let text = document.getElementById("search").value;
    	let keyValuePairs = text.split(', ');
		keyValuePairs.forEach(function(keyValue) {
	    	let pair = keyValue.split('=');
	    	let key = pair[0];
	    	let value = pair[1];
	    	url.searchParams.set(key, value);
		});
		window.location.href = String(url);
    });
}