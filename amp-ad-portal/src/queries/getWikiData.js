function handleErrors(response) {
  if (!response.ok) {
    throw Error(response)
  }
  return response
}

function getWikiData(wikiId, token) {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/entity/syn12666371/wiki/${wikiId}`,
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

const getMarkdown = (props, wikiNumber, name = "wikiMarkdown") => {
  //props.handleChanges("wikiMarkdown", "")
  getWikiData(wikiNumber, props.token.sessionToken).then((data) => {
    console.log(data.markdown)
    props.handleChanges(name, data.markdown)
  })
}

const getMarkdownSegment = (props, newStateKey, stateKey) => {
  return getWikiData(newStateKey, props.token.sessionToken).then((data) => {
    props.handleNestedChanges(stateKey, newStateKey, data.markdown)
  })
}

export { getWikiData, getMarkdown, getMarkdownSegment }
