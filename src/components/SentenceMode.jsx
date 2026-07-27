import React, { useState, useEffect } from "react";
import { Volume2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { speakText, sfx } from "../utils/audio";

export default function SentenceMode({ words, accent, selectedLevel, onSelectLevel, onBackToDashboard }) {
  const filteredWords = selectedLevel === "all" ? words : words.filter(w => w.level === selectedLevel);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = filteredWords[currentIndex];

  const [shuffledTiles, setShuffledTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (!currentItem) return;

    const rawTokens = currentItem.exampleEn
      .replace(/[.,!?]/g, "")
      .split(" ");
    
    const tiles = rawTokens.map((word, idx) => ({
      id: `${word}-${idx}`,
      text: word
    }));

    const shuffled = [...tiles].sort(() => Math.random() - 0.5);
    setShuffledTiles(shuffled);
    setSelectedTiles([]);
    setIsCorrect(null);
  }, [currentIndex, currentItem]);

  if (!currentItem) {
    return (
      <div className="text-center p-8 space-y-4">
        <h3 className="text-sm font-bold text-stone-900">ไม่พบประโยคในเลเวลนี้</h3>
        <button onClick={onBackToDashboard} className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl">
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  const targetTokens = currentItem.exampleEn.replace(/[.,!?]/g, "").split(" ");

  const handleSelectTile = (tile) => {
    sfx.playFlip();
    setSelectedTiles(prev => [...prev, tile]);
    setShuffledTiles(prev => prev.filter(t => t.id !== tile.id));
    setIsCorrect(null);
  };

  const handleDeselectTile = (tile) => {
    sfx.playFlip();
    setShuffledTiles(prev => [...prev, tile]);
    setSelectedTiles(prev => prev.filter(t => t.id !== tile.id));
    setIsCorrect(null);
  };

  const handleCheck = () => {
    const userSentence = selectedTiles.map(t => t.text).join(" ");
    const targetSentence = targetTokens.join(" ");

    if (userSentence.toLowerCase() === targetSentence.toLowerCase()) {
      setIsCorrect(true);
      sfx.playCorrect();
      speakText(currentItem.exampleEn, accent);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setIsCorrect(false);
      sfx.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredWords.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
          <span className="text-xs font-bold text-stone-700">
            ประโยคที่ {currentIndex + 1} / {filteredWords.length}
          </span>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />
      </div>

      {/* Target Translation Box */}
      <div className="p-5 rounded-3xl bg-white border border-[#e7e2d9] space-y-2 text-center shadow-sm">
        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
          คำแปลภาษาไทย & คำอ่านประโยค
        </span>
        <h3 className="text-lg font-bold text-stone-900">
          แปล: {currentItem.exampleTh}
        </h3>

        <div className="inline-block px-3 py-1.5 rounded-xl bg-[#f5f2eb] border border-[#e7e2d9] text-xs text-amber-900 font-medium">
          คำอ่านประโยค: <span className="font-bold">{currentItem.examplePhonetic}</span>
        </div>
      </div>

      {/* Selected Sentence Box */}
      <div className="min-h-[110px] p-4 rounded-3xl bg-[#f5f2eb] border border-[#e7e2d9] flex flex-wrap items-center gap-2 content-start">
        {selectedTiles.length === 0 ? (
          <span className="text-xs text-stone-400 italic m-auto">
            แตะบล็อกคำด้านล่างเพื่อสร้างประโยค...
          </span>
        ) : (
          selectedTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleDeselectTile(tile)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 text-white font-bold text-sm shadow hover:bg-amber-700 active:scale-95 transition"
            >
              {tile.text}
            </button>
          ))
        )}
      </div>

      {/* Feedback Alerts */}
      {isCorrect === true && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>เรียงประโยคถูกต้องแล้ว</span>
          </div>
          <button
            onClick={() => speakText(currentItem.exampleEn, accent)}
            className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {isCorrect === false && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center space-x-2 shadow-sm">
          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>ยังไม่ถูกต้อง ลองสลับตำแหน่งบล็อกคำใหม่อีกครั้งครับ</span>
        </div>
      )}

      {/* Word Options */}
      <div>
        <span className="text-[11px] font-bold text-stone-500 px-1 mb-2 block">
          บล็อกคำศัพท์ที่เลือกได้:
        </span>
        <div className="flex flex-wrap gap-2">
          {shuffledTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleSelectTile(tile)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#e7e2d9] text-stone-800 font-medium text-sm hover:bg-stone-50 active:scale-95 transition shadow-sm"
            >
              {tile.text}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleCheck}
          disabled={selectedTiles.length === 0}
          className="flex-1 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm disabled:opacity-30 shadow"
        >
          ตรวจคำตอบ
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-3.5 rounded-2xl bg-white border border-[#e7e2d9] text-stone-700 font-bold text-sm hover:bg-stone-50 shadow-sm"
        >
          ข้อถัดไป ➔
        </button>
      </div>
    </div>
  );
}
