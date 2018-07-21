var whereSize = document.getElementsByClassName('helpDiv')[0];

whereSize.onclick = function(event) {
	var target = event.target;

	while (target.tagName != 'LABEL') {
		target = target.parentNode;
	}

	var allLabel = whereSize.getElementsByTagName('label');

	for (var i = 0; i < allLabel.length; i++) {
		allLabel[i].classList.remove('checked');
	}
	target.classList.add('checked');
};

var inputQuant = document.getElementById('quant');
inputQuant.style.width = ((inputQuant.value.length + 1) * 8) - 6 + 'px';

inputQuant.oninput = function() {
	inputQuant.style.width = ((inputQuant.value.length + 1) * 8) - 6 + 'px';
};

var prodDesc = document.getElementsByClassName('prodDesc')[0];
var heightImg = document.getElementsByClassName('mainImage')[0].clientHeight;

if (document.documentElement.clientWidth > 640) {
	prodDesc.style.height = heightImg + 'px';
}