import React from "react";
import playWhiteSVG from "./play-white.svg";
import "./App.css";
function UserAvatar(props: any) {
  // props: user, width, src (src is for the img)
  return (
    <div
      className={props.className ?? ""}
      style={{ width: props.width, height: "100%" }}
    >
      <div
        className="bg-white"
        style={{
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "100%",
          border:
            props.user?.color === props.winner?.color && props.winner
              ? "0.4rem solid #69923e"
              : "none",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={
            props.src && props.src !== ""
              ? props.src
              : props.user && props.user.avatar !== ""
              ? props.user.avatar
              : playWhiteSVG
          }
          alt=""
        />
      </div>
      <div
        style={{ fontSize: "1.1rem" }}
        className="secondary-text text-center"
      >
        {props.user?.name}
      </div>
    </div>
  );
}

export default UserAvatar;

/*
Could not find a declaration file for module 'three'. 
'/Users/hooooo/Downloads/projects/projects/Chess/Frontend/my-app/node_modules/three/build/three.cjs
' implicitly has an 'any' type. Try `` if it exists or add a new declaration (.d.ts
) file containing `declare module 'three';`
*/
