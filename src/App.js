import React, { Component } from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar/SearchBar';
import { TrackList } from './components/TrackList/TrackList';
import { Button } from './components/Button/Button';

import { Spotify } from './spotify/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_term: '',
      search_results: [
        { title: 'Tiny Dancer',                      artist: 'Elton John',      album: 'Madman Across The Water',          uri: 'spotify:track:2TVxnKdb3tqe1nhQWwwZCO' },
        { title: 'Tiny Dancer',                      artist: 'Tim McGraw',      album: 'Love Story',                       uri: 'spotify:track:7uQG1fOTqbvo3SYOnqm8hj' },
        { title: 'Tiny Dancer',                      artist: 'Rockabye Baby!',  album: 'Lullaby Renditions of Elton John', uri: 'spotify:track:4nGshLvYystwed45UxVWdu' },
        { title: 'Tiny Dancer',                      artist: 'The White Raven', album: 'Tiny Dancer',                      uri: 'spotify:track:2JkYFFr4G4eIDRa7zWmvjT' },
        { title: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds',       album: 'Ben Folds Live',                   uri: 'spotify:track:6QMujKWzo7QpC39f7M9tzV' },
      ],
      playlist_name: 'New Playlist',
      playlist: [
        { title: 'Stronger',                                         artist: 'Britney Spears',  album: 'Oops!... I Did It Again',      uri: 'spotify:track:5QhBKPqsnX1uY9fZNaAtZg' },
        { title: 'So Emotional',                                     artist: 'Whitney Houston', album: 'Whitney',                      uri: 'spotify:track:4l2Edgdj4vla02GCh7YyAv' },
        { title: "It's Not Right But It's Okay",                     artist: 'Whitney Houston', album: 'My Love Is Your Love',         uri: 'spotify:track:7861kBrZ5aw7o4NfggcyYW' },
        { title: 'China Cat Sunflower - Live in Paris 1972 Version', artist: 'Grateful Dead',   album: "Europe '72 [Live] [Expanded]", uri: 'spotify:track:3K80eTMvPE8oG1aWXi4gDA' }
      ]
    };

    // See if we have an authorization token
    if (!Spotify.getToken()) {
      // If no token, check current URL for authorization token
      const currentUrl = window.location.href;
      const pattern = '#access_token=';
      const match = currentUrl.match(pattern);
      if (match) {
        const accessToken = currentUrl.match(/access_token=([^&]*)/)[1];
        console.log('Access token in URL was "' + accessToken + '".');
        Spotify.setToken(accessToken);
      } else {
        // No token in URL, ask Spotify for an authorization token
        Spotify.authorize();
      }
    }
  }

  search = (term) => {
    Spotify.search(term).then(results => { if (results) { this.setState({ search_results: results })}});
  };

  handleAddTrack = (index) => {
    console.log('Adding track ' + index + ' to playlist.');
    let playlist = this.state.playlist;
    playlist.push(this.state.search_results[index]);
    this.setState({ playlist: playlist });
  };

  handleRemoveTrack = (index) => {
    console.log('Removing track ' + index + ' from playlist.');
    let playlist = this.state.playlist;
    playlist.splice(index, 1);
    this.setState({ playlist: playlist });
  };

  handleInput = (event) => {
    this.setState({ playlist_name: event.target.value });
  };

  handleSave = (event) => {
    Spotify.save(this.state.playlist_name, this.state.playlist);
  };

  filterTracks = () => {
    const playlistUris = this.state.playlist.map(track => track.uri);
    let results = this.state.search_results.filter(track => !playlistUris.includes(track.uri) );
    return results;
  };

  render() {
    let searchTracks = this.filterTracks();
    return (
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={searchTracks} action='+' onAction={this.handleAddTrack} />
          </div>
          <div className="Playlist">
            <input type='text' value={this.state.playlist_name} onChange={this.handleInput} />
            <TrackList tracks={this.state.playlist} action='-' onAction={this.handleRemoveTrack} />
            <Button className='Playlist-save' handleClick={this.handleSave} text='SAVE TO SPOTIFY' />
          </div>
        </div>
      </div>
      );
  };
}

export default App;
