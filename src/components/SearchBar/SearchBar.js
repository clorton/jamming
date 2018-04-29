import React from 'react';
import './SearchBar.css';
import { Button } from '../Button/Button';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({ term: event.target.value });
    }

    handleSearch(event) {
        this.props.onSearch(this.state.term);
    }

    render() {
        return (
            <div className='SearchBar'>
                <input placeholder='Enter A Song Title' onChange={this.handleChange} onKeyPress={(e) => { if (e.key === 'Enter') this.handleSearch(); }} />
                <Button handleClick={this.handleSearch} text='SEARCH' />
            </div>
        );
    }
}