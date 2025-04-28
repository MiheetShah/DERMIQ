
import React, { createContext, useContext, useState } from 'react';

// Define the shape of our Analysis Result
interface AnalysisResult {
  id: string;
  date: string;
  disease: string;
  description: string;
  imageUrl: string;
  remedies: string[];
  products: Product[];
  userDetails: {
    name?: string;
    age?: number;
    gender?: string;
    skinType?: string;
    allergies?: string[];
  };
}

interface Product {
  name: string;
  imageUrl: string;
  description?: string;
}

// Define the shape of our AnalysisContext
interface AnalysisContextType {
  results: AnalysisResult[];
  addResult: (result: Omit<AnalysisResult, 'id' | 'date'>) => void;
  getResultById: (id: string) => AnalysisResult | undefined;
}

// Create the context with a default value
const AnalysisContext = createContext<AnalysisContextType>({
  results: [],
  addResult: () => {},
  getResultById: () => undefined,
});

// Custom hook to use the analysis context
export const useAnalysis = () => useContext(AnalysisContext);

// Analysis Provider component
export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const addResult = (result: Omit<AnalysisResult, 'id' | 'date'>) => {
    const newResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    
    setResults(prevResults => [...prevResults, newResult]);
    
    // If you want to store results in localStorage
    const storedResults = JSON.parse(localStorage.getItem('analysisResults') || '[]');
    localStorage.setItem('analysisResults', JSON.stringify([...storedResults, newResult]));
  };

  const getResultById = (id: string) => {
    return results.find(result => result.id === id);
  };

  return (
    <AnalysisContext.Provider value={{ results, addResult, getResultById }}>
      {children}
    </AnalysisContext.Provider>
  );
};
