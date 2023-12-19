import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';
import { experiments_get } from './db-restapi.js';

window.onload = () => experiments_get().then(data => {
	console.log( data );
	for ( const row of data )
	{
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
});