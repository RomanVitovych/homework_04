import React, {Suspense, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
// import HomePage from './views/HomePage/HomePage';
// import MoviesPage from './views/MoviesPage/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import NotFound from './views/NotFound/NotFound';
import Loader from './Components/Loader/Loader';
import './App.module.css';
import routes from './views/routes';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage/MovieDetailsPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />} >
        <Switch>
         <Route path={routes.home} exact component={HomePage} />
         <Route path={routes.movies} exact component={MoviesPage} />
         <Route path={routes.movieId} component={MovieDetailsPage} />
         <Route component={NotFound} />
        </Switch>
      </Suspense>
     
    </Layout>
  );
}

export default App;
