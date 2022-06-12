import React, { Component } from "react";
import '../styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

import Chatbox from './Chatbox';
import Chats from './Chats';

import titleLogo from '../images/second_chance_logo.svg';

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
      currentUser: '', //adjust this to the other user
      username: '', //string of your user's username
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
    }



        sendMessage = async(senderID, recipientID, msg) => {
             var Sentiment = require('sentiment');
             var sentiment = new Sentiment();

            const deso = new Deso();
             var result = sentiment.analyze(msg);

             console.log(result.score); // SEND THIS TO OTHER USER

             const request = {
               "RecipientPublicKeyBase58Check": recipientID,
               "SenderPublicKeyBase58Check": senderID,
               "MessageText": msg
             };

              const response = await deso.social.sendMessage(request);


             this.setState({
               chatlog: [...this.state.chatlog, {'DecryptedMessage':msg, 'RecipientMessagingPublicKey':recipientID, 'SenderMessagingPublicKey': senderID}]
             })
          }

  login = async () => {
    const deso = new Deso();
    const request = 3;
    const response = await deso.identity.login(request);

    const r_ = {
      "PublicKeyBase58Check": response.key
    };
    const res_ = await deso.user.getSingleProfile(r_);
    this.setState({
      login: true,
      usrkey: response.key,
      username: res_.Profile.Username,
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
      if(!clog.includes(item.SenderMessagingPublicKey) && item.SenderMessagingPublicKey !== this.state.usrkey) {
        await clog.push(item.SenderMessagingPublicKey);
      }
    });

    for(let i = 0; i < clog.length; i++) {
      const r = {
        "PublicKeyBase58Check": clog[i]
      };
      const res = await deso.user.getSingleProfile(r);
      tclog.push({'username': res.Profile.Username, 'key': clog[i], 'check': false});
    }

    this.setState({
      login: true,
      usrkey: response.key,
      chatlog: responsec,
      ulog: tclog,
    })
  }

  handleCheck = index => {
    var newlist = this.state.ulog;
    newlist.map((item, index) => {item.check = false});
    newlist[index].check = !newlist[index].check;
    this.setState({
      list: newlist,
      currentUser: newlist[index].key
    });
  };

  render() {
    // THIS IS THE CHAT AREA!!!
    // if the user is logged in, display this
    if(this.state.login) {
      return (
        <div className="container-whole white">
          <div className="container-row blue">
            <div className="container-fourth">
              <Chats
                login={this.state.login}
                usrkey={this.state.usrkey}
                msgs={this.state.chatlog}
                usrs={this.state.ulog}
                handleCheck={this.handleCheck}
              />
            </div>
            <div className="container-whole white">
              <Chatbox
                login={this.state.login}
                usrkey={this.state.usrkey}
                msgs={this.state.chatlog}
                usrs={this.state.ulog}
                value={this.state.value}
                sendMsg={this.sendMessage}
                handleChange={this.handleChange}
                currentUser={this.state.currentUser}
                username={this.state.username}
              />
            </div>
          </div>
        </div>
      );
    // otherwise, display this
    } else {
      return (
        <div className="container-column login-gradient" style={{height: "100vh"}}>
          <div className="container-fourth center">
            <svg style={{position: "absolute", top: "0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="0.4" d="M0,32L30,74.7C60,117,120,203,180,197.3C240,192,300,96,360,74.7C420,53,480,107,540,117.3C600,128,660,96,720,96C780,96,840,128,900,117.3C960,107,1020,53,1080,80C1140,107,1200,213,1260,229.3C1320,245,1380,171,1410,133.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
            <img src={titleLogo} style={{position: "absolute", width: "35%", top: "0.5%"}}></img>
          </div>
          <div className="container-fourth center">
            <h4 className="white-text motivation-text">Believe  in second chances? We do too.</h4>
          </div>
          <div className="container-fourth center" >
            <button className="big-button rounded blue white-text above" style={{margin: "10px"}} onClick={this.login}>Get Started</button>
            <button className="big-button rounded blue white-text above" style={{margin: "10px"}} onClick={this.login}>Login</button>
          </div>
          <div className="container-fourth center">
            <svg style={{position: "absolute", bottom: "0px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><path fill="#5000ca" fillOpacity="0.1" d="M0,0L26.7,5.3C53.3,11,107,21,160,64C213.3,107,267,181,320,224C373.3,267,427,277,480,240C533.3,203,587,117,640,112C693.3,107,747,181,800,197.3C853.3,213,907,171,960,165.3C1013.3,160,1067,192,1120,181.3C1173.3,171,1227,117,1280,85.3C1333.3,53,1387,43,1413,37.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
          </div>
        </div>
      );
    }

  }
}

export default App;
