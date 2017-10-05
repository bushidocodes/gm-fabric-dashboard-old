import Color from "color";

import { contrastColor } from "./styleFunctions";
import { injectGlobal } from "styled-components";
import Nunito400 from "./fonts/Nunito/Nunito-Regular.ttf";
import Nunito600 from "./fonts/Nunito/Nunito-SemiBold.ttf";
import Rubik400 from "./fonts/Rubik/Rubik-Regular.ttf";
import Rubik500 from "./fonts/Rubik/Rubik-Medium.ttf";
import Rubik700 from "./fonts/Rubik/Rubik-Bold.ttf";
import SourceCodePro400 from "./fonts/Source_Code_Pro/SourceCodePro-Regular.ttf";

export const COLOR_BRAND_PRIMARY = Color("#0aab2a");
export const COLOR_BRAND_SECONDARY = Color("#002e6e");

export const COLOR_RED = Color("#E4251A");
export const COLOR_BLACK = Color("#000");
export const COLOR_GREEN = Color("#0aab2a");
export const COLOR_WHITE = Color("#fff");

export const COLOR_HIGHLIGHT = COLOR_BRAND_PRIMARY;
export const COLOR_SUCCESS = Color("#0aab2a");
export const COLOR_DANGER = Color("red");
export const COLOR_WARNING = Color("#FAC60F");
export const COLOR_INFO = Color("blue");

// Theme Configuration
export const COLOR_SIDEBAR_BACKGROUND = COLOR_BLACK;
export const COLOR_CONTENT_BACKGROUND = COLOR_WHITE;

export const BORDER_RADIUS_BASE = "3px";
export const PADDING_BASE = "8px";

// Contrasts
export const DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO = 2;
export const CONTRAST_INTERVAL = "4%";
export const COLOR_CONTENT = contrastColor(COLOR_CONTENT_BACKGROUND, 0.2).fade(
  0.1
);
export const COLOR_CONTENT_MUTED = COLOR_CONTENT.fade(0.2);

// Color Ranges
// $colors-datarange-blue-to-red: #3a76b1, #6993c2, #95b2d2, #c4d2e1, #f1f1f1,
//   #e8cdd2, #dfa9b0, #d48491, #ca6070;
// $colors-datarange-blueberry-kiwi: #1d334c, #486488, #d4e3ef, #76a834, #d2e3b4;
// $colors-datarange-seaweed: #1eb0d4, #127389, #1aa34e, #128a42, #bed857;
// $colors-datarange-rainbow-4: custom-color-range(
//   $base-color-1: complement($color-brand-primary),
//   $type: qualitative,
//   $size: 4
// );
// $colors-datarange-subtle-18: custom-color-range(
//   $base-color-1: $color-brand-primary,
//   $type: quantitative,
//   $direction: to-dark,
//   $size: 18
// );
// $colors-datarange-desert-8: custom-color-range(
//   $base-color-1: #e0c39c,
//   $type: quantitative,
//   $direction: to-dark,
//   $size: 8
// );
// $colors-datarange-autumn-4: custom-color-range(
//   $base-color-1: orange,
//   $type: quantitative,
//   $direction: to-light,
//   $size: 4
// );

// Typography

// Inject custom font-faces directly into the global CSS generated by styled-components
// See injectGlobal in https://www.styled-components.com/docs/api

injectGlobal`
  @font-face {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 400;
    src: url(${Nunito400});
  }
  @font-face {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 600;
    src: url(${Nunito600});
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    src: url(${Rubik400});
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 500;
    src: url(${Rubik500})
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 700;
    src: url(${Rubik700});
  }
  @font-face {
    font-family: "SourceCodePro";
    font-style: normal;
    font-weight: 400;
    src: url(${SourceCodePro400});
  }
`;

// Backup font list
export const FONT_GROUP_SYSTEM = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`;

// Fonts for specific use
export const FONT_GROUP_MAIN_TEXT = "Nunito";
export const FONT_GROUP_DATA = "Rubik";
export const FONT_GROUP_CODE = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;
export const FONT_GROUP_DATA_MONO = "Source Code Pro";

export const FONT_STACK_BASE = `${FONT_GROUP_MAIN_TEXT}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_DATA = `${FONT_GROUP_DATA}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_DATA_MONO = `${FONT_GROUP_DATA_MONO}, ${FONT_GROUP_DATA}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_CODE = FONT_GROUP_CODE;

export const LINE_HEIGHT_BASE = 1.4;
export const FONT_WEIGHT_BASE = 500;
export const FONT_SIZE_HERO = "32px";
export const FONT_SIZE_LG = "18px";
export const FONT_SIZE_BASE = "14px";
export const FONT_SIZE_SM = "11px";
export const FONT_SIZE_XS = "9px";
