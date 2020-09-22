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
                <button type='button' onClick={this.handleGoBack} >Go back</button>

                {error && <ErrorNotification message={message} />}
                {!movie ? <Loader /> : (
                <div>
                    <>
                        <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                            movie.poster_path
                               ? movie.poster_path
                               : "/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg"
                            }`} alt={movie.original_title} />
                        <ul>
                            <li>
                                <h3>{movie.original_title} ({movie.release_date.slice(0,4)})</h3>
                            </li>
                            <li>
                                <p>User score {Math.round(movie.popularity)}%</p>
                            </li>
                            <li>
                                <h4>Overview</h4>
                            <p>{movie.overview}</p>
                            </li>
                            <li>
                                <h4>Genres</h4>
                                <p>{movie.genres.map(elem => elem.name).join(', ')}</p>
                            </li>
                        </ul>
                        <hr/>
                    </>
                    <>
                        <h4>Additional information</h4>
                        <ul>
                            <li>
                                <Link
                                to={routes.cast}
                                className={styles.link}
                                activeClassName={styles.activeLink}
                                >
                                Cast
                                </Link>
                            </li>
                            <li>
                                <Link
                                to={routes.reviews}
                                className={styles.link}
                                activeClassName={styles.activeLink}
                                >
                                Reviews
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <Route path={routes.cast} component={Cast} />
                        <Route path={routes.reviews} component={Reviews} />
                        <hr/>
                    </>
                </div>    
                )}
            </>
        );
    }
}

export default MovieDetailsPage;