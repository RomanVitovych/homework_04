import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import ErrorNotification from '../../Components/ErrorNotification/ErrorNotification';
import styles from './MovieDetailsPage.module.css';
import moviesApi from '../../services/moviesApi';
import routes from '../routes';

class MovieDetailsPage extends Component {
    state = {
        movie: null,
        loading: false,
        error: null,
        message: '',
    }

    componentDidMount() {
        this.setState({loading: true});
        moviesApi
        .fetchMovieDetails(this.props.match.params.movieId)
        .then(movie => this.setState({movie}))
        .catch(error => this.setState({error, message: error.message}))
        .finally(() => this.setState({loading: false}))
    }
    

    handleGoBack = () => {
        const {state} = this.props.location;
        if(state && state.from) { 
            return this.props.history.push(state.from);      
        }
        this.props.history.push(routes.movies);
    }


    render() {
        const {movie, error, message} = this.state;
        return (
            <>
                <button 
                className={styles.movieButton}
                type='button' onClick={this.handleGoBack} >
                Go back</button>

                {error && <ErrorNotification message={message} />}
                {!movie ? <Loader /> : (
                <div>
                    <>
                        <img 
                        className={styles.movieImage}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                            movie.poster_path
                               ? movie.poster_path
                               : "/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg"
                            }`} alt={movie.original_title} />
                        <ul 
                        className={styles.movieList} >
                            <li
                            className={styles.movieItem} >
                                <h3
                                className={styles.movieTitle}
                                >{movie.original_title} ({movie.release_date.slice(0,4)})</h3>
                            </li>
                            <li
                            className={styles.movieItem} >
                                <p 
                                className={styles.movieScore}
                                >User score {Math.round(movie.popularity)}%</p>
                            </li>
                            <li
                            className={styles.movieItem} >
                                <h4
                                className={styles.movieOverview}
                                >Overview</h4>
                            <p
                            className={styles.movieOverviewText}
                            >{movie.overview}</p>
                            </li>
                            <li
                            className={styles.movieItem} >
                                <h4
                                className={styles.movieGenres}
                                >Genres</h4>
                                <p
                                className={styles.movieGenresText}
                                >{movie.genres.map(elem => elem.name).join(', ')}</p>
                            </li>
                        </ul>
                        <hr/>
                        <hr/>
                    </>
                    <>
                        <h4
                        className={styles.movieDetails}
                        >Additional information</h4>
                        <ul className={styles.linkList} >
                            <li>
                                <Link
                                to={this.props.match.url+routes.cast}
                                className={styles.link}
                                >
                                Cast
                                </Link>
                            </li>
                            <li>
                                <Link
                                to={this.props.match.url+routes.reviews}
                                className={styles.link}
                                >
                                Reviews
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <hr/>
                        <Route path={this.props.match.path+routes.cast} component={Cast} />
                        <Route path={this.props.match.path+routes.reviews} component={Reviews} />
                        <hr/>
                        <hr/>
                    </>
                </div>    
                )}
            </>
        );
    }
}

export default MovieDetailsPage;