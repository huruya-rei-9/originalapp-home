import Discription from '../components/Discription';
import SuccessModal from '../components/SuccessModal';
import Nav from '../components/nav';
import Footer from '../components/Footer';
import logo from '../images/54B27462-05DE-48F6-8AC6-2719D14755E4.jpg';
import {lows} from '../util/lows';
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        backgroundColor: '#EEFFFF',
        maxWidth: '800px',
        margin: '0 auto',
    },
    logo: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    inputBox: {
        padding: '30px',
        marginBottom: '30px'
    },
    lowtextup: {
        display: 'inline',
        fontFamily: 'Times New Roman',
    },
    lowtextmiddle: {
        display: 'inline',
        fontFamily: 'Times New Roman',
        color: 'red',
    },
    lowtextdown: {
        display: 'inline',
        fontFamily: 'Times New Roman',
    },
    nextBtn: {
        margin: '60px'
    },
    init: {
        margin: '60px'
    },
    numberbottom: {
        marginBottom: '30px'
    },
    answer: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    correct: {
        display: 'inline',
        margin: '30px',
    },
    uncorrect: {
        display: 'inline',
        margin: '30px',
    },
    answerModal: {
        margin: '30px',
    },
}));

const Home = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [number, setnewNumber] = useState(0);
    const [lowString, setLowString] = useState('');
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [unCorrect, setUnCorrect] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [answerModalOpen, setAnswerModalOpen] = useState(false);
    const [next, setNext] = useState('');
    
    console.log('????????????????????????????????????');
    
    useEffect(() => {
        setLoading(true);
        let newNumber = lows[Math.floor(Math.random() * (lows.length))].number; // ??????lows???number?????????
        let newString = lows[newNumber - 1].letter; // ??????lows???number????????????letter?????????
        let r = Math.floor(Math.random() * (5)) + 1; // 1~5?????????????????????
        let n = (Math.floor(Math.random() * (newString.length - 5)) + 6) - 5; // 6~newString.length?????????????????????
        setIndex1(n);
        setIndex2(r);
        setAnswer(newString.slice(n, n + r)); // ???????????????
        setnewNumber(newNumber);
        setLowString(newString);
        setLoading(false);
        console.log('useEffect??????????????????')
    }, [next]);
    
    useEffect(() => {
        if ((correct + unCorrect) === 10) {
            console.log('??????????????????');
            setModalOpen(true);
        } // ??????????????????????????????
    }, [correct, unCorrect]);

    const nextquiz = () => {
        setLoading(true);
        setNext(Math.random());
        setModalOpen(false);
        setUserAnswer(''); // ??????????????????????????????????????????????????????????????????
        setAnswerModalOpen(false);
        setDisabled(false);
        setLoading(false);
    };

    const frominit = () => {
        setCorrect(0);
        setUnCorrect(0);
        setModalOpen(false);
        setAnswerModalOpen(false);
        setDisabled(false);
        setUserAnswer('');
        setNext(Math.random());
    };
    
    const answerSubmit = () => {
        setDisabled(true);
        if (userAnswer === answer) {
            console.log('???');
            setCorrect(correct + 1);
        } else {
            console.log('??');
            setUnCorrect(unCorrect + 1);
            setAnswerModalOpen(true);
        }
    }

    return (
        loading ? (
            <p>loading...</p>
        ) : (
            <div className={classes.root}>
                <Nav />
                <img src={logo} alt="logo" className={classes.logo}/>
                <Discription/>
                <div className={classes.inputBox}>
                    <Typography className={classes.numberbottom}>
                        ???{number}???
                    </Typography>
                    <Typography className={classes.lowtextup}>
                        {lowString.slice(0, index1)}
                    </Typography>
                    <Typography className={classes.lowtextmiddle}>
                        ?????
                    </Typography>
                    <Typography className={classes.lowtextdown}>
                        {lowString.slice(index1 + index2, lowString.length - 1)}
                    </Typography>
                    <div className={classes.answer}>
                        <form>
                            <TextField
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={disabled}
                                type='text'
                                label='?????????'
                                variant='outlined'
                            />
                            <Button disabled={disabled} color='primary' variant='contained' onClick={answerSubmit}>??????</Button>
                        </form>
                    </div>
                    <Typography className={classes.correct}>
                        ?????????: {correct}
                    </Typography>
                    <Typography className={classes.uncorrect}>
                        ????????????: {unCorrect}
                    </Typography>
                    <Typography className={classes.answerModal} style={{display: answerModalOpen ? 'block' : 'none'}}>
                        <span style={{color: 'red'}}>??????:</span> {answer}
                    </Typography> 
                </div>
                <Button disabled={!disabled} className={classes.nextBtn} onClick={nextquiz} color='secondary' variant='contained'>???????????????</Button>
                <Button className={classes.init} onClick={frominit} color='secondary' variant='contained'>????????????</Button>
                <SuccessModal
                    result={{
                        correct,
                        unCorrect
                    }}
                    frominit={frominit}
                    modalOpen={modalOpen}
                    modalClose={() => setModalOpen(false)}
                />
                <Footer />
            </div>
        )
    )
}

export default Home;