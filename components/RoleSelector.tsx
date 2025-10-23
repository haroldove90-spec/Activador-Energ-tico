import React from 'react';
import type { CodeType } from '../App';

interface RoleSelectorProps {
  onSelectRole: (role: CodeType) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="space-y-8 animate-fade-in-scale">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">Elige tu camino de activación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Sacred Codes */}
        <div
          onClick={() => onSelectRole('sacred')}
          className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 shadow-lg hover:shadow-2xl border border-purple-200 dark:border-purple-800 transform hover:-translate-y-2 transition-all duration-300"
        >
          <div className="text-center">
            <div className="mb-4 text-5xl">✨</div>
            <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">Códigos Sagrados</h3>
            <p className="text-purple-700 dark:text-purple-300">
              Activa energías universales para manifestar prosperidad, salud, amor y protección.
            </p>
          </div>
        </div>

        {/* Card for Agesta Codes */}
        <div
          onClick={() => onSelectRole('agesta')}
          className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 shadow-lg hover:shadow-2xl border border-pink-200 dark:border-pink-800 transform hover:-translate-y-2 transition-all duration-300"
        >
          <div className="text-center">
             <div className="mb-4 text-5xl">💖</div>
            <h3 className="text-2xl font-bold text-pink-800 dark:text-pink-200 mb-2">Códigos de Agesta</h3>
            <p className="text-pink-700 dark:text-pink-300">
              Canalizados para sanar el alma, resolver situaciones y conectar con seres de luz.
            </p>
          </div>
        </div>
        
        {/* Card for Runes */}
        <div
            onClick={() => onSelectRole('runes')}
            className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-yellow-100 via-amber-100 to-stone-200 dark:from-yellow-900/50 dark:via-amber-900/50 dark:to-stone-900/60 shadow-lg hover:shadow-2xl border border-amber-300 dark:border-amber-800 transform hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1"
        >
            <div className="text-center">
                <div className="mb-4 text-5xl">🗿</div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-2">Oráculo de Runas</h3>
                <p className="text-amber-800 dark:text-amber-300">
                Consulta la sabiduría ancestral para obtener guía, protección y poder personal.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;