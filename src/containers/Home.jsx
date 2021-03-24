import Discription from '../components/Discription';
import SuccessModal from '../components/SuccessModal';
import logo from '../images/54B27462-05DE-48F6-8AC6-2719D14755E4.jpg';
import {lows} from '../util/lows';
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
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
}))

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
    const [modalOpen, setModalOpen] = useState(false);
    const [next, setNext] = useState('');
    
    
    useEffect(() => {
        setLoading(true);
        let newNumber = lows[Math.floor(Math.random() * (lows.length))].number; // 配列lowsのnumberを取得
        let newString = lows[newNumber - 1].letter; // 配列lowsのnumberに対するletterを取得
        let r = Math.floor(Math.random() * (5)) + 1; // 1~5のランダム整数
        let n = (Math.floor(Math.random() * (newString.length - 5)) + 6) - 5; // 6~newString.lengthのランダム整数
        setIndex1(n);
        setIndex2(r);
        setAnswer(newString.slice(n, n + r)); // 解答を取得
        setnewNumber(newNumber);
        setLowString(newString);
        setLoading(false);
    }, [next]);
    
    const nextquiz = () => {
        setLoading(true);
        setNext(Math.random());
        setModalOpen(false);
        setLoading(false);
        setUserAnswer(''); // 「次の問題へ」が押されたら解答欄の中身を消す
    };
    
    const answerSubmit = () => {
        if (userAnswer === answer) {
            console.log('〇');
            setCorrect(correct + 1);
        } else {
            console.log('×');
            setUnCorrect(unCorrect + 1);
        }
        
        if ((correct + unCorrect) === 10) {
            console.log('ゲーム終わり');
            setModalOpen(true);
        } // ゲーム終了のきっかけ
    }
    
    console.log(correct + unCorrect);

    return (
        loading ? (
            <p>loading...</p>
        ) : (
            <div align='center'>
                <img src={logo} alt="logo" className={classes.logo}/>
                <Discription/>
                <div className={classes.inputBox}>
                    <Typography className={classes.numberbottom}>
                        第{number}条
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
                            <TextField value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} type='text' label='解答欄' variant='outlined'/>
                            <Button color='primary' variant='contained' onClick={answerSubmit}>決定</Button>
                        </form>
                    </div>
                    <Typography className={classes.correct}>
                        正解数: {correct}
                    </Typography>
                    <Typography className={classes.uncorrect}>
                        不正解数: {unCorrect}
                    </Typography>
                </div>
                <Button className={classes.nextBtn} onClick={nextquiz} color='secondary' variant='contained'>次の問題へ</Button>
                <SuccessModal
                    result={{
                        correct,
                        unCorrect
                    }}
                    modalOpen={modalOpen}
                    modalClose={() => setModalOpen(false)}
                />
            </div>
        )
    )
}

export default Home;