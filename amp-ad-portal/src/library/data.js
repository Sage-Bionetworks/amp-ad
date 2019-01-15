const data = {
  name: 'data',
  description: 'data files',
  id: 'syn11346063',
  filter: 'study',
  color: 1,
  limit: 50,
  columns: 0,
  cards: false,
  type: '',
  hash: '/Explore/Data',
  sql: 'SELECT * FROM syn11346063',
  menu: true,
  menuConfig: [
    {
      sql:
          'SELECT study, dataType, assay, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
      title: 'Data',
      synapseId: 'syn11346063',
      facetName: 'study',
      facetDisplayValue: 'Study',
      unitDescription: 'data files',
      visibleColumnCount: 4,
    },
    {
      sql:
          'SELECT species, dataType, id as file_id, consortium as program, grant, study, organ, tissue, cellType, assay, fileFormat, specimenID FROM syn11346063',
      title: 'Data',
      synapseId: 'syn11346063',
      facetName: 'species',
      facetDisplayValue: 'Species',
      unitDescription: 'data files',
      visibleColumnCount: 3,
    },
    {
      sql:
          'SELECT organ, tissue, dataType, assay, id AS file_id, consortium as program, grant, study, species, cellType, specimenID FROM syn11346063',
      title: 'Data',
      synapseId: 'syn11346063',
      facetName: 'organ',
      facetDisplayValue: 'Organ',
      unitDescription: 'data files',
      visibleColumnCount: 5,
    },
    {
      sql:
          'SELECT dataType, assay, study, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
      title: 'Data',
      synapseId: 'syn11346063',
      facetName: 'dataType',
      facetDisplayValue: 'Data Type',
      unitDescription: 'data files',
      visibleColumnCount: 4,
    },
    {
      sql:
          'SELECT assay, fileFormat, id AS file_id, consortium as program, grant, study, species, organ, tissue, cellType, dataType, specimenID FROM syn11346063',
      title: 'Data',
      synapseId: 'syn11346063',
      facetName: 'assay',
      facetDisplayValue: 'Assay',
      unitDescription: 'data files',
      visibleColumnCount: 4,
    },
    {
      sql:
          'SELECT diagnosis, sex, dataType, assay, id as file_id, consortium as program, grant, study, species, organ, tissue, cellType, fileFormat, specimenID, anonymized_individualID FROM syn17024112',
      title: 'Data',
      synapseId: 'syn17024112',
      facetName: 'diagnosis',
      facetDisplayValue: 'Diagnosis',
      unitDescription: 'data files',
      visibleColumnCount: 5,
    },
  ],
}

export default data
