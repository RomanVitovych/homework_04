import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import HomePage from './views/HomePage/HomePage';
import MoviesPage from './views/MoviesPage/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import NotFound from './views/NotFound/NotFound';
import './App.module.css';
import routes from './views/routes';

function App() {
  return (
    <Layout>
     <Switch>
       <Route path={routes.home} exact component={HomePage} />
       <Route path={routes.movies} exact component={MoviesPage} />
       <Route path={routes.movieId} component={MovieDetailsPage} />
       <Route component={NotFound} />
     </Switch>
    </Layout>
  );
}

export default App;
