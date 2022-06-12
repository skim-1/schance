import React, { Component } from "react";
import '../styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

import Form from 'react-bootstrap/Form'
/*
const r = {
  "PublicKeyBase58Check": item.SenderMessagingPublicKey
};
const res = await deso.user.getSingleProfile(r);
await tclog.push(res.Profile.Username);
*/
const Chatbox = props => {
    //props.highlight
    var otherName = "";
    var yourName = "";

    var totalScore = "";
    var msgCount = "";

    return (
    <div>
          <div> {

          props.msgs.map((item_, index_) => {

            props.usrs.map((item, index) => {
              if (item.key === item_.SenderMessagingPublicKey) {
                otherName = item.username;
              }
            })

            console.log(yourName);
            if (item_.SenderMessagingPublicKey === props.currentUser && item_.RecipientMessagingPublicKey === props.usrkey) {
            var Sentiment = require('sentiment');
            var sentiment = new Sentiment();
            var result = sentiment.analyze(item_.DecryptedMessage);

            totalScore += result.score;
            msgCount += 1;

            console.log(totalScore/msgCount);

            return (<div key={index_}>
              {

              otherName + ": " + item_.DecryptedMessage
              }<br/>
            </div>);
          } else if (item_.SenderMessagingPublicKey === props.usrkey && item_.RecipientMessagingPublicKey === props.currentUser) {
            return (<div key={index_}>
              {
              props.username + ": " + item_.DecryptedMessage
              }<br/></div>);
              }
          })
          }
          </div>
      <Form>
                              <Form.Label>Message <input type="text" value={props.value} onChange={props.handleChange} /> </Form.Label>


                            <Button variant="primary" onClick={() => props.sendMsg(
                                  props.usrkey,
                                  props.currentUser,
                                  props.value)}>
                              Send
                            </Button>
                          </Form>
                          </div>
    );
};

export default Chatbox;
