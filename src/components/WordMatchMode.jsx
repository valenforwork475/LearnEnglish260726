import React, { useState, useEffect } from "react";
import { Gamepad2, ArrowLeft, RefreshCw, Trophy, Sparkles, Flame, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { speakText, sfx } from "../utils/audio";

export default function WordMatchMode({ words, accent, selectedLevel, onSelectLevel, onRateWord, onBackToDashboard }) {
  const filteredWords = selectedLevel === "all" ? words : words.filter((w) => w.level === selectedLevel);

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Initialize Match Cards (8 pairs = 16 cards)
  const initGame = () => {
    const pool = [...filteredWords].sort(() => Math.random() - 0.5).slice(0, 6);
    if (pool.length === 0) return;

    const generatedCards = [];
    pool.forEach((wordObj) => {
      // Card 1: English
      generatedCards.push({
        id: `en-${wordObj.id}`,
        wordId: wordObj.id,
        text: wordObj.word,
        subText: wordObj.ipa,
        type: "en",
        rawObj: wordObj,
      });
      // Card 2: Thai Meaning
      generatedCards.push({
        id: `th-${wordObj.id}`,
        wordId: wordObj.id,
        text: wordObj.meaning,
        subText: wordObj.partOfSpeech,
        type: "th",
        rawObj: wordObj,
      });
    });

    // Shuffle grid
    const shuffled = generatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setCombo(0);
    setScore(0);
    setIsFinished(false);
    setTimer(0);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    initGame();
  }, [selectedLevel, words]);

  // Timer counter
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);

  // Handle card click
  const handleCardClick = (card) => {
    if (
      selectedCards.length === 2 ||
      selectedCards.some((c) => c.id === card.id) ||
      matchedPairs.includes(card.wordId)
    ) {
      return;
    }

    sfx.playFlip();

    if (card.type === "en") {
      speakText(card.text, accent);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newSelected;

      if (first.wordId === second.wordId && first.type !== second.type) {
        // MATCH SUCCESS!
        sfx.playCorrect();
        setMatchedPairs((prev) => [...prev, first.wordId]);
        onRateWord(first.wordId, "good");
        
        const newCombo = combo + 1;
        setCombo(newCombo);
        setScore((prev) => prev + 100 * newCombo);

        setSelectedCards([]);

        // Check completion
        if (matchedPairs.length + 1 === cards.length / 2) {
          setIsFinished(true);
          setIsTimerRunning(false);
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
      } else {
        // MATCH FAILED
        sfx.playWrong();
        setCombo(0);
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (filteredWords.length < 4) {
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
          <Gamepad2 className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">ศัพท์มีไม่เพียงพอสำหรับสร้างเกม</h3>
          <p className="text-xs text-stone-500">กรุณาเลือกเลเวลอื่นเพื่อเริ่มเล่นเกมจับคู่ครับ</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            Matching Master 🏆
          </span>
          <h2 className="text-2xl font-black text-stone-900 mt-2">จับคู่คำศัพท์สำเร็จ!</h2>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold text-stone-700">
            <div className="bg-white px-4 py-2 rounded-2xl border border-[#e7e2d9]">
              เวลาที่ใช้: <span className="text-amber-800 text-sm font-extrabold">{formatTime(timer)}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl border border-[#e7e2d9]">
              คะแนนรวม: <span className="text-amber-800 text-sm font-extrabold">{score}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={initGame}
            className="py-3.5 px-6 rounded-2xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>เล่นด่านใหม่อีกครั้ง</span>
          </button>
          <button
            onClick={onBackToDashboard}
            className="py-3.5 px-5 rounded-2xl bg-white border border-[#e7e2d9] text-stone-700 font-bold text-xs hover:bg-stone-50 shadow-sm"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {/* Top Header */}
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
            <span className="text-stone-500">⏱️ {formatTime(timer)}</span>
            <span className="text-amber-800">คะแนน: {score}</span>
          </div>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />

        {/* Status Bar */}
        <div className="bg-white p-3 rounded-2xl border border-[#e7e2d9] flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-700">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>เปิดเจอแล้ว {matchedPairs.length} / 6 คู่</span>
          </div>
          {combo > 1 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500 text-white flex items-center space-x-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>COMBO x{combo}!</span>
            </span>
          )}
          <button
            onClick={initGame}
            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 hover:bg-stone-100"
            title="สุ่มชุดคำใหม่"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Matching Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {cards.map((card) => {
          const isMatched = matchedPairs.includes(card.wordId);
          const isSelected = selectedCards.some((c) => c.id === card.id);

          let bgClass = "bg-white border-[#e7e2d9] text-stone-800 hover:border-amber-400 shadow-sm";
          if (isMatched) {
            bgClass = "bg-emerald-50 border-emerald-300 text-emerald-800 opacity-40 pointer-events-none";
          } else if (isSelected) {
            bgClass = "bg-amber-100 border-amber-500 text-amber-950 font-bold scale-105 shadow-md";
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`h-24 p-2 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center text-center relative ${bgClass}`}
            >
              <span className={`text-xs font-extrabold leading-tight ${card.type === "en" ? "text-amber-900" : "text-stone-800"}`}>
                {card.text}
              </span>

              {card.subText && (
                <span className="text-[10px] text-stone-400 mt-1 font-mono">
                  {card.subText}
                </span>
              )}

              {card.type === "en" && (
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 text-[8px] font-bold bg-amber-500/10 text-amber-800 rounded">
                  EN
                </span>
              )}
              {card.type === "th" && (
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 text-[8px] font-bold bg-stone-100 text-stone-600 rounded">
                  TH
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
