<template>
  <div>
     <q-table
      card-style="overflow:auto !important"
      :loading="loading"
      :fullscreen.sync="isFullscreen"
      class="text-blue-grey-9 q-pb-xl"
      :data="listofCatalog"
      :columns="columns"
      :filter="filter"
      row-key="keyIndex"
      no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
      :visible-columns="visibleColumns"
      :hide-bottom="hidebottom"
      :pagination.sync="pagination"
    >
      <template v-slot:top="props">
        <div class="text-h4 text-bold">Library Catalog</div>
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
      </template>

      <template v-slot:body="props">
        <q-tr
          :props="props"
          class="text-capitalize"
        >
          <q-td
            class="text-bold"
            key="index"
            :props="props"
          >
            {{ props.row.index+1 }}.
          </q-td>
          <q-td
            key="accessionNumber"
            :props="props"
          >
            <q-chip size="11px"  >
              <q-avatar icon="bookmark" color="red" text-color="white" />
              {{numberCopies(props.row.accessionNumber)}}
            </q-chip>
            <span v-for="(accession, index) in props.row.accessionNumber" :key="index">
              {{accession}},
            </span>

          </q-td>
          <q-td
            key="title"
            :props="props"
          >
            {{ props.row.title }}
          </q-td>
          <q-td
            key="author"
            :props="props"
          >
            {{ props.row.author }}
          </q-td>
          <q-td
            key="callNumber"
            :props="props"
          >
            {{ props.row.callNumber }}
          </q-td>
          <q-td
            key="subLocation"
            :props="props"
          >
            {{ props.row.sublocation }}
          </q-td>
          <q-td
            key="isbn"
            :props="props"
          >
            {{ props.row.isbn }}
          </q-td>
          <q-td
            key="published"
            :props="props"
          >
            {{ props.row.published }}
          </q-td>
          <q-td
            key="type"
            :props="props"
          >
            {{ props.row.type }}
          </q-td>

           <q-td
            key="action"
            :props="props"
          >
            <div class="text-blue-grey-6 full-width row wrap justify-center content-start">
              <q-avatar
                flat
                class="cursor-pointer viewActiveHover"
                v-ripple
                round
                size="md"
                icon="remove_red_eye"
                @click="viewCatalog(props.row)"
              >
                <q-tooltip>
                  View {{ props.row.title }} Information
                </q-tooltip>
              </q-avatar>
            </div>
          </q-td>

        </q-tr>
      </template>
     </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import filter from 'lodash/filter'
export default {
  data () {
    return {
      filter: '',
      isFullscreen: false,
      visibleColumns: ['index', 'accessionNumber', 'title', 'author', 'subLocation', 'action'],
      columns: [
        {
          classes: 'bg-grey-2',
          name: 'index',
          label: '#',
          field: 'index',
          sortable: true
        },
        {
          classes: 'bg-grey-2 ',
          name: 'accessionNumber',
          label: 'Accession',
          align: 'left',
          field: 'accessionNumber',
          sortable: true
        },
        {
          classes: 'bg-grey-2 ',
          name: 'title',
          label: 'Title',
          align: 'left',
          field: 'title'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'author',
          label: 'Author',
          align: 'left',
          field: 'author'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'callNumber',
          label: 'Call#',
          align: 'left',
          field: 'callNumber'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'subLocation',
          label: 'Sublocation',
          align: 'left',
          field: 'subLocation'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'isbn',
          label: 'ISBN',
          align: 'left',
          field: 'isbn'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'published',
          label: 'Published',
          align: 'left',
          field: 'published'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type'
        },
        {
          classes: 'bg-grey-2 ',
          name: 'action',
          label: 'Action',
          align: 'left',
          field: 'action'
        }
      ],
      hidebottom: false,
      pagination: {
        rowsPerPage: 6, // current rows per page being displayed
        recentRowsPerPage: 0
      }

    }
  },
  computed: {
    ...mapGetters('admin', ['loading', 'listofCatalog'])
  },
  methods: {
    ...mapActions('admin', ['SubjectDialogAction']),
    viewCatalog (data) {
      this.SubjectDialogAction({
        'headerTitle': 'Update',
        'show': true,
        'data': data
      })
    },
    numberCopies (data) {
      let count = filter(data)
      return count.length
    },
    printStudents () {
      alert('test')
    }
  }
}
</script>
