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

    return (
    <div>
      <table>
          <th>
          <div> {

          props.msgs.map((item_, index_) => {

            props.usrs.map((item, index) => {
              if (item.key === item_.SenderMessagingPublicKey) {
                otherName = item.username;
              } else if (item.key === props.usrkey) {
                yourName = item.username;
              }
            })


            if (item_.SenderMessagingPublicKey === props.currentUser && item_.RecipientMessagingPublicKey === props.usrkey) {
            return (<div key={index_}>
              {

              otherName + ": " + item_.DecryptedMessage
              }<br/>
            </div>);
          } else if (item_.SenderMessagingPublicKey === props.usrkey && item_.RecipientMessagingPublicKey === props.currentUser) {
            return (<div key={index_}>
              {

              yourName + ": " + item_.DecryptedMessage
              }<br/></div>);
              }
          })
          }
          </div>
        </th>
      </table>
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
