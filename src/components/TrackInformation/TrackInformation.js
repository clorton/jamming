import React from 'react';
import './TrackInformation.css';

export const TrackInformation = (props) => {
    return (
        <div className='Track-information'>
            <h3>{props.title}</h3>
            <p>{props.artist} | {props.album}</p>
        </div>
    );
};

/*
export class TrackInformation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='Track-information'>
                <h3>{this.props.title}</h3>
                <p>{this.props.artist} | {this.props.album}</p>
            </div>
        );
    }
}
*/
