import React from 'react';

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

export default Song;
