import React, { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Dashboard from "./components/Dashboard";
import FlashcardMode from "./components/FlashcardMode";
import SentenceMode from "./components/SentenceMode";
import QuizMode from "./components/QuizMode";
import WordBank from "./components/WordBank";
import { VOCABULARY_DATA } from "./data/vocabulary";
import { getSRSState, getSRSMetrics, recordWordReview } from "./utils/srsEngine";
import { setMuteState, getMuteState } from "./utils/audio";

export default function App() {
  const [srsState, setSrsState] = useState(getSRSState());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedLevel, setSelectedLevel] = useState("starter"); // Default to Level 1 Starter for clear level-based learning
  const [accent, setAccent] = useState("en-US");
  const [isMuted, setIsMuted] = useState(getMuteState());

  // Metrics are filtered strictly by selectedLevel
  const metrics = getSRSMetrics(VOCABULARY_DATA, srsState, selectedLevel);

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    setMuteState(nextMute);
  };

  const handleToggleAccent = () => {
    setAccent((prev) => (prev === "en-US" ? "en-GB" : "en-US"));
  };

  const handleRateWord = (wordId, rating) => {
    const { newState } = recordWordReview(wordId, rating, srsState);
    setSrsState(newState);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Header Bar */}
      <Header
        srsMetrics={metrics}
        accent={accent}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onToggleAccent={handleToggleAccent}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4">
        {activeTab === "dashboard" && (
          <Dashboard
            metrics={metrics}
            onStartSRS={() => setActiveTab("flashcard")}
            onNavigate={(tab) => setActiveTab(tab)}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
        )}

        {activeTab === "flashcard" && (
          <FlashcardMode
            words={VOCABULARY_DATA}
            srsState={srsState}
            onRateWord={handleRateWord}
            accent={accent}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "sentence" && (
          <SentenceMode
            words={VOCABULARY_DATA}
            accent={accent}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "quiz" && (
          <QuizMode
            words={VOCABULARY_DATA}
            accent={accent}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onRateWord={handleRateWord}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "wordbank" && (
          <WordBank
            words={VOCABULARY_DATA}
            srsState={srsState}
            accent={accent}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dueCount={metrics.dueToday}
      />
    </div>
  );
}
