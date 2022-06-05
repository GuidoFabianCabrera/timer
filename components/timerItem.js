import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { TimerContext } from '../store/timer';
import { Container, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid red',
    padding: '10px',
  },
}));

const timerItem = ({ seconds }) => {
  const classes = useStyles();
  // const { test } = useContext(TimerContext);

  const [time, setTime] = useState(seconds);

  const [timerOn, setTimerOn] = useState(false);

  const [test, setTest] = useState(null);

  useEffect(() => {
    if (timerOn) {
      setTest(
        setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000)
      );
    } else {
      clearInterval(test);
    }

    return () => clearInterval(test);
  }, [timerOn]);

  useEffect(() => {
    if (time == -1) {
      console.log('terminado');
      setTime(seconds);
      setTimerOn(false);
      clearInterval(test);
    }
  }, [time]);

  function start() {
    setTimerOn(true);
  }

  function stop() {
    setTimerOn(false);
  }

  function reset() {
    setTime(seconds);
    stop();
  }

  return (
    <div className={classes.box}>
      <span>✏</span>
      <span>❌</span>
      <div>{time}</div>
      {!timerOn && <button onClick={start}>Start</button>}
      {timerOn && <button onClick={stop}>Stop</button>}
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default timerItem;
