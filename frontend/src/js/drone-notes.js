import * as table from './table.js';
import { URL_MAP } from '../../server-settings.js';

table.add_row('table', ['2023-10-08T10:15:42.956087Z', '1.12', '2.12', '3.12', '1.51', '2.52', '3.53', '1.61', '2.62', '3.63', '1.31', '2.32', '3.33', 40000, 40000, 40000, 40000]);

document.getElementById('back').onclick = () => {
	window.location.href = URL_MAP.get('experiment');
}