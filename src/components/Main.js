require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let songData = require('../data/songData.json');

class Song extends React.Component {

  play = () => {
    if(this.props.data.number == this.props.songState.currentSongIndex + 1){
      this.props.play();
    }
  };

  render(){

    let playBtnClassName = 'icon-font play-state';

    if(this.props.data.number == this.props.songState.currentSongIndex + 1){
      playBtnClassName += this.props.songState.isPlay ? ' play' : ' pause';
    }else{
      playBtnClassName += ' pause';
    }

    return(
      <li className="song-list-content" onDoubleClick={this.play}>
        <div className="song-list-item data-number">{this.props.data.number}</div>
        <div className="song-list-item data-songName">
          {this.props.data.songName}
          <div className={playBtnClassName} onClick={this.play}></div>
        </div>
        <div className="song-list-item data-artists">{this.props.data.artists}</div>
        <div className="song-list-item data-album">{this.props.data.album.name}</div>
      </li>
    )
  }
}

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
class SongInfo extends React.Component {

  render(){

    return(
      <div className="song-info-wrapper">
        <div className="album-pic" onClick={this.props.play.bind(this)}>
          <img className={this.props.songState.isPlay ? 'img-rotation' : ''} src={this.props.data.album.url}/>
        </div>
        <div className="song-name"><p>{this.props.data.songName}</p></div>
        <div className="artists"><p>{this.props.data.artists}</p></div>
      </div>
    );
  }
}
class Player extends React.Component {

  /**
   * 转换时间的表示方式
   * @param time 以秒计时转换为以分秒计时
   */
  timeConvert = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min * 60);
    if(sec < 10){
      sec = '0' + sec;
    }
    if(min < 10){
      min = '0' + min;
    }
    time = min + ':' +sec;
    return time;
  };

  render() {

    let playBtnClassName = 'icon-font';
    playBtnClassName += this.props.songState.isPlay ? ' play' : ' pause';

    let playModeClassName = 'icon-font';
    playModeClassName += this.props.songState.playMode ? ' order' : ' shuffle';

    //使进度条按钮在进度条上均匀移动
    let lef = Math.floor(630 * this.props.songState.currentSongTime / this.props.songState.currentSongTotalTime);

    return(
      <div className="player-wrapper">

        <div className="left-content">
          <span className="icon-font pre-song" onClick={this.props.preSong.bind(this)}></span>
          <span className={playBtnClassName} onClick={this.props.play.bind(this)}></span>
          <span className="icon-font next-song" onClick={this.props.nextSong.bind(this)}></span>
        </div>

        <div className="progress-bar" ref="progress">
            <div className="progress"></div>
            <div className="progress-btn" style={{'left': lef + 'px'}}></div>
        </div>
        <div className="song-time">
          <span className="current-time">{this.timeConvert(this.props.songState.currentSongTime)}/</span>
          <span className="total-time">{this.timeConvert(this.props.data.duration)}</span>
        </div>
        <div className="right-content">
            <span className={playModeClassName} onClick={this.props.changePlayMode.bind(this)}></span>
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
        isPlay: false, //歌曲的播放状态，true播放，false暂停，默认暂停
        playMode: true //播放模式，true列表顺序播放，false随机播放，默认随机播放
    };

  }

  /**
   * 随机生成给定区间中的一个数值
   * @param min 最小值
   * @param max 最大值
   */
  getRandomNum = (min, max) => {
    return Math.ceil(Math.random()*(max-min)+min);
  };

  /**
   * 通过isPlay判断歌曲的播放状态，执行播放或暂停方法
   *
   */
  play = () => {
    let audio = this.refs.audio;
    if (this.state.isPlay === false) {
      audio.play();

    } else {
      audio.pause();
    }
    this.setState({
      isPlay: !this.state.isPlay,
      currentSongTotalTime: songData[this.state.currentSongIndex].duration

    });

  };

  /**
   * 清除先前播放痕迹
   */
  clear = () =>{
    this.setState({
      isPlay: false,
      currentSongTime: 0
    });
  };

  /**
   * 随机播放曲目
   */
  shuffle = () =>{
    this.setState({
      currentSongIndex: this.getRandomNum(-1, songData.length - 1)
    });
  };

  /**
   * 播放后一首歌曲
   */
  nextSong = () => {
    let len = songData.length,
      lastIndex = len - 1;

    this.clear();

    if (this.state.playMode) {
      if (this.state.currentSongIndex < lastIndex){
        this.setState({
          currentSongIndex: this.state.currentSongIndex + 1
        });
      } else {
        this.setState({
          currentSongIndex: 0
        });
      }
    }else{
      this.shuffle();
    }
  };

  /**
   * 播放前一首歌曲
   */
  preSong = () => {
    let len = songData.length,
      lastIndex = len - 1;

    this.clear();

    if(this.state.playMode) {
      if (this.state.currentSongIndex === 0) {
        this.setState({
          currentSongIndex: lastIndex
        });
      } else {
        this.setState({
          currentSongIndex: this.state.currentSongIndex - 1
        });
      }
    } else {
      this.shuffle();
    }
  };

  /**
   * 更改播放模式
   */
  changePlayMode = () =>{
    this.setState({
      playMode: !this.state.playMode
    });
  };

  componentDidMount = () =>{

    /**
     * 打开页面后自动播放歌曲
     */
    this.play();

    /**
     * 同步播放时间
     * 当前歌曲播放完后，跳至下一首
     */
    let audio  = this.refs.audio;
    setInterval(()=> {
      this.setState({
        currentSongTime: audio.currentTime
      },() => {
        if (this.state.currentSongTime > this.state.currentSongTotalTime) {
          this.nextSong();
        }
      });
    },1000);


  };


  render () {
    return(
      <div id="wrapper">
        <SongList
          songState={this.state}
          play={this.play}
        />
        <SongInfo
          data={songData[this.state.currentSongIndex]}
          songState={this.state}
          play={this.play}
        />
        <Player
          data={songData[this.state.currentSongIndex]}
          songState={this.state}
          play={this.play}
          nextSong={this.nextSong}
          preSong={this.preSong}
          changePlayMode={this.changePlayMode}
        />
        <audio src={songData[this.state.currentSongIndex].url} ref="audio"></audio>
      </div>

    );
  }
}

export default MusicPlayer;
