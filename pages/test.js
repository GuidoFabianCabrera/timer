import { Container } from '@mui/material';
import { useContext } from 'react';
import { TimerContext } from '../store/timer';
import { useRouter } from 'next/router';

const Test = () => {
  const router = useRouter();
  const { time, timerOn, startTimer, stopTimer, resetTimer, test } =
    useContext(TimerContext);

  // console.log(data);

  const testTimer = new test(5);

  return (
    <Container maxWidth="sm" sx={{ marginTop: '400px' }}>
      {/* <div>
        {timerOn ? 'a' : 'b'} = {time}
      </div>
      {!timerOn && <button onClick={startTimer}>Start</button>}
      {timerOn && <button onClick={stopTimer}>Stop</button>}
      <button onClick={resetTimer}>Reset</button> */}
      {/* <div>{dou.testTimer}</div>
      <div onClick={dou.wasd}>timer</div>
      <div onClick={() => router.push(`/`)}>back</div> */}
      <div>
        {testTimer.timerOn ? 'a' : 'b'} = {testTimer.testTimer}
      </div>
      {!testTimer.timerOn && (
        <button onClick={testTimer.startTimer}>Start</button>
      )}
      {testTimer.timerOn && <button onClick={testTimer.stopTimer}>Stop</button>}
      <button onClick={resetTimer}>Reset</button>
    </Container>
  );
};

export default Test;
