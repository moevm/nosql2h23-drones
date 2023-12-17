import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';

table.add_row('table', ['1', 'Mavic Pro'], URL_MAP.get('drone-notes'));
table.add_row('table', ['2', 'DJI Mavic Air'], URL_MAP.get('drone-notes'));
table.add_row('table', ['3', 'DJI Air 2S'], URL_MAP.get('drone-notes'));

document.getElementById('back').onclick = () => {
	window.location.href = URL_MAP.get('experiments');
}