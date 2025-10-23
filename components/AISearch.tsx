
import React, { useState, useRef, FormEvent } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { CodeOrRune } from '../types';
import { SearchIcon, ResetIcon } from './icons';

interface AISearchProps {
  codes: CodeOrRune[];
  onCodeFound: (code: CodeOrRune) => void;
  onClear: () => void;
  searchType: 'code' | 'rune';
  handleApiKeyError: () => void;
}

const AISearch: React.FC<AISearchProps> = ({ codes, onCodeFound, onClear, searchType, handleApiKeyError }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    onClear();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let prompt = '';
      if (searchType === 'code') {
          prompt = `De la siguiente lista de códigos: ${JSON.stringify(codes.map(c => ({code: (c as any).code, name: c.name, description: c.description})))}, encuentra el más relevante para este propósito: "${query}". Responde SÓLO con el número del código. Si no encuentras uno adecuado, responde con "0".`;
      } else {
          prompt = `De la siguiente lista de runas: ${JSON.stringify(codes.map(c => ({name: c.name, description: c.description})))}, encuentra la más relevante para este propósito: "${query}". Responde SÓLO con el nombre exacto de la runa (ej: 'Fehu', 'Uruz'). Si no encuentras una adecuada, responde con "null".`;
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const resultText = response.text.trim();
      let foundItem: CodeOrRune | undefined;

      if (searchType === 'code') {
        const codeNumber = parseInt(resultText, 10);
        if (isNaN(codeNumber) || codeNumber === 0) {
            throw new Error("No se encontró un código específico. Intenta con otra descripción.");
        }
        foundItem = codes.find(c => 'code' in c && c.code === codeNumber);
      } else {
        if (resultText === 'null') {
            throw new Error("No se encontró una runa específica. Intenta con otra descripción.");
        }
        foundItem = codes.find(c => c.name.toLowerCase() === resultText.toLowerCase());
      }


      if (foundItem) {
        onCodeFound(foundItem);
      } else {
        throw new Error(`El resultado '${resultText}' sugerido por la IA no se encuentra en la lista.`);
      }

    } catch (err) {
      const error = err as Error;
      if (error.message.includes('API key not valid')) { // Adjusted error message check
          handleApiKeyError();
          setError("La API Key seleccionada no es válida. Por favor, selecciona otra.");
      } else {
          console.error(err);
          setError(error.message || "Ocurrió un error al buscar.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setError(null);
    onClear();
    inputRef.current?.focus();
  }

  return (
    <div className="mb-8 p-6 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900/50">
      <h3 className="text-xl font-semibold mb-3 text-center text-purple-700 dark:text-purple-300">¿No sabes cuál usar?</h3>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Describe tu propósito o problema y la IA encontrará el mejor para ti.</p>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full">
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: 'Necesito protección en un viaje' o 'mejorar mi economía'"
                className="w-full px-4 py-3 pr-10 rounded-full border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-purple-800 dark:text-purple-200 placeholder-purple-300 dark:placeholder-purple-600 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors"
                disabled={isLoading}
            />
            {query && !isLoading && (
                 <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                    <ResetIcon />
                </button>
            )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-md hover:bg-purple-700 disabled:bg-purple-300 dark:disabled:bg-purple-800 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <SearchIcon />
              <span>Buscar</span>
            </>
          )}
        </button>
      </form>
      {error && <p className="text-red-600 dark:text-red-400 text-center mt-3 text-sm">{error}</p>}
    </div>
  );
};

export default AISearch;
