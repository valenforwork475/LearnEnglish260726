import React, { useState, useEffect } from "react";
import { Volume2, RotateCcw, HelpCircle, ArrowLeft, RefreshCw, CheckCircle2, Play, Award, Layers, Check } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { speakText, sfx } from "../utils/audio";
import { SRS_STAGES, isWordDue } from "../utils/srsEngine";

const BATCH_SIZE = 10; // 10 words per review round

export default function FlashcardMode({
  words,
  srsState,
  onRateWord,
  accent,
  selectedLevel,
  onSelectLevel,
  onBackToDashboard
}) {
  const [allFilteredWords, setAllFilteredWords] = useState([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedBatch, setCompletedBatch] = useState(false);

  // Helper: Check if a word was reviewed and NOT due today (already memorized for now)
  const isWordDoneToday = (wordId) => {
    const wp = srsState?.wordProgress?.[wordId];
    return wp && wp.reviewsCount > 0 && !isWordDue(wp);
  };

  // Helper: Check if an entire 10-word batch is finished for today
  const isBatchDoneToday = (batchWords) => {
    if (!batchWords || batchWords.length === 0) return false;
    return batchWords.every(w => isWordDoneToday(w.id));
  };

  // Helper: Build pending queue from a batch (skip already-memorized words)
  const buildPendingQueue = (batchWords) => {
    const pending = batchWords.filter(w => !isWordDoneToday(w.id));
    return pending;
  };

  useEffect(() => {
    const filtered = selectedLevel === "all" ? words : words.filter(w => w.level === selectedLevel);
    setAllFilteredWords(filtered);

    const totalCount = Math.ceil(filtered.length / BATCH_SIZE) || 1;

    // Check saved batch from localStorage
    const savedBatchStr = localStorage.getItem(`neuroflash_last_batch_${selectedLevel}`);
    let initialBatch = savedBatchStr !== null ? parseInt(savedBatchStr, 10) : 0;
    if (isNaN(initialBatch) || initialBatch >= totalCount || initialBatch < 0) {
      initialBatch = 0;
    }

    // Auto-advance to the first batch that still has pending words
    if (filtered.length > 0) {
      const currentBatchWords = filtered.slice(initialBatch * BATCH_SIZE, (initialBatch + 1) * BATCH_SIZE);
      const pendingInCurrent = currentBatchWords.filter(w => !isWordDoneToday(w.id));
      if (pendingInCurrent.length === 0) {
        const firstUndoneIdx = Array.from({ length: totalCount }).findIndex((_, idx) => {
          const bWords = filtered.slice(idx * BATCH_SIZE, (idx + 1) * BATCH_SIZE);
          return bWords.some(w => !isWordDoneToday(w.id));
        });
        if (firstUndoneIdx !== -1) {
          initialBatch = firstUndoneIdx;
        }
      }
    }

    setBatchIndex(initialBatch);
    const initialBatchWords = filtered.slice(initialBatch * BATCH_SIZE, (initialBatch + 1) * BATCH_SIZE);
    // *** KEY FIX: only queue words not yet reviewed / still due ***
    const pendingWords = initialBatchWords.filter(w => !isWordDoneToday(w.id));
    setQueue(pendingWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedBatch(pendingWords.length === 0);
  }, [selectedLevel, words]);

  const totalBatches = Math.ceil(allFilteredWords.length / BATCH_SIZE) || 1;
  const currentWord = queue[currentIndex];

  const handleSelectBatch = (idx) => {
    setBatchIndex(idx);
    localStorage.setItem(`neuroflash_last_batch_${selectedLevel}`, idx);
    const allBatchWords = allFilteredWords.slice(idx * BATCH_SIZE, (idx + 1) * BATCH_SIZE);
    // *** KEY FIX: only queue words not yet reviewed / still due ***
    const pendingWords = allBatchWords.filter(w => !isWordDoneToday(w.id));
    setQueue(pendingWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedBatch(pendingWords.length === 0);
  };

  const handleFlip = () => {
    sfx.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleSpeech = (e, text) => {
    e.stopPropagation();
    speakText(text, accent);
  };

  const handleRate = (rating) => {
    if (!currentWord) return;

    if (rating === "again") {
      sfx.playWrong();
      onRateWord(currentWord.id, "again");

      setIsFlipped(false);
      setTimeout(() => {
        setQueue(prevQueue => {
          const newQueue = [...prevQueue];
          const insertIndex = Math.min(newQueue.length, currentIndex + 3);
          newQueue.splice(insertIndex, 0, currentWord);
          return newQueue;
        });
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      sfx.playCorrect();
      onRateWord(currentWord.id, rating);
      setIsFlipped(false);

      setTimeout(() => {
        if (currentIndex + 1 >= queue.length) {
          setCompletedBatch(true);
          confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 150);
    }
  };

  const handleNextBatch = () => {
    const nextBatchIdx = batchIndex + 1;
    if (nextBatchIdx < totalBatches) {
      handleSelectBatch(nextBatchIdx);
    }
  };

  const handleRestartBatch = () => {
    handleSelectBatch(batchIndex);
  };

  // Completed 10-Word Batch Screen
  if (!currentWord || completedBatch) {
    const hasMoreBatches = batchIndex + 1 < totalBatches;

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
            ชุดที่ {batchIndex + 1} / {totalBatches} (10 คำ)
          </span>
          <h2 className="text-xl font-bold text-stone-900">จบรอบทบทวน 10 คำในชุดนี้แล้ว!</h2>
          <p className="text-xs text-stone-600 mt-2 max-w-xs mx-auto leading-relaxed">
            สมองจดจำคำศัพท์ชุดนี้ได้แม่นยำขึ้นแล้ว เลือกเริ่มทบทวน 10 คำในชุดถัดไปได้เลยครับ
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {hasMoreBatches ? (
            <button
              onClick={handleNextBatch}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow flex items-center justify-center space-x-2 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>เริ่มทบทวน 10 คำถัดไป (ชุดที่ {batchIndex + 2})</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center space-x-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>คุณทบทวนครบทุกชุด 10 คำของเลเวลนี้แล้ว</span>
            </div>
          )}

          <button
            onClick={handleRestartBatch}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[#e7e2d9] text-stone-700 font-semibold text-xs hover:bg-stone-50 flex items-center justify-center space-x-2 transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทบทวนชุดนี้ (10 คำ) ซ้ำอีกครั้ง</span>
          </button>

          <button
            onClick={onBackToDashboard}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[#e7e2d9] text-stone-500 font-semibold text-xs hover:text-stone-900 transition shadow-sm"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  const wordProg = srsState.wordProgress[currentWord.id];
  const currentStage = wordProg?.stage || 0;
  const stageInfo = SRS_STAGES.find(s => s.stage === currentStage);

  return (
    <div className="space-y-4 pb-24">
      {/* Navigation Header & Level Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20">
              ชุดที่ {batchIndex + 1}/{totalBatches} (คำที่ {currentIndex + 1}/10)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
              {stageInfo?.badge || "ใหม่"}
            </span>
          </div>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />

        {/* 10-Word Batch Bar Selector with Completion Badges */}
        {totalBatches > 1 && (
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-stone-400 whitespace-nowrap flex items-center gap-1">
              <Layers className="w-3 h-3" />
              ชุด 10 คำ:
            </span>
            {Array.from({ length: totalBatches }).map((_, idx) => {
              const isSelected = batchIndex === idx;
              const startNum = idx * BATCH_SIZE + 1;
              const endNum = Math.min((idx + 1) * BATCH_SIZE, allFilteredWords.length);

              const batchWords = allFilteredWords.slice(idx * BATCH_SIZE, (idx + 1) * BATCH_SIZE);
              const isDone = isBatchDoneToday(batchWords);

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectBatch(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border flex items-center gap-1 ${
                    isSelected
                      ? "bg-amber-600 border-amber-700 text-white shadow-xs"
                      : isDone
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-amber-50 hover:border-amber-300"
                  }`}
                >
                  {isDone && <Check className="w-3 h-3 text-emerald-600 font-bold" />}
                  <span>ชุดที่ {idx + 1} ({startNum}-{endNum})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3D Flashcard */}
      <div
        onClick={handleFlip}
        className="w-full h-[380px] perspective-1000 cursor-pointer group select-none"
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT SIDE - Word Only (No phonetic/pronunciation) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-[#e7e2d9] p-6 flex flex-col justify-between backface-hidden shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                {currentWord.partOfSpeech}
              </span>
              <button
                onClick={(e) => handleSpeech(e, currentWord.word)}
                className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20 hover:bg-amber-600 hover:text-white flex items-center justify-center transition"
                title="ฟังเสียงพูด"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center my-auto space-y-2">
              <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight">
                {currentWord.word}
              </h2>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-stone-400 flex items-center justify-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                <span>แตะการ์ดเพื่อดูคำอ่าน คำแปล & ประโยคตัวอย่าง</span>
              </span>
            </div>
          </div>

          {/* BACK SIDE - Meaning + Phonetic / คำอ่าน + Example Sentence */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#f5f2eb] border border-[#e7e2d9] p-6 flex flex-col justify-between rotate-y-180 backface-hidden shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">คำอ่าน คำแปล & ประโยคตัวอย่าง</span>
              <button
                onClick={(e) => handleSpeech(e, currentWord.exampleEn)}
                className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20 hover:bg-amber-600 hover:text-white flex items-center justify-center transition"
                title="ฟังเสียงประโยค"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center my-auto space-y-3">
              <div className="text-2xl font-bold text-amber-900">
                {currentWord.meaning}
              </div>

              {/* Phonetic Reading & IPA moved to BACK SIDE */}
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="inline-block px-3 py-1 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 font-medium text-xs">
                  คำอ่าน: <span className="font-bold text-amber-900">{currentWord.phoneticThai}</span>
                </div>
                <p className="text-[11px] font-mono text-stone-500">
                  {currentWord.ipa}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#e7e2d9] text-left space-y-1.5 shadow-sm">
                <p className="text-xs font-semibold text-stone-900 leading-relaxed">
                  "{currentWord.exampleEn}"
                </p>
                <p className="text-[11px] text-amber-800 font-medium">
                  คำอ่านประโยค: <span className="italic">{currentWord.examplePhonetic}</span>
                </p>
                <p className="text-[11px] text-stone-500">
                  แปล: {currentWord.exampleTh}
                </p>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-stone-500">
                เลือกระดับความจำด้านล่างเพื่อประเมินความแม่นยำ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SRS Rating Buttons */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        <button
          onClick={() => handleRate("again")}
          className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 flex flex-col items-center justify-center transition active:scale-95 shadow-sm"
          title="โชว์ซ้ำอีกรอบใน 10 คำนี้จนกว่าจะจำได้"
        >
          <span className="text-xs font-bold flex items-center">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin text-rose-700" /> อีกรอบ
          </span>
          <span className="text-[9px] text-rose-700/90 mt-0.5">ซ้ำใน 10 คำนี้</span>
        </button>

        <button
          onClick={() => handleRate("good")}
          className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 flex flex-col items-center justify-center transition active:scale-95 shadow-sm"
        >
          <span className="text-xs font-bold">พอได้</span>
          <span className="text-[9px] text-amber-800 mt-0.5">ทบทวนใน 1 วัน</span>
        </button>

        <button
          onClick={() => handleRate("great")}
          className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 flex flex-col items-center justify-center transition active:scale-95 shadow-sm"
        >
          <span className="text-xs font-bold">แม่นแล้ว</span>
          <span className="text-[9px] text-emerald-800 mt-0.5">3-7 วัน</span>
        </button>

        <button
          onClick={() => handleRate("easy")}
          className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-900 flex flex-col items-center justify-center transition active:scale-95 shadow-sm"
        >
          <span className="text-xs font-bold">ง่ายมาก</span>
          <span className="text-[9px] text-indigo-800 mt-0.5">14-30 วัน</span>
        </button>
      </div>
    </div>
  );
}


