<template>
  <q-card style="width: 1000px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">
        {{subjectDialog.headerTitle}} Catalog
      </div>
      <q-space />
      <q-btn
        icon="close"
        flat
        round
        size="md"
        class="text-negative"
        @click="closeDialog"
      />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row q-col-gutter-md">
        <div class="col-md-3 col-xs-12">
          <q-uploader
            ref="refUploaderImage"
            label="Image"
            flat
            class="full-width uploaderBug"
            hide-upload-btn
            bordered
            accept="image/*"
            v-on:added="$emit('added', $event)"
          >
            <template v-slot:list>
              <q-img
                :src="catalogInfo.imgUrl"
                class="q-mt-md"
                placeholder-src="/statics/default_profile_400x400.png"
              />
            </template>
          </q-uploader>
        </div>
        <div class="col-md-9 col-xs-12 q-gutter-y-md">
          <div class="col-12">
            <div class="q-col-gutter-md row col-12">
               <q-select
                autofocus
                label="Accession Number"
                outlined
                dense
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add"
                class="text-capitalize col-md-5 col-sm-6 col-xs-12"
                :value="catalogInfo.accessionNumber"
                ref="refAccession"
                @input="setAcessionNumber($event)"
                :error="validations.accessionNumber.$error"
                hide-bottom-space
                :suffix="getNumbercopies"
              >
                <template
                  v-slot:error
                  v-if="!validations.accessionNumber.required"
                >
                  Accession Number is required
                </template>
              </q-select>
              <q-input
                dense
                outlined
                label="Title"
                class="text-capitalize col-md-7 col-sm-6 col-xs-12"
                :value="catalogInfo.title"
                @input="setTitle($event)"
                :error="validations.title.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.title.required"
                >
                  Catalog Title is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Author"
                class="text-capitalize col-md-4 col-sm-6 col-xs-12"
                :value="catalogInfo.author"
                @input="setAuthor($event)"
                :error="validations.author.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.author.required"
                >
                  Catalog Author is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Type"
                class="text-capitalize col-md-2 col-sm-6 col-xs-12"
                :value="catalogInfo.type"
                @input="setType($event)"
                :error="validations.type.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.type.required"
                >
                  Catalog type is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Call Number"
                class="text-capitalize col-md-3 col-sm-6 col-xs-12"
                :value="catalogInfo.callNumber"
                @input="setCallNumber($event)"
                :error="validations.callNumber.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.callNumber.required"
                >
                  Call number is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Sublocation"
                class="text-capitalize col-md-3 col-sm-6 col-xs-12"
                :value="catalogInfo.sublocation"
                @input="setSublocation($event)"
                :error="validations.sublocation.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.sublocation.required"
                >
                  Catalog Sublocation is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="ISBN"
                class="text-capitalize col-md-4 col-sm-6 col-xs-12"
                :value="catalogInfo.isbn"
                @input="setIsbn($event)"
                :error="validations.isbn.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.isbn.required"
                >
                  Catalog ISBN is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Edited by"
                class="text-capitalize col-md-5 col-sm-6 col-xs-12"
                :value="catalogInfo.editedBy"
                @input="$emit('update:editedBy', $event)"
                hide-bottom-space
              >
              </q-input>
            </div>
          </div>
          <div class="col-12">
            <q-separator></q-separator>
          </div>
          <div class="col-12">
            <div class="q-col-gutter-md row col-12">
              <q-input
                dense
                outlined
                label="Published"
                class="text-capitalize col-md-6 col-xs-12"
                :value="catalogInfo.published"
                @input="setPublished($event)"
                :error="validations.published.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.published.required"
                >
                  Published info is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Copyright"
                class="text-capitalize col-md-2 col-sm-6 col-xs-12"
                :value="catalogInfo.copyright"
                @input="setCopyright($event)"
                :error="validations.copyright.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.copyright.required"
                >
                  Copyright info is required
                </template>
              </q-input>
              <q-input
                dense
                outlined
                label="Format"
                class="text-capitalize col-md-4 col-sm-6 col-xs-12"
                :value="catalogInfo.format"
                @input="$emit('update:format', $event)"
                hide-bottom-space
              >
              </q-input>
              <q-input
                dense
                outlined
                label="Content type term"
                class="text-capitalize col-md-4 col-sm-6 col-xs-12"
                :value="catalogInfo.contentTypeTerm"
                @input="$emit('update:contentTypeTerm', $event)"
                hide-bottom-space
              >
              </q-input>
              <q-input
                dense
                outlined
                label="Carrier type term"
                class="text-capitalize col-md-4 col-sm-6 col-xs-12"
                :value="catalogInfo.carrierTypeTerm"
                @input="$emit('update:carrierTypeTerm', $event)"
                hide-bottom-space
              >
              </q-input>
            </div>
          </div>
          <div class="col-12">
            <q-select
              label="Add Additional Information"
              outlined
              :value="catalogInfo.additionalInfo"
              @input="$emit('update:additionalInfo', $event)"
              dense
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add"
              class="text-capitalize"
            />
          </div>
          <div class="col-12">
            <q-separator></q-separator>
          </div>
          <div class="col-12">
            <div class="row q-col-gutter-md">
              <div v-if="subjectDialog.headerTitle==='Add'" class="col-md-6 col-xs-12">
                <q-btn size="md"  @click="$emit('emitAddCatalog')" icon="book" glossy class="full-width bg-primary text-white text-capitalize">
                  Submit Information
                </q-btn>
              </div>
              <div v-else-if="subjectDialog.headerTitle==='Update'" @click="$emit('updateCatalog')" class="col-md-6 col-xs-12">
              <q-btn size="md"  @click="$emit('emitUpdateCatalog')" icon="book" glossy class="full-width bg-amber text-white text-capitalize col-md-5">
                Update Information
              </q-btn>
              </div>
              <div v-if="subjectDialog.headerTitle==='Update'" class="col-md-6 col-xs-12">
                <q-btn size="md" v-if="subjectDialog.headerTitle==='Update'" @click="$emit('emitDeleteCatalog')" icon="delete" glossy class="full-width bg-red text-white text-capitalize">
                  Delete
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-inner-loading :showing="loading">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
    </q-inner-loading>

  </q-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import filter from 'lodash/filter'
export default {
  data () {
    return {
    }
  },
  props: ['catalogInfo', 'validations', 'loading', 'dummyCatalogInfo'],
  computed: {
    ...mapState('admin', ['subjectDialog', 'subjectData']),
    getNumbercopies () {
      let accessionList = filter(this.catalogInfo.accessionNumber)
      let value = null
      if (accessionList) {
        let count = accessionList.length
        if (count === 1) {
          value = count + ' copy'
        } else if (count === 0) {
        } else {
          value = count + ' Copies'
        }
      }

      return value
    }
  },
  methods: {
    ...mapMutations('admin', ['commitSubjectDialog']),
    setAcessionNumber (event) {
      this.$emit('update:accessionNumber', event)
      this.validations.accessionNumber.$touch()
    },
    setTitle (event) {
      this.$emit('update:title', event)
      this.validations.title.$touch()
    },
    setAuthor (event) {
      this.$emit('update:author', event)
      this.validations.author.$touch()
    },
    setType (event) {
      this.$emit('update:type', event)
      this.validations.type.$touch()
    },
    setCallNumber (event) {
      this.$emit('update:callNumber', event)
      this.validations.callNumber.$touch()
    },
    setSublocation (event) {
      this.$emit('update:sublocation', event)
      this.validations.sublocation.$touch()
    },
    setIsbn (event) {
      this.$emit('update:isbn', event)
      this.validations.isbn.$touch()
    },
    setPublished (event) {
      this.$emit('update:published', event)
      this.validations.published.$touch()
    },
    setCopyright (event) {
      this.$emit('update:copyright', event)
      this.validations.copyright.$touch()
    },
    closeDialog () {
      this.commitSubjectDialog({
        'show': false,
        'data': []
      })
      this.validations.$reset()
    }
  },
  created () {
  }
}
</script>
