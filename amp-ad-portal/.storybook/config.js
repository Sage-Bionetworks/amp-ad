import { configure } from "@storybook/react";
import { SynapseClient, SynapseConstants } from "synapse-react-client";

function loadStories(token) {
  require("../src/stories/");

  const BarChart = require("../src/stories/barChart.js");
  BarChart.token = token;

  const ExploreBarChart = require("../src/stories/ExploreBarChart.js");
  ExploreBarChart.token = token;

  const ExploreSection = require("../src/stories/ExploreSection.js");
  ExploreSection.token = token;
}

const login = async () =>
  SynapseClient.login("", "").then(keys => {
    return keys;
  });

login().then(keys => {
  configure(() => loadStories(keys), module);
});
