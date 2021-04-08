import {db} from './firebase/config';
import {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        width: '100%',
        padding: '15px',
        margin: '10px',
    },
})

const Administrator = () => {

    const classes = useStyles();
    const [userOpinions, setUserOpinions] = useState([]);

    useEffect(() => {
        const opinionsRef = db.collection('opinions');
        const unsubscribe = opinionsRef.orderBy('createdAt').onSnapshot((querySnapshot) => {
            setUserOpinions(
                querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        });
        return () => {
            unsubscribe();
        }
    }, []);

    console.log(userOpinions)

    return <>
        <h1>管理者の画面です</h1>
        <h1>ご意見箱に挙げられた内容</h1>
        <div>
            {userOpinions.map((userOpinion) => (
                <Card key={userOpinion.id} className={classes.card}>
                    <CardHeader
                        title={userOpinion.username}
                    />
                    <CardContent>
                        <Typography>{userOpinion.opinion}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    </>
};

export default Administrator;