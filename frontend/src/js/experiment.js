import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiment_get } from './db-restapi.js';

async function fetchExperiment() {
	const id = new URLSearchParams(window.location.search).get('id');
	return await experiment_get(id);
}

window.onload = () => fetchExperiment().then(data => {
	let i = 0;
	for ( const row of data )
	{
		table.add_row(
			'table',
			[
				String(++i),
				row.name
			],
			URL_MAP.get('drone-notes') + `?id=${row._id}`
		);
	}
});

// table.add_row('table', ['1', 'Mavic Pro'], URL_MAP.get('drone-notes') + `?id=1`);
// table.add_row('table', ['2', 'DJI Mavic Air'], URL_MAP.get('drone-notes') + `?id=2`);
// table.add_row('table', ['3', 'DJI Air 2S'], URL_MAP.get('drone-notes') + `?id=3`);

document.getElementById('back').onclick = () => {
	window.location.href = URL_MAP.get('experiments');
}