import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from '../../constants/Router';

const PrivateRoute = (props) => {
    const isLoggedIn = Boolean(localStorage.getItem('admin_loggedIn'));

    if (!isLoggedIn) return <Redirect to={ROUTES.LOGIN.path} />;

    return <Route {...props} />;
};

export default PrivateRoute;
