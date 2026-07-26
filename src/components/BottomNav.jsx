import React from "react";
import { LayoutDashboard, Layers, SpellCheck, BrainCircuit, Library } from "lucide-react";

export default function BottomNav({ activeTab, setActiveTab, dueCount }) {
  const tabs = [
    { id: "dashboard", label: "หน้าแรก", icon: LayoutDashboard },
    { id: "flashcard", label: "แฟลชการ์ด", icon: Layers, badge: dueCount },
    { id: "sentence", label: "เรียงประโยค", icon: SpellCheck },
    { id: "quiz", label: "ควิซสปีด", icon: BrainCircuit },
    { id: "wordbank", label: "คลังคำศัพท์", icon: Library },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fcfaf7]/95 backdrop-blur-md border-t border-[#e7e2d9] pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? "text-amber-800 font-bold scale-105"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 min-w-[18px] text-[10px] font-bold bg-amber-600 text-white rounded-full flex items-center justify-center">
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-1 bg-amber-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
