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
      <div className="container-whole column">
        <div className="column login-gradient hold" style={{overflow: "auto"}}>
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
              const xMax = 1080;
              const xMin = 0;
              const yMax = 5.0;
              const yMin = 0.0;
              var avg = totalScore / msgCount;
              const percent = (avg - yMin) / (yMax - yMin);
              const outputX = percent * (xMax - xMin) + xMin;
              console.log(totalScore);
              console.log(outputX);
              console.log(avg.toFixed(2)); // truncated number
              document.getElementById("little-box").style.top = (outputX+"px");

              return (
                <div key={index_} style={{backgroundColor: "pink", borderRadius: "10px", maxWidth: "650px", marginTop: "10px", paddingTop: "0px", paddingLeft: "5px", marginLeft: "20px"}}>
                {otherName + ": " + item_.DecryptedMessage}
                <br />
                </div>
              );
            } else if (
              item_.SenderMessagingPublicKey === props.usrkey &&
              item_.RecipientMessagingPublicKey === props.currentUser
            ) {
              return (
                <div key={index_} className="blue-hover" style={{flex: "0.05", borderRadius: "10px", maxWidth: "650px", marginTop: "10px", paddingTop: "0px", paddingLeft: "5px", marginLeft: "5px"}}>
                {props.username + ": " + item_.DecryptedMessage}
                <br />
                </div>
              );
            }
          })}
        </div>
        <div className="white" style={{overflow: "auto", minHeight: "90px", maxHeight: "90px"}}>
          <Form className="container-whole blue-hover" onSubmit={onSubmit} style={{padding: "8px", minHeight: "90px", maxHeight: "90px"}}>
            <Form.Label className="container-whole blue-hover">
              <input
                type="text"
                value={props.value}
                className="message-box"
                onChange={props.handleChange}
              />{" "}
            </Form.Label>
            <button
              style={{display: "none"}}
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
