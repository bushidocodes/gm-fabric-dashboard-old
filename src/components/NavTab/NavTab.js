import { PropTypes } from "prop-types";
import React from "react";

import Icon from "components/Icon";
import Glyph from "components/Glyphs/";
import styled from "styled-components";

import { COLOR_HIGHLIGHT } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

NavTab.propTypes = {
  active: PropTypes.bool, // If the button should be style as active or not
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  clickAction: PropTypes.any.isRequired, // click handler
  disabled: PropTypes.bool, // disables the button
  glyph: PropTypes.string, // Glyph to display in the button
  glyphColor: PropTypes.string, // Color for the glyph
  glyphRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Relative size for the glyph
  iconSize: PropTypes.string,
  label: PropTypes.string.isRequired // label for the button
};

const NavTabWrap = styled.a`
  display: flex;
  align-items: center;
  padding: ${spacingScale(1)};
  cursor: pointer;
  line-height: 0;

  &:hover {
    box-shadow: inset 0 -1px;
  }

  ${props =>
    props.active &&
    `
    &,
    &:hover {
      box-shadow: inset 0 -2px ${COLOR_HIGHLIGHT.string()};
    }
  `};
`;

/**
 * General purpose button
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
function NavTab({
  active,
  children,
  clickAction,
  disabled,
  glyph,
  glyphRatio,
  glyphColor,
  label,
  iconSize
}) {
  return (
    <NavTabWrap
      active={active}
      disabled={disabled}
      clickAction={clickAction}
      title={label}
      iconSize={iconSize}
    >
      {glyph && (
        <Icon>
          <Glyph glyphColor={glyphColor} name={glyph} ratio={glyphRatio} />
        </Icon>
      )}
      {children}
      <span>{label}</span>
    </NavTabWrap>
  );
}

export default NavTab;