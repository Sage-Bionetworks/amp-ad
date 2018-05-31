import dataPromise from './Token.js';

function getStudyData (TOKEN, limit = Number.MAX_VALUE){
  return fetch('https://repo-prod-227-0.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then( response => { 
    if (response.status !== 201 && --limit){
      return getStudyData(TOKEN); 
    }
    return response;
  });
}

let studyData = dataPromise.then( data => getStudyData(data, 10) );

export default studyData;
