function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function getStudyData (TOKEN, limit = Number.MAX_VALUE){
  return fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
	.then(handleErrors)
  .then( response => { 
		if(response.status !== 201 && --limit){
			//setTimeout( () => { 
				return getStudyData(TOKEN) 
			//}, 1000 );
		}
		if(response.status === 201){
			return response.json()
		}
  })
	.then( data => { return data } );
}

export default getStudyData;
