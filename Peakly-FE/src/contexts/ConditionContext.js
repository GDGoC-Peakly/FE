import React, { createContext, useState, useContext } from 'react';
import Character from '../../assets/img/homeScreens/character.svg'; // 컴포넌트 이름은 대문자로 시작하는 것이 관례입니다.

const ConditionContext = createContext();

export const ConditionProvider = ({ children }) => {
  const [conditionData, setConditionData] = useState({
    text: '최고예요!',
    image: Character, 
    value: 100,
  });

  return (
    <ConditionContext.Provider value={{ conditionData, setConditionData }}>
      {children}
    </ConditionContext.Provider>
  );
};

export const useCondition = () => useContext(ConditionContext);