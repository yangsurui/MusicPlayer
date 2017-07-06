require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let songData = require('../data/songData.json');

(songArr =>{
  for(let i = 0, j = songArr.length; i < j; i++){
    let songItem = songArr[i];
    songItem.songUrl = require('../audios/' + songItem.songName);
    songArr[i] = songItem;
  }
  return songArr

})(songData);


class SearchBar extends React.Component {

}

class SongList extends React.Component {
  render(){


  }

}


class LyricsList extends React.Component {

}

class MusicPlayer extends React.Component {
  render() {
    let musicSrc = [];

    return(
      <div>
        <audio controls="controls"></audio>
      </div>
    )
  }

}

MusicPlayer.defaultProps = {
};

export default MusicPlayer;
