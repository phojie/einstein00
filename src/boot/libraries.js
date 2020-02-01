import VueApexCharts from 'vue-apexcharts'
import InstantSearch from 'vue-instantsearch'
export default ({ Vue }) => {
  Vue.component('apexchart', VueApexCharts)
  Vue.use(InstantSearch)
}
