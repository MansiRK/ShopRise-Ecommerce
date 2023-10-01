import React, { createContext, useContext, useState } from "react";

// Create a context
const ThemeContext = createContext();

// Create a provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the context
const useTheme = () => {
  return useContext(ThemeContext);
};

export { useTheme, ThemeProvider };
