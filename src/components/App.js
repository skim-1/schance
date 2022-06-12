import React, { Component } from "react";
import '../styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

import Chatbox from './Chatbox';
import Chats from './Chats';

import titleLogo from '../images/title_logo.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      login: false,
      usrkey: 0,
      chatlog: [],
      ulog: [],
      value: '',
      currentUser: 'BC1YLgaCiCZ32rAxTAYLA8HamjsWV6nuzqBBN5aZMnRC3zMWU29cuTh',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
    }

        sendMessage = async(senderID, recipientID, msg) => {
        const deso = new Deso();

             console.log(msg);
            const request = {
              "RecipientPublicKeyBase58Check": recipientID,
              "SenderPublicKeyBase58Check": senderID,
              "MessageText": msg
            };

             const response = await deso.social.sendMessage(request);
          }

  login = async () => {
    const deso = new Deso();
    const request = 3;
    const response = await deso.identity.login(request);
    this.setState({
      login: true,
      usrkey: response.key
    })

    //stuff for api call to get msgs that have been sent to your user
    const requestc = {
      "NumToFetch": 25,
      "PublicKeyBase58Check": this.state.usrkey,
      "FetchAfterPublicKeyBase58Check": "",
      "HoldersOnly": false,
      "FollowersOnly": false,
      "FollowingOnly": false,
      "HoldingsOnly": false,
      "SortAlgorithm": "time"
    };



    const responsec = await deso.social.getMessagesStateless(requestc);
    var clog = [];
    var tclog = [];

    responsec.map(async (item, index) => {
      if(!clog.includes(item.SenderMessagingPublicKey)) {
        await clog.push(item.SenderMessagingPublicKey);
      }
    });

    for(let i = 0; i < clog.length; i++) {
      console.log(clog[i])
      const r = {
        "PublicKeyBase58Check": clog[i]
      };
      const res = await deso.user.getSingleProfile(r);
      tclog.push({'username': res.Profile.Username, 'key': clog[i]});
    }

    this.setState({
      login: true,
      usrkey: response.key,
      chatlog: responsec,
      ulog: tclog,
    })

    console.log(tclog);
  }

  render() {
    // if the user is logged in, display this
    if(this.state.login) {
      return (
        <div className="chatbody pink center">
          <div className="chatbox">

            <div className="chatheader">{"Chat"}</div>

            <table>

              <th>
              <Chats
                login={this.state.login}
                usrkey={this.state.usrkey}
                msgs={this.state.chatlog}
                usrs={this.state.ulog}
              />
              </th>

              <th>
              <Chatbox
                login={this.state.login}
                usrkey={this.state.usrkey}
                msgs={this.state.chatlog}
                usrs={this.state.ulog}
                value={this.state.value}
                sendMsg={this.sendMessage}
                handleChange={this.handleChange}
                currentUser={this.state.currentUser}
              />
              </th>

            </table>

          </div>



        </div>
      );
    // otherwise, display this
    } else {
      return (
        <div className="container-column">
          <div className="container-third white center">
            <img src={titleLogo}></img>
          </div>
          <div className="container-whole pink center">
            <div className="tbutt"><Button variant="outline-secondary" onClick={this.login}>Login</Button></div>
          </div>
        </div>
      );
    }

  }
}

export default App;
