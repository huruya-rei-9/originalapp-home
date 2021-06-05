import {Button, TextField } from '@material-ui/core';
import {useHistory, Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import {auth} from '../firebase/config';
import Footer from './Footer';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#EEFFFF',
    },
    form: {
        maxWidth: '800px',
        height: '500px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
});

const Signup = () => {

    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user
                    .updateProfile({displayName: username})
                    .then(() => {
                        console.log('ユーザー作成成功', userCredential);
                        history.push('/userhome');
                    })
            })
            .catch((error) => {
                console.log('ユーザー作成失敗', error);
            });
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h1>ユーザー登録ページ</h1>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} fullWidth type='text' label='ユーザー名' variant='outlined'/>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth type='email' label='メールアドレス' variant='outlined'/>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type='password' label='パスワード' variant='outlined'/>
                <Button type='submit' fullWidth color='primary' variant='contained'>登録</Button>
                <Link to='/login'>アカウントをお持ちの方はこちら</Link>
            </form>
            <Footer />
        </div>
    )
}

export default Signup;