import { createContext, useEffect } from 'react';
import useArray from 'react-use-array';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [data, { push, updateAt, removeAt, map }] = useArray([
    // {
    //   id: 0,
    //   title: 'timer 1',
    //   seconds: 3,
    //   timer: 3,
    //   timerOn: false,
    //   intervalTimer: null,
    // },
    // {
    //   id: 1,
    //   title: 'timer 2',
    //   seconds: 5,
    //   timer: 5,
    //   timerOn: false,
    //   intervalTimer: null,
    // },
    // {
    //   id: 2,
    //   title: 'timer 3',
    //   seconds: 7,
    //   timer: 7,
    //   timerOn: false,
    //   intervalTimer: null,
    // },
  ]);

  // -------------------------------------------------------

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = window.localStorage.getItem('DATA');

      const dataJson = JSON.parse(data);

      if (dataJson !== null) {
        dataJson.forEach((item, index) => {
          push(item);
          stopTimer(index, item);
        });
      }
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem('DATA', JSON.stringify(data));
    }
  }, [data]);

  // -------------------------------------------------------

  const getDataById = (id) => {
    return data.find((item) => item.id === parseInt(id));
  };

  const getIndexById = (id) => {
    return data.findIndex((obj) => obj.id === parseInt(id));
  };

  const addItem = (newItem) => {
    push({
      ...newItem,

      seconds: parseInt(newItem.seconds),

      timer: parseInt(newItem.seconds),
    });
  };

  const updateItem = (index, update) => {
    updateAt(index, (item) => ({
      ...item,

      ...update,
    }));
  };

  const removeItem = (index) => {
    removeAt(index);
  };

  // -------------------------------------------------------

  const subtractTimer = (index, item) => {
    updateAt(index, (item) => ({
      ...item,

      timer: item.timer - 1,
    }));
  };

  const startTimer = (index) => {
    updateAt(index, (item) => ({
      ...item,

      timerOn: true,

      intervalTimer: setInterval(() => {
        subtractTimer(index, item);
      }, 1000),
    }));
  };

  const stopTimer = (index, itemOriginal) => {
    clearInterval(itemOriginal.intervalTimer);

    updateItem(index, {
      timerOn: false,

      intervalTimer: null,
    });
  };

  const resetTimer = (index) => {
    updateAt(index, (item) => ({
      ...item,

      timer: item.seconds,

      timerOn: false,

      intervalTimer: null,
    }));
  };

  useEffect(() => {
    data.map((item, index) => {
      if (
        item.timerOn === true &&
        item.intervalTimer !== null &&
        item.timer <= 0
      ) {
        stopTimer(index, item);
      }
    });
  }, [data]);

  // -------------------------------------------------------

  const timerFormat = (secs) => {
    let sec_num = parseInt(secs, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;

    return [hours, minutes, seconds];
  };

  // -------------------------------------------------------

  return (
    <TimerContext.Provider
      value={{
        data,
        getDataById,
        addItem,
        updateItem,
        removeItem,
        startTimer,
        stopTimer,
        resetTimer,
        getIndexById,
        timerFormat,
      }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
