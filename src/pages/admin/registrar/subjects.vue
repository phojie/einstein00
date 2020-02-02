<template>
  <div>
    <div class="bg-secondary text-white">
      <!-- <q-toolbar>
        <q-btn flat round dense icon="subject" />
        <q-toolbar-title>Subjects</q-toolbar-title>
        <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar> -->
      <q-toolbar inset>
        <q-breadcrumbs style="font-size: 15px" active-color="white">
          <q-breadcrumbs-el to="/registrarSubjects" label="Home" icon="home" />
          <q-breadcrumbs-el v-if="$route.query.schoolyear" :label="`${$route.query.schoolyear}`" icon="widgets" />
          <q-breadcrumbs-el v-if="$route.query.semester === 'First Semester'" class="text-green" :label="$route.query.semester" icon="label" />
          <q-breadcrumbs-el v-else-if="$route.query.semester === 'Second Semester'" class="text-red"  :label="$route.query.semester" icon="label" />
          <q-breadcrumbs-el v-else-if="$route.query.semester === 'Third Semester'" class="text-amber" :label="$route.query.semester" icon="label" />
        </q-breadcrumbs>
    </q-toolbar>
    </div>

    <router-view></router-view>

    <div v-if="!$route.query.schoolyear && !$route.query.semester" class="q-pa-md row q-col-gutter-lg">
      <div v-for="(sy,index) in schoolYearAvailable" :key="index" class="col-md-4 col-sm-6 col-xs-12">
        <q-card >
          <q-card-section class="">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">School Year {{sy.schoolYear}} - {{syAdd(sy.schoolYear)}} </div>
                <div class="text-subtitle2">Total Subjects:
                  <q-badge :label="sy.numberSubject" />
                </div>
              </div>
              <div class="col-auto">
                <q-btn
                  color="primary"
                  round
                  flat
                  icon="more_vert"
                >
                  <q-menu auto-close>
                    <q-list>
                      <q-item clickable @click="editAct(list)">
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable @click="deleteAct(sy)">
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Archieve</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-separator inset ></q-separator>
          <q-card-section>
            <q-list>
              <q-item clickable @click="semesterGet('First Semester', sy.schoolYear)">
                <q-item-section avatar>
                  <q-icon color="green" name="label" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>First Semester</q-item-label>
                </q-item-section>

                <!-- <q-item-section side top>
                  <q-badge label="54" />
                </q-item-section> -->
              </q-item>

              <q-item clickable @click="semesterGet('Second Semester', sy.schoolYear)">
                <q-item-section avatar>
                  <q-icon color="red" name="label" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Second Semester</q-item-label>
                </q-item-section>

                <!-- <q-item-section side top>
                  <q-badge label="68" />
                </q-item-section> -->
              </q-item>

              <q-item clickable @click="semesterGet('Third Semester', sy.schoolYear)">
                <q-item-section avatar>
                  <q-icon color="amber" name="label" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Third Semester</q-item-label>
                </q-item-section>

                <!-- <q-item-section side top>
                  <q-badge label="28" />
                </q-item-section> -->
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog
      persistent
      v-model="subjectDialog.show"
      >
        <subjectsForm
          :schoolYear.sync="dataInformation.schoolYear"
          :semester.sync="dataInformation.semester"
          :courseCode.sync="dataInformation.courseCode"
          :descriptiveTitle.sync="dataInformation.descriptiveTitle"
          :units.sync="dataInformation.units"
          :day.sync="dataInformation.day"
          :room.sync="dataInformation.room"
          :timeFrom.sync="dataInformation.timeFrom"
          :timeTo.sync="dataInformation.timeTo"
          :instructor.sync="dataInformation.instructor"
          :instructorFullname.sync="dataInformation.instructor.fullname"
          :dataInformation="dataInformation"
          @clearDataInformation="clearDataInformation"
          @emitAddSubject="emitAddSubject"
          @emitUpdateSubject="emitUpdateSubject"
          :validations="$v.dataInformation"
        > </subjectsForm>
    </q-dialog>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        ref="testref"
        @click="addDialog"
        fab
        icon="add"
        color="secondary"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import add from 'lodash/add'
export default {
  validations: {
    dataInformation: {
      schoolYear: { required },
      courseCode: { required },
      semester: { required },
      descriptiveTitle: { required },
      units: { required },
      day: { required },
      room: { required },
      timeFrom: { required },
      timeTo: { required },
      instructor: {
        fullname: { required }
      }
    }
  },
  components: {
    'subjectsForm': require('components/shared/modals/subjectsForm.vue').default
  },
  data () {
    return {
      headerTitle: '',
      dataInformation: {
        schoolYear: '',
        semester: '',
        courseCode: '',
        descriptiveTitle: '',
        units: '',
        day: '',
        timeFrom: '',
        timeTo: '',
        room: '',
        instructor: {
          idNumber: null,
          fullname: null,
          department: null,
          position: null,
          keyIndex: null,
          profileImgUrl: null
        }
      }
    }
  },
  computed: {
    ...mapState('admin', ['subjectDialog']),
    ...mapGetters('admin', ['schoolYearAvailable'])
  },
  methods: {
    ...mapActions('admin', ['addSubjectSchedule', 'getSchoolYear', 'deleteSyAction']),
    ...mapMutations('admin', ['commitSubjectDialog', 'commitLoading']),
    deleteAct (data) {
      let vm = this
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete this School Year <span class="text-green text-weight-bolder">${data.schoolYear} - ${this.syAdd(data.schoolYear)}</span>, All Subjects attach will be permanently deleted  `,
        cancel: true,
        html: true
      }).onOk(() => {
        this.deleteSyAction(data).then(function (result) {
          vm.$q.notify({
            message: 'Successfully Deleted ' + data.schoolYear,
            color: 'negative',
            timeout: 4000,
            icon: 'delete_sweep'
          })
        }, function (error) {
          console.log(error)
          vm.$q.notify({
            message: 'Something is wrong, refresh the page or contact the system administrator',
            color: 'warning',
            timeout: 2000,
            icon: 'warning'
          })
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    syAdd (data) {
      return add(parseInt(data), 1)
    },
    schoolYearData () {
      let vm = this
      this.commitLoading(true)
      this.getSchoolYear().then(function (result) {
        vm.commitLoading(false)
      }, function (error) {
        console.log(error)
        vm.$q.notify({
          message: 'Something is wrong try to reload the page',
          color: 'warning',
          timeout: 2000,
          icon: 'warning'
        })
      })
    },
    emitAddSubject () {
      let vm = this
      if (this.$v.dataInformation.$invalid) {
        this.$v.dataInformation.$touch()
      } else {
        this.addSubjectSchedule(this.dataInformation).then(function (result) {
          // var fullname = `${vm.studentInformationForm.firstname} ${vm.studentInformationForm.middlename.charAt(0)}. ${vm.studentInformationForm.surname}`
          vm.$q.notify({
            message: 'Successfully Added a Subject',
            color: 'primary',
            timeout: 4000,
            icon: 'book'
          })
          vm.dataInformation = {
            schoolYear: result.schoolYear,
            semester: result.semester,
            courseCode: '',
            descriptiveTitle: '',
            units: '',
            day: '',
            timeFrom: '',
            timeTo: '',
            room: '',
            instructor: {
              idNumber: null,
              fullname: null,
              department: null,
              position: null,
              keyIndex: null,
              profileImgUrl: null
            }
          }
          vm.$v.dataInformation.$reset()
          // vm.$nextTick(() => vm.$subjectsForm.schoolYearRef.focus())
        }, function (error) {
          console.log(error)
          vm.$q.notify({
            message: 'Something is wrong',
            color: 'warning',
            timeout: 2000,
            icon: 'warning'
          })
        })
      }
    },
    emitUpdateSubject () {
      alert('update')
    },
    clearDataInformation () {
      this.dataInformation = {
        schoolYear: '',
        semester: '',
        courseCode: '',
        descriptiveTitle: '',
        units: '',
        day: '',
        timeFrom: '',
        timeTo: '',
        room: '',
        instructor: {
          idNumber: null,
          fullname: null,
          department: null,
          position: null,
          keyIndex: null,
          profileImgUrl: null
        }
      }
    },
    printStudents () {
      alert('printed')
    },
    addDialog () {
      this.commitSubjectDialog({
        'headerTitle': 'Add',
        'show': true,
        'data': []
      })
    },
    test () {
      alert('test')
    },
    semesterGet (semester, schoolyear) {
      this.$router.push({ path: '/schoolyear', query: { schoolyear: schoolyear, semester: semester } })
    }
  },
  created () {
    this.schoolYearData()
  }
}
</script>

<style scoped>
.my-content{
  padding: 10px 15px;
  background: rgba(86,61,124,.15);
  border: 1px solid rgba(86,61,124,.2);
}
</style>
