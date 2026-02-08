import React, { createContext, useState, useContext } from 'react';

const SleepContext = createContext();

export const SleepProvider = ({ children }) => {
  const [sleepData, setSleepData] = useState({
    startTime: new Date(new Date().setHours(22, 0, 0, 0)),
    endTime: new Date(new Date().setHours(6, 0, 0, 0)),
    hours: 8,
    minutes: 0,
    totalHours: 8,
  });

  return (
    <SleepContext.Provider value={{ sleepData, setSleepData }}>
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => useContext(SleepContext);