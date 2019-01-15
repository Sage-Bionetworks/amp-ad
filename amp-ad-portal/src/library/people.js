const people = {
  name: 'people',
  description: 'people',
  id: 'syn13897207',
  filter: 'Program',
  color: 2,
  limit: 100,
  columns: 10,
  barChart: false,
  cards: false,
  type: '',
  hash: '/Explore/People',
  sql: 'SELECT * FROM syn13897207',
  menu: true,
  menuConfig: [
    {
      sql:
          "select firstName as \"First Name\", lastName as \"Last Name\", institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
      title: 'People',
      synapseId: 'syn13897207',
      facetName: 'Program',
      unitDescription: 'people',
    },
    {
      sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
      title: 'People',
      synapseId: 'syn13897207',
      facetName: 'Grant Number',
      unitDescription: 'people',
    },
    {
      sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
      title: 'Institution',
      synapseId: 'syn13897207',
      facetName: 'institution',
      facetDisplayValue: 'Institution',
      unitDescription: 'people',
    },
  ],
}

export default people
