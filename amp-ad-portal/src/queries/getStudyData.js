const handleErrors = response => {
	if (!response.ok) {
		throw new Error("Bad Request");
	}
	return response;
}

const DelayPromise = (delay) => {  
  //return a function that accepts a single variable
    return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, delay);
    });
  }
}

const getStudyData = async (TOKEN = '', AUTHENTICATION = '', TABLEID = 'syn11346063', limit = Number.MAX_VALUE) => {
  //console.log(TOKEN, AUTHENTICATION, TABLEID); 
  return await fetch('https://repo-prod.prod.sagebase.org/repo/v1/entity/' + TABLEID + '/table/query/async/get/' + TOKEN, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': AUTHENTICATION
    }
  })
	.then(handleErrors)
  .then(DelayPromise(1000))
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
