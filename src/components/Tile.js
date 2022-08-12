import React from "react";

export default function Tile(props) {
  let shipTypeHover;
  if (props.isMissed === true) {
    shipTypeHover = "tileface ship miss";
  } else if (props.isShipPlaced === true && !props.isShot) {
    shipTypeHover = "tileface ship";
  } else if (props.isShot === true) {
    shipTypeHover = "tileface ship shot";
  } else {
    shipTypeHover = "tileface";
  }
  return <div onClick={props.onClick} className={shipTypeHover}></div>;
}
