import React, { Component } from "react";
import '../styles/Chats.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

/*
const r = {
  "PublicKeyBase58Check": item.SenderMessagingPublicKey
};
const res = await deso.user.getSingleProfile(r);
await tclog.push(res.Profile.Username);
*/
const Chats = props => {
  //props.highlight
    return (
      <div className="chatlist">
        <div className="bs">
        {
        props.usrs.map((item, index) => (
          <button className="butts" key={index}>
          {item.username}
          </button>
        ))
        }
        </div>
      </div>
    );
};

export default Chats;
