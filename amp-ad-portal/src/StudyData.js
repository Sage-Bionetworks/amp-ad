import dataPromise from './Token.js';

function getStudyData (TOKEN){
  return fetch('https://repo-prod-227-0.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

let studyData = dataPromise.then( data => getStudyData(data)
  .then( response => {
    const statusCode = response.status;
    const data = response.json();
    //console.log(statusCode);
    return Promise.all([statusCode, data]);
  })
  .then( (res, data) => {
    //console.log(res, data);
    return res;
  })
);

export default studyData.then( (response) => response );
