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
let songData = require('../data/songData.json');

class Song extends React.Component {
  render(){
    return(
      <ul className="song-list-content">
        <li>{this.props.data.number}</li>
        <li>{this.props.data.songName}</li>
        <li>{this.props.data.artists}</li>
        <li>{this.props.data.album.name}</li>
      </ul>
    )
  }
}

class SongList extends React.Component {
  render(){
    let songInfo = [];
    songData.forEach((obj,index)=>{
      songInfo.push(
        <Song key={index} data={obj}/>
      );
    });
    return(
      <div className="song-list-wrapper">
        <ul id="song-list-title">
          <li>编号</li>
          <li>歌曲</li>
          <li>歌手</li>
          <li>专辑</li>
        </ul>
        {songInfo}
      </div>
    );
  }
}
class SongInfo extends React.Component {


  render(){
    return(
      <div className="song-info-wrapper">
        <div className="album-pic">
          <img src={this.props.data.album.url}/>
        </div>
        <div className="song-name">{this.props.data.songName}</div>
        <div className="artists">{this.props.data.artists}</div>
      </div>
    );
  }
}
class Player extends React.Component {

  render() {
    return(
      <div className="player-wrapper">

        <audio src={this.props.data.url}></audio>

        <div className="left-content">
          <span className="icon-font pre-song"></span>
          <span className="icon-font play"></span>
          <span className="icon-font next-song"></span>
        </div>

        <div className="progress-bar">
            <div className="progress"></div>
            <div className="progress-btn"></div>
        </div>

        <div className="right-content">
            <span className="icon-font play-mode"></span>
            <span className="icon-font volume-control"></span>
        </div>

      </div>

    );
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
  render() {
    return(
      <div id="wrapper">
        <SongList/>
        <SongInfo data={songData[this.state.currentSongIndex]}/>
        <Player data={songData[this.state.currentSongIndex]}/>
      </div>

    );
  }
}
MusicPlayer.defaultProps = {
  songData : songData
};
export default MusicPlayer;
