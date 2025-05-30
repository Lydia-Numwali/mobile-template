import * as React from "react";
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg";
const Rise = (props:SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Mask
      id="mask0_0_1777"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H19.9999V19.9999H0V0Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_0_1777)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.04929 11.3421L19.6207 1.34214C19.9079 1.18857 20.0529 0.856429 19.975 0.541429C19.8964 0.222857 19.6121 0.00285714 19.2857 0H15V1.42857H16.4286L0.379286 10.0864L1.04929 11.3421ZM15.7143 18.5714H18.5714V7.14286H15.7143V18.5714ZM19.2857 5.71429H15C14.6064 5.71429 14.2857 6.035 14.2857 6.42857V19.2857C14.2857 19.6793 14.6064 20 15 20H19.2857C19.6793 20 20 19.6793 20 19.2857V6.42857C20 6.035 19.6793 5.71429 19.2857 5.71429ZM8.57143 18.5714H11.4286V10H8.57143V18.5714ZM7.85714 8.57143C7.46286 8.57143 7.14286 8.89214 7.14286 9.28571V19.2857C7.14286 19.6793 7.46286 20 7.85714 20H12.1429C12.5364 20 12.8571 19.6793 12.8571 19.2857V9.28571C12.8571 8.89214 12.5364 8.57143 12.1429 8.57143H7.85714ZM1.42857 18.5714H4.28571V14.2857H1.42857V18.5714ZM0.714286 20H5C5.39357 20 5.71429 19.6793 5.71429 19.2857V13.5714C5.71429 13.1779 5.39357 12.8571 5 12.8571H0.714286C0.32 12.8571 0 13.1779 0 13.5714V19.2857C0 19.6793 0.32 20 0.714286 20Z"
        fill="#1D1D1B"
      />
    </G>
  </Svg>
);
export default Rise;
