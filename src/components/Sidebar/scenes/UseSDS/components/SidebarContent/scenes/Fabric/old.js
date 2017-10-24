import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

// Shared Components
import SidebarCard from "../../components/SidebarCard";
import SummaryBar from "../../components/SummaryBar";

class SidebarServices extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired
  };

  render() {
    return (
      <SummaryBar>
        {this.props.services.map(service => {
          // Automatically redirect to the first instance if one exists, otherwise just point
          // at the services page
          const href =
            service.instances.length > 0
              ? `/${encodeURI(service.name)}/${encodeURI(service.instances[0])}`
              : "/";
          return (
            <SidebarCard
              href={href}
              icon="star"
              key={service.name}
              title={service.name}
            />
          );
        })}
      </SummaryBar>
    );
  }
}

function mapStateToProps({ fabric: { services } }) {
  return {
    services: _.values(services)
  };
}

export default connect(mapStateToProps)(SidebarServices);