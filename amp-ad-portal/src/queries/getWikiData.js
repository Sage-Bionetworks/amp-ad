function handleErrors(response) {
  if (!response.ok) {
    throw Error(response)
  }
  return response
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
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return handleErrors(response)
    })
    .then((processedData) => {
      return processedData
    })
    .catch((error) => {
      console.log(error)
      return ""
    })
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
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return handleErrors(response)
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

const getMarkdown = (props, wikiId, name = "wikiMarkdown", synId) => {
  return getWikiData(wikiId, props.token.sessionToken, synId)
    .then((data) => {
      let markdownObj = { markdown: "" }
      if (data !== undefined) {
        markdownObj = data
      }
      props.handleChanges(name, markdownObj.markdown)
    })
    .catch(handleErrors)
}

const getMarkdownSegment = (
  handleNestedChanges,
  sessionToken,
  wikiID = "",
  synId = "syn12666371",
  stateKey,
) => {
  return getWikiData(wikiID, sessionToken, synId)
    .then((data) => {
      handleNestedChanges(stateKey, wikiID, data.markdown)
    })
    .catch(handleErrors)
}

const getSubPageHeaders = (
  wikiId,
  synId,
  sessionToken,
  handleChangesFunc,
  paginationValue,
  limit,
) => {
  return getWikiHeaderTree(sessionToken, synId, paginationValue, limit)
    .then((results) => {
      const filteredResults = results.results.filter(
        wikiPage => wikiPage.parentId === wikiId,
      )
      if (filteredResults.length > 0) {
        return filteredResults
      }
      if (paginationValue > 350) {
        return []
      }
      return getSubPageHeaders(
        wikiId,
        synId,
        sessionToken,
        handleChangesFunc,
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
  synId,
  stateKey,
  sessionToken,
  handleNestedChanges,
  paginationValue = 10,
  limit = false,
) => {
  return getSubPageHeaders(
    wikiId,
    synId,
    sessionToken,
    handleNestedChanges,
    paginationValue,
    limit,
  ).then((headers) => {
    asyncForEach(headers, async (header) => {
      await waitFor(100)
      getMarkdownSegment(
        handleNestedChanges,
        sessionToken,
        header.id,
        undefined,
        stateKey,
      )
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
  getUserProfile,
}
