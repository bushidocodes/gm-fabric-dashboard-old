import styled from "styled-components";

const ExtrasContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

export default ExtrasContainer;
