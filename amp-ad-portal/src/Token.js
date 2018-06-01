function getToken (searchBool = false, columnName = "assays", facetValues = [], queryString = "SELECT * FROM syn11346063" ){
  let QUERY;
  if(!searchBool){
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: "syn11346063", 
      query: {
        sql: "SELECT * FROM syn11346063", 
        includeEntityEtag:true, 
        isConsistent:true, 
        offset:0, 
        limit:100
      }, 
      partMask:53
    };
  }
  else{
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: "syn11346063", 
      query: {
        sql: queryString, 
        selectedFacets:[{
          concreteType: "org.sagebionetworks.repo.model.table.FacetColumnValuesRequest", 
          columnName: columnName, 
          facetValues: facetValues
        }], 
        includeEntityEtag:true, 
        isConsistent:true, 
        offset:0, 
        limit:25
      }, 
      partMask:53
    };
  }

  return fetch('https://repo-prod-227-0.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/start', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(QUERY)}
  )
}

export default getToken;
