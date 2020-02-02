<template>
  <div>
    <apexchart type="line" height="250" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data () {
    return {
      series: [{
        name: 'Desktops',
        data: [949, 1200, 700]
      }],
      chartOptions: {
        chart: {
          height: 250,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            '2017', '2018', '2019'
          ]
        }
      }

    }
  }
}
</script>
