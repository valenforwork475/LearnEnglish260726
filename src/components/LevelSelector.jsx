import React from "react";
import { LEVELS_CONFIG } from "../data/vocabulary";

export default function LevelSelector({ selectedLevel, onSelectLevel, words = [] }) {
  const getCount = (lvlId) => {
    if (!words || words.length === 0) return null;
    if (lvlId === "all") return words.length;
    return words.filter((w) => w.level === lvlId).length;
  };

  const totalCount = getCount("all");

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectLevel("all")}
        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
          selectedLevel === "all"
            ? "bg-amber-700 text-white font-bold shadow-sm"
            : "bg-white border border-[#e7e2d9] text-stone-600 hover:bg-amber-50"
        }`}
      >
        ✨ ทุกระดับ {totalCount !== null ? `(${totalCount} คำ)` : ""}
      </button>

      {Object.values(LEVELS_CONFIG).map((lvl) => {
        const isSelected = selectedLevel === lvl.id;
        const count = getCount(lvl.id);

        return (
          <button
            key={lvl.id}
            onClick={() => onSelectLevel(lvl.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? "bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-sm"
                : "bg-white border-[#e7e2d9] text-stone-600 hover:bg-amber-50"
            }`}
          >
            {lvl.badge} {count !== null ? `(${count} คำ)` : ""}
          </button>
        );
      })}
    </div>
  );
}

