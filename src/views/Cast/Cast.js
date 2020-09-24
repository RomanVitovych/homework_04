import React, { Component } from 'react';
import styles from './Cast.module.css';
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
                <ul className={styles.castList} >
                    {movieCasts.map(movie => (
                        <li 
                        className={styles.castItem}
                        key={movie.credit_id} >
                            <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${
                                !movie.profile_path
                                    ? "/27C77ni5XmlgkJVbomXPC4tHWVd.jpg"
                                    : movie.profile_path
                                }`} alt={movie.name} />
                            <p 
                            className={styles.castName} 
                            >{movie.name}</p>
                            <p
                            className={styles.castCharacter}
                            >Character: {movie.character}</p>
                        <hr />
                        </li>
                    ))}
                </ul>
                )}
            </>
        );
    }
}

export default Cast;