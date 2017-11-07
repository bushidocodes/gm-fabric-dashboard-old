import React from "react";
import PropTypes from "prop-types";
import Color from "color";

// Internal Sub-components
import BackgroundIcon from "./components/BackgroundIcon";
import DocsLink from "./components/DocsLink";
import { CardContainer, CardFooter } from "./components/Card";
import Icon from "components/Icon";
import NoKey from "components/Glyphs/NoKey";
import Docs from "components/Glyphs/Docs";
import NoMetrics from "components/Glyphs/NoMetrics";
import { ServiceLink } from "./components/Service";
import Title from "./components/Title";
import Runtime from "./components/Runtime";

// External dependencies
import { mapStatusToColor, spacingScale } from "style/styleFunctions";
// import NoAuthIcon from "images/icons/no-key.svg";

GMServiceCard.propTypes = {
  authorized: PropTypes.bool,
  docsLink: PropTypes.string,
  height: PropTypes.string,
  metered: PropTypes.bool,
  name: PropTypes.string.isRequired,
  runtime: PropTypes.string,
  status: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.string
};

export default function GMServiceCard({
  authorized,
  docsLink,
  height = spacingScale(14),
  metered,
  name,
  runtime,
  status,
  version,
  width = spacingScale(20)
}) {
  // Style based on the status of the service
  let cardBackgroundColor,
    cardBorderColor,
    cardFontColor,
    cardFontWeight,
    cardHighlightColor,
    cardBorderAltColor;
  const baseColor = mapStatusToColor(status).string();
  const maxNameLen = 50;
  const titleName =
    name.length > maxNameLen ? `${name.trim().substr(0, maxNameLen)}...` : name;
  const titleNameAttribute = name === titleName ? null : name;
  switch (status) {
    case "Down":
      cardBackgroundColor = cardBorderColor = cardBorderAltColor = baseColor;
      cardHighlightColor = "#000000";
      cardFontColor = "white";
      cardFontWeight = "500";
      break;
    case "Warning":
      cardBackgroundColor = cardBorderColor = cardBorderAltColor = baseColor;
      cardHighlightColor = "#000000";
      cardFontColor = "black";
      cardFontWeight = "400";
      break;
    case "Stable":
    default:
      cardBackgroundColor = "white";
      cardBorderAltColor = baseColor;
      cardBorderColor = "rgba(0,0,0,.05)";
      cardHighlightColor = baseColor;
      cardFontWeight = "400";
      cardFontColor = Color(baseColor)
        .darken(0.2)
        .string();
  }

  return (
    <CardContainer
      cardBackgroundColor={cardBackgroundColor}
      cardBorderColor={cardBorderColor}
      cardFontColor={cardFontColor}
      cardHighlightColor={cardHighlightColor}
      cardBorderAltColor={cardBorderAltColor}
      width={width}
      height={height}
    >
      <BackgroundIcon status={status} alt={status} />
      <ServiceLink
        to={`/${name}/${version}`}
        onClick={
          status !== "Down" && authorized && metered
            ? null
            : e => e.preventDefault()
        }
        cursor={
          status !== "Down" && authorized && metered ? "pointer" : "not-allowed"
        }
        cardfontcolor={cardFontColor}
      >
        <Title title={titleNameAttribute} cardFontWeight={cardFontWeight}>
          {titleName}
        </Title>
      </ServiceLink>
      <CardFooter cardFontWeight={cardFontWeight}>
        {!metered && (
          <Icon title="Metrics are not available for this service.">
            <NoMetrics />
          </Icon>
        )}
        {!authorized && (
          <Icon title="You do not have permission to manage this service.">
            <NoKey />
          </Icon>
        )}
        {runtime && <Runtime>{runtime}</Runtime>}
        {version && <span>{version}</span>}
        {version &&
          docsLink && (
            <DocsLink href={docsLink}>
              <Icon>
                <Docs />
              </Icon>
            </DocsLink>
          )}
      </CardFooter>
    </CardContainer>
  );
}
