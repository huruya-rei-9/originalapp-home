import {Redirect} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import Loading from './Loading';

const LoggedInRoute = ({children}) => {
    const user = useContext(AuthContext);

    if (user.loading) {
        return <Loading />
    }

    if (user.data === null) {
        return <Redirect to='/login'/>;
    }

    return <>{children}</>;
};

export default LoggedInRoute;