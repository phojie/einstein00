<template>
  <div class="q-mt-sm">
    <subjectsTable :visibleColumnsData="visibleColumns" :data="allData" :columns="columns">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <span class="text-h6">Subjects Enrolled</span>
      </template>
      <template v-slot:addSubjectBtn>
        <!-- The code below goes into the header slot -->
        <q-btn
          size="small"
          outline
          label="Add Subject"
          color="secondary">
        </q-btn>
      </template>
    </subjectsTable>

    <q-dialog v-model="searchSubject" seamless position="top">
      <q-card class="full-width">
         <q-select
          ref="selectRef"
          autofocus=""
          filled
          v-model="model"
          use-input
          hide-selected
          fill-input
          label="Search Subject"
          input-debounce="0"
          :options="subjectOption"
          @filter="filterFn"
          style="width: 100%"
         >
          <template v-slot:option="options">
            <q-item
              clickable
              v-if="tryHay(options.opt)"
              @click="addtoClassList(options.opt)"
              v-ripple
            >
              <q-item-section
                avatar
                top
              >
                <q-avatar
                  color="primary"
                  text-color="white"
                  square
                >
                  <span
                  style="font-size:13px"
                  >
                    MTH
                  </span>
                  <!-- {{options.opt.day}} -->
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-capitalize">
                <q-item-label>{{options.opt.descriptiveTitle}} </q-item-label>
                <q-item-label caption>{{options.opt.courseCode}} / {{options.opt.timeFrom}} - {{options.opt.timeFrom}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge outline class="text-green">
                  Room: {{options.opt.room}}
                </q-badge>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'
import filter from 'lodash/filter'
import axios from 'axios'
export default {
  components: {
    'subjectsTable': require('components/table/subjectsTable.vue').default
  },
  data () {
    return {
      model: false,
      searchSubject: true,
      editDialog: false,
      headerTitle: '',
      visibleColumns: ['index', 'coursecode', 'descriptivetitle', 'units', 'day', 'time', 'room', 'instructor'],
      data: [
        {
          keyIndex: '1',
          courseCode: 'CS2885',
          descriptiveTitle: 'Object Oriented Programmming',
          units: '3',
          day: 'MTH',
          time: '7:30 - 9:00',
          room: 'Computer Lab',
          instructor: 'Mr. Renyl Phojie Briones Rengel'
        }
      ],
      columns: [
        {
          classes: 'bg-grey-2 ',
          name: 'index',
          label: '#',
          field: 'index'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'coursecode',
          label: 'Course Code',
          align: 'left',
          field: 'courseCode'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'descriptivetitle',
          label: 'Descriptive Title',
          align: 'left',
          field: 'descriptiveTitle'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'units',
          label: 'Units',
          align: 'left',
          field: 'units'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'day',
          label: 'Day',
          align: 'left',
          field: 'day'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'time',
          label: 'Time',
          align: 'left',
          field: 'timeFrom'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'room',
          label: 'Room',
          align: 'left',
          field: 'room'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'instructor',
          label: 'Instructor',
          align: 'left',
          field: 'instructor'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'keyIndex',
          label: 'Action',
          align: 'center',
          field: 'timeTo'
        }
      ],
      subjectOption: []
    }
  },
  computed: {
    ...mapGetters('admin', ['subjectsSchedule', 'allSubjects']),
    ...mapState('admin', ['']),
    allData () {
      let onlyThis = filter(this.allSubjects, { 'schoolYear': this.$route.query.schoolyear, 'semester': this.$route.query.semester })
      onlyThis.forEach((row, index) => {
        row.index = index
      })
      return onlyThis
    }
  },
  methods: {
    ...mapActions('admin', ['getSchoolYear']),
    ...mapMutations('admin', ['commitSubjectDialog', 'commitLoading']),
    addtoClassList (payload) {
      console.log(payload)
      // instructorId: { stringValue: 'test' },
      //       keyIndex: { stringValue: 'test' },
      //       studentIndex: { stringValue: 'test' },
      //       prelim: { stringValue: null },
      //       midterm: { stringValue: null },
      //       semi: { stringValue: null },
      //       final: { stringValue: null },
      //       rounded: { stringValue: null },
      //       remarks: { stringValue: null }
      axios.post('https://firestore.googleapis.com/v1/projects/grading-system-54611/databases/(default)/documents/studentSubject',
        {
          fields: {
            classId: { stringValue: 'test' },
            keyIndex: { stringValue: 'test' },
            studentIndex: { stringValue: 'test' },
            instructorId: { stringValue: 'test' },
            prelim: { nullValue: null },
            midterm: { nullValue: null },
            semi: { nullValue: null },
            final: { nullValue: null },
            rounded: { nullValue: null },
            remarks: { nullValue: null }
          }
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tryHay (data) {
      // let naaBayawa = find(this.myClassLists, ['studentIndex', data.keyIndex])
      // if (naaBayawa) {
      //   return false
      // } else {
      //   return true
      // }
      return true
    },
    filterFn (val, update, abort) {
      console.log('test', this.allSubjects)
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.subjectOption = this.allSubjects
          } else {
            const needle = val.toLowerCase()
            let courseCode = this.allSubjects.filter(v => v.courseCode.toLowerCase().indexOf(needle) > -1)
            let descriptiveTitle = this.allSubjects.filter(v => v.descriptiveTitle.toLowerCase().indexOf(needle) > -1)
            let day = this.personnelLists.filter(v => v.day.toLowerCase().indexOf(needle) > -1)
            let myData = courseCode.concat(descriptiveTitle, day)
            this.subjectOption = myData
          }
        })
      }, 300)
    }
  },
  created () {
    this.getSchoolYear()
  }

}
</script>
