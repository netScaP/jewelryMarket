var app = new Vue({
	el: '.myCart',
	data: {
		oneProduct: [],
		first: true,
		cart: {},
		orders: {},
		isOrdersOpen: false
	},
	methods: {
		change: function(id, size, qty) {
			Vue.delete(this.cart['items'][id], size);
			if (Object.keys(this.cart['items'][id]).length == 0) {
				Vue.delete(this.cart['items'], id);
			}
			if (Object.keys(this.cart['items']).length == 0) {
				this.cart = {};
			}
			var data = {
				'id': id,
				'size': size,
				'qty': qty
			};
			this.$http.post('/delete/' + id, data);
		}
	},
	created: function() {
		this.$http.get('/api/cart').then(function(response) {
			this.cart = response.body;
		});
		this.$http.get('/api/orders').then(function(response) {
			this.orders = response.body;
		});
	},
	watch: {
		qty: {
			function(val, oldVal) {
				console.log(val + ' ' + oldVal);
			},
			deep: true
		}
	},
	computed: {
		empty: function() {
			if (Object.keys(this.cart).length == 0) return true;
			return false;
		},
		total: function() {
			var sum = 0;
			for (var id in this.cart.items) {
				for (item in this.cart.items[id]) {
					sum += this.cart.items[id][item].qty * Math.ceil( this.cart.items[id][item]['item'].price / 100 * (100 - this.cart.items[id][item]['item'].sale ) );
				}
			}
			return sum;
		}
	}
});

app.$watch('cart', function(newVal) {
	this.$http.post('/updateCart', newVal);
}, { deep: true });
/*
function putReq() {
	var xhr = new XMLHttpRequest();

	xhr.open('PUT', '/checkout', true); // METHOD, link
	xhr.setRequestHeader('Content-Type', 'application/json');

	var jSon = {};
	for (var i = app.products.length - 1; i >= 0; i--) {
		if (+app.products[i].getElementsByClassName('quantPut')[0].value < 1) continue;
		jSon[i] = {};
		jSon[i]['id'] = app.products[i].getElementsByClassName('productId')[0].value;
		jSon[i]['size'] = +app.products[i].getElementsByClassName('sizeSingleProduct')[0].innerHTML;
		jSon[i]['quantPut'] = app.products[i].getElementsByClassName('quantPut')[0].value;
	}

	xhr.send(JSON.stringify(jSon));
}*/