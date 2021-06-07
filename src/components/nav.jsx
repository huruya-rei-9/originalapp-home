import {useState} from 'react';
// import {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BusinessIcon from '@material-ui/icons/Business';
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
  Tab: {
    textTransform: "none",
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
          variant="scrollable"
          scrollButtons="off"
        >
          <Tab className={classes.Tab} onClick={ToUserHome} label="user" icon={<HomeIcon />}/> {/*value=0*/}
          <Tab className={classes.Tab} onClick={ToHome} label="study" icon={<BusinessIcon />} /> {/*value=1*/}
          <Tab className={classes.Tab} onClick={ToChat} label="chat" icon={<ChatIcon />} /> {/*value=2*/}
          <Tab className={classes.Tab} onClick={ToOpinion} label="opinion" icon={<HowToVoteIcon />} /> {/*value=3*/}
          <Tab className={classes.Tab} onClick={logout} label="logout" icon={<ExitToAppIcon/>} /> {/*value=4*/}
        </Tabs>
      </Paper>
    );

};

export default Nav;

// valueは正直いらないが、Tabの機能を使うには必ずないといけないらしいので一応入れている。