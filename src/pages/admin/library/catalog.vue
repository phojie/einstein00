<template>
  <q-page class="q-pa-md-md">
    <catalogTable></catalogTable>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        ref="testref"
        @click="addCatalog()"
        fab
        icon="add"
        color="secondary"
      />
    </q-page-sticky>
     <q-dialog
      persistent
      v-model="subjectDialog.show"
      @before-show="getSubData"
      >
        <catalogForm
          ref="catalogForm"
          @emitAddCatalog="emitAddCatalog"
          @emitDeleteCatalog="emitDeleteCatalog"
          @emitUpdateCatalog="emitUpdateCatalog"
          :catalogInfo="catalogInfo"
          @added="addedPicture"
          :validations="$v.catalogInfo"
          :accessionNumber.sync="catalogInfo.accessionNumber"
          :title.sync="catalogInfo.title"
          :author.sync="catalogInfo.author"
          :type.sync="catalogInfo.type"
          :callNumber.sync="catalogInfo.callNumber"
          :sublocation.sync="catalogInfo.sublocation"
          :isbn.sync="catalogInfo.isbn"
          :editedBy.sync="catalogInfo.editedBy"
          :published.sync="catalogInfo.published"
          :copyright.sync="catalogInfo.copyright"
          :format.sync="catalogInfo.format"
          :contentTypeTerm.sync="catalogInfo.contentTypeTerm"
          :carrierTypeTerm.sync="catalogInfo.carrierTypeTerm"
          :additionalInfo.sync="catalogInfo.additionalInfo"
          :catalogInfoUpdate.sync="catalogInfo"
          :loading="loading"
        ></catalogForm>
     </q-dialog>
  </q-page>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
export default {
  validations: {
    catalogInfo: {
      accessionNumber: { required },
      title: { required },
      author: { required },
      type: { required },
      callNumber: { required },
      sublocation: { required },
      isbn: { required },
      published: { required },
      copyright: { required }
    }
  },
  components: {
    'catalogTable': require('components/libraryCompo/table/catalogTable.vue').default,
    'catalogForm': require('components/shared/modals/catalogForm.vue').default
  },

  computed: {
    ...mapGetters('admin', ['loading']),
    ...mapState('admin', ['subjectDialog'])
  },
  data () {
    return {
      imgData: null,
      catalogInfo: {
        imgUrl: null,
        accessionNumber: null,
        title: '',
        author: '',
        type: '',
        callNumber: '',
        sublocation: '',
        isbn: '',
        editedBy: '',
        published: '',
        copyright: '',
        format: '',
        contentTypeTerm: '',
        carrierTypeTerm: '',
        additionalInfo: null,
        keyIndex: ''
      },
      dummycatalogInfo: {
        imgUrl: null,
        accessionNumber: null,
        title: '',
        author: '',
        type: '',
        callNumber: '',
        sublocation: '',
        isbn: '',
        editedBy: '',
        published: '',
        copyright: '',
        format: '',
        contentTypeTerm: '',
        carrierTypeTerm: '',
        additionalInfo: null,
        keyIndex: ''
      }
    }
  },
  methods: {
    ...mapActions('admin', ['addCatalogAction', 'getAllCatalogAction', 'updateCatalogAction', 'deleteCatalogAction']),
    ...mapMutations('admin', ['commitSubjectDialog', 'commitLoading']),
    getAllCatalog () {
      let vm = this
      this.commitLoading(true)
      this.getAllCatalogAction().then(function () {
        vm.commitLoading(false)
      })
    },
    getSubData () {
      let lord = this.subjectDialog.data
      this.catalogInfo = {
        imgUrl: lord.imgUrl,
        accessionNumber: lord.accessionNumber,
        title: lord.title,
        author: lord.author,
        type: lord.type,
        callNumber: lord.callNumber,
        sublocation: lord.sublocation,
        isbn: lord.isbn,
        editedBy: lord.editedBy,
        published: lord.published,
        copyright: lord.copyright,
        format: lord.format,
        contentTypeTerm: lord.contentTypeTerm,
        carrierTypeTerm: lord.carrierTypeTerm,
        additionalInfo: lord.additionalInfo,
        keyIndex: lord.keyIndex
      }

      this.dummycatalogInfo = {
        imgUrl: lord.imgUrl,
        accessionNumber: lord.accessionNumber,
        title: lord.title,
        author: lord.author,
        type: lord.type,
        callNumber: lord.callNumber,
        sublocation: lord.sublocation,
        isbn: lord.isbn,
        editedBy: lord.editedBy,
        published: lord.published,
        copyright: lord.copyright,
        format: lord.format,
        contentTypeTerm: lord.contentTypeTerm,
        carrierTypeTerm: lord.carrierTypeTerm,
        additionalInfo: lord.additionalInfo,
        keyIndex: lord.keyIndex
      }
    },
    emitDeleteCatalog (data) {
      let vm = this
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete <span class="text-green text-weight-bolder">${this.catalogInfo.title}</span> w/ and accession number of <span class="text-weight-bolder text-green">${this.catalogInfo.accessionNumber}</span> `,
        cancel: true,
        html: true
      }).onOk(() => {
        this.deleteCatalogAction(this.catalogInfo.keyIndex).then(function (result) {
          vm.$q.notify({
            message: 'Successfully Deleted ' + vm.catalogInfo.title,
            color: 'negative',
            timeout: 4000,
            icon: 'delete_sweep'
          })
          vm.commitSubjectDialog({
            'headerTitle': '',
            'show': false,
            'data': []
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
    emitUpdateCatalog (data) {
      let vm = this
      if (this.$v.catalogInfo.$invalid) {
        this.$v.catalogInfo.$touch()
      } else {
        this.updateCatalogAction({
          data: this.catalogInfo,
          dummyData: this.dummycatalogInfo
        }).then(function (result) {
          vm.$q.notify({
            message: 'Successfully updated ',
            color: 'positive',
            timeout: 4000,
            icon: 'book'
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
      }
    },
    emitAddCatalog () {
      let vm = this
      if (this.$v.catalogInfo.$invalid) {
        this.$v.catalogInfo.$touch()
      } else {
        this.addCatalogAction(this.catalogInfo).then(function (result) {
          vm.$q.notify({
            message: 'Successfully added ',
            color: 'positive',
            timeout: 4000,
            icon: 'playlist_add'
          })
          vm.$v.catalogInfo.$reset()
          vm.clearCatalogForm()
          vm.$refs.catalogForm.$refs.refAccession.focus()
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
    clearCatalogForm () {
      this.catalogInfo = {
        imgUrl: '',
        accessionNumber: null,
        title: '',
        author: '',
        type: '',
        callNumber: '',
        sublocation: '',
        isbn: '',
        editedBy: '',
        published: '',
        copyright: '',
        format: '',
        contentTypeTerm: '',
        carrierTypeTerm: '',
        additionalInfo: null
      }
    },
    addedPicture (data) {
      console.log(data)
      let imgData = data[0].__img['src']
      this.catalogInfo.imgUrl = imgData
    },
    addCatalog () {
      this.commitSubjectDialog({
        'headerTitle': 'Add',
        'show': true,
        'data': {
          imgUrl: '',
          accessionNumber: null,
          title: '',
          author: '',
          type: '',
          callNumber: '',
          sublocation: '',
          isbn: '',
          editedBy: '',
          published: '',
          copyright: '',
          format: '',
          contentTypeTerm: '',
          carrierTypeTerm: '',
          additionalInfo: null
        }
      })
    }
  },
  mounted () {
    this.getAllCatalog()
  }
}
</script>
