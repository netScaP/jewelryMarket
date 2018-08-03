var app = new Vue({
	el: '.users',
	data: {
		users: {}
	},
	methods: {
		confirmUser: function(id) {
			this.$http.get('/admin/confirmuser/' + id);
		},
		rejectUser: function(id) {
			this.$http.get('/admin/rejectuser/' + id);
		}
	},
	created: function() {
		this.$http.get('/api/userlist').then(function(response) {
			this.users = response.body;
			console.log(this.users);
		});
	}
})