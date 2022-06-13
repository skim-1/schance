import React, { Component } from "react";
import "../styles/App.css";
import Button from "react-bootstrap/Button";
import Deso from "deso-protocol";

/*
const r = {
  "PublicKeyBase58Check": item.SenderMessagingPublicKey
};
const res = await deso.user.getSingleProfile(r);
await tclog.push(res.Profile.Username);
*/
const Chats = (props) => {
  //props.highlight
  return (
    <div className="container-column blue-hover" style={{alignItems: "center"}}>
        {props.usrs.map((item, index) => {
          return (
            <button
            style={{ backgroundColor: item.check ? "#8a97ff" : "white" }}
            className="friend-button"
            onClick={() => props.handleCheck(index)}
            key={index}
            >
            {item.username}
            </button>
          );
        })}
    </div>
  );
};

export default Chats;
