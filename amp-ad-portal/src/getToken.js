function getToken (columnName = "assay", facetValues = [], tableID = "syn11346063", authenticationToken ){
  //console.log(facetValues);
  let QUERY;
  if(!facetValues.length > 0){
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: tableID, 
      query: {
        sql: "SELECT * FROM " + tableID, 
        includeEntityEtag:true, 
        isConsistent:true, 
        offset:0, 
        limit:100
      }, 
      partMask:53
    };
  }else {
    QUERY = {
      concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
      entityId: tableID, 
      partMask: 53,
      query: {
        includeEntityEtag:true, 
        isConsistent:true, 
        offset:0, 
        limit:25,
        selectedFacets: [
          {
            columnName: "consortium",
            concreteType: "org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",
            facetValues:[]
          },
          {
            columnName: "species",
            concreteType: "org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",
            facetValues:facetValues
          },
        ],
        sql: "SELECT * FROM " + tableID 
      } 
    };
  }

  return fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/'+ tableID + '/table/query/async/start', {
      method: 'POST',
      headers: {
        'Access-Control-Request-Headers': authenticationToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(QUERY)
    }
  )

}

export default getToken;
