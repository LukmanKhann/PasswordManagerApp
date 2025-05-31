import React, {createContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);

  useEffect(() => {
    setTheme(systemScheme);
  }, [systemScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
