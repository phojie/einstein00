// const ALGOLIA_ID = 'P6F88GRT6N'
// const ALGOLIA_ADMIN_KEY = '118d66611e43127a92573cb4a9ff88ca'
// const ALGOLIA_SEARCH_KEY = '5431d1d868813a9997d70262752db712'

// const ALGOLIA_INDEX_NAME = 'ckcmopac'
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

// exports.onNoteCreated = functions.firestore.document('notes/{noteId}').onCreate((snap, context) => {
//   // Get the note document
//   const note = snap.data()

//   // Add an 'objectID' field which Algolia requires
//   note.objectID = context.params.noteId

//   // Write to the algolia index
//   const index = client.initIndex(ALGOLIA_INDEX_NAME)
//   return index.saveObject(note)
// })

// var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
// var index = client.initIndex('notes');

// // Perform an Algolia search:
// // https://www.algolia.com/doc/api-reference/api-methods/search/
// index
//   .search({
//     query
//   })
//   .then(function (responses) {
//     // Response from Algolia:
//     // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
//     console.log(responses.hits);
//   });
