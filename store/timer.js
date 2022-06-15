import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useArray from 'react-use-array';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const router = useRouter();

  const [data, setData] = useState([
    {
      id: 0,
      title: 'aaaa',
      seconds: 3,
      timer: 3,
      timerOn: false,
      intervalTimer: null,
    },
    {
      id: 1,
      title: 'bbbb',
      seconds: 5,
      timer: 5,
      timerOn: false,
      intervalTimer: null,
    },
    {
      id: 2,
      title: 'cccc',
      seconds: 7,
      timer: 7,
      timerOn: false,
      intervalTimer: null,
    },
  ]);

  const getDataById = (id) => {
    const item = data.find((x) => x.id === parseInt(id));
    return item;
  };

  const addItem = (item) => {
    const cloneData = data;

    cloneData.push({
      ...item,
      seconds: parseInt(item.seconds),
      timer: parseInt(item.seconds),
    });

    setData(cloneData);
  };

  const updateItem = (item, name) => {
    const cloneData = data.map((obj) => {
      if (obj.id === item.id) {
        return { ...obj, ...item };
      }

      return obj;
    });

    // console.log({ cloneData, name });

    setData(cloneData);

    // console.log(name);

    // const cloneData = JSON.parse(JSON.stringify(data));

    // const index = cloneData.findIndex((obj) => {
    //   return obj.id === item.id;
    // });

    // console.log({
    //   a: cloneData[index],
    //   b: item,
    //   merge: { ...cloneData[index], ...item },
    // });

    // cloneData[index] = { ...cloneData[index], ...item };

    // setData(cloneData);
  };

  const removeItem = (id) => {
    console.log('remove item', id);

    const cloneData = data.filter((object) => {
      return object.id !== id;
    });

    setData((state) => [...cloneData]);
  };

  // -------------------------------------------------------

  const subtractTimer = (item) => {
    const test = getDataById(item.id);

    updateItem(
      {
        id: item.id,

        timer: test.timer - 1,
      },
      'subtract timer'
    );
  };

  const startTimer = (item) => {
    const test = {
      id: item.id,

      timerOn: true,
    };

    updateItem(test, 'start timer');
  };

  useEffect(() => {
    data.map((item) => {
      if (item.timerOn === true && item.intervalTimer === null) {
        // console.log('use effect item', item.id);

        const intervalTimer = setInterval(() => {
          // console.log('1s', item.id);
          subtractTimer(item);
        }, 1000);

        updateItem(
          {
            id: item.id,

            intervalTimer,
          },

          'use effect'
        );
      }
    });
  }, [data]);

  const stopTimer = (item) => {
    clearInterval(item.intervalTimer);

    updateItem(
      {
        id: item.id,

        timerOn: false,

        intervalTimer: null,
      },
      'stop Timer'
    );

    console.log('stop Timer');
  };

  const resetTimer = (item) => {
    updateItem(
      {
        id: item.id,

        timer: item.seconds,

        timerOn: false,

        intervalTimer: null,
      },
      'reset Timer'
    );

    console.log('reset Timer');
  };

  const [
    list,
    {
      set,
      empty,
      replace,
      push,
      updateAt,
      setAt,
      removeAt,
      filter,
      map,
      sort,
      reverse,
      mergeBefore,
      mergeAfter,
    },
  ] = useArray(data);

  const test2 = (index) => {
    updateAt(index, (item) => ({
      ...item,

      timer: item.timer - 1,
    }));
  };

  const test = (index) => {
    updateAt(index, (item) => ({
      ...item,

      timerOn: true,

      intervalTimer: setInterval(() => {
        test2(index);
      }, 1000),
    }));
  };

  console.log(list);

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
        test,
        list,
      }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
