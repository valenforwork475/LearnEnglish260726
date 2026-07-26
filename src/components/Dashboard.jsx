import React from "react";
import { Play, Sparkles, Brain, Layers, SpellCheck, Zap, BookOpen } from "lucide-react";
import { LEVELS_CONFIG } from "../data/vocabulary";
import LevelSelector from "./LevelSelector";

export default function Dashboard({ metrics, onStartSRS, onNavigate, selectedLevel, onSelectLevel }) {
  const stageIntervals = [
    { stage: 0, label: "ใหม่", color: "bg-stone-300" },
    { stage: 1, label: "1 วัน", color: "bg-rose-400" },
    { stage: 2, label: "3 วัน", color: "bg-amber-400" },
    { stage: 3, label: "7 วัน", color: "bg-yellow-400" },
    { stage: 4, label: "14 วัน", color: "bg-emerald-400" },
    { stage: 5, label: "30 วัน", color: "bg-indigo-400" },
  ];

  const currentLevelConfig = LEVELS_CONFIG[selectedLevel];
  const levelTitle = currentLevelConfig ? currentLevelConfig.title : "ทุกระดับ";

  return (
    <div className="space-y-5 pb-24">
      {/* Top Level Switcher */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-stone-600">เลเวลที่กำลังเรียน:</span>
          <span className="text-xs font-bold text-amber-800">{levelTitle}</span>
        </div>
        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} />
      </div>

      {/* Hero SRS Review Banner - Filtered strictly by selectedLevel */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#e7e2d9] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/20">
            <Brain className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> {levelTitle}
          </span>
          <span className="text-xs text-stone-500">
            จำได้รวม {metrics.masteredCount}/{metrics.totalWords} คำ
          </span>
        </div>

        <h2 className="text-xl font-bold text-stone-900 mb-1 leading-snug">
          {metrics.dueToday > 0 ? (
            <>มีคำศัพท์ในเลเวลนี้ <span className="text-amber-700 font-bold">{metrics.dueToday}</span> คำที่ต้องทบทวนวันนี้</>
          ) : (
            <>ทบทวนคำศัพท์ {levelTitle} ประจำวันนี้ครบแล้ว</>
          )}
        </h2>
        <p className="text-xs text-stone-500 mb-5 leading-relaxed">
          การทบทวนเฉพาะเลเวลที่เลือก ช่วยให้โฟกัสจำศัพท์ตามระดับได้อย่างแม่นยำที่สุด
        </p>

        <button
          onClick={onStartSRS}
          className="w-full py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{metrics.dueToday > 0 ? `เริ่มทบทวน ${levelTitle} วันนี้` : `เริ่มทบทวน ${levelTitle} เพิ่มเติม`}</span>
        </button>
      </div>

      {/* SRS Retention Stage Breakdown */}
      <div className="p-5 rounded-3xl bg-white border border-[#e7e2d9] space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-stone-800 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
            ระดับความจำเฉพาะ {levelTitle}
          </h3>
          <span className="text-[10px] text-stone-500">Leitner Algorithm</span>
        </div>

        {/* Progress Bar Stack */}
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
          {stageIntervals.map(({ stage, color }) => {
            const count = metrics.stageCounts[stage] || 0;
            const pct = metrics.totalWords ? (count / metrics.totalWords) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={stage}
                style={{ width: `${pct}%` }}
                className={`${color} h-full transition-all duration-300`}
                title={`Stage ${stage}: ${count} คำ`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {stageIntervals.map(({ stage, label, color }) => {
            const count = metrics.stageCounts[stage] || 0;
            return (
              <div key={stage} className="flex items-center justify-between p-2 rounded-xl bg-[#f5f2eb] border border-[#e7e2d9]">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-[11px] text-stone-700 font-medium">{label}</span>
                </div>
                <span className="text-xs font-bold text-stone-900">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Modes Quick Select */}
      <div>
        <h3 className="text-xs font-bold text-stone-500 mb-3 px-1">เลือกโหมดการฝึกจำ ({levelTitle})</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Flashcards */}
          <button
            onClick={() => onNavigate("flashcard")}
            className="p-4 rounded-2xl bg-white border border-[#e7e2d9] hover:border-amber-400 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition">แฟลชการ์ด (SRS)</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">ทบทวน 10 คำเฉพาะ {levelTitle}</p>
            </div>
          </button>

          {/* Sentence Unscramble */}
          <button
            onClick={() => onNavigate("sentence")}
            className="p-4 rounded-2xl bg-white border border-[#e7e2d9] hover:border-amber-400 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-3">
              <SpellCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition">จัดเรียงประโยค</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">ฝึกสร้างประโยค {levelTitle}</p>
            </div>
          </button>

          {/* Speed Quiz */}
          <button
            onClick={() => onNavigate("quiz")}
            className="p-4 rounded-2xl bg-white border border-[#e7e2d9] hover:border-amber-400 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition">ควิซสปีด</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">ควิซความเร็วเฉพาะ {levelTitle}</p>
            </div>
          </button>

          {/* Word Bank */}
          <button
            onClick={() => onNavigate("wordbank")}
            className="p-4 rounded-2xl bg-white border border-[#e7e2d9] hover:border-amber-400 text-left transition flex flex-col justify-between group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition">คลังคำศัพท์</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">รายการคำศัพท์ {levelTitle}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
