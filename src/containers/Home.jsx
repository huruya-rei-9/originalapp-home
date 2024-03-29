import Discription from '../components/Discription';
import SuccessModal from '../components/SuccessModal';
import Nav from '../components/nav';
import Footer from '../components/Footer';
import logo from '../images/54B27462-05DE-48F6-8AC6-2719D14755E4.jpg';
// import {lows} from '../util/lows'; // ☆ ☆は教育基本法の文章の空欄が適当にランダムに選ばれるパターン(単語になってない場合もある)
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import Data from './lows.json'; // △ △は教育基本法の文章の空欄が文節でランダムに選ばれるパターン

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
    const [number, setNumber] = useState(0);
    // const [lowString, setLowString] = useState(''); // ☆
    const [beginString, setBeginString] = useState(''); // △
    const [endString, setEndString] = useState(''); // △
    // const [index1, setIndex1] = useState(0); // ☆
    // const [index2, setIndex2] = useState(0); // ☆
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [unCorrect, setUnCorrect] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [answerModalOpen, setAnswerModalOpen] = useState(false);
    const [next, setNext] = useState('');
    
    // console.log('再レンダリングされました');
    
    useEffect(() => {

        // ----------------------------------------------------- △
        
        setLoading(true);
        let number = Math.floor(Math.random() * Data.length) + 1; //第〇条か選ぶ

        let okarraynum = [];
        for (let m = 0; m <= Data[number - 1].content.length - 1; m++) {
            let len = Data[number - 1].content[m].length;
            if (len >= 5) {
                okarraynum.push(m)
            }
        } //文章を文節に分けた中でも5文字以上にやつを選び出し、その文節が入っている配列のインデックス番号をすべてokarraynumに入れる
        let n = Math.floor(Math.random() * okarraynum.length); //okarraynumの要素数が2の場合、0～1のランダム整数nを作成
        
        let begin = [];
        for (let i = 0; i <= okarraynum[n] - 1; i++) {
            begin.push(Data[number - 1].content[i])
        } //配列beginに解答の前までの部分を入れる
        let beginning = begin.join(''); //配列beginの要素をすべてくっつけて文章にする
        setBeginString(beginning);

        let middle = Data[number - 1].content[okarraynum[n]];
        setAnswer(middle); // 解答を取得

        let end = [];
        for (let i = okarraynum[n] + 1; i <= Data[number - 1].content.length - 1; i++) {
            end.push(Data[number - 1].content[i])
        } //配列endに解答の後の部分を入れる
        let ending = end.join(''); //配列endの要素をすべてくっつけて文章にする
        setEndString(ending);


        setNumber(number);
        setLoading(false);
        // console.log('useEffectが動きました')

        // ----------------------------------------------------- △

        // -------------------------------------------------------------------- // ☆
        // setLoading(true);
        // let newNumber = lows[Math.floor(Math.random() * (lows.length))].number; // 配列lowsのnumberを取得
        // let newString = lows[newNumber - 1].letter; // 配列lowsのnumberに対するletterを取得
        // let r = Math.floor(Math.random() * (5)) + 1; // 1~5のランダム整数
        // let n = (Math.floor(Math.random() * (newString.length - 5)) + 6) - 5; // 6~newString.lengthのランダム整数
        // setIndex1(n);
        // setIndex2(r);
        // setAnswer(newString.slice(n, n + r)); // 解答を取得
        // setnewNumber(newNumber);
        // setLowString(newString);
        // setLoading(false);
        // // console.log('useEffectが動きました')
        // -------------------------------------------------------------------- // ☆
    }, [next]);
    
    useEffect(() => {
        if ((correct + unCorrect) === 10) {
            console.log('ゲーム終わり');
            setModalOpen(true);
        } // ゲーム終了のきっかけ
    }, [correct, unCorrect]);

    const nextquiz = () => {
        setLoading(true);
        setNext(Math.random());
        setModalOpen(false);
        setUserAnswer(''); // 「次の問題へ」が押されたら解答欄の中身を消す
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
            console.log('〇');
            setCorrect(correct + 1);
        } else {
            console.log('×');
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
                        第{number}条
                    </Typography>
                    <Typography className={classes.lowtextup}>
                        {/* {lowString.slice(0, index1)} */} {/*☆*/}
                        {beginString} {/*△*/}
                    </Typography>
                    <Typography className={classes.lowtextmiddle}>
                        ?????
                    </Typography>
                    <Typography className={classes.lowtextdown}>
                        {/* {lowString.slice(index1 + index2, lowString.length - 1)} */} {/*☆*/}
                        {endString} {/*△*/}
                    </Typography>
                    <div className={classes.answer}>
                        <form>
                            <TextField
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={disabled}
                                type='text'
                                label='解答欄'
                                variant='outlined'
                            />
                            <Button disabled={disabled} color='primary' variant='contained' onClick={answerSubmit}>決定</Button>
                        </form>
                    </div>
                    <Typography className={classes.correct}>
                        正解数: {correct}
                    </Typography>
                    <Typography className={classes.uncorrect}>
                        不正解数: {unCorrect}
                    </Typography>
                    <Typography className={classes.answerModal} style={{display: answerModalOpen ? 'block' : 'none'}}>
                        <span style={{color: 'red'}}>解答:</span> {answer}
                    </Typography> 
                </div>
                <Button disabled={!disabled} className={classes.nextBtn} onClick={nextquiz} color='secondary' variant='contained'>次の問題へ</Button>
                <Button className={classes.init} onClick={frominit} color='secondary' variant='contained'>最初から</Button>
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