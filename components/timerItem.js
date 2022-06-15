import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { TimerContext } from '../store/timer';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid red',
    padding: '10px',
  },
}));

const timerItem = ({ item, index }) => {
  const classes = useStyles();
  const router = useRouter();
  const { removeItem, startTimer, stopTimer, resetTimer, test } =
    useContext(TimerContext);

  const handleClick = () => startTimer(item);

  return (
    <div className={classes.box}>
      <span onClick={() => router.push(`/${item.id}/update`)}>✏</span>
      <span onClick={() => removeItem(item.id)}>❌</span>
      <div>{item.title}</div>
      <div>{item.timer}</div>
      {!item.timerOn && <button onClick={handleClick}>Start</button>}
      {item.timerOn && <button onClick={() => stopTimer(item)}>Stop</button>}
      <button onClick={() => resetTimer(item)} disabled={item.timerOn}>
        Reset
      </button>
      <button onClick={() => test(index)}>test</button>
    </div>
  );
};

export default timerItem;
