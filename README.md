## ajax fetch patterns  
To start you must get a token:  

```javascript 
	fetch('https://repo-prod-226-0.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/start', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"concreteType":"org.sagebionetworks.repo.model.table.QueryBundleRequest", "entityId":"syn11346063", "query":{"sql":"SELECT * FROM syn11346063", "includeEntityEtag":true, "isConsistent":true, "offset":0, "limit":25}, "partMask":53})
	});
	
	//	returns //
	//	{ "token": "5987308" }
```


To fetch with post request. add parameters to the body init with JSON.stringify(); and designate the content-type in the headers.

```javascript  
fetch('https://repo-prod-226-0.prod.sagebase.org/repo/v1/entity/children',{
	method: 'POST',
	headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
	connection: 'keep-alive', 
	body: JSON.stringify({"parentId":"syn2580853", "includeTypes":["table","entityview"], "sortBy":"CREATED_ON", "sortDirection":"DESC"})
});
```


To fetch with get request. sessionToken is required. Formatting below:

```javascript  
fetch('https://repo-prod-226-0.prod.sagebase.org/repo/v1/entity/syn11346063/table/query/async/get/5986976', {
	method: "GET",
	headers: {
		Host: "repo-prod-226-0.prod.sagebase.org",
		Connection: "keep-alive",
		Accept: "application/json; charset=UTF-8",
		Origin: "https://www.synapse.org",
		sessionToken: "711b530a-cbae-46cb-91a5-d844bcdb36a8"
	}
}).then(console.log(response => response.json())); 

```

```
  //getStackConfig = () => {
    //fetch('https://www.synapse.org/Portal/stackConfig', {
        //method: 'POST',
        //headers: {
          //'Accept': '*/*',
          //'Accept-Encoding': 'gzip, deflate, br',
          //'Accept-Language': 'en-US,en;q=0.9',
          //'Connection': 'keep-alive',
          //'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
          //'Host': 'www.synapse.org',
          //'Origin': 'https://www.synapse.org',
          //'Referer': 'https://www.synapse.org/',
        //},
        //body: "7|1|4|https://cdn-www.synapse.org/Portal/|B6FFC4548DD8B994CC07230C6BD6785E|_|getSynapseVersions|1|2|3|4|0|"
    //}).then( (response) => response)
      //.then(
        //(result) => {
          //return result;
        //}
      //)
  //}
```
