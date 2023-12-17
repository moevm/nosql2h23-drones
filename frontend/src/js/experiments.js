import * as table from './table.js';
import { URL_MAP, BACKEND_URL } from '../../server-settings.js';

async function fetchExperiments() {
	fetch(`${BACKEND_URL}/Experiments?database=nosql2h23-drones&collection=Experiments`, res=>{
		if (res.ok) {
			const json = res.json();
		} else {
			alert(`Ошибка запроса: ${res.status}`);
		}
	});
}

fetchExperiments().then(data => {
	data;
})

table.add_row(
	'table',
	['Полет роя дронов №1','2023-10-07T10:1542.956087Z','2023-10-08T10:1542.956087Z', 'EYE', '56', '1d 02h 03m 45s'],
	URL_MAP.get('experiment')
);
// table_delete_row('table', 1)