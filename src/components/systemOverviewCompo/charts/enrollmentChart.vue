<template>
  <div>
     <apexchart type="bar" height="250" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data () {
    return {
      series: [{
        data: [43, 146, 269, 241]
      }],
      chartOptions: {
        colors: ['#4caf50', '#2196f3', '#ffc107', '#673ab7'],
        chart: {
          type: 'bar',
          height: 250,
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        plotOptions: {
          bar: {
            columnHeight: '14%',
            distributed: true,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['Computer', 'Science'],
            ['Education', ''],
            ['Business', 'Administration'],
            ['Criminology', '']
          ],
          labels: {
            style: {
              fontSize: '0px'
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
