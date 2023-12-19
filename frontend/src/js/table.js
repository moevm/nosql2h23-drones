export function add_row(id, row, onClickURL) {
	const tBodyRef = document.getElementById(id).getElementsByTagName('tbody')[0];
	const newRow = tBodyRef.insertRow();

	for (const str of row) {
		const newCell = newRow.insertCell();
		const newText = document.createTextNode(str);
		newCell.appendChild(newText);
	}

	console.log(onClickURL)
	if (onClickURL) {
		newRow.onclick = () => {
			window.location.href = onClickURL
		}
	}
}

export function delete_row(id, index) {
	const tBodyRef = document.getElementById(id).getElementsByTagName('tbody')[0];
	tBodyRef.deleteRow(index);
}