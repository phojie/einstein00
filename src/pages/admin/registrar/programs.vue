<template>
  <div class="q-pa-md">
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        ref="testref"
        @click="addProgramDialog"
        fab
        icon="add"
        color="secondary"
      />
    </q-page-sticky>

    <q-dialog
      v-model="programDialog"
      >
        <programsForm > {{headerTitle}} </programsForm>
    </q-dialog>

  </div>
</template>

<script>
export default {
  components: {
    'programsForm': require('components/shared/modals/programsForm.vue').default
  },
  data () {
    return {
      programDialog: false,
      headerTitle: ''
    }
  },
  methods: {
    printStudents () {
      alert('printed')
    },
    addProgramDialog () {
      this.programDialog = true
      this.headerTitle = 'Add'
    }
  }
}
</script>
