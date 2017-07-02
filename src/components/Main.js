require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let yeomanImage = require('../images/yeoman.png');

class SongList extends React.Component {

}

class LyricsList extends React.Component {

}

class MusicPlayer extends React.Component {
  render() {
    return (
      <div>
        <section>
          {SongList}
        </section>
        <section>
          {LyricsList}
        </section>
        <audio controls="controls"></audio>
      </div>
    );
  }
}

MusicPlayer.defaultProps = {
};

export default MusicPlayer;
