import React from "react";
import styled from "styled-components";

import decipherLogo from "../images/decipherLogo.svg";

import {
  FONT_SIZE_BASE,
  COLOR_SIDEBAR_BACKGROUND
} from "../style/styleVariables";
import { contrastColor, spacingScale } from "../style/styleFunctions";

const AppVersion = "0.5.0";
const BrandName = "Fabric";

const APP_HEADER_HEIGHT = spacingScale(4.25);
const APP_HEADER_FONT_SIZE = FONT_SIZE_BASE;

const BRANDBAR_BACKGROUND_COLOR = COLOR_SIDEBAR_BACKGROUND.string();
const BRANDBAR_TEXT_COLOR = contrastColor(COLOR_SIDEBAR_BACKGROUND).string();
const BRANDBAR_BRAND_SPACING = spacingScale(1);

const AppBrandBar = styled.nav`
  background-color: ${BRANDBAR_BACKGROUND_COLOR};
  flex: 0 0 ${APP_HEADER_HEIGHT};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${spacingScale(0.5)};
  font-size: ${APP_HEADER_FONT_SIZE};
  color: ${BRANDBAR_TEXT_COLOR};
`;

const BrandContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
`;

const BrandLogo = styled.img`
  margin: 0 8px;
  max-height: ${Math.round(
    (parseInt(APP_HEADER_HEIGHT, 10) - parseInt(BRANDBAR_BRAND_SPACING, 10)) / 2
  )}px;
  width: auto;
`;

const BrandText = styled.span`
  font-weight: 500;
  letter-spacing: 0.03em;
  flex: 0 0 auto;
  font-size: 16px;
  color: white;
`;

const AppVersionLink = styled.a`
  font-weight: 600;
  font-size: 11px;
  flex: 0 0 auto;
  opacity: 0.5;
  padding: 0 8px;
  color: inherit;

  &:hover {
    opacity: 1;
  }
`;

/** Sidebar Branding and Versioning */
const SidebarHeader = () => {
  return (
    <AppBrandBar>
      <BrandContainer>
        <BrandLogo alt={`${BrandName} Logo`} src={decipherLogo} />
        <BrandText>{BrandName}</BrandText>
      </BrandContainer>

      <AppVersionLink
        href="https://github.com/DecipherNow/gm-fabric-dashboard/blob/master/CHANGELOG.md"
        rel="noopener noreferrer"
        target="_blank"
      >
        {AppVersion}
      </AppVersionLink>
    </AppBrandBar>
  );
};

export default SidebarHeader;
