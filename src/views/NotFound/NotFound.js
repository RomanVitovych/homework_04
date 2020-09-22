import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import routes from '../routes'

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Error 404</h2>
                <p>Whooops!!! <Link to={routes.home} > Link</Link> to the main page! </p>
            </div>
        );
    }
}

export default NotFound;