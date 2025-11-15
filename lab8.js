const entries = [];
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
		keyField.value = key;
		keyField.addEventListener('input', e => {
			updateEntry(id, e.target.value, undefined);
		});
		const valueField = document.createElement('input');
		valueField.value = value;
		valueField.addEventListener('input', e => {
			updateEntry(id, undefined, e.target.value);
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
	let id = 0;
	for (const e of entries) {
		if (e.id >= id) id = e.id + 1;
	}
	entries.push({ key: '', value: '', id });
	renderEntries();
}

function updateEntry(entryId, newKey = undefined, newValue = undefined) {
	const entry = entries.find(e => e.id === entryId);
	if (!entry) return;
	if (newKey !== undefined) entry.key = newKey;
	if (newValue !== undefined) entry.value = newValue;
}

function removeEntry(entryId) {
	const index = entries.findIndex(e => e.id === entryId);
	if (index !== -1) {
		entries.splice(index, 1);
	}
	renderEntries();
}

function moveEntryUp(entryId) {
	const i = entries.findIndex(e => e.id === entryId);
	if (i > 0) {
		[entries[i - 1], entries[i]] = [entries[i], entries[i - 1]];
		renderEntries();
	}
}

function moveEntryDown(entryId) {
	const i = entries.findIndex(e => e.id === entryId);
	if (i < entries.length - 1) {
		[entries[i + 1], entries[i]] = [entries[i], entries[i + 1]];
		renderEntries();
	}
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
