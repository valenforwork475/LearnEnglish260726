import React, { useState } from "react";
import { Search, Volume2, ArrowLeft, BookOpen } from "lucide-react";
import LevelSelector from "./LevelSelector";
import { speakText } from "../utils/audio";
import { SRS_STAGES } from "../utils/srsEngine";

export default function WordBank({ words, srsState, accent, selectedLevel, onSelectLevel, onBackToDashboard }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWords = words.filter((item) => {
    const matchesLevel = selectedLevel === "all" || item.level === selectedLevel;
    const matchesQuery =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneticThai.includes(searchQuery);
    return matchesLevel && matchesQuery;
  });

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
          <span className="text-xs font-bold text-stone-700">
            คลังคำศัพท์ทั้งหมด ({filteredWords.length} คำ)
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์, คำอ่านภาษาไทย หรือคำแปล..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#e7e2d9] text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition shadow-sm"
          />
        </div>

        <LevelSelector selectedLevel={selectedLevel} onSelectLevel={onSelectLevel} words={words} />
      </div>

      {/* Word Cards List */}
      <div className="space-y-3">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 text-stone-400 space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-stone-300" />
            <p className="text-sm font-medium">ไม่พบคำศัพท์ที่ตรงกับการค้นหา</p>
          </div>
        ) : (
          filteredWords.map((item) => {
            const prog = srsState.wordProgress[item.id];
            const stage = prog?.stage || 0;
            const stageBadge = SRS_STAGES.find((s) => s.stage === stage)?.badge || "ใหม่";

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-[#e7e2d9] hover:border-amber-300 transition space-y-2.5 shadow-sm"
              >
                {/* Word Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-stone-900">{item.word}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-stone-500">{item.ipa}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                      {stageBadge}
                    </span>
                    <button
                      onClick={() => speakText(item.word, accent)}
                      className="p-2 rounded-xl bg-amber-500/10 text-amber-800 hover:bg-amber-600 hover:text-white transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thai Phonetic Reading Badge */}
                <div className="inline-block px-3 py-1 rounded-xl bg-amber-100/80 border border-amber-300 text-xs text-amber-950 font-medium">
                  คำอ่าน: <span className="font-bold text-amber-900">{item.phoneticThai}</span>
                </div>

                {/* Thai Meaning */}
                <p className="text-sm font-bold text-stone-800">{item.meaning}</p>

                {/* Sentence Example */}
                <div className="p-3 rounded-xl bg-[#f5f2eb] border border-[#e7e2d9] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-stone-900 font-semibold">
                    <span>"{item.exampleEn}"</span>
                    <button
                      onClick={() => speakText(item.exampleEn, accent)}
                      className="text-stone-400 hover:text-amber-800"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-900 font-medium">
                    คำอ่านประโยค: <span className="italic">{item.examplePhonetic}</span>
                  </p>
                  <p className="text-[11px] text-stone-600">
                    แปล: {item.exampleTh}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
