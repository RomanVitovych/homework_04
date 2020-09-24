import React, { Component } from 'react';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
    state = {
        value: '',
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state.value);
        this.setState({value: ''})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input 
                    className={styles.mainInput}
                    placeholder='enter film...'
                    type='text'
                    value={this.state.value}
                    onChange={this.handleChange} />
                    <button 
                    className={styles.mainButton}
                    type='submit' >Search</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;