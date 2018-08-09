var app = new Vue({
  el: '.main-block',
  data: {
    screenWidth: 1001,
    isCol: true,
    quantity: 1,
    products: [],
    totalProducts: 0,
    perPage: 9,
    selected: 1,
    arrPerPage: [3, 9, 27],
    currentPage: 1,
    currentSize: 0,
    messages: []
  },
  methods: {
    fetchPhotos: function(page) {
          var options = {
            params: {
                skip: (page - 1) * this.perPage,
                limit: this.perPage
            }
          };

          this.$http.get('/api/pagination', options).then(function(response) {
            console.log(response);
            this.products = response.body;
            this.currentPage = page;
          }, console.log);
    },
    addToCart: function(i) {
      return 'add-to-cart/' + this.products[i].unique;
    },
    handlerSubmit: function(i) {
      var options = {
        quantity: 1,
        size: this.currentSize
      };
      this.$http.post('/add-to-cart/' + this.products[i].unique, options);
      this.messages.push('Товар добавлен');
    }
  },
  created: function() {
    this.$http.get('/api/total').then(function (response) {
      this.totalProducts = response.body.length;
    });
    this.fetchPhotos(this.currentPage);
    this.screenWidth = document.documentElement.clientWidth;
    if (this.screenWidth <= 1000 && this.screenWidth >= 640) this.isCol = false;
    else if (this.screenWidth > 1000 || this.screenWidth < 640) this.isCol = true;
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
  	},
    selected: function(val, prevVal) {
      this.perPage = this.arrPerPage[this.selected];
      this.currentPage = Math.round(((this.currentPage - 1) * this.arrPerPage[prevVal]) / this.arrPerPage[val] + 1);
      console.log(this.currentPage);
      this.fetchPhotos(this.currentPage);
    }
  }
})