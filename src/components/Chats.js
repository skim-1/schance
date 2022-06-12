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
<<<<<<< HEAD
      <div className="chatlist">
        <div className="bs">
        {
        props.usrs.map((item, index) => (
          <button className="butts" key={index}>
          {item}
          </button>
        ))
        }
        </div>
      </div>
=======
      <table>
        <th>
          <div>
          {
          props.usrs.map((item, index) => (
            <div key={index}>
            {item}<br/>
            </div>
          ))
          }
          </div>
          </th>
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
>>>>>>> 53accb3cb2b0694dfc568bf69b34a1dac232b9b5
    );
};

export default Chats;
