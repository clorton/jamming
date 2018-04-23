import React from 'react';
import { Track } from '../Track/Track';
import './TrackList.css';

export const TrackList = (props) => {
    return (
        <div className='TrackList'>
        {props.tracks.map(track => <Track title={track.title} artist={track.artist} album={track.album} action={props.action} />)}
        </div>
    );
};

/*
export class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='TrackList'>
            {this.props.tracks.map(track => <Track title={track.title} artist={track.artist} album={track.album} action={this.props.action} />)}
            </div>
        );
    }
}
*/
