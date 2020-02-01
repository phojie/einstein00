<template>
  <q-table
    card-style="overflow:auto !important"
    :loading="loading"
    :fullscreen.sync="isFullscreen"
    class="text-blue-grey-9 q-pb-xl"
    :data="data"
    :columns="columns"
    :filter="filter"
    row-key="keyIndex"
    no-data-label="I didn't find anything for you"
    no-results-label="The filter didn't uncover any results"
    :visible-columns="visibleColumns"
    :hide-bottom="hidebottom"
    :pagination.sync="pagination"
    table-class="text-bold"
  >
    <template v-slot:top="props">
      <div class="text-h4 text-bold">
        <slot name="header"></slot>
      </div>
      <q-space />

      <q-input
        dense
        clearable
        debounce="300"
        v-model="filter"
        placeholder="Search"
        class="print-hide q-mr-md-lg text-body1"
      >
        <q-icon
          slot="append"
          name="search"
        />
      </q-input>

      <q-select
        class="print-hide"
        v-model="visibleColumns"
        multiple
        dense
        outlined=""
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="columns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-avatar
        icon="print"
        class="print-hide q-ml-md-md cursor-pointer"
        @click="printStudents"
      >
        <q-tooltip>
          Print
        </q-tooltip>
      </q-avatar>

      <q-avatar
        size="55px"
        @click="props.toggleFullscreen"
        flat
        round
        class="cursor-pointer print-hide"
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
      >
        <q-tooltip>
          <span v-if="!props.inFullscreen">Fullscreen</span>
          <span v-else>Exit Fullscreen</span>
        </q-tooltip>
      </q-avatar>

      <slot name="addSubjectBtn"></slot>

    </template>

    <template v-slot:body="props">
      <q-tr
        :props="props"
        class="text-capitalize"
      >
        <q-td
          key="index"
          :props="props"
        >
         {{props.row.index + 1}}.
        </q-td>
        <q-td
          key="coursecode"
          :props="props"
        >
          {{props.row.courseCode}}
        </q-td>
        <q-td
          key="descriptivetitle"
          :props="props"
        >
          {{props.row.descriptiveTitle}}
        </q-td>
        <q-td
          key="units"
          :props="props"
        >
          {{props.row.units}}
        </q-td>
        <q-td
          key="day"
          :props="props"
        >
          {{props.row.day}}
        </q-td>
        <q-td
          key="time"
          :props="props"
        >
          {{props.row.timeFrom}} - {{props.row.timeTo}}
        </q-td>
        <q-td
          key="room"
          :props="props"
        >
          {{props.row.room}}
        </q-td>
        <q-td
          key="instructor"
          :props="props"
        >
          {{getInstructorName(props.row.instructorKeyIndex)}}
        </q-td>

        <q-td
          key="keyIndex"
          :props="props"
          >
          <div class="text-blue-grey-6 full-width row wrap justify-center content-start">
            <q-avatar
              flat
              class="cursor-pointer viewActiveHover"
              v-ripple
              round
              size="lg"
              icon="info"
            >
              <q-tooltip>
                View {{ props.row.courseCode }}'s Information
              </q-tooltip>
            </q-avatar>

            <q-separator
              class="q-mx-xs"
              inset
              vertical
            />

            <q-avatar
              flat
              @click="$emit('editInfo', props.row)"
              class="cursor-pointer editActiveHover"
              v-ripple
              round
              size="lg"
              icon="edit"
            >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-avatar>

            <q-separator
              class="q-mx-xs"
              inset
              vertical
            />

            <q-avatar
              flat
              class="cursor-pointer deleteActiveHover"
              v-ripple
              round
              size="lg"
              icon="delete"
            >
              <q-tooltip>
                Delete
              </q-tooltip>
            </q-avatar>
          </div>
        </q-td>
      </q-tr>
    </template>
</q-table>
</template>

<script>
import { mapGetters } from 'vuex'
import find from 'lodash/find'
export default {
  props: ['columns', 'data', 'visibleColumnsData'],
  data () {
    return {
      isFullscreen: false,
      hidebottom: false,
      pagination: {
        rowsPerPage: 6, // current rows per page being displayed
        recentRowsPerPage: 0
      },
      filter: '',
      visibleColumns: []
    }
  },
  computed: {
    ...mapGetters('admin', ['loading', 'personnelLists'])
  },
  methods: {
    getInstructorName (index) {
      let data = find(this.personnelLists, ['keyIndex', index])
      return `${data.prefix} ${data.firstname} ${data.middlename} ${data.surname} ${data.suffix} `
    },
    printStudents () {
      alert('test')
    }
  },
  created () {
    this.visibleColumns = this.visibleColumnsData
  }
}
</script>
