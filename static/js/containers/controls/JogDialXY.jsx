import React from "react";

const JogDialXY = props => {
  return (
    <g>
      <g
        id="HomeAll"
        onClick={() => props.onHome()}
        transform="translate(10, 10)"
      >
        <title>Home all axis</title>
        <path
          className="std"
          d="M10 182.5 h-10 v57.5 h57.5 v-10 a 125,125 0 0,1 -47.5 -47.5 Z"
          fill="#f0f0f0"
        />
        <use x="3" y="217" width="20" height="18" xlinkHref="#HomeIcon" />
      </g>

      <g
        id="ParkX"
        onClick={() => props.onPark("x")}
        transform="translate(10, 10)"
      >
        <title>Park X axis</title>
        <path
          className="std"
          d="M10 57.50 h-10 v-57.5 h57.5 v10 a 125,125 0 0,0 -47.5 47.5 Z"
          fill="Khaki"
        />
        <use x="3" y="5" width="20" height="20" xlinkHref="#ParkIcon" />
        <text x="25" y="20" className="home">
          X
        </text>
      </g>
      <g
        id="ParkY"
        onClick={() => props.onPark("y")}
        transform="translate(10, 10)"
      >
        <title>Park Y axis</title>
        <path
          className="std"
          d="M230 57.50 h10 v-57.5 h-57.5 v10 a 125,125 0 0,1 47.5 47.5 z"
          fill="SteelBlue"
        />
        <use x="217" y="5" width="20" height="20" xlinkHref="#ParkIcon" />
        <text x="202" y="20" className="home">
          Y
        </text>
      </g>

      <g
        id="ParkXY"
        onClick={() => props.onPark("xy")}
        transform="translate(10, 10)"
      >
        <title>Park X and Y axis</title>
        <path
          className="std"
          d="M230 182.5 h10 v57.5 h-57.5 v-10 a 125,125 0 0,0 47.5 -47.5 z"
          fill="DarkSeaGreen"
        />
        <use x="217" y="217" width="20" height="20" xlinkHref="#ParkIcon" />
        <text x="202" y="232" className="home">
          X
        </text>
        <text x="222" y="212" className="home">
          Y
        </text>
      </g>

      <g
        id="Jog100"
        fill="#c0c0c0"
        className="std"
        transform="translate(10, 10)"
      >
        <g
          id="Y+100"
          onClick={() => props.onJog("y", 100)}
          transform="translate(120 120)"
        >
          <title>+100 mm</title>
          <path
            className="std"
            d="M-60 -67.07 L-75.93,-83 A112.5,112.5 0 0,1 75,-83 L60,-67.07 A90,90 0 0,0 -60.00,-67.07 z"
          />
        </g>
        <g
          id="X+100"
          onClick={() => props.onJog("x", 100)}
          transform="translate(120 120)"
        >
          <title>+100 mm</title>
          <path
            className="std"
            d="M67.07,-60 L83,-75.93 A112.5,112.5 0 0,1 83,75.93 L67.07,60 A90,90 0 0,0 67.07,-60"
          />
        </g>
        <g
          id="Y-100"
          onClick={() => props.onJog("y", -100)}
          transform="translate(120 120)"
        >
          <title>-100 mm</title>
          <path
            className="std"
            d="M-60,67.07 L-75.93,83 A112.5,112.5 0 0,0 75,83 L60,67.07 A90,90 0 0,1 -60.00,67.07 z"
          />
        </g>
        <g
          id="X-100"
          onClick={() => props.onJog("x", -100)}
          transform="translate(120 120)"
        >
          <title>-100 mm</title>
          <path
            className="std"
            d="M-67.07,-60 L-83,-75.93 A112.5,112.5 0 0,0 -83,75.93 L-67.07,60 A90,90 0 0,1 -67.07,-60 z"
          />
        </g>
      </g>

      <g id="Jog10" fill="#d0d0d0" transform="translate(10, 10)">
        <g
          id="Y+10"
          onClick={() => props.onJog("y", 10)}
          transform="translate(120 120)"
        >
          <title>+10 mm</title>
          <path
            className="std"
            d="M-44.06 -51.13 L-60,-67.07 A90,90 0 0,1 60,-67 L44.06,-51.13 A67.5,67.5 0 0,0 -44.06,-51.13 z"
          />
        </g>
        <g
          id="X+10"
          onClick={() => props.onJog("x", 10)}
          transform="translate(120 120)"
        >
          <title>+10 mm</title>
          <path
            className="std"
            d="M51.13 44.06 L67.07,60 A90,90 0 0,0 67.07,-60 L51.13,-44.06 A67.5,67.5 0 0,1 51.13,44.06 z"
          />
        </g>
        <g
          id="Y-10"
          onClick={() => props.onJog("y", -10)}
          transform="translate(120 120)"
        >
          <title>-10 mm</title>
          <path
            className="std"
            d="M-44.06 51.13 L-60,67.07 A90,90 0 0,0 60,67 L44.06,51.13 A67.5,67.5 0 0,1 -44.06,51.13 z"
          />
        </g>
        <g
          id="X-10"
          onClick={() => props.onJog("x", -10)}
          transform="translate(120 120)"
        >
          <title>-10 mm</title>
          <path
            className="std"
            d="M-51.13 44.06 L-67.07,60 A90,90 0 0,1 -67.07,-60 L-51.13,-44.06 A67.5,67.5 0 0,0 -51.13,44.06 z"
          />
        </g>
      </g>

      <g id="Jog1" fill="#e0e0e0" transform="translate(10, 10)">
        <g
          id="Y+1"
          onClick={() => props.onJog("y", 1)}
          transform="translate(120 120)"
        >
          <title>+1 mm</title>
          <path
            className="std"
            d="M-28.09 -35.16 L-44.06,-51.13 A67.5,67.5 0 0,1 44.06,-51.13 L28.09,-35.16 A45,45 0 0,0 -28.09,-35.16 z"
          />
        </g>
        <g
          id="X+1"
          onClick={() => props.onJog("x", 1)}
          transform="translate(120 120)"
        >
          <title>+1 mm</title>
          <path
            className="std"
            d="M35.16 -28.09 L51.13,-44.06 A67.5,67.05 0 0,1 51.13,44.06 L35.16,28.09 A45,45 0 0,0 35.16,-28.09 z"
          />
        </g>
        <g
          id="Y-1"
          onClick={() => props.onJog("y", -1)}
          transform="translate(120 120)"
        >
          <title>-1 mm</title>
          <path
            className="std"
            d="M-28.09 35.16 L-44.06,51.13 A67.5,67.5 0 0,0 44.06,51.13 L28.09,35.16 A45,45 0 0,1 -28.09,35.16 z"
          />
        </g>
        <g
          id="X-1"
          onClick={() => props.onJog("x", -1)}
          transform="translate(120 120)"
        >
          <title>-1 mm</title>
          <path
            className="std"
            d="M-35.16 -28.09 L-51.13,-44.06 A67.5,67.05 0 0,0 -51.13,44.06 L-35.16,28.09 A45,45 0 0,1 -35.16,-28.09 z"
          />
        </g>
      </g>

      <g id="Jog0_1" fill="#f0f0f0" transform="translate(10, 10)">
        <g
          id="Y+0.1"
          onClick={() => props.onJog("y", 0.1)}
          transform="translate(120 120)"
        >
          <title>+0.1 mm</title>
          <path
            className="std"
            d="M-28.09 -35.16 A45,45 0 0,1 29.09,-35.16 L0,-7.07 z"
          />
        </g>
        <g
          id="X+0.1"
          onClick={() => props.onJog("x", 0.1)}
          transform="translate(120 120)"
        >
          <title>+0.1 mm</title>
          <path
            className="std"
            d="M35.16 -28.09 A45,45 0 0,1 35.16,28.09 L7.07,0 z"
          />
        </g>
        <g
          id="Y-0.1"
          onClick={() => props.onJog("y", -0.1)}
          transform="translate(120 120)"
        >
          <title>-0.1 mm</title>
          <path
            className="std"
            d="M-28.09 35.16 A45,45 0 0,0 29.09,35.16 L0,7.07 z"
          />
        </g>
        <g
          id="X-0.1"
          onClick={() => props.onJog("x", -0.1)}
          transform="translate(120 120)"
        >
          <title>-0.1 mm</title>
          <path
            className="std"
            d="M-35.16 -28.09 A45,45 0 0,0 -35.16,28.09 L-7.07,0 z"
          />
        </g>
      </g>
      <g id="RoseScale">
        <g>
          <circle className="scl" cx="154" cy="106" r="9.5" />
          <text className="scl" x="147" y="109" fontSize="10">
            0.1
          </text>
        </g>
        <g>
          <circle className="scl" cx="169.5" cy="90.5" r="10.5" />
          <text className="scl" x="165" y="95" fontSize="14">
            1
          </text>
        </g>
        <g>
          <circle className="scl" cx="185" cy="75" r="12" />
          <text className="scl" x="176" y="80" fontSize="15">
            10
          </text>
        </g>
        <g>
          <circle className="scl" cx="205" cy="55" r="15" />
          <text className="scl" x="192" y="60" fontSize="15">
            100
          </text>
        </g>
      </g>

      <g
        id="DecorationArrows"
        pointerEvents="none"
        fontWeight="900"
        fontSize="11"
        fillOpacity=".6"
      >
        <g>
          <path
            className="std"
            d="M130,30 l17,17 h-10 v11 h-14 v-11 h-10 z"
            fill="SteelBlue"
          />
          <text x="123" y="47">
            +Y
          </text>
        </g>
        <g>
          <path
            className="std"
            d="M130,230 l17,-17 h-10 v-11 h-14 v11 h-10 z"
            fill="SteelBlue"
          />
          <text x="123" y="222">
            -Y
          </text>
        </g>
        <g>
          <path
            className="std"
            d="M30,130 l17,17 v-10 h11 v-14 h-11 v-10 z"
            fill="Khaki"
          />
          <text x="37" y="134">
            -X
          </text>
        </g>
        <g>
          <path
            className="std"
            d="M230,130 l-17,-17 v10 h-11 v14 h11 v10 z"
            fill="Khaki"
          />
          <text x="206" y="134">
            +X
          </text>
        </g>
      </g>
    </g>
  );
};

export default JogDialXY;
