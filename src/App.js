import React, { Component } from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar/SearchBar';
import { TrackList } from './components/TrackList/TrackList';
import { Button } from './components/Button/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_term: '',
      search_results: [
        { title: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water' },
        { title: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story' },
        { title: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John' },
        { title: 'Tiny Dancer', artist: 'The White Raven', album: 'Tiny Dancer' },
        { title: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live' },
        { title: 'Testing', artist: 'Christopher Lorton', album: "Mowin' the Moss" }
      ],
      playlist_name: 'New Playlist',
      playlist: [
        { title: 'Stronger',     artist: 'Britney Spears',  album: 'Oops!... I Did It Again' },
        { title: 'So Emotional', artist: 'Whitney Houston', album: 'Whitney' },
        { title: "It's Not Right But It's Okay", artist: 'Whitney Houston', album: 'My Love Is Your Love' },
        { title: 'China Cat Sunflower', artist: 'Grateful Dead', album: 'Rockband' }
      ]
    };
    this.search = this.search.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  search(term) {
    console.log("Searching Spotify for '" + term + "'");
  }

  handleAddTrack(index) {
    console.log('Adding track ' + index + ' to playlist.');
    let playlist = this.state.playlist;
    playlist.push(this.state.search_results[index]);
    this.setState({ playlist: playlist });
  }

  handleRemoveTrack(index) {
    console.log('Removing track ' + index + ' from playlist.');
    let playlist = this.state.playlist;
    playlist.splice(index, 1);
    this.setState({ playlist: playlist });
  }

  handleInput(event) {
    this.setState({ playlist_name: event.target.value });
  }

  handleSave(event) {
    console.log("Saving playlist '" + this.state.playlist_name + "' to Spotify");
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.state.search_results} action='+' onAction={this.handleAddTrack} />
          </div>
          <div className="Playlist">
            <input type='text' value={this.state.playlist_name} onChange={this.handleInput} />
            <TrackList tracks={this.state.playlist} action='-' onAction={this.handleRemoveTrack} />
            <Button className='Playlist-save' handleClick={this.handleSave} text='SAVE TO SPOTIFY' />
          </div>
        </div>
      </div>
      );
  }
}

export default App;
