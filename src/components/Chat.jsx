import Nav from './nav';
import Footer from './Footer';
import {Card, Button, TextField, Typography, CardHeader, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import firebase, {db} from '../firebase/config';
import {AuthContext} from '../context/AuthContext';
import {useEffect, useState, useContext} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

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

const Chat = () => {

    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const user = useContext(AuthContext);

    useEffect(() => {
        const messagesRef = db.collection('messages');
        // messagesRef
        //     .get()
        //     .then((querySnapshot) => {
        //         const data = querySnapshot.docs.map((doc) => ({
        //             ...doc.data(),
        //             id: doc.id,
        //         }));
        //         setMessages(data);
        //     });
        const unsubscribe = messagesRef.orderBy('createdAt').onSnapshot((querySnapshot) => {
            setMessages(
                querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        });
        return () => {
            unsubscribe();
        }
    }, []);

    // console.log(messages)

    const addChat = (e) => {
        e.preventDefault();
        db.collection('messages').add({
            username: user.data.displayName,
            content: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            authorId: user.data.uid,
        })
        .then(() => {
            console.log('チャット送信成功');
        }).catch((err) => {
            console.log('チャット送信失敗', err);
        })
        setText(''); // 送信したらtextfieldを空にする
    }

    const deleteChat = (id) => {
        db.collection('messages')
            .doc(id)
            .delete()
            .then(() => {
                console.log('削除成功');
            })
            .catch((err) => {
                console.log('削除失敗', err);
            })
    }

    return <>
        <div className={classes.root}>
            <Nav />
            <Typography>ユーザー全員が見れるチャットページです！<br />お互いに励ましあいましょう</Typography>
            <div>
                {messages.map((message) => (
                    <Card key={message.id} className={classes.card}>
                        <CardHeader
                            title={message.username}
                            action={(user.data.uid === message.authorId) && <Button onClick={() => {deleteChat(message.id)}}><DeleteIcon /></Button>} // user.data.uid === message.authorId の時のみ削除ボタン表示
                        />
                        <CardContent>
                            <Typography>{message.content}</Typography>
                        </CardContent>
                    </Card>
                    // <Card key={message.id} className={classes.card}>
                    //     <Typography>{message.username}</Typography>
                    //     <Typography>{message.content}</Typography>
                    // </Card>
                ))}
            </div>
            <form onSubmit={addChat}>
                <TextField value={text} onChange={(e) => setText(e.target.value)} variant='outlined' />
                <Button disabled={text === ''} type='submit' variant='contained'>チャットを送信</Button>
            </form>
            <Footer />
        </div>
    </>

}

export default Chat;