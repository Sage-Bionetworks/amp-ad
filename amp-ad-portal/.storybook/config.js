import { configure } from "@storybook/react";
import { SynapseClient, SynapseConstants } from "synapse-react-client";

function loadStories(token) {
  require("../src/stories/");

  const BarChart = require("../src/stories/barChart.js");
  BarChart.token = token;
}

const login = async () =>
  SynapseClient.login("mikeybkats", "guinness").then(keys => {
    return keys;
  });

login().then(keys => {
  configure(() => loadStories(keys), module);
});
