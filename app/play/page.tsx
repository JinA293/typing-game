'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import keygraph from './keygraph.js';
import sound from './sound.js';

const TypingGame = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [keyCandidate, setKeyCandidate] = useState('');
    const [keyDone, setKeyDone] = useState('');
    const [seqCandidates, setSeqCandidates] = useState('');
    const [seqDone, setSeqDone] = useState('');
    const keywords = ['こんにちは', 'さようなら', 'ありがとう', 'おはよう', 'おやすみ'];

    // 関数でランダムなキーワードを選ぶ
    const getRandomKeyword = () => {
        return keywords[Math.floor(Math.random() * keywords.length)];
    }

    useEffect(() => {
        keygraph.build(getRandomKeyword());

        const handleKeyDown = (e: any) => {
            if (e.key === "Tab") {
                e.preventDefault();
            }
            if (keygraph.next(e.key)) {
                sound.play();
            }

            keygraph.next(e.key)
            if (keygraph.is_finished()) {
                keygraph.reset();
                keygraph.build(getRandomKeyword());
                setScore(prevScore => prevScore + 1);
            }
            updateDisplay();
        };

        const updateDisplay = () => {
            setKeyCandidate(keygraph.key_candidate());
            setKeyDone(keygraph.key_done());
            setSeqCandidates(keygraph.seq_candidates());
            setSeqDone(keygraph.seq_done());
        };

        document.body.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setGameOver(true);
        }
    }, [timeLeft]);

    return gameOver ? (
        <div className={styles.page}>
            <h1 className={styles.title}>Result</h1>
            <p className={styles.result}>Your score is: {score}</p>
            <a href="/" className={styles.title}>Back to Title</a>
        </div>
    ) : (
        <div className={styles.page}>
            {/* <h1 className={styles.title}>Typing Game</h1> */}
            <p className={styles.score}>Score: {score}</p>
            <p className={styles.time}>Time left: {timeLeft} seconds</p>
            <p className={styles.keyword}>
                <div className={styles.done}> {seqDone}</div>
                <div> {seqCandidates}</div> 
            </p>
            <p className={styles.keyword}>
                <div className={styles.done}> {keyDone}</div>
                <div> {keyCandidate}</div>
            </p>
        </div>
    );
};

export default TypingGame;
