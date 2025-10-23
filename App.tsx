import React, { useState, useEffect } from 'react';
import RoleSelector from './components/RoleSelector';
import CodeSelector from './components/CodeSelector';
import ActivationPanel from './components/ActivationPanel';
import RunePanel from './components/RunePanel';
import FaqPanel from './components/FaqPanel';
import JournalPanel from './components/JournalPanel';
import { SACRED_CODES, AGESTA_CODES, RUNES, SACRED_CATEGORIES, AGESTA_CATEGORIES, RUNE_CATEGORIES } from './constants';
import type { SacredCode, Rune, CodeOrRune, Theme } from './types';

export type CodeType = 'sacred' | 'agesta' | 'runes' | null;
type View = 'roles' | 'main' | 'faq' | 'journal';

// Helper to apply theme based on system preference.
const applySystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};


const App: React.FC = () => {
  const [view, setView] = useState<View>('roles');
  const [selectedRole, setSelectedRole] = useState<CodeType>(null);
  const [selectedItem, setSelectedItem] = useState<CodeOrRune | null>(null);

  useEffect(() => {
    applySystemTheme();

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applySystemTheme();
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
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

  const renderContent = () => {
    if (view === 'roles') {
      return <RoleSelector onSelectRole={handleSelectRole} />;
    }
    
    if (view === 'faq') {
        return <FaqPanel onBack={() => setView('main')} />;
    }

    if (view === 'journal') {
        return <JournalPanel onBack={() => setView('main')} />;
    }

    if (view === 'main' && selectedRole) {
      if (selectedItem) {
        if (selectedRole === 'runes') {
          return <RunePanel rune={selectedItem as Rune} onBack={handleBackFromItem} />;
        }
        return <ActivationPanel code={selectedItem as SacredCode} onBack={handleBackFromItem} />;
      }

      switch (selectedRole) {
        case 'sacred':
          return <CodeSelector codes={SACRED_CODES} categories={SACRED_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="code" title="Códigos Sagrados" themeColor="purple" />;
        case 'agesta':
          return <CodeSelector codes={AGESTA_CODES} categories={AGESTA_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="code" title="Códigos de Agesta" themeColor="pink" />;
        case 'runes':
          return <CodeSelector codes={RUNES} categories={RUNE_CATEGORIES} onCodeSelect={handleSelectItem} onBack={handleBackToRoles} setView={setView} searchType="rune" title="Oráculo de Runas" themeColor="amber" />;
        default:
          // This case should ideally not be reached if view logic is correct
          return <RoleSelector onSelectRole={handleSelectRole} />;
      }
    }
    
    return <RoleSelector onSelectRole={handleSelectRole} />;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center">
        <header className="w-full max-w-5xl flex justify-center items-center mb-8">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100">Activador Energético</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Manifiesta, sana y conéctate con la sabiduría universal.</p>
            </div>
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