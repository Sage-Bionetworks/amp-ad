//'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.getFiles = exports.getEntityChildren = exports.getUserProfiles = exports.createProject = exports.createEntity = exports.login = exports.getQueryTableResults = exports.getQueryTableResultsFromJobId = exports.getVersion = exports.doGet = exports.doPost = undefined

const _HTTPError = require("./HTTPError.js")

const _HTTPError2 = _interopRequireDefault(_HTTPError)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function delay(t, v) {
  return new Promise(((resolve) => {
    setTimeout(resolve.bind(null, v), t)
  }))
}

const fetch_with_exponential_timeout = function fetch_with_exponential_timeout(
  url,
  options,
  delayMs,
  retries,
) {
  return fetch(url, options)
    .then((resp) => {
      if (resp.status > 199 && resp.status < 300) {
        // ok!
        return resp.json()
      } if (resp.status === 429 || resp.status === 0) {
        // TOO_MANY_REQUESTS_STATUS_CODE, or network connection is down.  Retry after a couple of seconds.
        throw new _HTTPError2.default(resp.status, resp.statusText)
      } else {
        // error status that indicates no more retries
        retries = 1
        throw new _HTTPError2.default(resp.status, resp.statusText)
      }
    })
    .catch((error) => {
      if (retries === 1) throw error
      return delay(delayMs).then(() => {
        return fetch_with_exponential_timeout(
          url,
          options,
          delayMs * 2,
          retries - 1,
        )
      })
    })
}

const doPost = (exports.doPost = function doPost(
  url,
  requestJsonObject,
  sessionToken,
  endpoint,
) {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "sessiontoken",
    },
    body: JSON.stringify(requestJsonObject),
  }
  if (sessionToken) {
    options.headers.sessionToken = sessionToken
  }
  return fetch_with_exponential_timeout(endpoint + url, options, 2000, 5)
})

const doGet = (exports.doGet = function doGet(url, sessionToken, endpoint) {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "*/*",
      "Access-Control-Request-Headers": "sessiontoken",
    },
  }
  if (sessionToken) {
    options.headers.sessionToken = sessionToken
  }
  return fetch_with_exponential_timeout(endpoint + url, options, 2000, 5)
})

const getVersion = (exports.getVersion = function getVersion() {
  const endpoint = arguments.length > 0 && arguments[0] !== undefined
    ? arguments[0]
    : "https://repo-prod.prod.sagebase.org"

  return doGet("/repo/v1/version", undefined, endpoint)
})

const getQueryTableResultsFromJobId = (exports.getQueryTableResultsFromJobId = function getQueryTableResultsFromJobId(
  entityId,
  jobId,
) {
  const sessionToken = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : undefined
  const endpoint = arguments.length > 3 && arguments[3] !== undefined
    ? arguments[3]
    : "https://repo-prod.prod.sagebase.org"

  return doGet(
    `/repo/v1/entity/${entityId}/table/query/async/get/${jobId}`,
    sessionToken,
    endpoint,
  )
    .then((resp) => {
      // is this the job status?
      if (resp.jobState && resp.jobState !== "FAILED") {
        // still processing, wait for a second and try again
        return delay(3500).then(() => {
          return getQueryTableResultsFromJobId(
            entityId,
            jobId,
            sessionToken,
            endpoint,
          )
        })
      }
      // these must be the query results!
      return resp
    })
    .catch((error) => {
      throw error
    })
})

/**
 * http://docs.synapse.org/rest/POST/entity/id/table/query/nextPage/async/start.html
 * @param {*} queryBundleRequest
 * @param {*} sessionToken
 * @param {*} endpoint
 */
const getQueryTableResults = (exports.getQueryTableResults = function getQueryTableResults(
  queryBundleRequest,
) {
  const sessionToken = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : undefined
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"

  return doPost(
    `/repo/v1/entity/${
      queryBundleRequest.entityId
    }/table/query/async/start`,
    queryBundleRequest,
    sessionToken,
    endpoint,
  )
    .then((resp) => {
      //started query, now attempt to get the results.
      return getQueryTableResultsFromJobId(
        queryBundleRequest.entityId,
        resp.token,
        sessionToken,
        endpoint,
      )
    })
    .catch((error) => {
      throw error
    })
})

/** Log-in using the given username and password.  Will return a session token that must be used in authenticated requests.
 * http://docs.synapse.org/rest/POST/login.html
 */
const login = (exports.login = function login(username, password) {
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"
  return doPost(
    "/auth/v1/login",
    { username, password },
    undefined,
    endpoint,
  )
})

/** Create an entity (Project, Folder, File, Table, View)
 * http://docs.synapse.org/rest/POST/entity.html
 */
const createEntity = (exports.createEntity = function createEntity(
  entity,
  sessionToken,
) {
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"

  return doPost("/repo/v1/entity", entity, sessionToken, endpoint)
})

/** Create a project with the given name.
 * http://docs.synapse.org/rest/POST/entity.html
 */
const createProject = (exports.createProject = function createProject(
  name,
  sessionToken,
) {
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"

  return createEntity(
    {
      concreteType: "org.sagebionetworks.repo.model.Project",
      name,
    },
    sessionToken,
    endpoint,
  )
})

/** Return the User Profiles for the given list of user IDs
 * http://docs.synapse.org/rest/POST/userProfile.html
 */
const getUserProfiles = (exports.getUserProfiles = function getUserProfiles(
  userIdsArray,
) {
  const endpoint = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : "https://repo-prod.prod.sagebase.org"

  return doPost(
    "/repo/v1/userProfile",
    { list: userIdsArray },
    undefined,
    endpoint,
  )
})

/** Return the children (Files/Folders) of the given entity (Project or Folder).
 * http://docs.synapse.org/rest/POST/entity/children.html
 */
const getEntityChildren = (exports.getEntityChildren = function getEntityChildren(
  request,
) {
  const sessionToken = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : undefined
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"

  return doPost("/repo/v1/entity/children", request, sessionToken, endpoint)
})

/** Get a batch of pre-signed URLs and/or FileHandles for the given list of FileHandleAssociations.
 * http://docs.synapse.org/rest/POST/fileHandle/batch.html
 */
const getFiles = (exports.getFiles = function getFiles(request) {
  const sessionToken = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : undefined
  const endpoint = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : "https://repo-prod.prod.sagebase.org"

  return doPost("/file/v1/fileHandle/batch", request, sessionToken, endpoint)
})

module.exports = {
  getVersion,
  getQueryTableResults,
  createProject,
  login,
  getUserProfiles,
  getEntityChildren,
  getFiles,
}
