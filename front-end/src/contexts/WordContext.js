
import React, { useState, useEffect, createContext } from 'react';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState(new Set());

  useEffect(() => {
    fetch('/kelimeler.txt')
      .then(response => response.text())
      .then(text => {
        // Her satırı ayır ve taşıma karakterlerini kaldır
        const cleanedWords = text.split('\n').map(word => word.trim().replace(/\r/g, ''));
        // Benzersiz kelimeleri Set olarak sakla
        setWords(new Set(cleanedWords));
      });
  }, []);

  return (
    <WordContext.Provider value={words}>
      {children}
    </WordContext.Provider>
  );
};