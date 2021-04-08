import Nav from './nav';
import {Card, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useContext, useState} from 'react';
import firebase, {db} from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import OpinionModal from './OpinionModal';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
    },
    card: {
        padding: '15px',
        margin: '10px',
    },
})

const OpinionBox = () => {

    const classes = useStyles();
    const user = useContext(AuthContext);

    const [opinion, setOpinion] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

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
                <Card className={classes.card}>
                    <Typography>アプリの改善してほしい点や、追加してほしい機能があれば教えてください！</Typography>
                </Card>
            </div>
            <form>
                <TextField value={opinion} onChange={(e) => setOpinion(e.target.value)} variant='outlined' />
                <Button disabled={opinion === ''} onClick={handleSubmit} variant='contained'>意見を送信</Button>
            </form>
            <OpinionModal
                modalOpen={modalOpen}
                modalClose={() => setModalOpen(false)}
            />
        </div>
    </>

}

export default OpinionBox;