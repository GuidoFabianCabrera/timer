import { createContext, useState } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [data, setData] = useState([
    { id: 0, title: 'a', seconds: 3 },
    { id: 1, title: 'b', seconds: 5 },
    { id: 2, title: 'c', seconds: 7 },
  ]);

  const addItem = (item) => {
    console.log('add item', item);
  };

  const updateItem = (id) => {
    console.log('add item');
  };

  const addRemove = (id) => {
    console.log('add item');
  };

  return (
    <TimerContext.Provider value={{ data, addItem, updateItem, addRemove }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerProvider, TimerContext };
