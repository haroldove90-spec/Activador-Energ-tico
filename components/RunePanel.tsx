
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import type { Rune } from '../types';
import { BackArrowIcon } from './icons';

interface RunePanelProps {
  rune: Rune;
  onBack: () => void;
  handleApiKeyError: () => void;
}

// Helper para convertir un Markdown simple a HTML, manejando listas correctamente.
const markdownToHtml = (markdown: string): string => {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;

    const closeList = () => {
        if (inList) {
            html += '</ol>';
            inList = false;
        }
    };

    for (const line of lines) {
        if (line.startsWith('### ')) {
            closeList();
            html += `<h3>${line.substring(4)}</h3>`;
        } else if (line.startsWith('#### ')) {
            closeList();
            html += `<h4>${line.substring(5)}</h4>`;
        } else if (line.match(/^\s*\d+\.\s/)) {
            if (!inList) {
                html += '<ol class="list-decimal list-inside space-y-1">';
                inList = true;
            }
            html += `<li>${line.replace(/^\s*\d+\.\s/, '')}</li>`;
        } else {
            closeList();
            if (line.trim()) {
                html += `<p>${line}</p>`;
            }
        }
    }
    closeList();
    return html;
};


const RunePanel: React.FC<RunePanelProps> = ({ rune, onBack, handleApiKeyError }) => {
  const [generatedData, setGeneratedData] = useState<{ instruction: string; imageUrl: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateRuneData = async () => {
      setIsLoading(true);
      setError(null);
      setGeneratedData(null);

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        // 1. Generar primero las instrucciones de texto
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Eres un sabio vidente, un maestro de las runas del Futhark antiguo. Tu propósito es guiar a un buscador de sabiduría. Para la runa ${rune.name}, cuyo significado es "${rune.description}", crea una guía concisa y mística en formato Markdown. La guía debe incluir:\n\n1.  Un breve y poderoso saludo.\n2.  Un título "### Instrucciones de Activación". Bajo este título, incluye un párrafo con recomendaciones sobre dónde y con qué material dibujar la runa para potenciar su efecto (por ejemplo: sobre papel pergamino con tinta roja, en la palma de la mano con un marcador no permanente, tallado en una vela, etc.).\n3.  Un título "#### Trazo Sugerido" con una lista numerada que describa, paso a paso, cómo dibujar el símbolo de la runa.`
        });
        const instruction = textResponse.text;
        
        // Muestra el texto tan pronto como esté listo
        setGeneratedData({ instruction, imageUrl: null });

        // 2. Generar la imagen del trazo
        const imageResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `Diagrama minimalista que muestra cómo dibujar la runa nórdica '${rune.name}'. Fondo blanco limpio, líneas negras gruesas. Utiliza números y flechas para indicar el orden y la dirección de los trazos, como en una guía de caligrafía. Estilo claro y educativo.` }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        const imageUrl = imagePart?.inlineData ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
        
        // Actualiza el estado con la URL de la imagen
        setGeneratedData({ instruction, imageUrl });

      } catch (err) {
        const error = err as Error;
        console.error("Error generating rune data:", err);
        if (error.message.includes('API key not valid')) { // Adjusted error message check
            handleApiKeyError();
            setError("La API Key seleccionada no es válida. Por favor, selecciona otra e intenta de nuevo.");
        } else {
            setError("No se pudo canalizar la energía de la runa. Por favor, intenta con otra o vuelve más tarde.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (rune) {
      generateRuneData();
    }
  }, [rune, handleApiKeyError]);

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-amber-300 dark:border-amber-700 animate-fade-in-scale">
      <button onClick={onBack} className="flex items-center gap-2 text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-semibold mb-4 transition-colors">
        <BackArrowIcon />
        Volver al Oráculo
      </button>

      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-200 font-serif tracking-wider">{rune.name}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{rune.category}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {isLoading && !generatedData && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-800 dark:text-amber-300 font-semibold">Canalizando la energía de la runa...</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">La IA está forjando su imagen y mensaje. Un momento.</p>
          </div>
        )}
        {error && <p className="text-center text-red-600 dark:text-red-400 py-12">{error}</p>}
        
        {generatedData && (
          <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
            <div className="flex justify-center items-center">
              {generatedData.imageUrl ? (
                <img src={generatedData.imageUrl} alt={`Diagrama de trazo para la runa ${rune.name}`} className="rounded-lg shadow-lg w-full max-w-sm object-cover aspect-square bg-white" />
              ) : (
                isLoading && <div className="w-full max-w-sm aspect-square bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center"><div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div></div>
              )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(generatedData.instruction) }} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RunePanel;
