<template>
  <b-row>
    <b-col sm="6" class="chart-container">
    <line-chart class="chart-fill"
     :chart-data="cpu_chart_data" :options="chart_options">
    </line-chart>
    </b-col>
    <b-col sm="6" class="chart-container">
    <line-chart class="chart-fill"
     :chart-data="mem_chart_data" :options="chart_options">
    </line-chart>
    </b-col>
  </b-row>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import LineChart from '@/components/LineChart.vue'

  var chart_options = {
    responsive: true,
    scales: {
      xAxes: [{
        display: false, // The x-axis is buggy, so just removed.
        type: 'time',
        time: { unit: 'minute' },
      }],
      yAxes: [{
        ticks: { min: 0, max: 100 }, // fix min-max
      }],
    },
    animation: { duration: 0 }, // no animation
    maintainAspectRatio: false,
  };

  export default {
    data() {
      return {
        chart_options,
        chart_times: [],
        chart_data: {
          cpu: [],
          mem: [],
        },
        chart_max_history: 60, // count
        chart_interval: 1000,    // ms
        chart_interval_id: null,
      }
    }, // data
    components: {
      LineChart,
    }, // components
    computed: {
      cpu_chart_data() {
        return {
          labels: this.chart_times,
          datasets: [{
            label: "cpu (%)",
            data: this.chart_data.cpu,
            lineTension: 0, // no curve smoothing
            pointRadius: 0,
            backgroundColor: 'rgba(24, 188, 156, 0.5)',
            borderColor: 'rgba(24, 188, 156, 0.5)',
            borderJoinStyle: 'miter',
          }]
        };
      },
      mem_chart_data() {
        return {
          labels: this.chart_times,
          datasets: [{
              label: "mem (%)",
              data: this.chart_data.mem,
              lineTension: 0, // no curve smoothing
              pointRadius: 0,
              backgroundColor: 'rgba(52, 152, 219, 0.5)',
              borderColor: 'rgba(52, 152, 219, 0.5)',
              borderJoinStyle: 'miter',
          }]
        };
      },
    }, // computed
    methods: {
      fillDummyPoints() {
        var vm = this;
        // Fill in zero values to make chart width stable.
        var now = (new Date()).getTime();
        for (var i = vm.chart_max_history; i>0; i--) {
          vm.chart_times.push(new Date(now - vm.chart_interval*i));
          vm.chart_data.cpu.push(0)
          vm.chart_data.mem.push(0)
        }
      },
      pushChartPoint: function(point) {
        var vm = this;

        // Append the data point
        var t = new Date(point.timestamp * 1000);
        vm.chart_times.push(t)

        point.stats.map(function(stat) {
          if (stat.name == 'cpu') {
            vm.chart_data.cpu.push(stat.value);
          }
          if (stat.name == 'mem') {
            vm.chart_data.mem.push(stat.value);
          }
        });

        // Pop old data
        if (vm.chart_times.length > vm.chart_max_history) {
          vm.chart_times.shift();
          vm.chart_data.cpu.shift();
          vm.chart_data.mem.shift();
        }
      },
      updateChart: function() {
        var vm = this;
        var point = null;

        axios.get('/ui/api/sys/stat')
          .then(function(resp) {
            if (resp.data.error) {
              console.log(resp.data.error);
            } else {
              vm.pushChartPoint(resp.data);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      },
    }, // methods
    mounted() {
      var vm = this;
      vm.fillDummyPoints();
      vm.chart_interval_id = window.setInterval(function() {
        vm.updateChart();
      }, vm.chart_interval)
    },
    beforeDestroy() {
      var vm = this;
      clearInterval(vm.chart_interval_id);
    },
  }
</script>

<style>
.chart-container {
  height: 15em;
}

.chart-fill {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
