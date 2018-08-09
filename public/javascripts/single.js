var app = new Vue({
	el: '#mainApp',
	data: {
		product: {},
		quantity: 1,
		currentSize: 0,
		currentImage: 0,
		messages: []
	},
	methods: {
		handlerSubmit: function() {
			var option = {
				quantity: this.quantity,
				size: this.currentSize
			}
			this.$http.post('/add-to-cart/' + this.product.unique, option);
			this.messages.push(this.quantity + ' товара было добавлено');
			Vue.set(app, 'quantity', 1);
		}
	},
	filters: {
		addUSD: function(v) {
			return '$'+v;
		},
		addToCart: function(v) {
			return 'add-to-cart/' + v;
		}
	},
	computed: {
		onSale: function() {
			return '$' + Math.ceil(this.product.price / 100 * (100 - this.product.sale));
		}
	},
	watch: {
		quantity: function() {
	  		if (this.quantity < 1 || this.quantity == '' || this.quantity == 'NaN' || !this.quantity) this.quantity = 1;
	  		this.quantity = parseInt(this.quantity);
	  		if ((+this.$refs['quant'].value + 1) % 10 == 0) {
	  			this.$refs['quant'].style.width = ((this.$refs['quant'].value.length + 2) * 8) - 6 + 'px';
	  		} else if (+this.$refs['quant'].value % 10 == 1) {
	  			this.$refs['quant'].style.width = ((this.$refs['quant'].value.length + 1) * 8) - 6 + 'px';
	  		}
	  	}
	},
	created: function() {
		this.$http.get('/api/singleProduct?id=' + window.location.pathname.split('/').pop() )
		.then(function (response) {
			console.log(response);
			this.product = response.body;
			console.log(this.product);
		});
	}
});