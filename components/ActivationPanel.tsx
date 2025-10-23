import React, { useState, useMemo } from 'react';
import type { SacredCode } from '../types';
import { BackArrowIcon, ResetIcon } from './icons';

interface ActivationPanelProps {
  code: SacredCode;
  onBack: () => void;
}

const ActivationPanel: React.FC<ActivationPanelProps> = ({ code, onBack }) => {
  const [count, setCount] = useState(0);
  const [thirdPartyName, setThirdPartyName] = useState('');
  const isCompleted = count === 45;

  const handleCount = () => {
    if (count < 45) {
      setCount(prev => prev + 1);
    }
  };
  
  const handleReset = () => {
      setCount(0);
  }

  const progressStyle = useMemo(() => {
    const percentage = (count / 45) * 100;
    // Note: Conic gradient might not be perfectly mappable to dark theme colors via JS.
    // We'll rely on the text and surrounding elements to convey the theme.
    // The colors are chosen to be vibrant in both light and dark modes.
    return {
      background: `conic-gradient(#6d28d9 ${percentage}%, #e9d5ff ${percentage}%)`,
    };
  }, [count]);

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-800 animate-fade-in-scale">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold mb-4 transition-colors">
            <BackArrowIcon />
            Volver a la lista
        </button>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">{code.name}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">Código Sagrado: <span className="font-bold">{code.code}</span></p>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">{code.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <h3 className="font-bold text-indigo-800 dark:text-indigo-200">Frase de Activación (para ti):</h3>
                <p className="text-indigo-700 dark:text-indigo-300 italic">"Con todo el poder de mi intención, activo el Código Sagrado <span className="font-bold">{code.code}</span> para <span className="font-bold">{code.name.toLowerCase()}</span>."</p>
            </div>

            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/40 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <h3 className="font-bold text-cyan-800 dark:text-cyan-200">Activación para otra persona:</h3>
                 <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-2">
                    Puedes activar este código para alguien más. Solo necesitas su permiso y su nombre completo.
                </p>
                <input
                    type="text"
                    value={thirdPartyName}
                    onChange={(e) => setThirdPartyName(e.target.value)}
                    placeholder="Nombre completo de la persona"
                    className="w-full px-3 py-2 rounded-md border border-cyan-300 dark:border-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white dark:bg-slate-800 text-cyan-800 dark:text-cyan-200"
                />
                {thirdPartyName.trim() && (
                    <p className="text-cyan-700 dark:text-cyan-300 italic mt-2 animate-fade-in">
                        "Con todo el poder de mi intención, aplico el Código Sagrado <span className="font-bold">{code.code}</span> a <span className="font-bold">{thirdPartyName}</span>."
                    </p>
                )}
            </div>

            <div className="p-4 bg-pink-50 dark:bg-pink-900/40 rounded-lg border border-pink-200 dark:border-pink-800">
                <h3 className="font-bold text-pink-800 dark:text-pink-200">Instrucción:</h3>
                <p className="text-pink-700 dark:text-pink-300">Repite el número del código sagrado <span className="font-bold">45 veces</span>. Puedes decirlo en voz alta o mentalmente.</p>
            </div>
            
            {isCompleted && (
                <div className="p-4 bg-green-50 dark:bg-green-900/40 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in">
                    <h3 className="font-bold text-green-800 dark:text-green-200">Frase de Cierre:</h3>
                    <p className="text-green-700 dark:text-green-300 italic">"El código ha sido activado. Hecho está. Gracias, gracias, gracias."</p>
                </div>
            )}
        </div>
        
        <div className="flex flex-col items-center justify-center gap-6">
            <div style={progressStyle} className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-300">
                <div className="absolute w-[90%] h-[90%] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center flex-col transition-colors">
                    <span className="text-5xl sm:text-6xl font-bold text-purple-700 dark:text-purple-300">{count}</span>
                    <span className="text-lg text-gray-500 dark:text-gray-400">/ 45</span>
                </div>
            </div>

            {!isCompleted ? (
                <button
                    onClick={handleCount}
                    className="w-full max-w-xs px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all transform hover:scale-105"
                >
                    Contar
                </button>
            ) : (
                <div className="text-center w-full max-w-xs">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">¡Activación Completa!</p>
                     <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all transform hover:scale-105"
                    >
                        <ResetIcon />
                        Reiniciar
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ActivationPanel;