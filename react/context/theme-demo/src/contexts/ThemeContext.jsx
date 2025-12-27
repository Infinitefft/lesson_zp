import {
  useState,
  createContext,
  useEffect,
} from 'react';

export const ThemeContext = createContext(null);  // 容器
export default function ThemeProvider({children}) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((theme) => theme === 'light' ? 'dark' : 'light')
  }
  useEffect(() => {
    // 监听theme的变化
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])
  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}