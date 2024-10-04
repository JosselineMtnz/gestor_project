// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // Retorna el valor almacenado o el valor inicial
    } catch (error) {
      console.error(error);
      return initialValue; // En caso de error, retorna el valor inicial
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value; // Permite que el valor sea una función
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore)); // Almacena el nuevo valor en localStorage
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
