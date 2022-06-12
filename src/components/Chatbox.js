import React, { Component } from "react";
import '../styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

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
      <table>
          <th>
          <div> {
          props.msgs.map((item_, index_) => (
            <div key={index_}>
              {item_.DecryptedMessage}<br/>
            </div>
          ))
          }
          </div>
        </th>
      </table>
    );
};

export default Chatbox;
