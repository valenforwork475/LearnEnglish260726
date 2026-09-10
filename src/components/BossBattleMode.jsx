import React, { useState, useEffect } from "react";
import { Swords, Heart, Flame, Shield, Trophy, ArrowLeft, RefreshCw, Volume2, Sparkles, CheckCircle2, XCircle, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { BOSS_STAGES } from "../data/bossBattles";
import { speakText, sfx } from "../utils/audio";
import Boss3DCanvas from "./Boss3DCanvas";

export default function BossBattleMode({ accent, onBackToDashboard }) {
  const [selectedStage, setSelectedStage] = useState(BOSS_STAGES[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [playerHearts, setPlayerHearts] = useState(3);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState("select"); // 'select' | 'playing' | 'victory' | 'gameover'
  const [isHit, setIsHit] = useState(false);

  const currentQ = selectedStage.questions[currentQIndex];

  // Start Stage
  const startStage = (stage) => {
    setSelectedStage(stage);
    setCurrentQIndex(0);
    setBossHp(stage.maxHp);
    setPlayerHearts(3);
    setCombo(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameState("playing");
  };

  const handleSelectOption = (opt) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(opt.id);
    setShowExplanation(true);

    if (opt.isCorrect) {
      sfx.playCorrect();
      setIsHit(true);
      setTimeout(() => setIsHit(false), 500);

      const newCombo = combo + 1;
      setCombo(newCombo);

      const damage = 25 + newCombo * 5;
      const newHp = Math.max(0, bossHp - damage);
      setBossHp(newHp);
      setScore((prev) => prev + 150 * newCombo);

      if (newHp === 0 || currentQIndex + 1 >= selectedStage.questions.length) {
        setTimeout(() => {
          setGameState("victory");
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        }, 1200);
      }
    } else {
      sfx.playWrong();
      setCombo(0);
      const newHearts = playerHearts - 1;
      setPlayerHearts(newHearts);

      if (newHearts <= 0) {
        setTimeout(() => {
          setGameState("gameover");
        }, 1000);
      }
    }
  };

  const handleNextQuestion = () => {
    if (bossHp <= 0 || currentQIndex + 1 >= selectedStage.questions.length) {
      setGameState("victory");
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    } else {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  // Stage Selection Screen
  if (gameState === "select") {
    return (
      <div className="space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าหลัก</span>
          </button>
          <span className="text-xs font-black text-amber-800 flex items-center space-x-1">
            <Swords className="w-4 h-4 text-amber-700" />
            <span>Boss Battle Arena</span>
          </span>
        </div>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-stone-950 via-purple-950 to-slate-900 p-6 text-white border border-purple-500/30 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-stone-950 tracking-wider">
              ⚔️ GAME MODE
            </span>
            <span className="text-xs text-purple-300 font-bold">เลือกบอสประจำด่าน</span>
          </div>
          <h2 className="text-2xl font-black text-amber-200">เกมสู้บอสเอาตัวรอด & ถอดสำนวน</h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            เลือกด่านแล้วใช้ทักษะภาษาอังกฤษตอบประโยคเอาตัวรอดและสำนวนให้ถูกต้องเพื่อโจมตีบอสให้ HP เหลือ 0!
          </p>
        </div>

        {/* Stage List Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-500 px-1">ด่านบอสที่เปิดให้ลุย:</h3>
          {BOSS_STAGES.map((stg) => (
            <div
              key={stg.id}
              onClick={() => startStage(stg)}
              className="p-5 rounded-3xl bg-white border border-[#e7e2d9] hover:border-amber-500 transition cursor-pointer shadow-sm group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                    {stg.icon}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-base group-hover:text-amber-800 transition">
                      {stg.title}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium">บอส: {stg.bossName}</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition">
                  <Swords className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-bold pt-2 border-t border-stone-100">
                <span>มีทั้งหมด {stg.questions.length} คำถามเอาตัวรอด</span>
                <span className="text-amber-700 font-extrabold group-hover:translate-x-1 transition">
                  เริ่มสู้บอส ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Victory Screen
  if (gameState === "victory") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-6 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950">
            VICTORY! 🏆
          </span>
          <h2 className="text-2xl font-black text-stone-900 mt-2">
            ปราบบอส {selectedStage.bossName} สำเร็จ!
          </h2>
          <p className="text-xs text-stone-600 mt-1 font-bold">
            คะแนนที่คุณทำได้: <span className="text-amber-800 text-lg font-extrabold">{score}</span> คะแนน
          </p>
        </div>

        {/* Detailed Expression Summary Box */}
        <div className="w-full bg-white p-5 rounded-3xl border border-[#e7e2d9] space-y-3 text-left shadow-sm">
          <span className="text-xs font-extrabold text-amber-800 uppercase block tracking-wider">
            สรุปประโยคเอาตัวรอดที่ได้เรียนรู้จากด่านนี้:
          </span>
          <div className="space-y-2">
            {selectedStage.questions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-[#fcfaf7] border border-[#e7e2d9] space-y-1">
                <span className="text-xs font-bold text-stone-900 block">{q.situation}</span>
                <span className="text-xs font-extrabold text-amber-900 block">
                  👉 {q.options.find((o) => o.isCorrect)?.text}
                </span>
                <span className="text-[11px] text-stone-500 block">{q.explanation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => setGameState("select")}
            className="flex-1 py-3.5 rounded-2xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow"
          >
            เลือกลุยด่านบอสอื่นต่อ
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === "gameover") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-700 shadow-sm">
          <XCircle className="w-8 h-8" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900">
            GAME OVER 💀
          </span>
          <h2 className="text-xl font-bold text-stone-900 mt-2">พลังชีวิตของคุณหมดลง</h2>
          <p className="text-xs text-stone-500 mt-1">อย่าเพิ่งท้อครับ ลองท้าทายใหม่อีกครั้ง!</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => startStage(selectedStage)}
            className="py-3 px-6 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>ลองแก้มืออีกครั้ง</span>
          </button>
          <button
            onClick={() => setGameState("select")}
            className="py-3 px-5 rounded-xl bg-white border border-[#e7e2d9] text-stone-700 font-bold text-xs hover:bg-stone-50 shadow-sm"
          >
            เลือกลุยด่านอื่น
          </button>
        </div>
      </div>
    );
  }

  // Playing Screen
  return (
    <div className={`space-y-4 pb-24 ${isHit ? "animate-shake" : ""}`}>
      {/* Top Controls */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setGameState("select")}
          className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ยอมแพ้</span>
        </button>

        {/* Player Hearts */}
        <div className="flex items-center space-x-1">
          {[1, 2, 3].map((h) => (
            <Heart
              key={h}
              className={`w-5 h-5 ${
                h <= playerHearts ? "text-rose-500 fill-rose-500 animate-pulse" : "text-stone-300"
              }`}
            />
          ))}
        </div>

        <div className="text-xs font-extrabold text-amber-800">คะแนน: {score}</div>
      </div>

      {/* Boss Health Bar Card with 3D Monster Canvas */}
      <div className={`rounded-3xl bg-gradient-to-br ${selectedStage.bgGradient} p-5 text-white shadow-xl space-y-3 border border-purple-500/30 relative overflow-hidden transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{selectedStage.icon}</span>
            <div>
              <h3 className="text-base font-black text-amber-200">{selectedStage.bossName}</h3>
              <span className="text-[10px] text-stone-400 font-medium">{selectedStage.name}</span>
            </div>
          </div>
          {combo > 1 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white flex items-center space-x-1 animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>COMBO x{combo}!</span>
            </span>
          )}
        </div>

        {/* 3D Animated Monster Avatar */}
        <Boss3DCanvas stageId={selectedStage.id} isHit={isHit} hpPercent={bossHp / selectedStage.maxHp} />

        {/* HP Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-300 mb-1">
            <span>BOSS HP</span>
            <span>{bossHp} / {selectedStage.maxHp}</span>
          </div>
          <div className="w-full h-3.5 bg-stone-900/80 rounded-full border border-stone-700 overflow-hidden p-0.5">
            <div
              style={{ width: `${(bossHp / selectedStage.maxHp) * 100}%` }}
              className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-500 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Situation & Question Box */}
      <div className="bg-white p-6 rounded-3xl border border-[#e7e2d9] space-y-3 shadow-sm relative">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-500/10 text-amber-900 border border-amber-500/20">
            คำถามที่ {currentQIndex + 1} / {selectedStage.questions.length}
          </span>
          <button
            onClick={() => speakText(currentQ.situation, accent)}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-amber-800"
            title="ฟังเสียงอ่านโจทย์"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
            📌 สถานการณ์สมมติ:
          </span>
          <p className="text-sm font-bold text-stone-800 leading-relaxed bg-[#fcfaf7] p-3 rounded-2xl border border-[#e7e2d9]">
            {currentQ.situation}
          </p>
        </div>

        <h2 className="text-base font-extrabold text-stone-900 pt-1 leading-snug">
          {currentQ.question}
        </h2>
      </div>

      {/* Choice Buttons */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAnswer === opt.id;
          const isCorrectChoice = opt.isCorrect;

          let btnStyle = "bg-white border-[#e7e2d9] text-stone-800 hover:border-amber-400 shadow-sm";
          if (selectedAnswer !== null) {
            if (isCorrectChoice) {
              btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-950 font-extrabold shadow-sm";
            } else if (isSelected && !isCorrectChoice) {
              btnStyle = "bg-rose-50 border-rose-300 text-rose-950 shadow-sm";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between text-sm font-medium ${btnStyle}`}
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
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-stone-800 space-y-2 animate-fadeIn">
          <div className="flex items-center space-x-1.5 text-amber-900 font-extrabold text-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>คำอธิบายไวยากรณ์ & การใช้งานจริง:</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-700 font-medium">
            {currentQ.explanation}
          </p>

          <button
            onClick={handleNextQuestion}
            className="w-full mt-3 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition flex items-center justify-center space-x-1"
          >
            <span>ข้อถัดไป ➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
