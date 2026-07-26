import React from "react";
import { Volume2, VolumeX, Sparkles, Calendar } from "lucide-react";

export default function Header({ srsMetrics, accent, isMuted, onToggleMute, onToggleAccent }) {
  return (
    <header className="sticky top-0 z-40 bg-[#fcfaf7]/90 backdrop-blur-md border-b border-[#e7e2d9] px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h1 className="font-extrabold text-base leading-none tracking-tight text-stone-900">
              Neuro<span className="text-amber-700">Flash</span>
            </h1>
            <p className="text-[10px] text-stone-500 font-medium tracking-tight">
              Spaced Repetition System
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Mute/Unmute Switch */}
          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition ${
              isMuted
                ? "bg-rose-50 border-rose-200 text-rose-700"
                : "bg-white border-[#e7e2d9] text-stone-700 hover:bg-amber-50 shadow-sm"
            }`}
            title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span className="text-[10px] pr-1">ปิดเสียง</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] pr-1">เปิดเสียง</span>
              </>
            )}
          </button>

          {/* Accent Switcher */}
          <button
            onClick={onToggleAccent}
            className="px-2.5 py-1 rounded-xl bg-white border border-[#e7e2d9] text-xs font-semibold text-stone-700 hover:bg-amber-50 shadow-sm transition"
            title="เปลี่ยนสำเนียงเสียงอ่าน"
          >
            <span>{accent === "en-US" ? "US Accent" : "UK Accent"}</span>
          </button>

          {/* Streak Counter */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{srsMetrics.streak} วัน</span>
          </div>
        </div>
      </div>
    </header>
  );
}
