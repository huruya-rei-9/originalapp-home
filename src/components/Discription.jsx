import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '30px',
    },
    content: {
        fontSize: '16px',
    },
}))

const Discription = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.content}>
                <b>教員採用試験対策(教育基本法)</b><br/>
                問題は全部で10問です。空いた空欄に当てはまる言葉を入れてください。
            </Typography>
        </div>
    )
}

export default Discription;