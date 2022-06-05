import { TimerProvider } from '../store/timer';

const withTimer = (Component) => (props) => {
  return (
    <TimerProvider>
      <Component {...props} />
    </TimerProvider>
  );
};

export default withTimer;
