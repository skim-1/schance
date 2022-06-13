import React, { Component } from "react";
import "../styles/App.css";
import Button from "react-bootstrap/Button";
import Deso from "deso-protocol";

import Form from "react-bootstrap/Form";
/*
const r = {
  "PublicKeyBase58Check": item.SenderMessagingPublicKey
};
const res = await deso.user.getSingleProfile(r);
await tclog.push(res.Profile.Username);
*/
const Chatbox = (props) => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  //props.highlight
  var otherName = "";
  var yourName = "";

  var totalScore = 0;
  var msgCount = 0;

  if (props.currentUser !== "") {
    return (
      <div className="container-column blue-hover">
        <div className="container-column">
          {" "}
          {props.msgs.map((item_, index_) => {
            props.usrs.map((item, index) => {
              if (item.key === item_.SenderMessagingPublicKey) {
                otherName = item.username;
              }
            });

            if (
              item_.SenderMessagingPublicKey === props.currentUser &&
              item_.RecipientMessagingPublicKey === props.usrkey
            ) {
              var Sentiment = require("sentiment");
              var sentiment = new Sentiment();
              var result = sentiment.analyze(item_.DecryptedMessage);

              totalScore += result.score;
              msgCount++;

              var avg = totalScore / msgCount;
              console.log(totalScore);
              console.log(avg.toFixed(2)); // truncated number

              return (
                <div key={index_}>
                {otherName + ": " + item_.DecryptedMessage}
                <br />
                </div>
              );
            } else if (
              item_.SenderMessagingPublicKey === props.usrkey &&
              item_.RecipientMessagingPublicKey === props.currentUser
            ) {
              return (
                <div key={index_}>
                {props.username + ": " + item_.DecryptedMessage}
                <br />
                </div>
              );
            }
          })}
        </div>
        <div className="container-fourth white">
          <Form className="container-whole blue-hover center" onSubmit={onSubmit}>
            <Form.Label className="container-whole blue-hover center" style={{margin: "0px", height: "90%"}}>
              <input
                type="text"
                value={props.value}
                className="message-box"
                onChange={props.handleChange}
              />{" "}
            </Form.Label>
            <button
              type="submit"
              className="send-button"
              onClick={() =>
                props.sendMsg(props.usrkey, props.currentUser, props.value)
              }
            >
              Send
            </button>
          </Form>
        </div>
      </div>
    );
  } else {
    //this is what displays when no one is selected
    return (
        <div className="container-whole blue center">
          <h1 className="white-text">Who are we messaging today?</h1>
        </div>
    );
  }
};

export default Chatbox;
