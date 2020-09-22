import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
              <h2>Trending movies</h2> 
              <hr />
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
            </>
        );
    }
}

export default HomePage;