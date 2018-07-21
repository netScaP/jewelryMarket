var inputQuant = document.getElementById('quant');
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
    currentPage: 1
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
            this.products = response.body;
            this.currentPage = page;
          }, console.log);
    },
    addToCart: function(i) {
      return 'add-to-cart/' + this.products[i].unique;
    },
    handlerWhereSize: function(event) {
      var target = event.target;
      var form = target.parentNode.parentNode.parentNode;

      while (target.tagName != 'LABEL') {
        target = target.parentNode;
      }

      var allLabel = form.getElementsByTagName('label');

      for (var i = 0; i < allLabel.length; i++) {
        allLabel[i].classList.remove('checked');
      }
      target.classList.add('checked');
    },
    handlerInCart: function(event) {
      var target = event.target;
      target.parentNode.parentNode.lastChild.style.position = 'absolute';
      target.parentNode.parentNode.lastChild.style.opacity = 1;
      var btn = target.parentNode.getElementsByTagName('button')[0];
      btn.setAttribute('form', target.parentNode.parentNode.lastChild.getAttribute('id'));
    },
    handlerSubmit: function(event) {
      event.preventDefault();

      var xhr = new XMLHttpRequest();
      xhr.open(event.target.method, '/' + event.target.attributes.action.value, true); // METHOD, link
      xhr.setRequestHeader('Content-Type', 'application/json');

      var allInput = event.target.getElementsByTagName('INPUT');

      var jSon = {}; // input.name: input.value
      for (var i = 0; i < allInput.length; i++) {
        if (allInput[i].getAttribute('type') == 'radio') {
          if (allInput[i].checked) {
            jSon[allInput[i].name] = allInput[i].value;
          }
        } else {
          jSon[allInput[i].name] = allInput[i].value;
        }
      }
      delete jSon[''];

      var allSelect = event.target.getElementsByTagName('SELECT');

      for (var i = allSelect.length - 1; i >= 0; i--) {
        var allOption = allSelect[i].getElementsByTagName('OPTION');
        for (var i = allOption.length - 1; i >= 0; i--) {
          if (allOption[i].selected) {
            jSon[allSelect[i].name] = allOption[i].value;
          }
        }
      }

      xhr.send(JSON.stringify(jSon));
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
  		if ((+inputQuant.value + 1) % 10 == 0) {
  			inputQuant.style.width = ((inputQuant.value.length + 2) * 8) - 6 + 'px';
  		} else if (+inputQuant.value % 10 == 1) {
  			inputQuant.style.width = ((inputQuant.value.length + 1) * 8) - 6 + 'px';
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