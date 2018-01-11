import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs/react";

import GMServiceCard from "./index.js";

const serviceStatus = ["Stable", "Warning", "Down"];

storiesOf("Service Card", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("Service Card", () => (
    <GMServiceCard
      name={text("Name", "Service Name")}
      height={text("Height")}
      width={text("Width")}
      runtime={select("Runtime", ["JVM", "GO"], "JVM")}
      metered={boolean("Service is Metered", true)}
      version={text("Version", "1.0")}
      status={select("Service State", serviceStatus, "Stable")}
      authorized={boolean("User is Authorized", true)}
      docsLink={text("Docs Link", "#")}
    />
  ))
  .add("Services Grid", () => (
    <div style={{ display: "flex", flexDirection: "row", height: "150px" }}>
      <GMServiceCard
        name="Service 1"
        metered={true}
        runtime="JVM"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 2"
        metered={true}
        runtime="GO"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 3"
        metered={true}
        runtime="JVM"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        status="Down"
      />
      <GMServiceCard
        name="Service 4"
        metered={true}
        runtime="GO"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Warning"
      />
      <GMServiceCard
        name="Service 1"
        metered={true}
        runtime="GO"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 2"
        metered={true}
        runtime="JVM"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 3"
        metered={true}
        runtime="GO"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        status="Down"
      />
      <GMServiceCard
        name="Service 4"
        metered={true}
        runtime="JVM"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Warning"
      />
    </div>
  ));
