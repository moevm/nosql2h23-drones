import * as table from './table.js';
import { experiments_get, experiment_post, export_data_get, import_data_post } from './db-restapi.js';

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
				`/experiment?id=${row._id}`
			);
		}
	})
}

function clearURLParams() {
    history.replaceState({}, document.title, window.location.pathname);
}

function import_data(event) {
	import_data_post(event.target.files[0]);
}

function export_data() {
	export_data_get();
}

window.onload = () => {
	experimentsGet()

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
	}

	document.getElementById('import').onclick = () => {
		document.getElementById('file-import').click();
	}
	document.getElementById('export').onclick = export_data_get;
	document.getElementById('file-import').onchange = import_data;

	document.getElementById('sort_up_name').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'name')
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
		url.searchParams.set('sortBy', 'creationDate')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_start').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'creationDate')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

	document.getElementById('sort_up_change').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'changedDate')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_change').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'changedDate')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

    document.getElementById('sort_up_number').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'dronesAmount')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_number').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'dronesAmount')
		url.searchParams.set('sortOrder', 'desc')
		window.location.href = String(url)
	}

    document.getElementById('sort_up_duration').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'timeAmount')
		url.searchParams.set('sortOrder', 'asc')
		window.location.href = String(url)
	}
	document.getElementById('sort_down_duration').onclick = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('sortBy', 'timeAmount')
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