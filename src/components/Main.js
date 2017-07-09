require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

/**
 * arr[0]: 歌曲索引
 * arr[1]: 歌曲名
 * arr[2]: 歌手
 * arr[3]: 歌曲路径
 * arr[4][0]: 所属专辑名
 * arr[4][1]: 所属专辑图片路径
 */
let songInfoArr = require('../data/songData.json');

class SongList extends React.Component {

  render(){
    let songList = '';
    for(let i = 0, j= songInfoArr.length; i<j; i++ ){
      songList += '<li>'+songInfoArr[i][1]+'</li>';
    }
    return(
      <div className="song-list-container">
        <ul id="song-list">
          {songList}
        </ul>
      </div>
    )
  }
}
class SongInfo extends React.Component {


  render(){
    return(
      <div className="song-info-container">
        <div className="album-pic">
          <img src={}/>
        </div>
        <div className="song-name"></div>
        <div className="singer"></div>
      </div>
    )
  }
}
class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
      //初始化音乐播放器的状态
      currentSongIndex: 0, //当前播放歌曲的索引
      currentSongTime: 0, //当前歌曲播放的时间
      currentSongTotalTime: 0, //当前播放歌曲的总时长
      isPlay: true //歌曲的播放状态，true播放，false暂停
    }
  }
  render() {
    return(
      <div className="player">
        <audio></audio>
        <div className="left-content">
          <span className="pre-song"></span>
          <span className="next-song"></span>
        </div>

      </div>
    )
  }

}
class MusicPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      //初始化音乐播放器的状态
      currentSongIndex: 0, //当前播放歌曲的索引
      currentSongTime: 0, //当前歌曲播放的时间
      currentSongTotalTime: 0, //当前播放歌曲的总时长
      isPlay: true //歌曲的播放状态，true播放，false暂停
    }
  }
  render(){
    return(
      <div id="wrapper">

        <div id="song-list-wrapper">
          <SongList/>
        </div>
        <div id="song-info-wrapper">
          <SongInfo/>
        </div>
        <div id="player-list">
          <Player/>
        </div>
      </div>

    )

  }
}

MusicPlayer.defaultProps = {
};

export default MusicPlayer;
