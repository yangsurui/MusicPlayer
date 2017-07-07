require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let songUrlArr = require('../data/songData.json');

(songUrlArr =>{
  for(let i = 0, j = songUrlArr.length; i < j; i++){
    let songItem = songUrlArr[i];
    songItem.songUrl = require('../audios/' + songItem.songName);
    songUrlArr[i] = songItem;
  }
  return songUrlArr;

})(songUrlArr);


class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar">
        <input type="text" placeholder="搜索关键字"/>
        <span></span>
      </div>
    )
  }
}

class SongList extends React.Component {

  componentDidMount(){

  }
  render(){
    return(
      <div className="song-list-container">
        <ul className="song-list">

        </ul>
      </div>
    )
  }
}


class LyricsList extends React.Component {

}

class Player extends React.Component {
  render() {
    let musicSrc = [];

    return(
      <div>
      </div>
    )
  }

}
class MusicPlayer extends React.Component {
  constructor(props){
    super(props);
    this.constant = {

    };
    this.state = {

    }
  }
  render(){
    return(
      <div id="wrapper">
        <div id="seach-bar-wrapper"><SearchBar/></div>
        <div id="song-list-wrapper"><SongList/></div>
        <div id="lyrics-list-wrapper"><LyricsList/></div>
        <div id="player-list"><Player/></div>
      </div>

    )

  }
}

Player.defaultProps = {
};

export default Player;
