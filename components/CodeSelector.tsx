import React, { useState, useMemo } from 'react';
import type { CodeOrRune, SacredCode } from '../types';
import AISearch from './AISearch';
import { FaqIcon, JournalIcon } from './icons';

type View = 'main' | 'faq' | 'journal';

interface CodeSelectorProps {
  codes: CodeOrRune[];
  categories: string[];
  onCodeSelect: (code: CodeOrRune) => void;
  onBack: () => void;
  setView: (view: View) => void;
  searchType: 'code' | 'rune';
  title: string;
  themeColor: 'purple' | 'pink' | 'amber';
}

const CodeSelector: React.FC<CodeSelectorProps> = ({ codes, categories, onCodeSelect, onBack, setView, searchType, title, themeColor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiFoundCode, setAiFoundCode] = useState<CodeOrRune | null>(null);

  const themeClasses = useMemo(() => {
    switch (themeColor) {
      case 'pink':
        return {
          text: 'text-pink-700 dark:text-pink-400',
          hoverText: 'hover:text-pink-900 dark:hover:text-pink-300',
          title: 'text-pink-800 dark:text-pink-300',
          border: 'border-pink-200 dark:border-pink-800',
          ring: 'focus:ring-pink-400',
          activeBg: 'bg-pink-100 dark:bg-pink-900/50',
          activeText: 'text-pink-800 dark:text-pink-200',
        };
      case 'amber':
        return {
          text: 'text-amber-800 dark:text-amber-400',
          hoverText: 'hover:text-amber-900 dark:hover:text-amber-300',
          title: 'text-amber-900 dark:text-amber-200',
          border: 'border-amber-300 dark:border-amber-700',
          ring: 'focus:ring-amber-400',
          activeBg: 'bg-amber-100 dark:bg-amber-900/50',
          activeText: 'text-amber-900 dark:text-amber-200',
        };
      case 'purple':
      default:
        return {
          text: 'text-purple-700 dark:text-purple-400',
          hoverText: 'hover:text-purple-800 dark:hover:text-purple-300',
          title: 'text-purple-800 dark:text-purple-300',
          border: 'border-purple-200 dark:border-purple-700',
          ring: 'focus:ring-purple-400',
          activeBg: 'bg-purple-100 dark:bg-purple-900/50',
          activeText: 'text-purple-800 dark:text-purple-200',
        };
    }
  }, [themeColor]);

  const filteredCodes = useMemo(() => {
    if (aiFoundCode) return [aiFoundCode];

    let items = codes;
    if (selectedCategory) {
      items = items.filter(code => code.category === selectedCategory);
    }
    if (searchTerm) {
      items = items.filter(code =>
        code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ('code' in code && code.code.toString().includes(searchTerm))
      );
    }
    return items;
  }, [codes, selectedCategory, searchTerm, aiFoundCode]);
  
  const handleAiFound = (code: CodeOrRune) => {
    setAiFoundCode(code);
    setSelectedCategory(code.category);
    setSearchTerm('');
  };

  const clearAiSearch = () => {
    setAiFoundCode(null);
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-scale">
        <div className="flex justify-between items-center mb-4">
            <button onClick={onBack} className={`flex items-center gap-2 font-semibold ${themeClasses.text} ${themeClasses.hoverText} transition-colors`}>
                &larr; Cambiar Rol
            </button>
            <div className="flex items-center gap-4">
                 <button onClick={() => setView('faq')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors">
                    <FaqIcon className="w-5 h-5" />
                    <span>FAQ</span>
                </button>
                <button onClick={() => setView('journal')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors">
                    <JournalIcon className="w-5 h-5" />
                    <span>Diario</span>
                </button>
            </div>
        </div>

      <h1 className={`text-4xl font-bold text-center mb-4 ${themeClasses.title}`}>{title}</h1>

      <AISearch codes={codes} onCodeFound={handleAiFound} onClear={clearAiSearch} searchType={searchType} />

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => { setSelectedCategory(category); setAiFoundCode(null); }}
            className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${selectedCategory === category ? `${themeClasses.activeBg} ${themeClasses.activeText} ${themeClasses.border}` : 'bg-white/60 dark:bg-slate-800/60 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
       <input
        type="text"
        placeholder="Buscar por nombre, descripción o número..."
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value); setAiFoundCode(null);}}
        className={`w-full px-4 py-2 mb-6 rounded-full border-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-transparent transition-colors ${themeClasses.border} ${themeClasses.ring}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.length > 0 ? filteredCodes.map(code => (
          <div
            key={'code' in code ? code.code : code.name}
            onClick={() => onCodeSelect(code)}
            className={`p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 border bg-white/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700/80 ${themeClasses.border}`}
          >
            <p className={`font-bold text-lg ${themeClasses.text}`}>{code.name}</p>
            {'code' in code && <p className="text-sm font-mono text-gray-500 dark:text-gray-400">#{ (code as SacredCode).code }</p>}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{code.description}</p>
          </div>
        )) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No se encontraron resultados. ¡Prueba la búsqueda con IA!</p>
        )}
      </div>
    </div>
  );
};

export default CodeSelector;