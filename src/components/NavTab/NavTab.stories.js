import React from "react";
import StoryRouter from "storybook-router";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, select } from "@storybook/addon-knobs/react";

import NavTabGroup from "components/NavTab/components/NavTabGroup";
import NavTab from "components/NavTab";

storiesOf("NavTab", module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add("Basic", () => (
    <NavTabGroup
      align={select("align", ["center", "start", "end"], "center")}
      stretch={boolean("Stretch", false)}
    >
      <NavTab />
      <NavTab active label="Active Tab" />
      <NavTab />
    </NavTabGroup>
  ));
