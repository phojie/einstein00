<template>
  <div class="q-pa-md">
    <subjectsTable @editInfo="editInfo" :visibleColumnsData="visibleColumns" :data="allData" :columns="columns">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        Subjects Information
      </template>
    </subjectsTable>

  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'
import filter from 'lodash/filter'
export default {
  components: {
    'subjectsTable': require('components/table/subjectsTable.vue').default
  },
  data () {
    return {
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
      ]
    }
  },
  computed: {
    ...mapGetters('admin', ['subjectsSchedule']),
    ...mapState('admin', ['allSubjects']),
    allData () {
      let onlyThis = filter(this.allSubjects, { 'schoolYear': this.$route.query.schoolyear, 'semester': this.$route.query.semester })
      onlyThis.forEach((row, index) => {
        row.index = index
      })
      return onlyThis
    }
  },
  methods: {
    ...mapActions('admin', ['getSubjectSchedule']),
    ...mapMutations('admin', ['commitSubjectDialog', 'commitLoading']),
    getSubjectsInformation () {
      let vm = this
      let tableData = {
        semester: this.$route.query.semester,
        year: this.$route.query.schoolyear
      }
      this.commitLoading(true)
      this.getSubjectSchedule(tableData).then(function (result) {
        console.log('yap')
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
    editInfo (data) {
      this.commitSubjectDialog({
        'show': true,
        'data': data,
        'headerTitle': 'Update'
      })
    }
  }

}
</script>
