import React from 'react';
import styles from './Navigation.module.css';
import {NavLink} from 'react-router-dom';
import routes from '../../views/routes';

const Navigation = () => {
    return (
        <>
            <ul className={styles.navigationList} >
                <li>
                    <NavLink 
                    exact
                    to={routes.home} 
                    className={styles.link}
                    activeClassName={styles.activeLink} >
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={routes.movies}
                    className={styles.link}
                    activeClassName={styles.activeLink} >
                    Movies
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default Navigation;