import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footer: {
    backgroundColor: '#bdbdbd',
    fontSize: '25px',
    padding: '20px',
    marginTop: '30px',
    },
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>© 2021 Riku Ganeko</footer>
    );
}

export default Footer;