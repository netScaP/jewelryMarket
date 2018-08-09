Vue.component('line-chart', {
	extends: VueChartJs.Line,
	mixins: VueChartJs.mixins.reactiveProp,
	props: ['chartLabels', 'chartData'],
	data: function() {
		return {
			renderData: {
				labels: this.chartLabels,
				datasets: [
						{
							label: 'Продажи',
							backgroundColor: '#f87979',
							data: this.chartData
						}
				]
			},
			renderOptions: {
				responsive: true, 
				maintainAspectRatio: false  
			}
		}
	},
	mounted () {
		this.renderChart(this.renderData, this.renderOptions);
	},
	watch: {
		'chartData': {
			handler: function () {
				this.renderChart(this.renderData, this.renderOptions);
			}
		}
	}
});

var vm = new Vue({
	el: '#main-app',
	data: {
		message: 'Hello World',
		viewBy: 'm',
		options: [
			{ text: 'По дням', value: 'd' },
			{ text: 'По месяцам', value: 'm' },
			{ text: 'По годам', value: 'y' }
		],
		someArr: {},
		generateLabels: [],
		generateData: []
	},
	watch: {
		viewBy: function(v) {
			this.sortView();
		}
	},
	methods: {
		getMonth: function(number) {
			var monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
			return monthes[number - 1];
		},
		transformMonth: function(number) {
			if (number < 10) return '0' + number;
			return number;
		},
		sortView: function() {
			var indexOld = this.generateLabels.length;
			for (var year in this.someArr) {
				if (year == 'sum') continue;
				if (this.viewBy == 'y') {
					this.generateData.push(this.someArr[year]['sum']);
					this.generateLabels.push(year);
				} else if (this.viewBy == 'm') {
					for (var month in this.someArr[year]) {
						if (month == 'sum') continue;
						this.generateData.push(this.someArr[year][month]['sum']);
						this.generateLabels.push(this.getMonth(month));
					}
				} else if (this.viewBy == 'd') {
					for (var month in this.someArr[year]) {
						if (month == 'sum') continue;
						for (var day in this.someArr[year][month]) {
							if (day == 'sum') continue;
							this.generateData.push(this.someArr[year][month][day]);
							this.generateLabels.push(day + '.' + this.transformMonth(month));
						}
					}
				}
			}
			this.generateLabels.splice(0, indexOld);
			this.generateData.splice(0, indexOld);
		}
	},
	created: function() {
		this.$http.get('/api/sellings').then(function (response) {
			var resData = response.body;

			var year = null;
			var month = null;

			for (var i = 0; i <= resData.length - 1; i++) {
				year = resData[i]['_id']['y'];
				month = resData[i]['_id']['m'];

				this.someArr[year] = this.someArr[year] || { 'sum': 0 };
				this.someArr[year][month] = this.someArr[year][month] || { 'sum': 0 };
				this.someArr[year][month][resData[i]['_id']['d']] = resData[i]['sum'];
				this.someArr[year]['sum'] += resData[i]['sum'];
				this.someArr[year][month]['sum'] += resData[i]['sum'];

				if (i >= resData.length - 1) continue;


				if (resData[i + 1]['_id']['y'] - year > 0) {
					for (var m = month; m <= 12; m++) {
						this.someArr[year][m] = this.someArr[year][m] || { 'sum': 0 };
					}
					for (var m = year + 1; m < resData[i + 1]['_id']['y']; m++) {
						for (var k = 1; k <= 12; k++) {
							this.someArr[m][k] = this.someArr[m][k] || { 'sum': 0 };
						}
					}
					this.someArr[resData[i + 1]['_id']['y']] = this.someArr[resData[i + 1]['_id']['y']] || { 'sum': 0 };
					for (var k = 1; k < resData[i + 1]['_id']['m']; k++) {
						this.someArr[resData[i + 1]['_id']['y']][k] = this.someArr[resData[i + 1]['_id']['y']][k] || { 'sum': 0 };
					}
				}

			}

			this.sortView();
		});
	}
})
