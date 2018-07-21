var whereSize = document.getElementsByClassName('helpDiv');

for (var i = whereSize.length - 1; i >= 0; i--) {
	whereSize[i].addEventListener('click', handlerWhereSize);
}


var inCart = document.getElementsByClassName('inCart');
console.log(inCart);
console.log(inCart.length);
for (var i = inCart.length - 1; i >= 0; i--) {
	inCart[i].addEventListener('click', handlerInCart);
}
whereSize.onclick = handlerWhereSize();
function handlerWhereSize(event) {
	var target = event.target;
	var form = target.parentNode.parentNode.parentNode;
	console.log(target);

	while (target.tagName != 'LABEL') {
		target = target.parentNode;
	}

	var allLabel = form.getElementsByTagName('label');

	for (var i = 0; i < allLabel.length; i++) {
		allLabel[i].classList.remove('checked');
	}
	target.classList.add('checked');
}

function handlerInCart(event) {
	var target = event.target;
	console.log(target.parentNode.parentNode.lastChild);
	target.parentNode.parentNode.lastChild.style.position = 'absolute';
	target.parentNode.parentNode.lastChild.style.opacity = 1;
	var btn = target.parentNode.getElementsByTagName('button')[0];
	btn.setAttribute('form', target.parentNode.parentNode.lastChild.getAttribute('id'));
}

