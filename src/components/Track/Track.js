import React from 'react';
import { TrackInformation } from '../TrackInformation/TrackInformation';
import { TrackAction } from '../TrackAction/TrackAction';
import './Track.css';

export const Track = (props) => {
    return (
        <div className='Track'>
            <TrackInformation title={props.title} artist={props.artist} album={props.album} />
            <TrackAction action={props.action} />
        </div>
    );
};

/*
export class Track extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Track'>
                <TrackInformation title={this.props.title} artist={this.props.artist} album={this.props.album} />
                <TrackAction action={this.props.action} />
            </div>
        );
    }
}
*/