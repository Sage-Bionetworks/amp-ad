function handleErrors(response) {
	if (!response.ok) {
		throw Error(response);
	}
	return response;
}

function getWikiData(wikiId, limit = 10, token){
  return fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/syn2580853/wiki/' + wikiId, {
    method: 'GET',
		'Access-Control-Request-Headers': token
  })
	.then(handleErrors)
  .then( setTimeout( response => { 
    return response
  }), 1200 )
  .then( data => { 
    return data.json() })
}

export default getWikiData;
