import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './HomePage.module.css';
import Loader from '../../Components/Loader/Loader';
import moviesApi from '../../services/moviesApi';

class HomePage extends Component {
    state = {
        movies: [],
        loading: false,
    };

    componentDidMount() {
        moviesApi
        .fetchTrendingMovies()
        .then(movies => this.setState({movies}));
    };
    

    render() {
        const {movies, loading} = this.state;
        const {match} = this.props;
        return (
            <>
              <h2 
              className={styles.mainTitle}
              >Trending movies</h2> 
              <hr />
              {loading ? <Loader /> : (
              <ul
              className={styles.mainList}
              >
                  {movies.map(movie => (
                      <li 
                      className={styles.mainItem}
                      key={movie.id} >
                          <NavLink to={{
                                pathname: `${match.url}movies/${movie.id}`, 
                                state: {from: this.props.location}}} >
                                    {movie.original_title}
                          </NavLink>
                      </li>
                  ))}
              </ul>
              )}
            </>
        );
    }
}

export default HomePage;