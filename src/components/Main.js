require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import SongList from './songList';
import SongInfo from './songInfo';
import Player from './player';

let songData = require('../data/songData.json');

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
