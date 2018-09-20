var app = new Vue({
	el: '.main-block',
	data: {
		product: {},
		messages: []
	},
	methods: {
		addElement: function(ref) {
			if (ref == 'onePart') {
				// this.product['partDesc'][''] = '';
				console.log('onePart');
				Vue.set(this.product['partDesc'], '', '');
				console.log(this.product['partDesc']);
				return true;
			}

			console.log('phf');
			this.product[ref].push('');
		},
		submit: function(event) {
			var options = {
				product: this.product
			};
			var link = window.location.pathname.split('/').pop() === 'addProduct' ? '/admin/addProduct' : '/admin/products/' + window.location.pathname.split('/').pop();
			console.log(this.product);
			this.$http.post(link, options).then(function(response) {
				this.messages.push({
					'success': true,
					'message': response.body.message
				});
			})
			.catch(function(err) {
				this.messages.push({
					'success': false,
					'message': err.body.message
				});
			});
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
				size: [],
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