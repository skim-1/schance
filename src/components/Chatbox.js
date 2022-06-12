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
    return (
    <div>
      <table>
          <th>
          <div> {
          props.msgs.map((item_, index_) => {
            console.log(props.currentUser);
            if (item_.SenderMessagingPublicKey == props.currentUser || item_.RecipientMessagingPublicKey == props.currentUser) {
            console.log(item_.DecryptedMessage);
            return (<div key={index_}>
              {

              item_.DecryptedMessage
              }<br/>
            </div>);
            }
          })
          }
          </div>
        </th>
      </table>
      <Form>
                              <Form.Label>Message <input type="text" value={props.value} onChange={props.handleChange} /> </Form.Label>


                            <Button variant="primary" onClick={() => props.sendMsg(
                                  "BC1YLgaCiCZ32rAxTAYLA8HamjsWV6nuzqBBN5aZMnRC3zMWU29cuTh",
                                  "BC1YLjWEweJVskpFCHM4MetYGxe2noKFMAUP6q8LareV84WZfak5wMX",
                                  props.value)}>
                              Send
                            </Button>
                          </Form>
                          </div>
    );
};

export default Chatbox;
