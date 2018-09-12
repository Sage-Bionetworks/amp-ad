import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories");
  require("../src/stories/navigation.js");
  require("../src/stories/donuts.js");
}

configure(loadStories, module);
