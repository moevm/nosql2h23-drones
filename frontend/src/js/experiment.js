import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiment_get_drones, drone_info_post } from './db-restapi.js';

async function fetchExperimentDrones() {
	const id = new URLSearchParams(window.location.search).get('id');
	const sortBy = new URLSearchParams(window.location.search).get('sortBy');
	const sortOrder = new URLSearchParams(window.location.search).get('sortOrder');
	return await experiment_get_drones(id, sortBy, sortOrder);
}

function dronesGet() {
	document.getElementById("table").getElementsByTagName('tbody')[0].innerHTML = '';
	fetchExperimentDrones().then(data => {
		let i = 0;
		for ( const row of data )
		{
			table.add_row(
				'table',
				[
					String(++i),
					row.name
				],
				URL_MAP.get('drone-notes') + `?experiment_id=${new URLSearchParams(window.location.search).get('id')}&drone_info_id=${row._id}`
			);
		}
	});
}

window.onload = () => {
	dronesGet()

	document.getElementById('back').onclick = () => {
		window.location.href = URL_MAP.get('experiments');
	}
	document.getElementById('sort_up').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
	}

	const dialog_add_ok = document.getElementById("dialog_add_ok");
	dialog_add_ok.onclick = () => {
		const form_data = new FormData(document.getElementById('dialog_add_form_data'))
		const data = {
			'id': new URLSearchParams(window.location.search).get('id'),
			'value': {
				'name': form_data.get('name')
			}
		}
		drone_info_post(data).then(no_data => {
			dronesGet()
		})
	}
}