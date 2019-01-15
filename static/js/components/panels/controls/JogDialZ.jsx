import React from "react";

const jogClick = (axis, step) => {
  console.log(axis + " " + step);
};

const JogDialZ = props => {
  return (
    <g transform="translate(260, 0)">
      <g
        id="+Z"
        fill="#b0b0b0"
        transform="translate(10, 10)"
        pointerEvents="none"
      >
        <path
          className="std"
          d="M5,0 h30 a5,5 0 0,1 5,5 v27 h-40 v-27 a5,5 0 0,1 5,-5 z"
        />
        <path
          className="std"
          d="M20,2 l17,17 h-10 v11 h-14 v-11 h-10 z"
          fill="DarkSeaGreen"
        />
        <text x="11" y="18" fontSize="12">
          +Z
        </text>
      </g>
      <g
        id="Z+10"
        data-ng-click="motoVM.jogZClick('Z10')"
        fill="#d0d0d0"
        transform="translate(10, 10)"
      >
        <title>+10 mm/deg</title>
        <rect className="std" x="0" y="32" width="40" height="28" />
        <circle className="scl" cx="20" cy="45.5" r="12" />
        <text className="scl" x="10.5" y="51" fontSize="16">
          10
        </text>
      </g>
      <g
        id="Z+1"
        data-ng-click="motoVM.jogZClick('Z1')"
        fill="#e0e0e0"
        transform="translate(10, 10)"
      >
        <title>+1 mm/deg</title>
        <rect className="std" x="0" y="60" width="40" height="25" />
        <circle className="scl" cx="20" cy="72.5" r="10" />
        <text className="scl" x="15.5" y="78" fontSize="16">
          1
        </text>
      </g>
      <g
        id="Z+0.1"
        data-ng-click="motoVM.jogZClick('Z0.1')"
        fill="#f0f0f0"
        transform="translate(10, 10)"
      >
        <title>+0.1 mm/deg</title>
        <rect className="std" x="0" y="85" width="40" height="22" />
        <circle className="scl" cx="20" cy="96" r="8.5" />
        <text className="scl" x="14" y="99" fontSize="9">
          0.1
        </text>
      </g>
      <g
        id="ZSpace"
        data-ng-click="motoVM.jogZClick('Zpark')"
        fill="DarkSeaGreen"
        transform="translate(10, 10)"
      >
        <rect className="std" x="0" y="107" width="40" height="26" />
        <use x="10" y="110" width="20" height="20" xlinkHref="#ParkIcon" />
      </g>
      <g
        id="Z-0.1"
        data-ng-click="motoVM.jogZClick('Z-0.1')"
        fill="#f0f0f0"
        transform="translate(10, 10)"
      >
        <title>-0.1 mm/deg</title>
        <rect className="std" x="0" y="133" width="40" height="22" />
      </g>
      <g
        id="Z-1"
        data-ng-click="motoVM.jogZClick('Z-1')"
        fill="#e0e0e0"
        transform="translate(10, 10)"
      >
        <title>-1 mm/deg</title>
        <rect className="std" x="0" y="155" width="40" height="25" />
      </g>
      <g
        id="Z-10"
        data-ng-click="motoVM.jogZClick('Z-10')"
        fill="#d0d0d0"
        transform="translate(10, 10)"
      >
        <title>-10 mm/deg</title>
        <rect className="std" x="0" y="180" width="40" height="28" />
      </g>
      <g
        id="-Z"
        fill="#b0b0b0"
        transform="translate(10, 10)"
        pointerEvents="none"
      >
        <path
          className="std"
          d="M0,208 h40 v27 a5,5 0 0,1 -5,5 h-30 a5,5 0 0,1 -5,-5 z"
        />
        <path
          className="std"
          d="M20,238 l-17,-17 h10 v-11 h14 v11 h10 z"
          fill="DarkSeaGreen"
        />
        <text x="13" y="230" fontSize="12">
          -Z
        </text>
      </g>
    </g>
  );
};

export default JogDialZ;
