import * as table from './table.js';
import { URL_MAP, BACKEND_URL } from '../../server-settings.js';

async function fetchExperiment() {
	const id = new URLSearchParams(window.location)["id"];
	return fetch(`${BACKEND_URL}/Experiments?database=nosql2h23-drones`, res=>{
		if (res.ok) {
			const json = res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

window.onload = () => fetchExperiment().then(async response => {
	const data = await response.json();
	console.log( data );
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

//table.add_row('table', ['1', 'Mavic Pro'], URL_MAP.get('drone-notes'));
//table.add_row('table', ['2', 'DJI Mavic Air'], URL_MAP.get('drone-notes'));
//table.add_row('table', ['3', 'DJI Air 2S'], URL_MAP.get('drone-notes'));

document.getElementById('back').onclick = () => {
	window.location.href = URL_MAP.get('experiments');
}