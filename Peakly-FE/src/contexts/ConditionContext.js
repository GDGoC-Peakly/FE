import React, { createContext, useState, useContext } from 'react';
import character from '../../assets/img/homeScreens/character.png'

const ConditionContext = createContext();

export const ConditionProvider = ({ children }) => {
  const [conditionData, setConditionData] = useState({
    text: '최고예요!',
    image: character,
    value: 100,
  });

  return (
    <ConditionContext.Provider value={{ conditionData, setConditionData }}>
      {children}
    </ConditionContext.Provider>
  );
};

export const useCondition = () => useContext(ConditionContext);