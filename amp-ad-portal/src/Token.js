function getToken (QUERY = false, columnName = "assay", facetValues = "rnaSeq"){
  if(!QUERY){
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: "syn11346063", 
      query: {
        sql: "SELECT * FROM syn11346063", 
        includeEntityEtag:true, 
        isConsistent:true, 
        offset:0, 
        limit:25
      }, 
      partMask:53
    };
  }
  else{
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: "syn11346063", 
      query: {
        sql: "SELECT * FROM syn11346063", 
        selectedFacets:[{
          concreteType: "org.sagebionetworks.repo.model.table.FacetColumnValuesRequest", 
          columnName: columnName, 
          facetValues: [facetValues]
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

//export default getToken().then(response => response.json()).then(
    //(result) => {
      //return result.token;
    //}
  //);

