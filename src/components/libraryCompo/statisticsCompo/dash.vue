<template>
  <div class="">
    <q-card
      flat
      class="text-blue-grey-9 row wrap"
    >
      <q-card-section>
        <div class="text-h4 text-bold"><slot></slot></div>
      </q-card-section>
      <q-card-section class="col-12">
        <apexchart
          v-if="libraryStat.length!==0"
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { fireDB } from 'boot/firebase'
import { date } from 'quasar'
// import forEach from 'lodash/forEach'
export default {
  data () {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        colors: ['#2196f3', '#4caf50', '#ffc107', '#673ab7'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '90%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            if (val) {
              return val
            } else {
              return ''
            }
          },
          offsetX: 10,
          style: {
            fontWeight: 'bold',
            fontSize: '12px',
            colors: ['#3a373700']
          }
        },
        stroke: {
          show: false,
          width: 20,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          title: {
            text: '# (Visitors)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' Visitors'
              // return '$ ' + val + ' thousands'
            }
          }
        }
      },
      series: [{
        name: 'Education',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 196, 0]
      }, {
        name: 'Computer Science',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 70, 0]
      }, {
        name: 'Business Administration',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 160, 0]
      },
      {
        name: 'Criminology',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 140, 180, 0]
      }]
    }
  },
  computed: {
    ...mapGetters('admin', ['libraryStat', 'studentLists2']),
    ...mapState('admin', ['studentLists'])
  },
  methods: {
    commitStatisticsBarLive (data) {
      let formattedString = date.formatDate(data.local, 'MM')

      if (data.course === 'Secondary education' || data.course === 'Elementary education') {
        if (formattedString === '01') {
          this.series[0].data[0] += 1
        } else if (formattedString === '02') {
          this.series[0].data[1] += 1
        } else if (formattedString === '03') {
          this.series[0].data[2] += 1
        } else if (formattedString === '04') {
          this.series[0].data[3] += 1
        } else if (formattedString === '05') {
          this.series[0].data[4] += 1
        } else if (formattedString === '06') {
          this.series[0].data[5] += 1
        } else if (formattedString === '07') {
          this.series[0].data[6] += 1
        } else if (formattedString === '08') {
          this.series[0].data[7] += 1
        } else if (formattedString === '09') {
          this.series[0].data[8] += 1
        } else if (formattedString === '10') {
          this.series[0].data[9] += 1
        } else if (formattedString === '11') {
          this.series[0].data[10] += 1
        } else if (formattedString === '12') {
          this.series[0].data[11] += 1
        }
      } else if (data.course === 'Computer science') {
        if (formattedString === '01') {
          this.series[1].data[0] += 1
        } else if (formattedString === '02') {
          this.series[1].data[1] += 1
        } else if (formattedString === '03') {
          this.series[1].data[2] += 1
        } else if (formattedString === '04') {
          this.series[1].data[3] += 1
        } else if (formattedString === '05') {
          this.series[1].data[4] += 1
        } else if (formattedString === '06') {
          this.series[1].data[5] += 1
        } else if (formattedString === '07') {
          this.series[1].data[6] += 1
        } else if (formattedString === '08') {
          this.series[1].data[7] += 1
        } else if (formattedString === '09') {
          this.series[1].data[8] += 1
        } else if (formattedString === '10') {
          this.series[1].data[9] += 1
        } else if (formattedString === '11') {
          this.series[1].data[10] += 1
        } else if (formattedString === '12') {
          this.series[1].data[11] += 1
        }
      } else if (data.course === 'Business administration') {
        if (formattedString === '01') {
          this.series[2].data[0] += 1
        } else if (formattedString === '02') {
          this.series[2].data[1] += 1
        } else if (formattedString === '03') {
          this.series[2].data[2] += 1
        } else if (formattedString === '04') {
          this.series[2].data[3] += 1
        } else if (formattedString === '05') {
          this.series[2].data[4] += 1
        } else if (formattedString === '06') {
          this.series[2].data[5] += 1
        } else if (formattedString === '07') {
          this.series[2].data[6] += 1
        } else if (formattedString === '08') {
          this.series[2].data[7] += 1
        } else if (formattedString === '09') {
          this.series[2].data[8] += 1
        } else if (formattedString === '10') {
          this.series[2].data[9] += 1
        } else if (formattedString === '11') {
          this.series[2].data[10] += 1
        } else if (formattedString === '12') {
          this.series[2].data[11] += 1
        }
      } else if (data.course === 'Criminology') {
        if (formattedString === '01') {
          this.series[3].data[0] += 1
        } else if (formattedString === '02') {
          this.series[3].data[1] += 1
        } else if (formattedString === '03') {
          this.series[3].data[2] += 1
        } else if (formattedString === '04') {
          this.series[3].data[3] += 1
        } else if (formattedString === '05') {
          this.series[3].data[4] += 1
        } else if (formattedString === '06') {
          this.series[3].data[5] += 1
        } else if (formattedString === '07') {
          this.series[3].data[6] += 1
        } else if (formattedString === '08') {
          this.series[3].data[7] += 1
        } else if (formattedString === '09') {
          this.series[3].data[8] += 1
        } else if (formattedString === '10') {
          this.series[3].data[9] += 1
        } else if (formattedString === '11') {
          this.series[3].data[10] += 1
        } else if (formattedString === '12') {
          this.series[3].data[11] += 1
        }
      }

      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        }
      }
    },
    libraryBarLive (payload) {
      var myData = this.studentLists[payload.information.idnumber]
      var data = {
        createdIndex: payload.information.keyIndex,
        date: payload.information.created.date,
        local: payload.information.created.local,
        time: payload.information.created.time,
        course: myData.course,
        firstname: myData.firstname,
        idnumber: myData.idnumber,
        keyIndex: myData.keyIndex,
        middlename: myData.middlename,
        profileImgUrl: myData.profileImgUrl,
        surname: myData.surname,
        fullname: myData.fullname
      }
      // console.log(data)
      this.commitStatisticsBarLive(data)
    },
    getLibraryStatLIVE () {
      let vm = this
      return new Promise(function (resolve, reject) {
        // fireDB.collection('studentLists').onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        fireDB
          .collection('Library/uyM3J8XUI1aI4dDm0reC/Statisticshay')
          .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(
              function (change) {
                if (change.type === 'added' || change.type === 'modified') {
                  // console.log(change.doc.data())
                  if (change.doc.data().keyIndex) {
                    const data = {
                      id: change.doc.data().keyIndex,
                      information: change.doc.data()
                    }
                    vm.libraryBarLive(data)
                    // dispatch('dispatchBarLive', data)
                  }
                }
                if (change.type === 'modified') {
                  console.log('modified console')
                }
                if (change.type === 'removed') {
                  // commit(
                  //   'commitDeleteLibraryStat',
                  //   change.doc.data().keyIndex
                  // )
                  console.log('Removed city: ', change.doc.data())
                  // context.commit('commitDeleteStudentLists', change.doc.data())
                }
              },
              function (error) {
                // The Promise was rejected.
                reject()
                console.error(error)
              }
            )
          })
      })
    }
  },
  mounted () {
    this.getLibraryStatLIVE()
  }

}
</script>
