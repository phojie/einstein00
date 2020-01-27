import Vue from 'vue'
// import { date } from 'quasar'

// import { fireDB } from 'boot/firebase'
// import forEach from 'lodash/forEach'
// import find from 'lodash/find'

export function commitGetStudentLists (state, payload) {
  Vue.set(state.studentLists, payload.id, payload.information)
}

export function commitDeleteStudentLists (state, payload) {
  Vue.delete(state.studentLists, payload.keyIndex)
}

export function commitLoading (state, payload) {
  state.loading = payload
}

export function commitLoadingProgress (state, payload) {
  state.loadingProgress = payload
}

export function commitGetLibraryStat (state, payload) {
  Vue.set(state.libraryStat, payload.createdIndex, payload)
}

export function commitDeleteLibraryStat (state, payload) {
  console.log(payload)
  // var deleteId = find(state.libraryStat, ['keyData.keyIndex', payload])
  // console.log(deleteId.__index, 'delete id')
  Vue.delete(state.libraryStat, payload)
}

export function voteResult (state, payload) {
  if (payload === '1') {
    state.votesResult.entry1 += 1
    console.log(state.votesResult.entry1)
  } else if (payload === '2') {
    state.votesResult.entry2 += 1
    console.log(state.votesResult.entry2)
  } else if (payload === '3') {
    state.votesResult.entry3 += 1
    console.log(state.votesResult.entry3)
  }
}

export function commitGetPersonnelLists (state, payload) {
  Vue.set(state.personnelLists, payload.id, payload.information)
}

export function commitDeletePersonnelLists (state, payload) {
  Vue.delete(state.personnelLists, payload.keyIndex)
}
