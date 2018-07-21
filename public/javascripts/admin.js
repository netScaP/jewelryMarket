var app = new Vue({
	el: '.main-block',
	data: {
		product: {}
	},
	methods: {
		addElement: function(ref) {
			console.log(ref);
			console.log(this.$refs[ref]);
			var imagePath = this.$refs[ref][0].cloneNode(true);
			imagePath.value = '';
			this.$refs[ref].push(imagePath);
			this.$refs[ref][0].parentNode.insertBefore(imagePath, this.$refs[ref][this.$refs[ref].length - 2].nextSibling);

			if (ref == 'onePart') {
				this.$refs['partDescName'].push(this.$refs[ref][this.$refs[ref].length - 1].firstChild.firstChild);
				this.$refs['partDescValue'].push(this.$refs[ref][this.$refs[ref].length - 1].lastChild.firstChild);
			}
		},
		submit: function(event) {
			event.preventDefault();

			var xhr = new XMLHttpRequest();
		 	xhr.open(event.target.method, event.target.action, true); // METHOD, link
			xhr.setRequestHeader('Content-Type', 'application/json');

			var jSon = {};
			for (key in this.product) {
				try {
					if (this.$refs[key] instanceof Array) {
						jSon[key] = [];
						for (var i = this.$refs[key].length - 1; i >= 0; i--) {
							jSon[key].push(this.$refs[key][i].value);
						}
					} else {
						jSon[key] = this.$refs[key].value;
					}
				} catch(e) { }
			}
			jSon['partDesc'] = {};
			for (var i = this.$refs['partDescName'].length - 1; i >= 0; i--) {
				jSon['partDesc'][this.$refs['partDescName'][i].value] = this.$refs['partDescValue'][i].value;
			}
			
			xhr.send(JSON.stringify(jSon));
		},
		submitClick: function() {
			this.$refs['success'].style.display = "inline-block";
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
				addInfo: ''
			};
			console.log(this.product);
		} else {
			this.$http.get('/api/singleProduct?id=' + window.location.pathname.split('/').pop() ).then(function (response) {
				this.product = response.body;
			});
		}
	}
});