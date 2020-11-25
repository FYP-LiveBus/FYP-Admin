import React from 'react'
import { Navigate } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.login;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Navigate to={'/login'} />
        );
    }
}

export default ProtectedRoute;