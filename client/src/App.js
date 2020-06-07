import React from "react";
import speaker from "./icons/speaker.svg";
import music from "./icons/music-player.svg";
import microphone from "./icons/microphone.svg";
import audio from "./icons/audio-file.svg";
import arrow from "./icons/giphy.gif";

import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "",
        albumArt: "",
        artists: "",
        album: "",
      },
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  scrolling() {
    let progress = document.getElementById("progressbar");
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = function () {
      let progressHeight = (window.pageYOffset / totalHeight) * 100;
      progress.style.height = progressHeight + "%";
    };
  }
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url,
          artists: response.item.artists[0].name,
          album: response.item.album.name,
        },
      });
    });
  }
  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && (
          <div>
            {this.scrolling()}
            <div id="progressbar"></div>
            <div id="scrollPath"></div>
            <h1>
              Welcome to <b>"What Am I Listening To?"</b>
            </h1>
            <img className="icons" src={audio} />
            <h3>
              This App tracks the songs you're listening to on Spotify in
              real-time! Sure that may seem a little redundant considering
              Spotify already shows you what you're listening to...However, this
              website makes great use of Spotify's API and is a brilliant
              example of what you can create if you are interested in Web
              Development! Enjoy!
            </h3>
            <h3>To Start, Please Login to Your Spotify Account Below!</h3>
            <img className="arrow" src={arrow} />
            <a href="http://localhost:8888">
              <button>Login to Spotify</button>
            </a>
          </div>
        )}
        {this.state.loggedIn && (
          <div>
            {this.scrolling()}
            <h1>
              What Am I Listening to? <br /> Now Playing:{" "}
            </h1>
            <img src={this.state.nowPlaying.albumArt} />
            <br /> <br />
            <img className="icons" src={speaker} />{" "}
            <h3>{this.state.nowPlaying.name}</h3>
            <img className="icons" src={microphone} />{" "}
            <h3> {this.state.nowPlaying.artists}</h3>
            <img className="icons" src={music} />{" "}
            <h3> {this.state.nowPlaying.album}</h3>
          </div>
        )}
        {this.state.loggedIn && (
          <div>
            <img className="arrow" src={arrow} />

            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          </div>
        )}
        <div id="progressbar"></div>
        <div id="scrollPath"></div>
        <footer className="bottom">
          <div className="footer-container">
            <div className="copyright">
              <p>
                © 2020
                <a>
                  <b> Forrest Darabian </b>
                </a>
                All Rights Reserved.
              </p>
            </div>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/dinosoftlabs"
              title="DinosoftLabs"
            >
              DinosoftLabs
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
            <div className="left">
              Contact / Links
              <li>
                {" "}
                <a href="mailto:forrestdarabian@gmail.com">
                  <i className="ion-ios-email fa-icons"></i>
                  Contact Me
                </a>{" "}
              </li>
              <li>
                <a href="https://www.forrestdarabian.com/">
                  <i className="fa-angle-double-right"></i>Developers Site
                </a>
              </li>
            </div>
          </div>
        </footer>{" "}
      </div>
    );
  }
}

export default App;
