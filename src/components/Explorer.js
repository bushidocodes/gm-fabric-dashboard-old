import _ from "lodash";
import { PropTypes } from "prop-types";
import qs from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Inspector from "./Inspector";
import GMLineChart from "./library/GMLineChart";

import { getDygraphOfValue } from "../utils/dygraphs";
import { contrastColor, spacingScale } from "../style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "../style/styleVariables";

const ViewExplorer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 ${spacingScale(2)} ${spacingScale(2)};
  height: 100%;
  @media all and (min-width: 1200px) {
    flex-direction: row;
  }
`;

const MetricsList = styled.div`
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()};
  flex: 0 0 300px;
  position: relative;
  margin-bottom: ${spacingScale(2)};
  @media all and (min-width: 1200px) {
    flex: 0 0 40%;
    margin-right: ${spacingScale(2)};
    margin-bottom: 0;
  }
`;

const MetricsGraphDisplay = styled.div`
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()};
  flex: 1 1 100%;
  position: relative;
  @media all and (min-width: 1200px) {
    flex: 0 0 60%;
  }
  .chart {
    display: flex;
    align-items: stretch;
    .chart-title {
      flex: 0 0 auto;
    }
    .chart-content {
      flex: 1 1 100%;
      position: relative;
    }
  }
  > * {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: spacingScale(2);
    h3 {
      flex: 0 0 auto;
      word-break: break-all;
      white-space: normal;
      max-width: 100%;
      text-overflow: ellipsis;
      margin: spacingScale(1);
    }
  }
  p {
    text-align: center;
    opacity: 0.8;
    flex: 1 1 100%;
  }
`;

/**
 * General purpose component for rendering any arbitrary timeseries data stored in Redux
 * Uses Inspector to search and select keys.
 * @class Explorer
 * @extends {Component}
 */
class Explorer extends Component {
  static propTypes = {
    history: PropTypes.object,
    keys: PropTypes.array, // Metrics keys
    location: PropTypes.object,
    match: PropTypes.object,
    metrics: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      lastPushedQueryString: ""
    };
    // Debounce
    this.debouncedPushHistory = _.debounce(this._pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    // We need to check to see if the query string props are the result of user interaction
    // with the search box. We do that by keeping track of the last thing the search box
    // pushed to the query string and filtering out those props. The only expection to this
    // is which the app router action was POP, which means the user hit the back button or
    // otherwise navigated using the client-side router history
    if (
      nextProps.location.search !== `?${this.state.lastPushedQueryString}` ||
      nextProps.history.action === "POP"
    ) {
      this.popAndDecodeHistory(nextProps.location.search);
    }
  }

  /**
   * popAndDecodeHistory is used to decode and pull local state from the browser's query string
   * @memberof Explorer
   */
  popAndDecodeHistory = queryString => {
    // Parse the query string for the searchQuery parameter
    const { searchQuery = "" } = qs.parse(queryString);
    // Update local state if needed
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery });
    }
  };

  /**
   * encodeAndPushHistory encodes local state as a query string and invokes the debounced
   * version of _pushHistory to periodically write to browser history.
   * @param {string} newSearchQuery
   * @memberof Explorer
   */
  encodeAndPushHistory = newSearchQuery => {
    // Parse the current query parameters
    const { selectedMetric } = qs.parse(this.props.location.search);
    const newQueryStringObj = {};
    if (newSearchQuery) {
      newQueryStringObj.searchQuery = newSearchQuery.trim().toLowerCase();
    }
    // Technically the selected metric might not be in the filtered search results
    // but it would likely be jarring to deselect and unmount the graph
    if (selectedMetric) {
      newQueryStringObj.selectedMetric = selectedMetric;
    }
    // update with the new search query
    const newQueryString = qs.stringify(newQueryStringObj);
    // // and push to router
    this.debouncedPushHistory(newQueryString);
  };

  /**
   * _pushHistory is used to push local state to the browser's query string. This function is not
   * called directly but via encodeAndPushHistory, which uses lodash's debounce to prevent individual 
   * key strokes from polluting the browser history API.
   * @param {string} queryString
   * @memberof Explorer
   */
  _pushHistory = queryString => {
    // Save a query string to local state as lastPushedQueryString to prevent
    // accidental overwriting of user entry and then push the query string
    // to the browser history
    this.setState({ lastPushedQueryString: queryString }, () => {
      this.props.history.push({
        search: queryString
      });
    });
  };

  /**
   * Search function invoked by Inspector when user searches in the search bar
   * This is debounced inside of Inspector
   * @param {string} q - search query
   */
  onSearch = searchQuery => {
    this.setState({ searchQuery }, () => {
      this.encodeAndPushHistory(searchQuery);
    });
  };

  /**
   * click handler for selecting an Item in the Inspector component
   * @param {Object} clicked
   * @memberof Explorer
   */
  onClick = rawMetricsKey => {
    // Escape the slashed to avoid confusing the router
    const escapedMetricsPath = rawMetricsKey.replace(/\//g, "%2F");
    this._appendToQueryString({ selectedMetric: escapedMetricsPath });
  };

  /**
   * Takes a object with key value pairs and adds/updates them on the query string
   * @param {Object} payload
   * @memberof Explorer
   */
  _appendToQueryString = payload => {
    // Parse the current query parameters
    const query = qs.parse(this.props.location.search);
    // Generate the new query string object
    const newQuery = qs.stringify({
      ...query,
      ...payload
    });
    // Push the new state to the router
    this.props.history.push({
      search: newQuery
    });
  };

  render() {
    const { keys, location, metrics } = this.props;
    const query = qs.parse(location.search);
    const selectedMetric = query.selectedMetric
      ? query.selectedMetric.replace(/%2F/g, "/")
      : undefined;
    const { searchQuery } = this.state;
    return (
      <ViewExplorer>
        <MetricsList>
          <Inspector
            data={keys}
            onClick={this.onClick}
            onSearch={this.onSearch}
            searchQuery={searchQuery}
            selectedMetric={selectedMetric}
            tabIndex={0}
          />
        </MetricsList>
        <MetricsGraphDisplay>
          {selectedMetric && this.props.keys.indexOf(selectedMetric) !== -1 ? (
            <GMLineChart
              height={"max"}
              timeSeries={getDygraphOfValue(metrics, [selectedMetric])}
              title={selectedMetric}
            />
          ) : (
            <p>Select a metric to display</p>
          )}
        </MetricsGraphDisplay>
      </ViewExplorer>
    );
  }
}

function mapStateToProps({ metrics }) {
  return {
    metrics,
    keys: Object.keys(metrics).sort()
  };
}

export default connect(mapStateToProps)(Explorer);
