import Nav from './nav';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
    },
})

const UserHome = () => {

    const classes = useStyles();
    const user = useContext(AuthContext);

    console.log(user);

    return <>
        <div className={classes.root}>
            <Nav />
            <Typography>お帰りなさい。{user.data.displayName}さん！</Typography>
        </div>
    </>

}

export default UserHome;