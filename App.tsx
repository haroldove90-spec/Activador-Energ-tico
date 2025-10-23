import React, { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import CodeSelector from './components/CodeSelector';
import ActivationPanel from './components/ActivationPanel';
import RunePanel from './components/RunePanel';
import FaqPanel from './components/FaqPanel';
import JournalPanel from './components/JournalPanel';
import ThemeToggle from './components/ThemeToggle';
import { SACRED_CODES, AGESTA_CODES, RUNES, SACRED_CATEGORIES, AGESTA_CATEGORIES, RUNE_CATEGORIES } from './constants';
import type { SacredCode, Rune, CodeOrRune, Theme } from './types';

export type CodeType = 'sacred' | 'agesta' | 'runes' | null;
type View = 'roles' | 'main' | 'faq' | 'journal';

const App: React.FC = () => {
  const [view, setView] = useState<View>('roles');
  const [selectedRole, setSelectedRole] = useState<CodeType>(null);
  const [selectedItem, setSelectedItem] = useState<CodeOrRune | null>(null);
  const [isAistudioAvailable, setIsAistudioAvailable] = useState(false);
  const [isApiKeyReady, setIsApiKeyReady] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) return storedTheme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkAistudio = async () => {
        try {
            // @ts-ignore
            if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
                setIsAistudioAvailable(true);
                // @ts-ignore
                if (await window.aistudio.hasSelectedApiKey()) {
                    setIsApiKeyReady(true);
                }
            } else {
                console.error("`window.aistudio` is not available. AI features will be disabled.");
                setIsAistudioAvailable(false);
            }
        } catch (e) {
            console.error("Error checking for AI Studio environment:", e);
            setIsAistudioAvailable(false);
        }
    };
    // Use a small delay to ensure the aistudio object has time to be injected.
    const timer = setTimeout(checkAistudio, 100); 
    return () => clearTimeout(timer);
  }, []);
  
  const handleSelectRole = (role: CodeType) => {
    setSelectedRole(role);
    setView('main');
    setSelectedItem(null);
  };
  
  const handleSelectItem = (item: CodeOrRune) => {
    setSelectedItem(item);
  };
  
  const handleBackFromItem = () => {
    setSelectedItem(null);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setSelectedItem(null);
    setView('roles');
  }

  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio) {
        try {
            // @ts-ignore
            await window.aistudio.openSelectKey();
            setIsApiKeyReady(true);
        } catch (e) {
            console.error("Error opening API key selection:", e);
        }
    }
  };

  const handleApiKeyError = () => {
      setIsApiKeyReady(false);
  }

  const renderContent = () => {
    if (view === 'roles') {
      return <RoleSelector onSelectRole={handleSelectRole} />;
    }
    
    if (view === 'faq') {
        return <FaqPanel onBack={() => setView('main')} handleApiKeyError={handleApiKeyError} />;
    }

    if (view === 'journal') {
        return <JournalPanel onBack={() => setView('main')} />;
    }

    if (view === 'main' && selectedRole) {
      if (selectedItem) {
        if (selectedRole === 'runes') {
          return <RunePanel rune={selectedItem as Rune} onBack={handleBackFromItem} handleApiKeyError={handleApiKeyError} />;
        }
        return <ActivationPanel code={selectedItem as SacredCode} onBack={handleBackFromItem} />;
      }

      switch (selectedRole) {
        case 'sacred':
          return <CodeSelector codes={SACRED_CODES} categories={SACRED_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="code" title="Códigos Sagrados" themeColor="purple" handleApiKeyError={handleApiKeyError} />;
        case 'agesta':
          return <CodeSelector codes={AGESTA_CODES} categories={AGESTA_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="code" title="Códigos de Agesta" themeColor="pink" handleApiKeyError={handleApiKeyError} />;
        case 'runes':
          return <CodeSelector codes={RUNES} categories={RUNE_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="rune" title="Oráculo de Runas" themeColor="amber" handleApiKeyError={handleApiKeyError} />;
        default:
          return <RoleSelector onSelectRole={handleSelectRole} />;
      }
    }
    
    return <RoleSelector onSelectRole={handleSelectRole} />;
  };

  if (isAistudioAvailable && !isApiKeyReady) {
    return (
      <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full max-w-md text-center bg-white/60 dark:bg-slate-800/40 p-8 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900/50">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Se requiere una API Key</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Para usar las funciones de IA de esta aplicación, por favor selecciona una API Key de Google AI Studio. Tu clave se almacena de forma segura y no se comparte.
          </p>
          <button
            onClick={handleSelectKey}
            className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-md hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Seleccionar API Key
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            Puede que se apliquen cargos. Revisa la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-500">documentación de facturación</a> para más detalles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center">
        <header className="w-full max-w-5xl flex justify-between items-start mb-8">
            <div className="w-12 h-12" /> {/* Spacer */}
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100">Activador Energético</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Manifiesta, sana y conéctate con la sabiduría universal.</p>
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <main className="w-full max-w-5xl">
            {renderContent()}
        </main>
        
        <footer className="mt-12 w-full max-w-5xl text-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
                Creado con fines de exploración espiritual. La energía responde a tu intención.
                <br />
                By Harold Anguiano Morales
            </p>
        </footer>
    </div>
  );
};

export default App;