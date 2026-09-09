import React, { useState, useEffect } from "react";
import { BookOpenCheck, CheckCircle2, XCircle, ArrowLeft, Trophy, Volume2, Sparkles, Filter } from "lucide-react";
import confetti from "canvas-confetti";
import LevelSelector from "./LevelSelector";
import { GRAMMAR_DATA, GRAMMAR_TOPICS } from "../data/grammar";
import { speakText, sfx } from "../utils/audio";

export default function GrammarMode({ accent, selectedLevel, onSelectLevel, onBackToDashboard }) {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter questions by level and topic
  const filteredQuestions = GRAMMAR_DATA.filter((q) => {
    const matchLevel = selectedLevel === "all" || q.level === selectedLevel;
    const matchTopic = selectedTopic === "all" || q.topic === selectedTopic;
    return matchLevel && matchTopic;
  });

  const currentQ = filteredQuestions[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentIndex, selectedLevel, selectedTopic]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const handleSelectOption = (opt) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(opt.id);
    setShowExplanation(true);

    if (opt.isCorrect) {
      sfx.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sfx.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 >= filteredQuestions.length) {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="space-y-4 pb-24 text-center">
        <div className="flex items-center justify-between px-1">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
        </div>
        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={[]} />
        <div className="bg-white p-8 rounded-3xl border border-[#e7e2d9] shadow-sm space-y-3">
          <BookOpenCheck className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">ยังไม่มีข้อสอบในหมวดนี้</h3>
          <p className="text-xs text-stone-500">
            ลองเลือกเลเวลหรือเปลี่ยนหมวดหมู่แกรมม่าเพื่อเริ่มทำข้อสอบครับ
          </p>
          <button
            onClick={() => {
              setSelectedTopic("all");
              onSelectLevel("all");
            }}
            className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 shadow"
          >
            แสดงทุกข้อสอบ
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished || !currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            Grammar Master 🎉
          </span>
          <h2 className="text-xl font-bold text-stone-900 mt-2">ทำข้อสอบแกรมม่าเสร็จเรียบร้อย!</h2>
          <p className="text-sm text-stone-600 mt-2">
            คะแนนที่คุณทำได้: <span className="text-amber-800 font-extrabold text-xl">{score}</span> / {filteredQuestions.length} ข้อ
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="py-3 px-6 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow"
          >
            ทำข้อสอบชุดนี้อีกครั้ง
          </button>
          <button
            onClick={onBackToDashboard}
            className="py-3 px-5 rounded-xl bg-white border border-[#e7e2d9] text-stone-700 font-bold text-xs hover:bg-stone-50 shadow-sm"
          >
            กลับสู่หน้าหลัก
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
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-amber-800">คะแนน: {score}</span>
            <span className="text-xs font-bold text-stone-500">
              ข้อ {currentIndex + 1} / {filteredQuestions.length}
            </span>
          </div>
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={[]} />

        {/* Topic Selector Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 ml-1" />
          {GRAMMAR_TOPICS.map((top) => (
            <button
              key={top.id}
              onClick={() => {
                setSelectedTopic(top.id);
                setCurrentIndex(0);
                setScore(0);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedTopic === top.id
                  ? "bg-amber-800 text-white shadow-sm"
                  : "bg-white text-stone-600 border border-[#e7e2d9] hover:bg-stone-50"
              }`}
            >
              {top.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-white p-6 rounded-3xl border border-[#e7e2d9] space-y-4 shadow-sm relative">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20 uppercase">
            {GRAMMAR_TOPICS.find((t) => t.id === currentQ.topic)?.label || currentQ.topic}
          </span>
          <button
            onClick={() => speakText(currentQ.question.replace("_______", ""), accent)}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-amber-800"
            title="ฟังเสียงอ่าน"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-stone-900 leading-relaxed">
            {currentQ.question}
          </h2>
          <p className="text-xs text-stone-500 mt-2 italic font-medium">
            แปล: "{currentQ.translation}"
          </p>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAnswer === opt.id;
          const isCorrectChoice = opt.isCorrect;

          let style = "bg-white border-[#e7e2d9] text-stone-800 hover:border-stone-400 shadow-sm";
          if (selectedAnswer !== null) {
            if (isCorrectChoice) {
              style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-sm";
            } else if (isSelected && !isCorrectChoice) {
              style = "bg-rose-50 border-rose-300 text-rose-900 shadow-sm";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between text-sm font-medium ${style}`}
            >
              <span>{opt.text}</span>
              {selectedAnswer !== null && isCorrectChoice && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
              {selectedAnswer !== null && isSelected && !isCorrectChoice && (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-stone-800 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>คำอธิบายหลักไวยากรณ์ (Explanation):</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-700">
            {currentQ.explanation}
          </p>

          <button
            onClick={handleNextQuestion}
            className="w-full mt-3 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow transition flex items-center justify-center space-x-1"
          >
            <span>ข้อถัดไป ➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
