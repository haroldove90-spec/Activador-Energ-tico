
import React, { useState, FormEvent } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BackArrowIcon, SearchIcon } from './icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface FaqPanelProps {
    onBack: () => void;
    handleApiKeyError: () => void;
}

const FaqPanel: React.FC<FaqPanelProps> = ({onBack, handleApiKeyError}) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleAskAI = async (e: FormEvent) => {
      e.preventDefault();
      if (!query.trim() || isLoading) return;

      const userMessage: Message = { role: 'user', text: query };
      setChatHistory(prev => [...prev, userMessage]);
      setIsLoading(true);
      setQuery('');

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const systemInstruction = "Eres un sabio maestro, experto en la historia y el uso de Códigos Sagrados numéricos, Códigos de Agesta y Runas del Futhark antiguo. Tu tono es paciente, claro y alentador. Responde a las preguntas de los usuarios de forma concisa pero completa, basándote en conocimientos esotéricos y espirituales. No ofrezcas consejos médicos ni financieros, en su lugar, sugiere que estas herramientas son un complemento espiritual a la ayuda profesional.";
          
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `${systemInstruction}\n\nPregunta del usuario: ${query}`,
          });

          const modelMessage: Message = { role: 'model', text: response.text };
          setChatHistory(prev => [...prev, modelMessage]);

      } catch (err) {
          const error = err as Error;
          let messageText = 'Lo siento, ha ocurrido un error al consultar al sabio. Por favor, intenta de nuevo.';
          if (error.message.includes('API key not valid')) { // Adjusted error message check
              handleApiKeyError();
              messageText = "La API Key no es válida. Por favor, vuelve a la pantalla principal y selecciona una clave válida para continuar.";
          }
          const errorMessage: Message = { role: 'model', text: messageText };
          setChatHistory(prev => [...prev, errorMessage]);
      } finally {
          setIsLoading(false);
      }
  }

  const faqs = [
    {
      question: '¿Qué son los Códigos Sagrados?',
      answer: 'Son secuencias numéricas consideradas "magia de la nueva era". Actúan como puentes entre el ser humano y las energías divinas. Cada número vibra con una frecuencia específica, y al repetirlo 45 veces, se invoca esa energía para manifestar un propósito, como la sanación, la prosperidad o el amor.'
    },
    {
      question: '¿Y los Códigos de Agesta?',
      answer: 'Los Códigos de Agesta son un conjunto específico de códigos sagrados canalizados por José Gabriel Uribe (Agesta). Son muy populares por su efectividad y su amplio rango de aplicaciones, desde resolver situaciones cotidianas hasta conectar con ángeles y maestros ascendidos. Al igual que otros códigos, se activan repitiéndolos 45 veces.'
    },
    {
      question: '¿Qué son las Runas?',
      answer: 'Las Runas son antiguos símbolos que forman un alfabeto oracular usado por los pueblos nórdicos y germánicos. Más que simples letras, cada runa es un ideograma que representa un concepto, una fuerza cósmica o un arquetipo. Se utilizan para la adivinación, la meditación y como talismanes para atraer protección, fuerza o sabiduría.'
    },
     {
      question: '¿Esto reemplaza la ayuda profesional?',
      answer: 'No. Es muy importante entender que estas son herramientas de apoyo espiritual. No deben sustituir el consejo, diagnóstico o tratamiento de profesionales de la salud (médicos, psicólogos), ni el asesoramiento financiero o legal. Son un complemento para tu bienestar integral.'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 animate-fade-in-scale w-full">
      <button onClick={onBack} className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold mb-6 transition-colors">
            <BackArrowIcon />
            Volver
      </button>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Centro de Sabiduría</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Preguntas Frecuentes</h3>
            <div className="space-y-2">
            {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-4 text-left font-semibold text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 flex justify-between items-center transition-colors"
                >
                    {faq.question}
                    <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {activeAccordion === index && (
                    <div className="p-4 bg-white dark:bg-slate-900/50 text-gray-600 dark:text-gray-300 animate-fade-in">
                    <p>{faq.answer}</p>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>

        {/* AI Chat Section */}
        <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Consulta al Sabio</h3>
            <div className="bg-white dark:bg-slate-900/50 h-[500px] flex flex-col border border-gray-200 dark:border-slate-700 rounded-lg">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {chatHistory.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Haz una pregunta sobre historia, usos o cualquier otra duda que tengas...</p>}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-gray-200 dark:bg-slate-700"><span className="animate-pulse">...</span></div></div>}
                </div>
                <form onSubmit={handleAskAI} className="p-4 border-t border-gray-200 dark:border-slate-700 flex gap-2">
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escribe tu pregunta aquí..."
                        className="w-full px-4 py-2 rounded-full border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                    />
                    <button type="submit" disabled={isLoading || !query.trim()} className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-purple-300 dark:disabled:bg-purple-800 transition-colors">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPanel;
