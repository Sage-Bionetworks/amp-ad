function getStudyData (TOKEN, limit = Number.MAX_VALUE){
  return fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then( response => { 
    if (response.status !== 201 && --limit){
      //return setTimeout( function(){getStudyData(TOKEN)}, 400 ); 
      return getStudyData(TOKEN); 
    }
    return response.json();
  })
  .then( data => {
    return data;
  });
}

export default getStudyData;
