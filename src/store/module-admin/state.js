export default {
  // library
  libraryVisitor: {},
  studentLists: {},
  personnelLists: {},
  loading: false,
  loadingProgress: 0,
  libraryStat: {},
  votesResult: {
    entry1: 0,
    entry2: 0,
    entry3: 0
  },
  // registrar
  subjectDialog: {
    headerTitle: '',
    show: false,
    data: {
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
      additionalInfo: null
    }
  },
  // VPAA
  subjectsSchedule: {},
  allSubjects: {},
  // schoolYearAvailable: {}
  listofCatalog: {}

}
