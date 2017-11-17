import React from "react";
import { Actions } from "jumpstate";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";

import * as noFuncState from "json/mockReduxState";
import * as state from "json/mockReduxStateMetrics";
import FunctionsGrid from "./index";
import NotFoundError from "components/Main/components/NotFoundError";
//import Action effects
import "services";

const mockStore = configureStore();
const mockState = state.default,
  noMetricsState = noFuncState.default;
let wrapper, FunctionsGridInstance;

const FunctionsGridWithMockStore = (
  <FunctionsGrid store={mockStore(mockState)} />
);
const FunctionsGridWithMissingMetricsStore = (
  <FunctionsGrid store={mockStore(noMetricsState)} />
);
let funcArr = [
  {
    func: "OrderItem",
    requests: 45313
  },
  {
    func: "ZZItem",
    requests: 323
  },
  {
    func: "AAStream",
    requests: 13
  }
];

describe("Go Instance Functions View: <FunctionsGrid/>", () => {
  test("Matches snapshot", () => {
    const tree = renderer.create(FunctionsGridWithMockStore).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // FunctionsGridWithMissingMetricsStore does not contain any functions data
  test("returns NotFoundError if no functions are found ", () => {
    wrapper = mount(FunctionsGridWithMissingMetricsStore);

    expect(wrapper.find(NotFoundError).length).toBe(1);
  });

  test("returns correct number of <FunctionsTableToolbar> and <FunctionsTable> and does not render <NotFoundError> when functions are found ", () => {
    wrapper = mount(FunctionsGridWithMockStore);
    expect(wrapper.find("FunctionsTableToolbar").length).toBe(1);
    expect(wrapper.find("FunctionsTable").length).toBe(1);
    expect(wrapper.find(NotFoundError).length).toBe(0);
  });
});

describe("FunctionsGrid Child Components", () => {
  beforeEach(() => {
    wrapper = mount(FunctionsGridWithMockStore);
    FunctionsGridInstance = wrapper.find("FunctionsGrid").instance();
  });

  test("passes props to FunctionsTableToolbar", () => {
    expect(wrapper.find("FunctionsTableToolbar").props()).toMatchObject({
      filterString: "",
      keyToSortBy: "func",
      setFilterString: FunctionsGridInstance.setFilterString,
      setKeyToSortBy: FunctionsGridInstance.setKeyToSortBy
    });
  });
  test("passes functions as props to FunctionsTable", () => {
    expect(wrapper.find("FunctionsTable").props()).toMatchObject({
      funcs: [
        {
          errorPercent: "0.000",
          errorsCount: 0,
          func: "CatalogStream",
          inThroughput: 227,
          latency50: 1956,
          latency90: 3469,
          latency95: 3484,
          latency99: 3484,
          latency9990: 3484,
          latency9999: 3484,
          latencyAvg: 1942.692308,
          latencyCount: 13,
          latencyMax: 3484,
          latencyMin: 600,
          outThroughput: 2889,
          requests: 13
        },
        {
          errorPercent: "0.000",
          errorsCount: 0,
          func: "OrderItem",
          inThroughput: 225,
          latency50: 2339,
          latency90: 3476,
          latency95: 3565,
          latency99: 3565,
          latency9990: 3565,
          latency9999: 3565,
          latencyAvg: 2398.615385,
          latencyCount: 13,
          latencyMax: 3565,
          latencyMin: 1345,
          outThroughput: 143,
          requests: 13
        }
      ]
    });
  });
});

describe("FunctionsGrid Instance Methods", () => {
  beforeEach(() => {
    FunctionsGridInstance = wrapper.find("FunctionsGrid").instance();
  });
  test("`sort` takes functions and sorts by `funcs` in ascending order by default when `keyToSortBy` is not set and `ascending` is not yet toggled", () => {
    expect(FunctionsGridInstance.sort(funcArr)).toEqual([
      { func: "AAStream", requests: 13 },
      { func: "OrderItem", requests: 45313 },
      { func: "ZZItem", requests: 323 }
    ]);
  });

  test("`sort` sorts by `keyToSortBy` and `ascending` values", () => {
    FunctionsGridInstance.setState({
      keyToSortBy: "requests",
      ascending: false
    });
    expect(FunctionsGridInstance.sort(funcArr)).toEqual([
      { func: "OrderItem", requests: 45313 },
      { func: "ZZItem", requests: 323 },
      { func: "AAStream", requests: 13 }
    ]);
  });

  test("`setKeyToSortBy` sets keyToSortBy and toggles ascending order when key is already active ", () => {
    FunctionsGridInstance.setState({
      keyToSortBy: "requests",
      ascending: false
    });

    expect(FunctionsGridInstance.sort(funcArr)).toEqual([
      { func: "OrderItem", requests: 45313 },
      { func: "ZZItem", requests: 323 },
      { func: "AAStream", requests: 13 }
    ]);

    // same key is sent, which toggles ascending
    FunctionsGridInstance.setKeyToSortBy("requests");

    expect(FunctionsGridInstance.sort(funcArr)).toEqual([
      { func: "AAStream", requests: 13 },
      { func: "ZZItem", requests: 323 },
      { func: "OrderItem", requests: 45313 }
    ]);
  });
  test("`setKeyToSortBy` sorts by keyToSortBy ", () => {
    FunctionsGridInstance.setState({
      keyToSortBy: "func"
    });

    expect(FunctionsGridInstance.sort(funcArr)).toEqual([
      { func: "AAStream", requests: 13 },
      { func: "OrderItem", requests: 45313 },
      { func: "ZZItem", requests: 323 }
    ]);
  });

  test("`setFilterString` sets filterString ", () => {
    FunctionsGridInstance.setFilterString("AA");
    expect(FunctionsGridInstance.state.filterString).toEqual("AA");
    FunctionsGridInstance.setFilterString("Cat");
    expect(FunctionsGridInstance.state.filterString).toEqual("Cat");
  });
});