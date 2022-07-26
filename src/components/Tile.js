import React from "react";

export default function Tile(props) {
  let shipTypeHover;
  if (props.isShipPlaced === true) {
    shipTypeHover = "tileface ship";
  } else if (props.isShot === true) {
    shipTypeHover = "tileface ship shot";
  } else {
    shipTypeHover = "tileface";
  }
  return <div onClick={props.onClick} className={shipTypeHover}></div>;
}
