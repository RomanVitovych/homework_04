import React from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';

const Layout = ({children}) => {
    return (
        <div className={styles.generalStyles} >
            <Header />
            <hr />
            <hr />
            {children}
        </div>
    );
};

export default Layout;