"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWikiData = exports.queryTable = exports.login = undefined;

var _SynapseClient = require("./synapse/SynapseClient");

var SynapseClient = _interopRequireWildcard(_SynapseClient);

var _SynapseConstants = require("./synapse/SynapseConstants");

var SynapseConstants = _interopRequireWildcard(_SynapseConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetch = require('node-fetch');

var buildRequest = function buildRequest(table, query) {
  return {
    entityId: table,
    query: {
      sql: query,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 5000
    },
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
  };
};

var getTable = function getTable(table, tokenResponse, query) {
  var request = buildRequest(table, query);
  return SynapseClient.getQueryTableResults(request, tokenResponse.sessionToken);
};

var login = function login(username, password) {
  return SynapseClient.login(username, password);
};

var json = function json(response) {
  return JSON.stringify(response);
};

var processError = function processError(error) {
  console.log("Request has failed: " + error);
};

var queryTable = function queryTable(table, query) {
  console.log(query);
  return login("mikeybkats", "guinness").then(function (token) {
    return getTable(table, token, query);
  }).then(json).catch(processError);
};

function getWikiData(wikiId, token) {
  var synId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "syn12666371";

  return fetch("https://repo-prod.prod.sagebase.org/repo/v1/entity/" + synId + "/wiki/" + wikiId, {
    method: "GET",
    headers: {
      sessionToken: token
    }
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return handleErrors(response);
  }).then(function (processedData) {
    return processedData;
  }).catch(function (error) {
    return "";
  });
}

exports.login = login;
exports.queryTable = queryTable;
exports.getWikiData = getWikiData;