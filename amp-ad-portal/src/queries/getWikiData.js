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
      return data.json()
    })
    .then((processedData) => {
      return processedData
    })
    .catch(handleErrors)
}

const getWikiHeaderTree = (token, synId, offsetVal = 0, limit = 10) => {
  let fetchReq = `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wikiheadertree?offset=${offsetVal}&limit=${limit}`
  if (offsetVal === false || limit === false) {
    fetchReq = `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wikiheadertree`
  }
  return fetch(fetchReq, {
    method: "GET",
    headers: {
      sessionToken: token,
    },
  })
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      return processedData
    })
    .catch(handleErrors)
}

const getEntityHeader = (token, payload) => {
  return fetch("https://repo-prod.prod.sagebase.org/repo/v1/entity/header", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sessionToken: token,
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      return data.json()
    })
    .then((processedData) => {
      return processedData
    })
    .catch(handleErrors)
}

const getMarkdown = (props, wikiNumber, name = "wikiMarkdown") => {
  getWikiData(wikiNumber, props.token.sessionToken)
    .then((data) => {
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

const getSubPageHeaders = (parentId, props, synId, paginationValue, limit) => {
  return getWikiHeaderTree(
    props.token.sessionToken,
    synId,
    paginationValue,
    limit,
  )
    .then((results) => {
      const filteredResults = results.results.filter(
        wikiPage => wikiPage.parentId === parentId,
      )
      if (filteredResults.length > 0) {
        return filteredResults
      }
      if (paginationValue > 350) {
        return []
      }
      return getSubPageHeaders(
        parentId,
        props,
        synId,
        paginationValue + 10,
        limit,
      )
    })
    .catch(handleErrors)
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const waitFor = ms => new Promise(r => setTimeout(r, ms))

const getWikiMarkdownSegments = (
  wikiId,
  stateKey,
  props,
  synId,
  paginationValue = 10,
  limit,
) => {
  return getSubPageHeaders(wikiId, props, synId, paginationValue, limit).then(
    (headers) => {
      asyncForEach(headers, async (header) => {
        await waitFor(75)
        getMarkdownSegment(props, header.id, stateKey)
      })
    },
  )
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
  getUserProfile,
}
