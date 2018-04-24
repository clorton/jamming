import React from 'react';
import './TrackAction.css';

export const TrackAction = (props) => {
    return <a className="Track-action" onClick={props.onClick}>{props.action}</a>
};