import React from 'react';
import { Track } from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(index) {
        this.props.onAction(index);
    }

    render() {
        return (
            <div className='TrackList'>
            {this.props.tracks.map((track, index) => <Track title={track.title} artist={track.artist} album={track.album} action={this.props.action} key={index} index={index} onAction={this.handleAction} />)}
            </div>
        );
    }
}
