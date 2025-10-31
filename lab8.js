const entries = new Set();
const entriesBlock = document.getElementById('items');
const addBtn = document.getElementById('add-item');
const saveBtn = document.getElementById('save-item');
const outputBlock = document.getElementById('result');

function renderEntries() {
	entriesBlock.innerHTML = '';
	entries.forEach(({ key, value, id }) => {
		const row = document.createElement('div');
		row.dataset.id = id;

		const keyField = document.createElement('input');
		keyField.name = id;
		keyField.value = key;
		keyField.addEventListener('change', e => {
			updateEntry(e.target.name, e.target.value);
		});

		const valueField = document.createElement('input');
		valueField.name = id;
		valueField.value = value;
		valueField.addEventListener('change', e => {
			updateEntry(e.target.name, undefined, e.target.value);
		});

		const upBtn = document.createElement('button');
		upBtn.innerHTML = '&uarr;';
		upBtn.addEventListener('click', () => moveEntryUp(id));

		const downBtn = document.createElement('button');
		downBtn.innerHTML = '&darr;';
		downBtn.addEventListener('click', () => moveEntryDown(id));

		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '&#215;';
		deleteBtn.addEventListener('click', () => removeEntry(id));

		row.append(keyField, valueField, upBtn, downBtn, deleteBtn);
		entriesBlock.appendChild(row);
	});
}

function addEntry() {
	const id = entries.size;
	entries.add({ key: '', value: '', id });
	renderEntries();
}

function updateEntry(entryId, newKey = undefined, newValue = undefined) {
	for (const entry of entries) {
		if (entry.id == entryId) {
			if (newKey !== undefined) entry.key = newKey;
			if (newValue !== undefined) entry.value = newValue;
		}
	}
}

function removeEntry(entryId) {
	for (const entry of entries) {
		if (entry.id == entryId) {
			entries.delete(entry);
			break;
		}
	}
	renderEntries();
}

function moveEntryUp(entryId) {
	const list = Array.from(entries);
	for (let i = 0; i < list.length; i++) {
		if (list[i].id == entryId && i > 0) {
			[list[i - 1], list[i]] = [list[i], list[i - 1]];
			break;
		}
	}
	entries.clear();
	list.forEach(el => entries.add(el));
	renderEntries();
}

function moveEntryDown(entryId) {
	const list = Array.from(entries);
	for (let i = 0; i < list.length; i++) {
		if (list[i].id == entryId && i < list.length - 1) {
			[list[i + 1], list[i]] = [list[i], list[i + 1]];
			break;
		}
	}
	entries.clear();
	list.forEach(el => entries.add(el));
	renderEntries();
}

function showResult() {
	outputBlock.innerHTML = '';
	const resultObj = {};
	entries.forEach(entry => {
		resultObj[entry.key] = entry.value;
	});
	outputBlock.textContent = JSON.stringify(resultObj);
}

addBtn.addEventListener('click', addEntry);
saveBtn.addEventListener('click', showResult);
addEntry();