var app = new Vue({
	el: '.layout-header',
	data: {
		screenWidth: 500,
		isOpen: false
	},
	created: function() {
		this.screenWidth = document.documentElement.clientWidth;
	}
})