import React, { SVGProps } from "react";

interface GoogleIconProps extends SVGProps<SVGSVGElement> {}

const GoogleIcon: React.FC<GoogleIconProps> = (props) => (
  <svg
    id="Capa_1"
    viewBox="0 0 150 150"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    enableBackground="new 0 0 150 150" // Move this property outside of `style`
    {...props}
  >
    <style type="text/css">
      {`
        .st0{fill:#1A73E8;}
        .st1{fill:#EA4335;}
        .st2{fill:#4285F4;}
        .st3{fill:#FBBC04;}
        .st4{fill:#34A853;}
        .st5{fill:#4CAF50;}
        .st6{fill:#1E88E5;}
        .st7{fill:#E53935;}
        .st8{fill:#C62828;}
        .st9{fill:#FBC02D;}
        .st10{fill:#1565C0;}
        .st11{fill:#2E7D32;}
        .st12{fill:#F6B704;}
        .st13{fill:#E54335;}
        .st14{fill:#4280EF;}
        .st15{fill:#34A353;}
      `}
    </style>
    <g>
      <path
        className="st14"
        d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5C115,101.8,120,90,120,76.1L120,76.1z"
      />
      <path
        className="st15"
        d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z"
      />
      <path
        className="st12"
        d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z"
      />
      <path
        className="st13"
        d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z"
      />
    </g>
  </svg>
);

export default GoogleIcon;
