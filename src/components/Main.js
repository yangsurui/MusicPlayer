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
  constructor(props){
    super(props);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }
  handleClick1(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.play();
  }
  handleClick2(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.nextSong();
  }
  render() {
    return(
      <div className="player-wrapper">

        <audio src={this.props.data.url} ref="audio" ></audio>

        <div className="left-content">
          <span className="icon-font pre-song"></span>
          <span className="icon-font play" onClick={this.handleClick1}></span>
          <span className="icon-font next-song" onClick={this.handleClick2}></span>
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
      isPlay: false, //歌曲的播放状态，true播放，false暂停
      playMode: true //播放模式，true列表顺序播放，false随机播放

    };
    this.play = this.play.bind(this);
    this.nextSong = this.nextSong.bind(this);
  }

  play(){
    let audio = document.getElementsByTagName('audio')[0];
    if(!this.state.isPlay){
      audio.play();
      this.state.isPlay = true;
    }else{
      audio.pause();
      this.state.isPlay = false;
    }
  }

  nextSong(){
    let lastIndex = songData.length - 1;
    if(this.state.currentSongIndex < lastIndex){
      this.state.currentSongIndex +=1;
    }else{
      this.state.currentSongIndex = 0;
    }
    this.setState();


  }

  render() {
    return(
      <div id="wrapper">
        <SongList/>
        <SongInfo
          data={songData[this.state.currentSongIndex]}
          play={this.play}
        />
        <Player
          data={songData[this.state.currentSongIndex]}
          play={this.play}
          nextSong={this.nextSong}
        />
      </div>

    );
  }
}

export default MusicPlayer;
