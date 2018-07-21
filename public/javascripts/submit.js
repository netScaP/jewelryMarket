var form = document.getElementsByTagName('FORM');

for (var i = form.length - 1; i >= 0; i--) {
	form[i].addEventListener('submit', handler);
}

function handler(event) {
	event.preventDefault();

	console.log(event.target);
	console.log(event.originalTarget);

	var xhr = new XMLHttpRequest();
	xhr.open(event.target.method, '/' + event.target.attributes.action.value, true); // METHOD, link
	console.log(event.target.method + '/' + event.target.attributes.action.value);
	xhr.setRequestHeader('Content-Type', 'application/json');

	var allInput = event.target.getElementsByTagName('INPUT');

	var jSon = {}; // input.name: input.value
	for (var i = 0; i < allInput.length; i++) {
		if (allInput[i].getAttribute('type') == 'radio') {
			if (allInput[i].checked) {
				jSon[allInput[i].name] = allInput[i].value;
			}
		} else {
			jSon[allInput[i].name] = allInput[i].value;
		}
	}
	delete jSon[''];

	var allSelect = event.target.getElementsByTagName('SELECT');

	for (var i = allSelect.length - 1; i >= 0; i--) {
		var allOption = allSelect[i].getElementsByTagName('OPTION');
		for (var i = allOption.length - 1; i >= 0; i--) {
			if (allOption[i].selected) {
				jSon[allSelect[i].name] = allOption[i].value;
			}
		}
	}
	console.log(jSon);

	xhr.send(JSON.stringify(jSon));
}
