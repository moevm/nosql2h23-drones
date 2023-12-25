import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiments_get, experiment_post } from './db-restapi.js';

function experimentsGet() {
	const searchParams = new URLSearchParams(window.location.search);
	document.getElementById("table").getElementsByTagName('tbody')[0].innerHTML = '';
	experiments_get(searchParams).then(data => {
		for ( const row of data ) {
			table.add_row(
				'table',
				[
					row.name,
					row.creationDate,
					row.changedDate,
					'EYE',
					row.dronesInfo?.length || 0,
					String(row.timeAmount) + ' s'
				],
				URL_MAP.get('experiment') + `?id=${row._id}`
			);
		}
	})
}

function clearURLParams() {
    history.replaceState({}, document.title, window.location.pathname);
}

window.onload = () => {
	experimentsGet()

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
	}

	document.getElementById('sort_up_name').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'experiment')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_name').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_start').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_start').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_change').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_change').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

    document.getElementById('sort_up_number').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_number').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

    document.getElementById('sort_up_duration').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_duration').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	const dialog_add_ok = document.getElementById("dialog_add_ok");
	dialog_add_ok.onclick = () => {
		const form_data = new FormData(document.getElementById('dialog_add_form_data'))
		const data = {
			'name': form_data.get('name')
		}
		experiment_post(data).then(no_data => {
			experimentsGet()
		})
	}

	const button = document.getElementById('find');
    button.addEventListener('click', function(event) {
    	event.preventDefault();
    	clearURLParams();
    	const url = new URL(window.location.href);
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
};