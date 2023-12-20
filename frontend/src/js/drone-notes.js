import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { drone_info_get_notes, drone_note_post } from './db-restapi.js';

async function fetchDroneInfo() {
	const id = new URLSearchParams(window.location.search).get('drone_info_id');
	return await drone_info_get_notes(id);
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

window.onload = () => {
	notesGet()

	document.getElementById('back').onclick = () => {
		window.location.href = URL_MAP.get('experiment') + `?id=${new URLSearchParams(window.location.search).get('experiment_id')}`;
	}

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
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
}