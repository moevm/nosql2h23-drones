import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiment_get_drones, drone_info_post } from './db-restapi.js';

async function fetchExperimentDrones() {
	const query = {
		id: new URLSearchParams(window.location.search).get('id'),
		name: new URLSearchParams(window.location.search).get('name'),
	}
	return await experiment_get_drones(query);
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

function clearURLParams() {
    history.replaceState({}, document.title, window.location.pathname);
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

	const button = document.getElementById('find');
    button.addEventListener('click', function(event) {
    	event.preventDefault();
    	let url = new URL(window.location.href);
    	let id = url.searchParams.get('id');
    	clearURLParams();
    	url = new URL(window.location.href);
    	url.searchParams.set('id', id);
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