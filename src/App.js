import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { SearchBar } from './components/SearchBar/SearchBar';
import { TrackList } from './components/TrackList/TrackList';

const results = [
  { title: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water' },
  { title: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story' },
  { title: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John' },
  { title: 'Tiny Dancer', artist: 'The White Raven', album: 'Tiny Dancer' },
  { title: 'Tiny Dancer - Live Album Version', artist: 'Ben Folds', album: 'Ben Folds Live' }
];

const playlist = [
  { title: 'Stronger',     artist: 'Britney Spears',  album: 'Oops!... I Did It Again' },
  { title: 'So Emotional', artist: 'Whitney Houston', album: 'Whitney' },
  { title: "It's Not Right But It's Okay", artist: 'Whitney Houston', album: 'My Love Is Your Love' }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={results} action='+' />
          </div>
          <div className="Playlist">
            <input value='New Playlist' />
            <TrackList tracks={playlist} action='-' />
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
      );
  }
}

export default App;
