import { configure } from "@storybook/react";
import { SynapseClient, SynapseConstants } from "synapse-react-client";

function loadStories(token) {
  require("../src/stories");

  let publications = require("../src/stories/publications.js");
  publications.token = token;
}

const login = async () =>
  SynapseClient.login("mikeybkats", "guinness").then(keys => {
    return keys;
  });

login().then(keys => {
  configure(() => loadStories(keys), module);
});
