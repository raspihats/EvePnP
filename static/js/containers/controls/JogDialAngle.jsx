import React from "react";

const JogDialAngle = props => {
  const axis = props.axis ? props.axis : "A";

  return (
    <g transform="translate(0, 260)">
      <g
        id={"ccw" + axis}
        fill="#b0b0b0"
        transform="translate(10, 10)"
        pointerEvents="none"
      >
        <title>CounterClockWise rotation</title>
        <path
          className="std"
          d="M0,5 a 5 5 0 0 1 5 -5 h27 v40 h-27 a 5 5 0 0 1 -5 -5 v-30 z"
        />
        <path
          className="std"
          transform="translate(30, 6) scale(-1,1)"
          fill="DarkSeaGreen"
          d="M24 0.6 h3.2 v10 h-10 v-3.2 h4 a 10 10 0 1 0 2.8 6.6 h3.2 a 13.4 13.4 0 1 1 -3.2 -8.4 z"
        />
        <text x="12" y="24" fontSize="12">
          {axis}
        </text>
      </g>
      <g
        id={"ccw" + axis + "10"}
        data-ng-click="motoVM.jogZClick('Z10')"
        fill="#d0d0d0"
        transform="translate(10, 10)"
      >
        <title>-10 deg</title>
        <rect className="std" x="32" y="0" width="28" height="40" />
      </g>
      <g
        id={"ccw" + axis + "1"}
        data-ng-click="motoVM.jogZClick('Z1')"
        fill="#e0e0e0"
        transform="translate(10, 10)"
      >
        <title>-1 deg</title>
        <rect className="std" x="60" y="0" width="25" height="40" />
      </g>
      <g
        id={"ccw" + axis + "0.1"}
        data-ng-click="motoVM.jogZClick('Z0.1')"
        fill="#f0f0f0"
        transform="translate(10, 10)"
      >
        <title>-0.1 deg</title>
        <rect className="std" x="85" y="0" width="22" height="40" />
      </g>
      <g
        id={"Park" + axis}
        data-ng-click="motoVM.jogZClick('Zpark')"
        fill="DarkSeaGreen"
        transform="translate(10, 10)"
      >
        <title>{"Park " + axis}</title>
        <rect className="std" x="107" y="0" width="26" height="40" />
        <use x="110" y="10" width="20" height="20" xlinkHref="#ParkIcon" />
      </g>
      <g
        id={"cw" + axis + "0.1"}
        data-ng-click="motoVM.jogZClick('Z-0.1')"
        fill="#f0f0f0"
        transform="translate(10, 10)"
      >
        <title>+0.1 deg</title>
        <rect className="std" x="133" y="0" width="22" height="40" />
        <circle className="scl" cx="144" cy="20" r="8.5" />
        <text className="scl" x="137.5" y="23" fontSize="9">
          0.1
        </text>
      </g>
      <g
        id={"cw" + axis + "1"}
        data-ng-click="motoVM.jogZClick('Z-1')"
        fill="#e0e0e0"
        transform="translate(10, 10)"
      >
        <title>+1 deg</title>
        <rect className="std" x="155" y="0" width="25" height="40" />
        <circle className="scl" cx="167.5" cy="19.5" r="10" />
        <text className="scl" x="163" y="24.5" fontSize="16">
          1
        </text>
      </g>
      <g
        id={"cw" + axis + "10"}
        data-ng-click="motoVM.jogZClick('Z-10')"
        fill="#d0d0d0"
        transform="translate(10, 10)"
      >
        <title>+10 deg</title>
        <rect className="std" x="180" y="0" width="28" height="40" />
        <circle className="scl" cx="193.5" cy="19.5" r="12" />
        <text className="scl" x="184.5" y="24.5" fontSize="16">
          10
        </text>
      </g>
      <g
        id={"cw" + axis}
        fill="#b0b0b0"
        transform="translate(10, 10)"
        pointerEvents="none"
      >
        <title>ClockWise rotation</title>
        <path
          className="std"
          d="M208,0 h27 a 5 5 0 0 1 5 5 v30 a 5 5 0 0 1 -5 5 h-27 v-40 z"
        />
        <path
          className="std"
          transform="translate(210,6)"
          fill="DarkSeaGreen"
          d="M24 0.6 h3.2 v10 h-10 v-3.2 h4 a 10 10 0 1 0 2.8 6.6 h3.2 a 13.4 13.4 0 1 1 -3.2 -8.4 z"
        />
        <text x="220" y="24" fontSize="12">
          {props.axis ? props.axis : "A"}
        </text>
      </g>
    </g>
  );
};

export default JogDialAngle;
