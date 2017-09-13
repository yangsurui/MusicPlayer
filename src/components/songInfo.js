import React from 'react';

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

export default SongInfo;
