var app = new Vue({
	el: '.main-block',
	data: {
		product: {}
	},
	methods: {
		addElement: function(ref) {
			console.log(ref);
			console.log(this.product);
			if (ref == 'onePart') {
				this.product['partDesc'].push({ '': '' });
				return true;
			}

			this.product[ref].push('');
		},
		submit: function(event) {
			var options = {
				params: {
					product: this.product
				}
			};
			console.log(this.products);
			this.$http.post('/admin/products/' + this.product['unique'], options);
		},
		submitClick: function() {
			// открыть блок на пол экрана
		}
	},
	created: function() {
		console.log(window.location.pathname.split('/').pop());
		if (window.location.pathname.split('/').pop() === 'addProduct') {
			this.product = {
				imagePath: [''],
				title: '',
				description: '',
				partDesc: {'':''},
				price: 0,
				sale: 0,
				type: '',
				size: [0],
				quantity: 1,
				addInfo: '',
				confirmed: false
			};
			console.log(this.product);
		} else {
			this.$http.get('/api/singleProduct?id=' + window.location.pathname.split('/').pop() ).then(function (response) {
				this.product = response.body;
				console.log(this.product);
				console.log(this.product['unique']);
			});
		}
	}
});