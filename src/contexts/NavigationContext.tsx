import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext<any>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  return useContext(NavigationContext);
}; 