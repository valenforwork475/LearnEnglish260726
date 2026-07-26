// Spaced Repetition System (SRS) Engine based on Leitner SuperMemo Intervals
// Intervals: Stage 0 = New, Stage 1 = 1d, Stage 2 = 3d, Stage 3 = 7d, Stage 4 = 14d, Stage 5 = 30d

const STORAGE_KEY = "neuroflash_srs_data_v2";

export const SRS_STAGES = [
  { stage: 0, label: "ใหม่ (New)", days: 0, badge: "ใหม่" },
  { stage: 1, label: "ทบทวนใน 1 วัน", days: 1, badge: "Stage 1" },
  { stage: 2, label: "ทบทวนใน 3 วัน", days: 3, badge: "Stage 2" },
  { stage: 3, label: "ทบทวนใน 7 วัน", days: 7, badge: "Stage 3" },
  { stage: 4, label: "ทบทวนใน 14 วัน", days: 14, badge: "Stage 4" },
  { stage: 5, label: "ความจำถาวร (30 วัน)", days: 30, badge: "Mastered" }
];

export function getSRSState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse SRS state from localStorage:", e);
    return createInitialState();
  }
}

function createInitialState() {
  const state = {
    wordProgress: {},
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    settings: {
      accent: "en-US",
      isMuted: false
    }
  };
  saveSRSState(state);
  return state;
}

export function saveSRSState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save SRS state:", e);
  }
}

export function isWordDue(wordProgress) {
  if (!wordProgress || !wordProgress.nextReviewDate) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reviewDate = new Date(wordProgress.nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);
  return reviewDate <= today;
}

export function getSRSMetrics(allWords, state, selectedLevel = "all") {
  let dueToday = 0;
  let masteredCount = 0;
  let totalReviewed = 0;

  const stageCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const targetWords = selectedLevel === "all"
    ? allWords
    : allWords.filter(w => w.level === selectedLevel);

  targetWords.forEach((word) => {
    const wp = state.wordProgress[word.id];
    if (!wp) {
      dueToday++;
      stageCounts[0]++;
    } else {
      const stage = wp.stage || 0;
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
      if (stage >= 4) masteredCount++;
      if (wp.reviewsCount > 0) totalReviewed++;

      if (isWordDue(wp)) {
        dueToday++;
      }
    }
  });

  return {
    dueToday,
    masteredCount,
    totalReviewed,
    totalWords: targetWords.length,
    stageCounts,
    streak: state.streak || 1
  };
}

export function recordWordReview(wordId, rating, state) {
  const newState = { ...state };
  const current = newState.wordProgress[wordId] || {
    stage: 0,
    reviewsCount: 0,
    nextReviewDate: null,
    lastReviewed: null
  };

  let newStage = current.stage;

  switch (rating) {
    case "again":
      newStage = 1;
      break;
    case "good":
      newStage = Math.max(1, (current.stage || 0) + 1);
      break;
    case "great":
      newStage = Math.min(5, Math.max(2, (current.stage || 0) + 2));
      break;
    case "easy":
      newStage = Math.min(5, Math.max(4, current.stage + 2));
      break;
    default:
      newStage = 1;
  }

  const daysToAdd = SRS_STAGES.find((s) => s.stage === newStage)?.days || 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  const todayStr = new Date().toISOString().split("T")[0];

  if (newState.lastActiveDate !== todayStr) {
    const last = new Date(newState.lastActiveDate);
    const today = new Date(todayStr);
    const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newState.streak = (newState.streak || 0) + 1;
    } else if (diffDays > 1) {
      newState.streak = 1;
    }
    newState.lastActiveDate = todayStr;
  }

  newState.wordProgress[wordId] = {
    stage: newStage,
    nextReviewDate: nextDate.toISOString(),
    reviewsCount: (current.reviewsCount || 0) + 1,
    lastReviewed: todayStr
  };

  saveSRSState(newState);
  return { newState, nextDays: daysToAdd };
}
