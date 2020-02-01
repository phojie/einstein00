<template>
  <q-card style="width: 900px; max-width: 90vw;">
    <q-card-section class="row">
      <div class="text-h6">
         {{subjectDialog.headerTitle}} Subject
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
        <div v-if="dataInformation.instructor.keyIndex" class="col-xs-12">
          <div class="row col-xs-12 justify-center q-col-gutter-md">
            <div class="col-md-3 col-xs-12 col-sm-6">
              <q-img
                :src="dataInformation.instructor.profileImgUrl"
                :ratio="1"
                basic
                class="rounded-borders shadow-1"
                placeholder-src="https://threadreaderapp.com/images/avatars/unknown"
              />
            </div>
            <div class="col-md-6 col-xs-12 col-sm-6">
              <div class="col-xs-12 col-sm-6 row q-gutter-y-md">
                <q-input
                  filled
                  dense
                  disable
                  :value="dataInformation.instructor.idNumber"
                  label="Id Number"
                  class="text-capitalize col-md-12 col-xs-12"
                >
                </q-input>
                <q-input
                  dense
                  disable
                  filled
                  :value="dataInformation.instructor.fullname"
                  label="Instructor"
                  class="text-capitalize col-md-12 col-xs-12"
                >
                </q-input>
                <q-input
                  disable
                  filled
                  dense
                  :value="dataInformation.instructor.department"
                  label="Department"
                  class="text-capitalize col-md-12 col-xs-12"
                >
                </q-input>
                <q-input
                  disable
                  filled
                  dense
                  :value="dataInformation.instructor.position"
                  label="Position"
                  class="text-capitalize col-md-12 col-xs-12"
                >
                </q-input>
              </div>
            </div>
            <div class="col-md-2 col-xs-12 row">
               <q-btn @click="$emit('emitAddSubject')" v-if="subjectDialog.headerTitle === 'Add'" icon="book" label="Submit" class="full-width" glossy stack  color="primary" />
               <q-btn @click="$emit('emitUpdateSubject')" v-if="subjectDialog.headerTitle === 'Update'" icon="bookmark" label="Update" class="full-width" glossy stack  color="amber" />
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <div class="col-xs-12 row q-col-gutter-md">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-input
                :ref="schoolRefs"
                autofocus
                dense
                :value="dataInformation.schoolYear"
                @input="setSchoolYear($event)"
                outlined
                label="School Year"
                mask="####"
                class="text-capitalize"
                :error="validations.schoolYear.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.schoolYear.required"
                >
                  School Year is required
                </template>
              </q-input>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-select
                dense
                outlined
                :value="dataInformation.semester"
                @input="$emit('update:semester', $event)"
                :options="['First Semester','Second Semester', 'Third Semester']"
                label="Semester"
                class="text-capitalize "
                :error="validations.semester.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.semester.required"
                >
                  Semester is required
                </template>
              </q-select>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-input
                  dense
                  :value="dataInformation.courseCode"
                  @input="setCourseCode($event)"
                  outlined
                  label="Course Code"
                  class="text-capitalize"
                  :error="validations.courseCode.$error"
                  hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.courseCode.required"
                >
                  Subject Course Code is required
                </template>
              </q-input>
            </div>
            <div class="col-md-5 col-sm-6 col-xs-12">
              <q-input
                  dense
                  :value="dataInformation.descriptiveTitle"
                  @input="setDescriptiveTitle($event)"
                  outlined
                  label="Descrtiptive Title"
                  class="text-capitalize"
                  :error="validations.descriptiveTitle.$error"
                  hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.descriptiveTitle.required"
                >
                  Subject Descriptive Title is required
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
              <q-input
                dense
                outlined
                class="text-capitalize "
                label="Units"
                mask="##"
                :value="dataInformation.units"
                @input="setUnits($event)"
                :error="validations.units.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.units.required"
                >
                  Number of Units is required
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-12">
              <q-input
                dense
                outlined
                class="text-uppercase"
                label="Days"
                :value="dataInformation.day"
                @input="setDay($event)"
                :error="validations.day.$error"
                hide-bottom-space
              >
                <template
                  v-slot:error
                  v-if="!validations.day.required"
                >
                  <span class="text-capitalize">
                    Subject Schedule is required
                  </span>
                </template>
              </q-input>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-input
                dense
                outlined
                class="text-capitalize "
                label="Room"
                :value="dataInformation.room"
                @input="setRoom($event)"
                :error="validations.room.$error"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="room" />
                </template>
                <template
                  v-slot:error
                  v-if="!validations.room.required"
                >
                  Subject Room is required
                </template>
              </q-input>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-input
                dense
                outlined
                type="time"
                class="text-capitalize "
                label="From"
                stack-label
                :value="dataInformation.timeFrom"
                @input="setTimeFrom($event)"
                :error="validations.timeFrom.$error"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="timer" />
                </template>
                <template
                  v-slot:error
                  v-if="!validations.timeFrom.required"
                >
                  Subject Time Schedule is required
                </template>
              </q-input>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-input
                dense
                outlined
                type="time"
                class="text-capitalize "
                label="To"
                stack-label
                :value="dataInformation.timeTo"
                @input="setTimeTo($event)"
                :error="validations.timeTo.$error"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="timer_off" />
                </template>
                <template
                  v-slot:error
                  v-if="!validations.timeTo.required"
                >
                  Subject Time Schedule is required
                </template>
              </q-input>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <q-select
                @filter="filterFn"
                use-input
                input-debounce="0"
                dense
                outlined
                :value="dataInformation.instructor.fullname"
                :options="options"
                label="Select Instructor"
                @input="setInstructor($event)"
                color="primary"
                clearable
                @clear="clearInstructor"
                options-selected-class="text-primary"
                >
                <template
                  v-slot:error
                  v-if="!validations.instructor.required"
                >
                  Subject Instructor is required
                </template>

                <template v-slot:option="options" >
                  <q-item
                    v-on="options.itemEvents"
                    @click="selectInstructor(options.opt)"
                    clickable
                    v-ripple
                  >
                    <q-item-section
                      avatar
                      top
                    >
                      <q-avatar
                        color="primary"
                        text-color="white"
                      >
                        <q-img :src="options.opt.profileImgUrl" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section class="text-capitalize">
                      <q-item-label lines="1">{{options.opt.fullname}}</q-item-label>
                      <q-item-label caption>{{options.opt.department}} / {{options.opt.position}}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-badge color="blue">
                        {{options.opt.idnumber}}
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
            </div>

          </div>
        </div>
      </div>

    </q-card-section>

  </q-card>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  props: ['dataInformation', 'validations', 'schoolRefs'],
  data () {
    return {
      personnelPic: null,
      model: null,
      options: null
    }
  },
  computed: {
    ...mapGetters('admin', ['personnelLists']),
    ...mapState('admin', ['subjectDialog'])
  },
  methods: {
    ...mapMutations('admin', ['commitSubjectDialog']),
    clearInstructor () {
      let instructorData = {
        idNumber: null,
        fullname: null,
        department: null,
        position: null,
        keyIndex: null,
        profileImgUrl: null
      }
      this.$emit('update:instructor', instructorData)
    },
    selectInstructor (data) {
      console.log(data)
      let instructorValue = `${data.prefix} ${data.fullname} ${data.suffix}`
      let instructorData = {
        idNumber: data.idnumber,
        fullname: instructorValue,
        department: data.department,
        position: data.position,
        keyIndex: data.keyIndex,
        profileImgUrl: data.profileImgUrl
      }
      this.$emit('update:instructor', instructorData)
    },
    filterFn (val, update, abort) {
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.options = this.personnelLists
          } else {
            const needle = val.toLowerCase()
            let idnumber = this.personnelLists.filter(v => v.idnumber.toLowerCase().indexOf(needle) > -1)
            let position = this.personnelLists.filter(v => v.position.toLowerCase().indexOf(needle) > -1)
            let fullname = this.personnelLists.filter(v => v.fullname.toLowerCase().indexOf(needle) > -1)
            let department = this.personnelLists.filter(v => v.department.toLowerCase().indexOf(needle) > -1)
            let myData = idnumber.concat(position, fullname, department)
            this.options = myData
          }
        })
      }, 300)
    },
    setSchoolYear (event) {
      this.$emit('update:schoolYear', event)
      this.validations.schoolYear.$touch()
    },
    setCourseCode (event) {
      this.$emit('update:courseCode', event)
      this.validations.courseCode.$touch()
    },
    setDescriptiveTitle (event) {
      this.$emit('update:descriptiveTitle', event)
      this.validations.descriptiveTitle.$touch()
    },
    setUnits (event) {
      this.$emit('update:units', event)
      this.validations.units.$touch()
    },
    setDay (event) {
      this.$emit('update:day', event)
      this.validations.day.$touch()
    },
    setRoom (event) {
      this.$emit('update:room', event)
      this.validations.room.$touch()
    },
    setTimeFrom (event) {
      this.$emit('update:timeFrom', event)
      this.validations.timeFrom.$touch()
    },
    setTimeTo (event) {
      this.$emit('update:timeTo', event)
      this.validations.timeTo.$touch()
    },
    setInstructor (event) {
      // dummy kay naa error kung wla ni yawa
    },
    closeDialog () {
      this.commitSubjectDialog({
        'show': false
      })
      this.$emit('clearDataInformation')
    }

  }
}
</script>
