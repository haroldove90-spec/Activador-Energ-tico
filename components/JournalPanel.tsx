import React, { useState, useEffect } from 'react';
import type { JournalEntry } from '../types';
import { BackArrowIcon, TrashIcon } from './icons';

const JournalPanel: React.FC<{onBack: () => void}> = ({onBack}) => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newEntry, setNewEntry] = useState({ type: 'Código Sagrado', name: '', intention: '', result: '' });

    useEffect(() => {
        try {
            const savedEntries = localStorage.getItem('journalEntries');
            if (savedEntries) {
                setEntries(JSON.parse(savedEntries));
            }
        } catch (error) {
            console.error("Failed to load journal entries from localStorage:", error);
            setEntries([]);
        }
    }, []);

    const saveEntries = (updatedEntries: JournalEntry[]) => {
        try {
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
            setEntries(updatedEntries);
        } catch (error) {
            console.error("Failed to save journal entries to localStorage:", error);
        }
    };

    const handleAddEntry = () => {
        if (!newEntry.name || !newEntry.intention) {
            alert('Por favor, completa al menos el nombre y la intención.');
            return;
        }
        const entryToAdd: JournalEntry = {
            id: new Date().toISOString(),
            date: new Date().toLocaleDateString('es-ES'),
            ...newEntry
        };
        const updatedEntries = [...entries, entryToAdd];
        saveEntries(updatedEntries);
        setNewEntry({ type: 'Código Sagrado', name: '', intention: '', result: '' });
        setIsFormVisible(false);
    };

    const handleDeleteEntry = (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
            const updatedEntries = entries.filter(entry => entry.id !== id);
            saveEntries(updatedEntries);
        }
    };

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 animate-fade-in-scale w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold mb-6 transition-colors">
            <BackArrowIcon />
            Volver
      </button>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Diario de Resultados</h2>
        <button 
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-all transform hover:scale-105"
        >
            {isFormVisible ? 'Cancelar' : '+ Nueva Entrada'}
        </button>
      </div>

      {isFormVisible && (
          <div className="mb-8 p-6 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700 space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Añadir Experiencia</h3>
              <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Tipo de Activación</label>
                  <select value={newEntry.type} onChange={e => setNewEntry({...newEntry, type: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-400 transition">
                      <option>Código Sagrado</option>
                      <option>Código de Agesta</option>
                      <option>Runa</option>
                  </select>
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Nombre del Código o Runa</label>
                  <input type="text" value={newEntry.name} onChange={e => setNewEntry({...newEntry, name: e.target.value})} placeholder="Ej: Abundancia, Fehu" className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-400 transition" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Mi Intención</label>
                  <textarea value={newEntry.intention} onChange={e => setNewEntry({...newEntry, intention: e.target.value})} rows={3} placeholder="¿Qué buscabas manifestar o sanar?" className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-400 transition"></textarea>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Resultados y Observaciones</label>
                  <textarea value={newEntry.result} onChange={e => setNewEntry({...newEntry, result: e.target.value})} rows={3} placeholder="¿Qué sucedió? ¿Cómo te sentiste? ¿Viste alguna señal?" className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-400 transition"></textarea>
              </div>
              <button onClick={handleAddEntry} className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors">Guardar Entrada</button>
          </div>
      )}

      <div className="space-y-4">
        {entries.length > 0 ? entries.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()).map(entry => (
            <div key={entry.id} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow border border-gray-200 dark:border-slate-700 relative">
                <button onClick={() => handleDeleteEntry(entry.id)} className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                </button>
                <div className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">{entry.date}</span>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{entry.name} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({entry.type})</span></h4>
                </div>
                <div className="mt-2 pl-4 border-l-2 border-purple-200 dark:border-purple-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-200">Intención:</strong> {entry.intention}</p>
                    {entry.result && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1"><strong className="text-gray-700 dark:text-gray-200">Resultado:</strong> {entry.result}</p>}
                </div>
            </div>
        )) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Aún no has registrado ninguna activación. ¡Haz clic en 'Nueva Entrada' para empezar!
            </p>
        )}
      </div>

    </div>
  );
};

export default JournalPanel;