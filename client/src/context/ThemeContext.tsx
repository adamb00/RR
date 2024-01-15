import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface ThemeContextType {
   theme: string;
   handleToggle: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, setTheme] = useLocalStorageState('light', 'theme');

   const handleToggle = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   useEffect(() => {
      const body = document.body;
      body.classList.remove('light-mode', 'dark-mode');
      body.classList.add(`${theme}-mode`);
   }, [theme]);

   const contextValue: ThemeContextType = { theme, handleToggle };

   return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (context === undefined) throw new Error('ThemeContext was used outside ThemeProvider');
   return context;
};

export { ThemeContext, ThemeProvider };
