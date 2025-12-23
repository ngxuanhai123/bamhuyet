import React, { useState } from 'react';
import { ACUPOINT_DATA } from './data/acupoints';
import { Category, Disease, CategoryId } from './types';
import { QuizGame } from './components/QuizGame';
import { Search, ChevronRight, Activity, Book } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Navigation
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedDisease(null);
    setIsPlaying(false);
  };

  const handleSelectDisease = (disease: Disease) => {
    setSelectedDisease(disease);
    setIsPlaying(true);
  };

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedDisease(null);
    setIsPlaying(false);
  };

  // Filter Categories/Diseases based on Search
  const filteredData = ACUPOINT_DATA.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cat.diseases.some(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              A
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-800 leading-none">AcuLearn</h1>
              <p className="text-xs text-slate-500 font-medium">Học bấm huyệt mỗi ngày</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* VIEW: QUIZ GAME */}
        {isPlaying && selectedDisease ? (
          <QuizGame disease={selectedDisease} onBack={() => setIsPlaying(false)} />
        ) : (
          
          /* VIEW: DASHBOARD */
          <>
            {/* Search Bar */}
            <div className="relative mb-8">
              <input 
                type="text"
                placeholder="Tìm kiếm bệnh hoặc triệu chứng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>

            {/* Breadcrumb if category selected */}
            {selectedCategory && (
              <button 
                onClick={goHome}
                className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
              >
                &larr; Quay lại danh mục
              </button>
            )}

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory ? (
                // Show Diseases in Category
                selectedCategory.diseases.map((disease) => (
                  <div 
                    key={disease.id}
                    onClick={() => handleSelectDisease(disease)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                        <Activity size={24} />
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{disease.name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{disease.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <Book size={14} />
                      {disease.acupoints.length} huyệt đạo
                    </div>
                  </div>
                ))
              ) : (
                // Show Categories
                filteredData.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{cat.name}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{cat.diseases.length} nhóm bệnh</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {cat.diseases.slice(0, 3).map(d => (
                         <span key={d.id} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                           {d.name}
                         </span>
                       ))}
                       {cat.diseases.length > 3 && (
                         <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">...</span>
                       )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">Không tìm thấy kết quả nào.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;