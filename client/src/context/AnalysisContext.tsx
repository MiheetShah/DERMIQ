// src/context/AnalysisContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define types for the analysis result
export interface Product {
  name: string;
  imageUrl: string;
  description: string;
}

export interface UserDetails {
  name: string;
  age: number;
  gender: string;
  skinType: string;
  allergies: string[];
}

export interface AnalysisResult {
  disease: string;
  description: string;
  imageUrl: string;
  remedies: string[];
  products: Product[];
  symptoms: string[];
  confidence: number;
  userDetails: UserDetails;
  date: string;
}

interface AnalysisContextType {
  results: AnalysisResult[];
  addResult: (result: AnalysisResult) => void;
  clearResults: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const addResult = (result: AnalysisResult) => {
    setResults(prev => [...prev, { ...result, date: new Date().toString() }]);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <AnalysisContext.Provider value={{ results, addResult, clearResults }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};