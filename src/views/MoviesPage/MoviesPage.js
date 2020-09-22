import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import SearchForm from '../../Components/SearchForm/SearchForm';
import ErrorNotification from '../../Components/ErrorNotification/ErrorNotification';
import getQueryParams from '../../utils/getQueryParams';
import moviesApi from '../../services/moviesApi';

class MoviesPage extends Component {
    state = {
        movies: [],
        loading: false,
        error: null,
        message: '',
    }

    componentDidMount() {
        const {query} = getQueryParams(this.props.location.search);

        if(query) {
            this.fetchMovies(query);
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {query: prevQuery} = getQueryParams(prevProps.location.search);
        const {query: nextQuery} = getQueryParams(this.props.location.search);

        if(prevQuery !== nextQuery) {
            this.fetchMovies(nextQuery)
        };
    }

    fetchMovies = (query) => {
        this.setState({loading: true});
        moviesApi
        .fetchMoviesWithQuery(query)
        .then(movies => this.setState({movies}))
        .catch(error => this.setState({error, message: error.message}))
        .finally(() => this.setState({loading: false}))
    }   

    handleChangeQuery = (query) => {
        this.props.history.push({
            ...this.props.location,
            search: `query=${query}`
        });
    };

    render() {
        const {movies, loading, error, message} = this.state;
        const {match} = this.props;
        return (
            <div>
                <SearchForm onSubmit={this.handleChangeQuery} />
                
                {error && <ErrorNotification message={message} />}
                {loading ? <Loader /> : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id} >
                            <Link to={{
                                pathname: `${match.url}/${movie.id}`, 
                                state: {from: this.props.location}}} >
                                      {movie.original_title}
                         </Link>
                        </li>
                    ))}
                </ul>
                )}
            </div>
        );
    }
}

export default MoviesPage;