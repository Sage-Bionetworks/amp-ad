const studies = {
  name: 'studies',
  description: 'studies',
  id: 'syn17083367',
  barChart: false,
  cards: false,
  menu: true,
  type: 'AMP_STUDY',
  sql: 'SELECT * FROM syn17083367',
  filter: 'Species',
  menuConfig: [
    {
      sql: 'SELECT * FROM syn17083367',
      synapseId: 'syn17083367',
      facetName: 'Species',
      facetDisplayValue: 'Species',
      unitDescription: 'studies',
    },
    {
      sql: 'SELECT * FROM syn17083367',
      synapseId: 'syn17083367',
      facetName: 'Grant',
      unitDescription: 'studies',
    },
    {
      sql: 'SELECT * FROM syn17083367',
      synapseId: 'syn17083367',
      facetName: 'Consortium',
      facetDisplayValue: 'Program',
      unitDescription: 'studies',
    },
  ],
  limit: 100,
  columns: 0,
  color: 0,
  hash: '/Explore/Studies',
}

export default studies
