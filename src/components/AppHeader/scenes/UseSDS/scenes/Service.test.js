import React from "react";
import { render } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import state from "json/mockReduxState";
import ServiceHeaderContent from "./Service";
import configureMockStore from "redux-mock-store";

// Router is necessary because of the <Tab />'s which need a router context
const RouterWrap = (
  <MemoryRouter
    initialEntries={[
      "/Authentication Statistics File Resource Network Export ICPF Mail Domain End/4.3"
    ]}
  >
    <Route
      path={`/:serviceName/:serviceVersion`}
      render={props => (
        <ServiceHeaderContent {...props} store={configureMockStore()(state)} />
      )}
    />
  </MemoryRouter>
);

describe("ServiceHeaderContent", () => {
  test("matches snapshot", () => {
    const tree = render(RouterWrap);
    expect(tree).toMatchSnapshot();
  });
});
