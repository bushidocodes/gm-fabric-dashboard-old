import React from "react";

import { storiesOf } from "@storybook/react";

import GMServiceHeader from "../src/components/Main/scenes/Fabric/components/FabricMainView/components/GMServiceHeader.js";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

const options = { down: "Down", warning: "Warning", stable: "Stable" };

storiesOf("Grouping Header", module)
  .addDecorator(withKnobs)
  .add("Normal Header", () => (
    <GMServiceHeader
      headerTitle={text("Header Title", "Sample Title")}
      showStatusIcon={boolean("Show Status Icon", false)}
    />
  ))
  .add("With Status Icon", () => (
    <GMServiceHeader
      headerTitle={select("Status", options, "Stable")}
      showStatusIcon={boolean("Use Status Icon", true)}
    />
  ));
