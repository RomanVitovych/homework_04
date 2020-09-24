import React from 'react';
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';

const Header = () => {
    return (
        <header className={styles.head} >
            <Navigation />
        </header>
    );
};

export default Header;