function handleErrors(response) {
  if (!response.ok) {
    throw Error(response)
  }
  return response
}

function getWikiData(wikiId, token, synId = "syn12666371") {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wiki/${wikiId}`,
    {
      method: "GET",
      headers: {
        sessionToken: token,
      },
    },
  )
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      return processedData
    })
    .catch(handleErrors)
}

const getWikiKey = (token, synId) => {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wikikey`,
    {
      method: "GET",
      headers: {
        sessionToken: token,
      },
    },
  )
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      //console.log(processedData)
      return processedData
    })
    .catch(handleErrors)
}

const getUserProfileImage = (profileId) => {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/userProfile/${profileId}/image`,
    {
      method: "GET",
    },
  )
    .then((data) => {
      //console.log(data)
      return data
    })
    .catch(handleErrors)
}

const getUserProfile = (profileId, token) => {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/userProfile/${profileId}`,
    {
      method: "GET",
      headers: {
        sessionToken: token,
      },
    },
  )
    .then((data) => {
      //console.log(data)
      return data
    })
    .catch(handleErrors)
}

const getWikiHeaderTree = (token, synId) => {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wikiheadertree`,
    {
      method: "GET",
      headers: {
        sessionToken: token,
      },
    },
  )
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      console.log(processedData)
      return processedData
    })
    .catch(handleErrors)
}

const getEntityHeader = (token, payload) => {
  //console.log(JSON.stringify(payload))
  return fetch(
    //`https://repo-prod.prod.sagebase.org/repo/v1/entity/${id}/type`,
    "https://repo-prod.prod.sagebase.org/repo/v1/entity/header",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        sessionToken: token,
      },
      body: JSON.stringify(payload),
    },
  )
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      return processedData
    })
    .catch(handleErrors)
}

const getMarkdown = (props, wikiNumber, name = "wikiMarkdown") => {
  //props.handleChanges("wikiMarkdown", "")
  getWikiData(wikiNumber, props.token.sessionToken)
    .then((data) => {
      //console.log(data.markdown)
      props.handleChanges(name, data.markdown)
    })
    .catch(handleErrors)
}

const getMarkdownSegment = (
  props,
  newStateKey,
  stateKey,
  synId = "syn12666371",
) => {
  return getWikiData(newStateKey, props.token.sessionToken, synId)
    .then((data) => {
      props.handleNestedChanges(stateKey, newStateKey, data.markdown)
    })
    .catch(handleErrors)
}

const getSubPageHeaders = (parentId, props, synId) => {
  return getWikiHeaderTree(props.token.sessionToken, synId)
    .then((results) => {
      return results.results.filter(wikiPage => wikiPage.parentId === parentId)
    })
    .catch(handleErrors)
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const waitFor = ms => new Promise(r => setTimeout(r, ms))

const getWikiMarkdownSegments = (wikiId, stateKey, props, synId) => {
  return getSubPageHeaders(wikiId, props, synId).then((headers) => {
    console.log(headers)
    asyncForEach(headers, async (header) => {
      await waitFor(75)
      getMarkdownSegment(props, header.id, stateKey)
    })
  })
}

const removeMarkdownDivWrapper = (markdown) => {
  let markdownString = markdown
  markdownString = markdownString.substr(10)
  markdownString = markdownString.substr(0, markdownString.length - 12)
  return markdownString
}

export {
  removeMarkdownDivWrapper,
  getWikiData,
  getMarkdown,
  getMarkdownSegment,
  getWikiHeaderTree,
  getWikiMarkdownSegments,
  getSubPageHeaders,
  getEntityHeader,
  getWikiKey,
  waitFor,
  asyncForEach,
  getUserProfileImage,
}
