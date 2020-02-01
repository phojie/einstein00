import filter from 'lodash/filter.js'
import find from 'lodash/find.js'
import findIndex from 'lodash/findIndex.js'
import forEach from 'lodash/forEach.js'
import max from 'lodash/max.js'

function getsubjectDialog (state) {
  return state.subjectDialog.data
}

function listofCatalog (state) {
  var dataFilter = filter(state.listofCatalog, 'keyIndex')
  dataFilter.forEach((row, index) => {
    row.index = index
  })
  return dataFilter
}

function libraryVisitor (state) {
  var allStudents = []
  var allNumberVisit = []
  forEach(state.libraryStat, function (val, key) {
    let myIndex = findIndex(allStudents, ['idnumber', val.idnumber])
    if (myIndex !== -1) {
      var data = {
        createdIndex: val.keyIndex,
        date: val.date,
        local: val.local,
        time: val.time,
        course: val.course,
        firstname: val.firstname,
        idnumber: val.idnumber,
        keyIndex: val.keyIndex,
        middlename: val.middlename,
        profileImgUrl: val.profileImgUrl,
        surname: val.surname,
        fullname: val.fullname,
        numberVisit: allStudents[myIndex].numberVisit + 1
      }
      allStudents[myIndex] = data
      allNumberVisit[myIndex] = data.numberVisit
    } else {
      allStudents.push(val)
    }
  })

  let numberWin = max(allNumberVisit)
  var filterNumberWin = find(allStudents, ['numberVisit', numberWin])
  // return test
  // return Math.max.apply(Math, allStudents.map(function (o) { return o.numberVisit }))
  if (filterNumberWin) {
    return filterNumberWin
  } else {
    return {
      profileImgUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
    }
  }
}

function studentLists (state) {
  var data = filter(state.studentLists, 'keyIndex')
  return data
}

function personnelLists (state) {
  var data = filter(state.personnelLists, 'keyIndex')
  return data
}

function studentLists2 (state) {
  return state.studentLists
}

function loading (state) {
  return state.loading
}

function loadingProgress (state) {
  return state.loadingProgress
}
function libraryStat (state) {
  var data = filter(state.libraryStat, 'createdIndex')
  return data
}

function series (state) {
  return state.series
}

// VPAA

function subjectsSchedule (state) {
  var data = filter(state.subjectsSchedule, 'keyIndex')
  data.forEach((row, index) => {
    row.index = index
  })
  return data
}

function schoolYearAvailable (state) {
  var listofSY = []
  var data = filter(state.allSubjects, 'keyIndex')
  forEach(data, function (val, key) {
    let findsy = find(listofSY, ['schoolYear', val.schoolYear])
    if (findsy) {
      var myIndex = findIndex(listofSY, ['schoolYear', findsy.schoolYear])
      listofSY[myIndex] = {
        schoolYear: val.schoolYear,
        numberSubject: listofSY[myIndex].numberSubject + 1
      }
    } else {
      listofSY.push({
        schoolYear: val.schoolYear,
        numberSubject: 1
      })
    }
  })
  return listofSY
}

function allSubjects (state) {
  var data = filter(state.allSubjects, 'keyIndex')
  data.forEach((row, index) => {
    row.index = index
  })
  return data
}

export { getsubjectDialog, listofCatalog, allSubjects, schoolYearAvailable, subjectsSchedule, libraryVisitor, series, libraryStat, studentLists, loading, loadingProgress, studentLists2, personnelLists }
