import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiment_get_drones, drone_info_post } from './db-restapi.js';

async function fetchExperimentDrones() {
	const id = new URLSearchParams(window.location.search).get('id');
	return await experiment_get_drones(id);
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

async function sortData(key){
	//Сортируем по возрастанию
	if (key == 'ascending'){
		let sortedRows = Array.from(table.rows).slice(1).sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);
    	table.tBodies[0].append(...sortedRows);
	}

	//Сортируем по убыванию
	else{
		let sortedRows = Array.from(table.rows).slice(1).sort((rowA, rowB) => rowA.cells[1].innerHTML < rowB.cells[1].innerHTML ? 1 : -1);
    	table.tBodies[0].append(...sortedRows);
	}
}

window.onload = () => {
	dronesGet()

	document.getElementById('back').onclick = () => {
		window.location.href = URL_MAP.get('experiments');
	}
	document.getElementById('sort_up').onclick = () => {
		console.log('enter')
		sortData('ascending');
	}
	document.getElementById('sort_down').onclick = () => {
		sortData('descending');
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