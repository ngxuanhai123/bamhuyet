import React, { useState } from 'react';
import { generateMnemonic, askAiAboutAcupoint } from '../services/geminiService';
import { Acupoint } from '../types';
import { Sparkles, X, MessageCircle, BookOpen } from 'lucide-react';

interface Props {
  acupoint: Acupoint;
  onClose: () => void;
}

export const AITutorModal: React.FC<Props> = ({ acupoint, onClose }) => {
  const [mode, setMode] = useState<'MNEMONIC' | 'CHAT'>('MNEMONIC');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState('');

  // Auto-load mnemonic on open if in mnemonic mode
  React.useEffect(() => {
    if (mode === 'MNEMONIC' && !content) {
      handleGetMnemonic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleGetMnemonic = async () => {
    setLoading(true);
    const result = await generateMnemonic(acupoint.name, acupoint.location, acupoint.function);
    setContent(result);
    setLoading(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    const result = await askAiAboutAcupoint(chatInput, `Huyệt ${acupoint.name} - ${acupoint.location}`);
    setContent(result);
    setLoading(false);
    setChatInput(''); // Clear input but keep content as the answer
    setMode('CHAT'); // Ensure we stay in chat mode logic for display
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h3 className="font-bold text-lg">AI Trợ Lý Huyệt Đạo</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-y-auto min-h-[200px] flex flex-col">
          <h4 className="text-xl font-bold text-secondary mb-2 text-center">{acupoint.name}</h4>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-500 py-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm animate-pulse">AI đang suy nghĩ...</p>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1">
               {mode === 'MNEMONIC' ? (
                 <div className="text-center">
                   <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide">Mẹo Ghi Nhớ</p>
                   <p className="text-lg font-medium text-slate-800 italic leading-relaxed whitespace-pre-line">
                     "{content}"
                   </p>
                 </div>
               ) : (
                 <div>
                   <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide">Giải đáp AI</p>
                   <div className="prose prose-sm text-slate-800 leading-relaxed">
                     {content || "Hãy đặt câu hỏi về huyệt này."}
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-50 border-t flex flex-col gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => { setMode('MNEMONIC'); setContent(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'MNEMONIC' ? 'bg-secondary text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
            >
              <BookOpen size={16} />
              Mẹo Ghi Nhớ
            </button>
            <button 
              onClick={() => { setMode('CHAT'); setContent(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'CHAT' ? 'bg-secondary text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-100'}`}
            >
              <MessageCircle size={16} />
              Hỏi Đáp
            </button>
          </div>

          {mode === 'CHAT' && (
            <div className="flex gap-2 mt-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hỏi gì đó (VD: Huyệt này có đau không?)"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              />
              <button 
                onClick={handleChat}
                disabled={!chatInput.trim() || loading}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 disabled:opacity-50"
              >
                Gửi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};