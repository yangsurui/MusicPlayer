import React from 'react';
import Song from './song';

let songData = require('../data/songData.json');

class SongList extends React.Component {
  render(){

    let songInfo = [];

    songData.forEach((obj,index)=>{
      songInfo.push(
        <Song key={index} data={obj} {...this.props}/>
      );
    });

    return(
      <div className="song-list-wrapper">
        <ul className="song-list-title">
          <li className="data-number"></li>
          <li className="data-songName" >歌曲</li>
          <li className="data-artists">歌手</li>
          <li className="data-album">专辑</li></ul>
        <ul className="song-list">
          {songInfo}
        </ul>
      </div>
    );
  }
}

export default SongList;
