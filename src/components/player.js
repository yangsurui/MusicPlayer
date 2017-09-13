import React from 'react';

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

export default Player;
