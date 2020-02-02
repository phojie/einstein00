<template>
  <div>
    <section class="bg-primary" style="height:350px">
      <div class="q-pa-md-xl q-pa-xs-md">
        <div class="text-h5 text-white text-weight-bold ellipsis">
          <q-avatar>
            <img src="/statics/jieIcons/apple-touch-icon-180x180.png" alt="">
          </q-avatar>
          Christ the King College De Maranding INC.
          <q-badge outline align="top" color="blue-grey-1">Beta Mode</q-badge>
        </div>
      </div>
    </section>

    <div style="margin-top:-210px" class="q-px-md-xl q-px-sm-xl q-px-xs-md row justify-center q-col-gutter-md">
      <div class="col-xs-12">
        <span style="font-size:20px" class="text-blue-2">Develop</span>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-card>
          <q-card-section >
            <div class="row items-center no-wrap">
              <div class="text-grey-6 col">
                <q-btn :ripple="false" class="text-grey-7" dense no-caps flat >
                  <q-icon name="bar_chart" />
                  College Enrollment Chart (First Semester)
                </q-btn>
              </div>

              <div class="col-auto">
                <q-btn dense no-caps flat color="primary" label="SY: 2019 - 2020">
                  <q-icon name="keyboard_arrow_down" />
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section>2019 - 2020</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu anchor="top right" self="top left">
                          <q-list>
                            <q-item
                              v-for="n in 3"
                              :key="n"
                              dense
                              clickable
                            >
                              <q-item-section>{{n}} Semester</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-item>
                      <q-separator />
                      <q-item clickable>
                        <q-item-section>2020 - 2021</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu anchor="top right" self="top left">
                          <q-list>
                            <q-item
                              v-for="n in 3"
                              :key="n"
                              dense
                              clickable
                            >
                              <q-item-section>{{n}} Semester</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-item>
                      <q-separator />
                      <q-item clickable v-close-popup>
                        <q-item-section>Close</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section >
            <enrollmentChart></enrollmentChart>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-card>
          <q-card-section >
            <div class="row items-center no-wrap">
              <div class="text-grey-6 col">
                <q-btn :ripple="false" class="text-grey-7" dense no-caps flat >
                  <q-icon name="show_chart" />
                    No students per school year Chart
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col-12">
              <enrollmentSYChart></enrollmentSYChart>
            </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- <dashStatistics>Library Statistics</dashStatistics> -->
  </div>

</template>

<script>
export default {
  components: {
    'enrollmentChart': require('components/systemOverviewCompo/charts/enrollmentChart.vue').default,
    'enrollmentSYChart': require('components/systemOverviewCompo/charts/enrollmentSYChart.vue').default
  // 'dashStatistics': require('components/libraryCompo/statisticsCompo/dash.vue').default
  }
}
</script>
