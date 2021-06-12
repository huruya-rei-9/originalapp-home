import Nav from './nav';
import Footer from './Footer';
import {Card, Button, TextField, Typography, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useContext, useState, useEffect} from 'react';
import firebase, {db} from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import OpinionModal from './OpinionModal';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#EEFFFF',
    },
    card1: {
        padding: '15px',
        margin: '10px',
        backgroundColor: '#eee',
    },
    card2: {
        padding: '15px',
        margin: '10px',
        backgroundColor: '#fff',
    },
    form: {
        marginBottom: '100px',
    },
})

const OpinionBox = () => {

    const classes = useStyles();
    const user = useContext(AuthContext);

    const [opinion, setOpinion] = useState('');
    const [userOpinions, setUserOpinions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const opinionsRef = db.collection('opinions');
        const unsubscribe = opinionsRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            setUserOpinions(
                querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        });
        return () => {
            unsubscribe();
        }
    }, []);

    console.log(user.data.uid)

    const handleSubmit = () => {
        console.log(opinion);
        db.collection('opinions').add({
            username: user.data.displayName,
            opinion: opinion,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            authorId: user.data.uid,
        })
        .then(() => {
            console.log('意見送信成功');
        }).catch((err) => {
            console.log('意見送信失敗', err);
        })
        setOpinion('');
        setModalOpen(true);
    }

    return <>
        <div className={classes.root}>
            <Nav />
            <div>
                <Card className={classes.card1}>
                    <Typography>アプリの改善してほしい点や、追加してほしい機能があれば教えてください！</Typography>
                </Card>
            </div>
            <form className={classes.form}>
                <TextField value={opinion} onChange={(e) => setOpinion(e.target.value)} variant='outlined' />
                <Button disabled={opinion === ''} onClick={handleSubmit} variant='contained'>意見を送信</Button>
            </form>
            <Card className={classes.card1}>
                <Typography>過去の内容(他ユーザー含む)</Typography>
            </Card>
            <div>
                {userOpinions.map((userOpinion) => (
                    <Card key={userOpinion.id} className={classes.card2}>
                        <CardContent>
                            <Typography>{userOpinion.opinion}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <OpinionModal
                modalOpen={modalOpen}
                modalClose={() => setModalOpen(false)}
            />
            <Footer />
        </div>
    </>

}

export default OpinionBox;