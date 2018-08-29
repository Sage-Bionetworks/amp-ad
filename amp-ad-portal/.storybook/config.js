import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories");
  require("../src/stories/navigation.js");
}

configure(loadStories, module);
