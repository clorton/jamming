import React from 'react';
import { TrackInformation } from '../TrackInformation/TrackInformation';
import { TrackAction } from '../TrackAction/TrackAction';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onAction(this.props.index);
    }

    render() {
        return (
            <div className='Track'>
                <TrackInformation title={this.props.title} artist={this.props.artist} album={this.props.album} />
                <TrackAction action={this.props.action} onClick={this.handleClick} />
            </div>
        );
    }
}
