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
