import React, { Component } from 'react';
import Loader from '../../Components/Loader/Loader';
import ErrorNotification from '../../Components/ErrorNotification/ErrorNotification';
import moviesApi from '../../services/moviesApi';

class Cast extends Component {
    state = {
        movieCasts: [],
        loading: false,
        error: null,
        message: '',
    }

    componentDidMount() {
        this.setState({loading: true});
        moviesApi
        .fetchCreditsDetails(this.props.match.params.movieId)
        .then(movieCasts => this.setState({movieCasts}))
        .catch(error => this.setState({error, message: error.message}))
        .finally(() => this.setState({loading: false}));
    }


    render() {
        const {movieCasts, loading, error, message} = this.state;
        return (
            <>
                {error && <ErrorNotification message={message} />}
                {loading && <Loader />}
                {!error && !loading && (
                <ul>
                    {movieCasts.map(movie => (
                        <li key={movie.credit_id} >
                            <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${
                                !movie.profile_path
                                    ? "/27C77ni5XmlgkJVbomXPC4tHWVd.jpg"
                                    : movie.profile_path
                                }`} alt={movie.name} />
                            <p>{movie.name}</p>
                            <p>Character: {movie.character}</p>
                        </li>
                    ))}
                </ul>
                )}
            </>
        );
    }
}

export default Cast;