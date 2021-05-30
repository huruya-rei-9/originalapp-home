import {useState} from 'react';
// import {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import {auth} from '../firebase/config';
// import {AuthContext} from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: '30px',
  },
});


const Nav = () => {
    
    const history = useHistory();
    // const state = useContext(AuthContext);
    // console.log(state)

    const classes = useStyles();
    const [value, setValue] = useState(); // 本当は0ではなく何も入っていないのが理想
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const ToUserHome = () => {
      console.log('UserHomeに移動')
      history.push('/userhome')
    }

    const ToHome = () => {
        console.log('homeに移動')
        history.push('/');
    };

    const ToOpinion = () => {
        console.log('opinionに移動')
        history.push('/opinionbox');
    };

    const logout = () => {
        auth
            .signOut()
            .then(() => console.log('ログアウトしました'))
            .catch((err) => console.log('ログアウトに失敗しました', err))
    }

    const ToChat = () => {
      console.log('chatに移動');
      history.push('/chat');
    }

    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab onClick={ToUserHome} label="ユーザー" icon={<HomeIcon />}/> {/*value=0*/}
          <Tab onClick={ToHome} label="HOME" icon={<HomeIcon />} /> {/*value=1*/}
          <Tab onClick={ToChat} label="チャット" icon={<ChatIcon />} /> {/*value=2*/}
          <Tab onClick={ToOpinion} label="ご意見はこちら" icon={<HowToVoteIcon />} /> {/*value=3*/}
          <Tab onClick={logout} label="ログアウト" icon={<ExitToAppIcon/>} /> {/*value=4*/}
        </Tabs>
      </Paper>
    );

};

export default Nav;

// valueは正直いらないが、Tabの機能を使うには必ずないといけないらしいので一応入れている。