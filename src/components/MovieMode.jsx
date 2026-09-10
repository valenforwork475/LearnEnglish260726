import React, { useState } from "react";
import { Clapperboard, ArrowLeft, Volume2, Sparkles, Filter, CheckCircle2, XCircle, Quote, MessageSquareQuote, ChevronRight, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { MOVIE_VOCAB_DATA, MOVIE_CATEGORIES } from "../data/movies";
import { speakText, sfx } from "../utils/audio";

export default function MovieMode({ accent, onBackToDashboard }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [score, setScore] = useState(0);

  const filteredMovies = MOVIE_VOCAB_DATA.filter((m) => {
    return selectedCategory === "all" || m.category === selectedCategory;
  });

  const currentMovie = filteredMovies[currentIndex];

  const handleNext = () => {
    setUserAnswer(null);
    setShowBreakdown(false);
    if (currentIndex + 1 < filteredMovies.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setUserAnswer(null);
    setShowBreakdown(false);
  };

  if (!currentMovie) {
    return (
      <div className="space-y-4 pb-24 text-center">
        <div className="flex items-center justify-between px-1">
          <button onClick={onBackToDashboard} className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
        </div>
        <div className="bg-stone-900 text-white p-8 rounded-3xl border border-stone-800 shadow-xl space-y-3">
          <Clapperboard className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold">ไม่พบฉากในหมวดนี้</h3>
          <button
            onClick={() => handleSelectCategory("all")}
            className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl hover:bg-amber-400 shadow"
          >
            ดูฉากหนังทั้งหมด
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {/* Top Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
          <div className="flex items-center space-x-2 bg-stone-900 px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm">
            <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
            <span>ฉากที่ {currentIndex + 1} / {filteredMovies.length}</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 ml-1" />
          {MOVIE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "bg-white text-stone-600 border border-[#e7e2d9] hover:bg-stone-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cinema Screen Box (Netflix/IMAX Cinema Aesthetic) */}
      <div className="bg-stone-950 text-white rounded-3xl border border-stone-800 p-6 shadow-2xl space-y-4 relative overflow-hidden">
        {/* Subtle Ambient Film Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
              {currentMovie.movieGenre}
            </span>
          </div>
          <button
            onClick={() => speakText(currentMovie.quoteEn, accent)}
            className="p-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition flex items-center space-x-1"
            title="ฟังเสียงพากย์ฉากหนัง"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-[10px] font-bold">ฟังบทพูด</span>
          </button>
        </div>

        {/* Scene Description */}
        <div className="text-[11px] text-stone-400 italic flex items-center space-x-1">
          <span>🎬 {currentMovie.sceneDescription}</span>
        </div>

        {/* Subtitle Dialogue Display */}
        <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl relative space-y-2">
          <Quote className="w-6 h-6 text-amber-500/30 absolute top-2 left-2 pointer-events-none" />
          <h2 className="text-lg font-black text-amber-100 leading-relaxed font-sans pl-3">
            "{currentMovie.quoteEn}"
          </h2>
          <p className="text-xs text-stone-300 font-medium pl-3 border-l-2 border-amber-500/50 mt-2">
            แปลซับไทย: {currentMovie.quoteTh}
          </p>
        </div>

        {/* Target Word Highlight Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
              คำศัพท์ / สำนวนเด็ดจากฉากนี้:
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <h3 className="text-xl font-black text-white">{currentMovie.targetWord}</h3>
              <span className="text-xs font-mono text-stone-400">{currentMovie.ipa}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300">
                {currentMovie.partOfSpeech}
              </span>
            </div>
            <p className="text-xs font-bold text-amber-200 mt-1">
              คำแปล: {currentMovie.meaningTh}
            </p>
          </div>
          <button
            onClick={() => speakText(currentMovie.targetWord, accent)}
            className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold transition shadow"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Spoken Tip & Slang Insight Box */}
      <div className="p-5 rounded-3xl bg-white border border-[#e7e2d9] shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>เคล็ดลับภาษาพูด & สแลงจากหนัง (Movie Slang Tip):</span>
        </div>
        <p className="text-xs leading-relaxed text-stone-700 font-medium bg-[#fcfaf7] p-3 rounded-2xl border border-[#e7e2d9]">
          {currentMovie.spokenTip}
        </p>

        {/* Word Breakdown */}
        <div>
          <button
            onClick={() => setShowBreakdown((prev) => !prev)}
            className="flex items-center justify-between w-full p-3 rounded-2xl bg-[#f5f2eb] hover:bg-[#eae6dc] text-stone-800 text-xs font-bold transition"
          >
            <span>เจาะลึกคำศัพท์ในประโยคนี้ ({currentMovie.breakdown.length} คำ)</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showBreakdown ? "rotate-90" : ""}`} />
          </button>

          {showBreakdown && (
            <div className="mt-2 space-y-2 pt-1 animate-fadeIn">
              {currentMovie.breakdown.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#e7e2d9] flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{item.word}</span>
                  <span className="text-stone-600 font-medium">{item.meaning}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => speakText(currentMovie.quoteEn, accent)}
          className="flex-1 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow flex items-center justify-center space-x-2"
        >
          <Volume2 className="w-4 h-4" />
          <span>ฟังบทพูดซ้ำ</span>
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm flex items-center space-x-1"
        >
          <span>ฉากถัดไป ➔</span>
        </button>
      </div>
    </div>
  );
}
