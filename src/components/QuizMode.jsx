import React, { useState, useEffect } from "react";
import { Zap, Volume2, CheckCircle, XCircle, ArrowLeft, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { speakText, sfx } from "../utils/audio";

export default function QuizMode({ words, accent, selectedLevel, onSelectLevel, onRateWord, onBackToDashboard }) {
  const filteredWords = selectedLevel === "all" ? words : words.filter(w => w.level === selectedLevel);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentWord = filteredWords[currentIndex];

  useEffect(() => {
    if (!currentWord) return;

    const otherWords = words.filter(w => w.id !== currentWord.id);
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOpts = [...shuffledOthers, currentWord].sort(() => Math.random() - 0.5);

    setOptions(allOpts);
    setSelectedAnswer(null);
  }, [currentIndex, currentWord, words]);

  if (!currentWord || quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-900">จบควิซทดสอบสปีดแล้ว</h2>
          <p className="text-sm text-stone-600 mt-2">
            คะแนนที่คุณได้: <span className="text-amber-800 font-extrabold text-lg">{score}</span> / {filteredWords.length} ข้อ
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setQuizFinished(false);
          }}
          className="py-3 px-6 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow"
        >
          เริ่มทำควิซอีกครั้ง
        </button>
      </div>
    );
  }

  const handleSelectOption = (option) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option.id);
    const isRight = option.id === currentWord.id;

    if (isRight) {
      sfx.playCorrect();
      setScore(prev => prev + 1);
      onRateWord(currentWord.id, "good");
      speakText(currentWord.word, accent);
    } else {
      sfx.playWrong();
      onRateWord(currentWord.id, "again");
    }

    setTimeout(() => {
      if (currentIndex + 1 >= filteredWords.length) {
        setQuizFinished(true);
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 1200);
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
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-amber-800">คะแนน: {score}</span>
            <span className="text-xs font-bold text-stone-500">
              {currentIndex + 1} / {filteredWords.length}
            </span>
          </div>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#e7e2d9] text-center space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-900">
            {currentWord.partOfSpeech}
          </span>
          <button
            onClick={() => speakText(currentWord.word, accent)}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-amber-800"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-stone-900">{currentWord.word}</h2>
          <p className="text-xs font-mono text-stone-500 mt-1">{currentWord.ipa}</p>

          <div className="mt-2 inline-block px-3 py-1 rounded-xl bg-amber-100/80 border border-amber-300 text-xs text-amber-900 font-bold">
            คำอ่าน: {currentWord.phoneticThai}
          </div>
        </div>

        <p className="text-xs text-stone-400 italic">"เลือกความหมายที่ถูกต้องที่สุดสำหรับคำนี้"</p>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.id;
          const isTarget = opt.id === currentWord.id;

          let btnStyle = "bg-white border-[#e7e2d9] text-stone-800 hover:border-stone-400 shadow-sm";
          if (selectedAnswer !== null) {
            if (isTarget) {
              btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-sm";
            } else if (isSelected && !isTarget) {
              btnStyle = "bg-rose-50 border-rose-300 text-rose-900 shadow-sm";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between text-sm font-medium ${btnStyle}`}
            >
              <span>{opt.meaning}</span>
              {selectedAnswer !== null && isTarget && (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              )}
              {selectedAnswer !== null && isSelected && !isTarget && (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
