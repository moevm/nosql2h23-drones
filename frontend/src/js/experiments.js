import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiments_get, experiment_post } from './db-restapi.js';

window.onload = () => {
	experiments_get().then(data => {
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

	const dialog_add = document.getElementById("dialog_add");
	document.getElementById('add').onclick = () => {
		dialog_add.showModal();
	}

	const dialog_add_ok = document.getElementById("dialog_add_ok");
	dialog_add_ok.onclick = () => {
		const form_data = new FormData(document.getElementById('dialog_add_form_data'))
		const data = {
			'name': form_data.get('name')
		}
		experiment_post(data)
	}
};