import React from "react";
import { PropTypes } from "prop-types";

BackgroundSquareRoundedSmooth.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const title = "SquareRounded";

function BackgroundSquareRoundedSmooth({
  ratio = 1,
  backgroundColor = "currentColor",
  backgroundOpacity = "1"
}) {
  return (
    <g
      id={title}
      className="iconBackground"
      fillOpacity={backgroundOpacity}
      fill={backgroundColor}
      fillRule="evenodd"
    >
      <path
        d="M24,5.1277704 L24,18.8722296 C24,20.6552671 23.8143488,21.3018396 23.4657346,21.9536914 C23.1171204,22.6055433 22.6055433,23.1171204 21.9536914,23.4657346 C21.3018396,23.8143488 20.6552671,24 18.8722296,24 L5.1277704,24 C3.34473292,24 2.69816044,23.8143488 2.04630859,23.4657346 C1.39445674,23.1171204 0.882879593,22.6055433 0.534265408,21.9536914 C0.185651222,21.3018396 2.18359114e-16,20.6552671 0,18.8722296 L2.76224082e-16,5.1277704 C5.78649679e-17,3.34473292 0.185651222,2.69816044 0.534265408,2.04630859 C0.882879593,1.39445674 1.39445674,0.882879593 2.04630859,0.534265408 C2.69816044,0.185651222 3.34473292,3.27538671e-16 5.1277704,0 L18.8722296,4.14336123e-16 C20.6552671,8.67974518e-17 21.3018396,0.185651222 21.9536914,0.534265408 C22.6055433,0.882879593 23.1171204,1.39445674 23.4657346,2.04630859 C23.8143488,2.69816044 24,3.34473292 24,5.1277704 Z"
        id="Rectangle"
      />
    </g>
  );
}

export default BackgroundSquareRoundedSmooth;
