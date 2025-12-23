import React, { useState, useEffect } from 'react';
import { Acupoint, Disease } from '../types';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';
import { AITutorModal } from './AITutorModal';

interface Props {
  disease: Disease;
  onBack: () => void;
}

export const QuizGame: React.FC<Props> = ({ disease, onBack }) => {
  const [currentAcupointIndex, setCurrentAcupointIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'NONE' | 'CORRECT' | 'INCORRECT'>('NONE');
  const [showHint, setShowHint] = useState(false);
  const [showAIMmnemonics, setShowAIMnemonics] = useState(false);
  
  // Game Logic: We will hide the name of the acupoint in the Location text if present, 
  // OR usually the test is: Given Location -> Guess Name.
  // Let's do: Given Location & Function -> Guess Name.
  
  const currentAcupoint = disease.acupoints[currentAcupointIndex];
  const isLast = currentAcupointIndex === disease.acupoints.length - 1;

  useEffect(() => {
    setUserInput('');
    setFeedback('NONE');
    setShowHint(false);
  }, [currentAcupointIndex]);

  const checkAnswer = () => {
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedAnswer = currentAcupoint.name.toLowerCase();
    
    // Simple flexible matching (contains or exact)
    if (normalizedAnswer.includes(normalizedInput) && normalizedInput.length > 1) {
      setFeedback('CORRECT');
    } else {
      setFeedback('INCORRECT');
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentAcupointIndex(prev => prev + 1);
    } else {
      // Finished logic could go here
      onBack();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
         <button onClick={onBack} className="text-gray-500 hover:text-gray-700 font-medium text-sm">
          &larr; Quay lại
        </button>
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Câu {currentAcupointIndex + 1} / {disease.acupoints.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentAcupointIndex + 1) / disease.acupoints.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Vị trí & Tác dụng</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              <span className="font-semibold text-slate-900">Vị trí:</span> {currentAcupoint.location}
            </p>
             <p className="text-lg text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Tác dụng:</span> {currentAcupoint.function}
            </p>
          </div>

          <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Đây là huyệt gì?
            </label>
            
            <div className="relative">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={feedback === 'CORRECT'}
                placeholder="Nhập tên huyệt..."
                className={`w-full p-4 text-lg rounded-lg border-2 outline-none transition-all ${
                  feedback === 'CORRECT' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : feedback === 'INCORRECT'
                    ? 'border-red-300 bg-red-50 focus:border-red-400'
                    : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-emerald-100'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && feedback !== 'CORRECT') checkAnswer();
                }}
              />
              {feedback === 'CORRECT' && (
                <CheckCircle className="absolute right-4 top-4 text-green-500" />
              )}
               {feedback === 'INCORRECT' && (
                <XCircle className="absolute right-4 top-4 text-red-500" />
              )}
            </div>

            {/* Hint & Feedback Area */}
            <div className="mt-4 min-h-[60px]">
               {feedback === 'INCORRECT' && (
                 <p className="text-red-500 text-sm font-medium flex items-center gap-2 animate-pulse">
                   Chưa chính xác. Hãy thử lại!
                 </p>
               )}
               {feedback === 'CORRECT' && (
                  <div className="animate-fade-in">
                    <p className="text-green-600 font-bold text-lg mb-1">Chính xác! {currentAcupoint.name}</p>
                    <p className="text-slate-500 text-sm">{currentAcupoint.description}</p>
                  </div>
               )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-3">
             <button 
                onClick={() => setShowHint(!showHint)}
                className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-full"
                title="Gợi ý"
             >
               <HelpCircle size={24} />
             </button>
              <button 
                onClick={() => setShowAIMnemonics(true)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold hover:bg-purple-200 transition-colors"
             >
               <span className="text-lg">✨</span> AI Ghi nhớ
             </button>
          </div>

          <div className="flex gap-3">
             {feedback !== 'CORRECT' ? (
               <button 
                onClick={checkAnswer}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-md active:scale-95"
               >
                 Kiểm tra
               </button>
             ) : (
                <button 
                onClick={handleNext}
                className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-md flex items-center gap-2 active:scale-95"
               >
                 {isLast ? "Hoàn thành" : "Tiếp theo"} <ArrowRight size={18} />
               </button>
             )}
          </div>
        </div>

        {showHint && (
           <div className="px-8 pb-4 text-sm text-slate-500 italic">
             Gợi ý: Tên huyệt bắt đầu bằng chữ "{currentAcupoint.name.charAt(0)}" và có {currentAcupoint.name.length} ký tự.
           </div>
        )}
      </div>
      
      {showAIMmnemonics && (
        <AITutorModal 
          acupoint={currentAcupoint} 
          onClose={() => setShowAIMnemonics(false)} 
        />
      )}
    </div>
  );
};