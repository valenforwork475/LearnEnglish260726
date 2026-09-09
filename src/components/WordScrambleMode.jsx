import React, { useState, useEffect } from "react";
import { Puzzle, CheckCircle2, XCircle, ArrowLeft, Volume2, HelpCircle, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { speakText, sfx } from "../utils/audio";

export default function WordScrambleMode({ words, accent, selectedLevel, onSelectLevel, onRateWord, onBackToDashboard }) {
  const filteredWords = selectedLevel === "all" ? words : words.filter((w) => w.level === selectedLevel);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentWordObj = filteredWords[currentIndex];

  const initQuestion = () => {
    if (!currentWordObj) return;

    const letters = currentWordObj.word.toUpperCase().split("");
    const shuffled = letters
      .map((char, index) => ({ id: `${char}-${index}`, char }))
      .sort(() => Math.random() - 0.5);

    setShuffledLetters(shuffled);
    setSelectedLetters([]);
    setIsCorrect(null);
    setShowHint(false);
  };

  useEffect(() => {
    initQuestion();
  }, [currentIndex, selectedLevel, words]);

  if (!currentWordObj) {
    return (
      <div className="space-y-4 pb-24 text-center">
        <div className="flex items-center justify-between px-1">
          <button onClick={onBackToDashboard} className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
        </div>
        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />
        <div className="bg-white p-8 rounded-3xl border border-[#e7e2d9] shadow-sm space-y-3">
          <Puzzle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">ไม่พบคำศัพท์ในเลเวลนี้</h3>
        </div>
      </div>
    );
  }

  const handleSelectLetter = (item) => {
    sfx.playFlip();
    setSelectedLetters((prev) => [...prev, item]);
    setShuffledLetters((prev) => prev.filter((l) => l.id !== item.id));
    setIsCorrect(null);
  };

  const handleDeselectLetter = (item) => {
    sfx.playFlip();
    setShuffledLetters((prev) => [...prev, item]);
    setSelectedLetters((prev) => prev.filter((l) => l.id !== item.id));
    setIsCorrect(null);
  };

  const handleCheck = () => {
    const userSpelling = selectedLetters.map((l) => l.char).join("");
    const targetSpelling = currentWordObj.word.toUpperCase();

    if (userSpelling === targetSpelling) {
      setIsCorrect(true);
      sfx.playCorrect();
      setScore((prev) => prev + 10);
      onRateWord(currentWordObj.id, "good");
      speakText(currentWordObj.word, accent);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      setIsCorrect(false);
      sfx.playWrong();
      onRateWord(currentWordObj.id, "again");
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredWords.length) {
      setCurrentIndex((prev) => prev + 1);
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
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="text-amber-800">คะแนน: {score}</span>
            <span className="text-stone-500">
              ข้อ {currentIndex + 1} / {filteredWords.length}
            </span>
          </div>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />
      </div>

      {/* Target Word Info Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#e7e2d9] text-center space-y-3 shadow-sm relative">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-900">
            {currentWordObj.partOfSpeech}
          </span>
          <button
            onClick={() => speakText(currentWordObj.word, accent)}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-amber-800"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-xs text-stone-400 font-bold tracking-wider uppercase block mb-1">
            ความหมายในภาษาไทย:
          </span>
          <h2 className="text-2xl font-black text-stone-900">{currentWordObj.meaning}</h2>
          <p className="text-xs text-stone-500 font-mono mt-1">คำอ่าน: {currentWordObj.phoneticThai}</p>
        </div>

        {showHint ? (
          <div className="p-2 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-bold animate-fadeIn">
            คำใบ้: ตัวอักษรแรกคือ "{currentWordObj.word[0].toUpperCase()}" (มี {currentWordObj.word.length} ตัวอักษร)
          </div>
        ) : (
          <button
            onClick={() => setShowHint(true)}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ขอคำใบ้</span>
          </button>
        )}
      </div>

      {/* Selected Letters Area */}
      <div className="min-h-[90px] p-4 rounded-3xl bg-[#f5f2eb] border border-[#e7e2d9] flex flex-wrap items-center justify-center gap-2">
        {selectedLetters.length === 0 ? (
          <span className="text-xs text-stone-400 italic">
            แตะบล็อกตัวอักษรด้านล่างเพื่อสะกดคำศัพท์...
          </span>
        ) : (
          selectedLetters.map((l) => (
            <button
              key={l.id}
              onClick={() => handleDeselectLetter(l)}
              className="w-11 h-11 rounded-2xl bg-amber-700 text-white font-black text-lg shadow-md hover:bg-amber-800 active:scale-95 transition"
            >
              {l.char}
            </button>
          ))
        )}
      </div>

      {/* Feedback Alerts */}
      {isCorrect === true && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>สะกดถูกเก่งมาก! ({currentWordObj.word})</span>
          </div>
          <button
            onClick={() => speakText(currentWordObj.word, accent)}
            className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {isCorrect === false && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center space-x-2 shadow-sm">
          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>ยังไม่ถูกต้อง ลองแตะสลับตัวอักษรใหม่อีกครั้งครับ</span>
        </div>
      )}

      {/* Shuffled Letter Options */}
      <div>
        <span className="text-[11px] font-bold text-stone-500 px-1 mb-2 block">
          บล็อกตัวอักษรที่เลือกได้:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {shuffledLetters.map((l) => (
            <button
              key={l.id}
              onClick={() => handleSelectLetter(l)}
              className="w-11 h-11 rounded-2xl bg-white border border-[#e7e2d9] text-stone-900 font-extrabold text-base shadow-sm hover:border-amber-400 active:scale-95 transition"
            >
              {l.char}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleCheck}
          disabled={selectedLetters.length === 0}
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
