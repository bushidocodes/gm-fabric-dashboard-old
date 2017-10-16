import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import {
  ButtonDetails,
  SummaryBarCard,
  SummaryBarCardBody,
  SummaryBarCardTitle,
  SummaryBarCardIcon,
  SummaryBarCardHeading,
  SummaryBarCardKVWrap,
  SummaryBarCardKVKey,
  SummaryBarCardKVValue,
  SparkLineContainer,
  ValueText
} from "./SummaryBar";

/**
 * Navigational card rendered within the sidebar. Links to dashboards and contains
 * rollup metrics and sparklines
 * @export
 * @class SidebarCard
 * @extends {Component}
 */

export default class SidebarCard extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    chartTitle: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
    lines: PropTypes.array,
    tabIndex: PropTypes.number,
    title: PropTypes.string
  };

  static defaultProps = {
    lines: []
  };

  state = {
    isOpen: true
  };

  render() {
    const {
      chartData,
      chartTitle,
      href,
      icon,
      lines,
      tabIndex,
      title
    } = this.props;
    return (
      <SummaryBarCard tabIndex={tabIndex} to={href}>
        <SummaryBarCardTitle>
          <SummaryBarCardIcon icon={icon} />
          <SummaryBarCardHeading>{title}</SummaryBarCardHeading>
          {(this.props.lines.length > 0 ||
            this.props.chartTitle ||
            this.props.chartData) && (
            <ButtonDetails
              open={this.state.isOpen}
              onClick={evt => {
                evt.preventDefault();
                this.setState({ isOpen: !this.state.isOpen });
              }}
              tabIndex={tabIndex}
              icon={"chevron-left"}
              label={"Details"}
              outline={"none"}
            >
              <span data-uk-icon={"chevron-left"} />
            </ButtonDetails>
          )}
        </SummaryBarCardTitle>
        <SummaryBarCardBody open={this.state.isOpen}>
          {lines.map(line => (
            <SummaryBarCardKVWrap key={line.name}>
              <SummaryBarCardKVKey>{line.name}</SummaryBarCardKVKey>
              <SummaryBarCardKVValue>
                <ValueText>{line.value}</ValueText>
                {chartData && (
                  <SparkLineContainer>
                    <Sparklines
                      data={chartData}
                      margin={3}
                      svgHeight={20}
                      svgWidth={120}
                      title={chartTitle}
                    >
                      <SparklinesSpots />
                      <SparklinesLine
                        style={{
                          stroke: "currentColor",
                          strokeWidth: "2",
                          fill: "currentColor",
                          fillOpacity: "0"
                        }}
                      />
                    </Sparklines>
                  </SparkLineContainer>
                )}
              </SummaryBarCardKVValue>
            </SummaryBarCardKVWrap>
          ))}
        </SummaryBarCardBody>
      </SummaryBarCard>
    );
  }
}
