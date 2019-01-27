import React from "react";
import JogDialXY from "./JogDialXY";
import JogDialZ from "./JogDialZ";
import JogDialAngle from "./JogDialAngle";
import SpeedKnob from "./SpeedKnob";
import "../../../../css/jogdial.css";

const JogDial = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <JogDialXY {...props} />
      {props.nozzleCarriage && <JogDialZ {...props} />}
      {props.nozzleCarriage && <JogDialAngle {...props} />}
      <SpeedKnob />
      <defs>
        <filter id="f1" x="-1" y="-1" width="300%" height="300%">
          <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>

        <symbol id="HomeIcon" viewBox="0 0 20 18" pointerEvents="none">
          <desc>Home Icon</desc>
          <path
            className="home"
            d="M3,18 v-8 l7,-6 l7,6 v8 h-5 v-6 h-4 v6 z"
            fill="black"
          />
          <path
            className="home"
            d="M0,10 l10-8.5 l10,8.5"
            strokeWidth="1.5"
            fill="none"
          />
          <path className="home" d="M15,3 v2.8 l1,.8 v-3.6 z" />
        </symbol>

        <symbol id="ParkIcon" viewBox="0 0 20 20">
          <desc>Park Icon</desc>
          <rect
            className="park"
            width="20"
            height="20"
            x="0"
            y="0"
            rx="2.5"
            ry="2.5"
          />
          <text className="park" x="5" y="15.5">
            P
          </text>
        </symbol>
      </defs>
    </svg>
  );
};

export default JogDial;
