const handleErrors = response => {
	if (!response.ok) {
		throw new Error("Bad Request");
	}
	return response;
}

function getStudyData (TOKEN = '', AUTHENTICATION = '', TABLEID = 'syn11346063', limit = Number.MAX_VALUE){
  return fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/' + TABLEID + '/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'sessionToken': AUTHENTICATION
    }
  })
	.then(handleErrors)
  .then( response => { 
		if(response.status !== 201 && --limit){
				return getStudyData(TOKEN) 
		}
		if(response.status === 201){
			return response.json()
		}
  })
	.then( data => { return data } )
  .catch((error) => {
    console.log(error)
  })
}

export default getStudyData;
