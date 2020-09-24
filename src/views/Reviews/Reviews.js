import React, { Component } from 'react';
import styles from './Reviews.module.css';
import Loader from '../../Components/Loader/Loader';
import ErrorNotification from '../../Components/ErrorNotification/ErrorNotification';
import moviesApi from '../../services/moviesApi';

class Cast extends Component {
    state = {
        movieReviws: [],
        loading: false,
        error: null,
        message: '',
    }

    componentDidMount() {
        this.setState({loading: true});
        moviesApi
        .fetchReviewFilms(this.props.match.params.movieId)
        .then(movieReviws => this.setState({movieReviws}))
        .catch(error => this.setState({error, message: error.message}))
        .finally(() => this.setState({loading: false}));
    }


    render() {
        const {movieReviws, loading, error, message} = this.state;
        return (
            <>
                {error && <ErrorNotification message={message} />}
                {loading && <Loader />}
                {movieReviws.length > 0 ? (
                <ul className={styles.reviewsList} >
                    {movieReviws.map(movie => (
                        <li 
                        className={styles.reviewsItem}
                        key={movie.id} >
                            <p 
                            className={styles.authorName}
                            >Author: {movie.author}</p>
                            <p
                            className={styles.authorText}
                            >{movie.content}</p>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p 
                    className={styles.worningMessage} >
                        We don't have any reviews for this movie</p>
                )}
            </>
        );
    }
}

export default Cast;