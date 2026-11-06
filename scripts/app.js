const CONTINENT_ICONS = {
  "North America": "🗽",
  "South America": "🌿",
  Europe: "🏛️",
  Asia: "⛩️",
  Africa: "🦒",
  Oceania: "🏝️",
};
const STATS_KEY = "geowiz.stats.v1";
const THEME_KEY = "geowiz.theme";
const QUESTION_COUNTS = [5, 10, 15];
const DIFFICULTY_COUNTS = { easy: 3, standard: 4, expert: 5 };
const QUESTION_TIME = 15;

const elements = {
  continentGrid: document.getElementById("continentGrid"),
  selectionNote: document.getElementById("selectionNote"),
  questionCount: document.getElementById("questionCount"),
  difficulty: document.getElementById("difficulty"),
  timedMode: document.getElementById("timedMode"),
  startBtn: document.getElementById("startBtn"),
  nextBtn: document.getElementById("nextBtn"),
  hintBtn: document.getElementById("hintBtn"),
  hintStatus: document.getElementById("hintStatus"),
  cityName: document.getElementById("cityName"),
  questionLabel: document.getElementById("questionLabel"),
  questionPrompt: document.getElementById("questionPrompt"),
  keyboardHint: document.getElementById("keyboardHint"),
  answerReveal: document.getElementById("answerReveal"),
  questionHeading: document.getElementById("quizHeading"),
  quizEyebrow: document.getElementById("quizEyebrow"),
  questionCounter: document.getElementById("questionCounter"),
  quizProgress: document.getElementById("quizProgress"),
  progressFill: document.getElementById("progressFill"),
  timerTrack: document.getElementById("timerTrack"),
  timerFill: document.getElementById("timerFill"),
  options: document.getElementById("options"),
  liveMessage: document.getElementById("liveMessage"),
  bestScore: document.getElementById("bestScore"),
  bestScoreCaption: document.getElementById("bestScoreCaption"),
  gamesPlayed: document.getElementById("gamesPlayed"),
  roundScore: document.getElementById("roundScore"),
  accuracyCaption: document.getElementById("accuracyCaption"),
  bestStreak: document.getElementById("bestStreak"),
  resetStatsBtn: document.getElementById("resetStatsBtn"),
  previewBtn: document.getElementById("previewBtn"),
  previewPanel: document.getElementById("previewPanel"),
  shareBtn: document.getElementById("shareBtn"),
  themeBtn: document.getElementById("themeBtn"),
  themeIcon: document.getElementById("themeIcon"),
  currentYear: document.getElementById("currentYear"),
};

function shuffle(items) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createEmptyStats() {
  return { gamesPlayed: 0, bestScore: null, bestQuestionCount: 0, bestStreak: 0 };
}

function announce(message) {
  elements.liveMessage.textContent = message;
}

function loadStats() {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return createEmptyStats();
    const saved = JSON.parse(stored);
    if (
      !saved ||
      !Number.isInteger(saved.gamesPlayed) ||
      saved.gamesPlayed < 0 ||
      (saved.bestScore !== null &&
        (!Number.isInteger(saved.bestScore) || saved.bestScore < 0)) ||
      !Number.isInteger(saved.bestQuestionCount) ||
      saved.bestQuestionCount < 0 ||
      !Number.isInteger(saved.bestStreak) ||
      saved.bestStreak < 0
    ) {
      throw new Error("Saved GeoWiz statistics have an invalid format.");
    }
    return saved;
  } catch (error) {
    announce("Your saved stats could not be loaded. A fresh record will start this visit.");
    return createEmptyStats();
  }
}

let stats = loadStats();
let selectedContinent = "Europe";
let questions = [];
let currentIndex = 0;
let correctAnswers = 0;
let hintedCorrectAnswers = 0;
let currentStreak = 0;
let roundBestStreak = 0;
let currentQuestionHinted = false;
let stage = "ready";
let timerInterval = null;
let questionDeadline = 0;
let previewOpen = false;

function persistStats() {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    announce("Your quiz is complete, but this browser could not save your stats.");
  }
}

function renderContinents() {
  elements.continentGrid.replaceChildren();
  Object.entries(WORLD_DATA).forEach(([continent, cities]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `continent-btn${continent === selectedContinent ? " active" : ""}`;
    button.setAttribute("aria-pressed", String(continent === selectedContinent));

    const icon = document.createElement("span");
    icon.className = "continent-emoji";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = CONTINENT_ICONS[continent];

    const name = document.createElement("span");
    name.className = "continent-name";
    name.textContent = continent;

    const count = document.createElement("span");
    count.className = "continent-count";
    count.textContent = `${cities.length} cities`;

    button.append(icon, name, count);
    button.addEventListener("click", () => {
      if (stage === "playing" || stage === "answered") return;
      selectedContinent = continent;
      elements.selectionNote.textContent = `${continent} selected`;
      renderContinents();
      renderPreview();
      updateReadyView();
    });
    elements.continentGrid.appendChild(button);
  });
}

function getQuestionCount() {
  const requested = Number(elements.questionCount.value);
  return QUESTION_COUNTS.includes(requested) ? requested : QUESTION_COUNTS[1];
}

function getOptionCount() {
  return DIFFICULTY_COUNTS[elements.difficulty.value] || DIFFICULTY_COUNTS.standard;
}

function getScore() {
  return correctAnswers - hintedCorrectAnswers;
}

function updateStatsView() {
  elements.bestScore.textContent = stats.bestScore === null ? "—" : stats.bestScore;
  elements.bestScoreCaption.textContent =
    stats.bestScore === null
      ? "Your next personal best"
      : `out of ${stats.bestQuestionCount} questions`;
  elements.gamesPlayed.textContent = stats.gamesPlayed;
  elements.bestStreak.textContent = stats.bestStreak;
  elements.roundScore.innerHTML = `${getScore()}<span class="score-total"> / ${questions.length || getQuestionCount()}</span>`;
  elements.accuracyCaption.textContent = questions.length
    ? `${correctAnswers} correct · ${Math.round((correctAnswers / questions.length) * 100)}%`
    : "Answers correct";
}

function updateReadyView() {
  if (stage !== "ready") return;
  const count = getQuestionCount();
  elements.questionHeading.textContent = "Ready when you are";
  elements.quizEyebrow.textContent = "YOUR ADVENTURE STARTS HERE";
  elements.questionCounter.textContent = `${count} questions`;
  elements.questionLabel.textContent = `A city somewhere in ${selectedContinent}`;
  elements.cityName.textContent = "Your next adventure";
  elements.questionPrompt.textContent = elements.timedMode.checked
    ? "15 seconds for each question. Trust your instincts!"
    : "Which country is this city in?";
  elements.answerReveal.textContent = "";
  elements.answerReveal.className = "answer-reveal";
  elements.options.replaceChildren();
  elements.progressFill.style.width = "0%";
  elements.quizProgress.setAttribute("aria-valuenow", "0");
  elements.timerTrack.hidden = true;
  elements.hintBtn.disabled = true;
  elements.hintStatus.textContent = "";
  elements.startBtn.hidden = false;
  elements.startBtn.textContent = "Start exploring ↗";
  elements.nextBtn.hidden = true;
  elements.shareBtn.hidden = true;
  elements.questionCount.disabled = false;
  elements.difficulty.disabled = false;
  elements.timedMode.disabled = false;
  renderContinents();
  updateStatsView();
}

function stopTimer() {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimer() {
  const remaining = Math.max(0, questionDeadline - Date.now());
  const percent = (remaining / (QUESTION_TIME * 1000)) * 100;
  elements.timerFill.style.width = `${percent}%`;
  elements.timerTrack.setAttribute("role", "progressbar");
  elements.timerTrack.setAttribute("aria-label", "Time remaining");
  elements.timerTrack.setAttribute("aria-valuemin", "0");
  elements.timerTrack.setAttribute("aria-valuemax", String(QUESTION_TIME));
  elements.timerTrack.setAttribute("aria-valuenow", String(Math.ceil(remaining / 1000)));
  elements.timerFill.classList.toggle("urgent", remaining <= 5000);
  if (remaining === 0) handleAnswer(null, true);
}

function startTimer() {
  stopTimer();
  if (!elements.timedMode.checked) {
    elements.timerTrack.hidden = true;
    return;
  }

  elements.timerTrack.hidden = false;
  elements.timerFill.classList.remove("urgent");
  questionDeadline = Date.now() + QUESTION_TIME * 1000;
  updateTimer();
  timerInterval = window.setInterval(updateTimer, 100);
}

function startQuiz() {
  stopTimer();
  const pool = WORLD_DATA[selectedContinent] || [];
  questions = shuffle(pool).slice(0, Math.min(getQuestionCount(), pool.length));
  currentIndex = 0;
  correctAnswers = 0;
  hintedCorrectAnswers = 0;
  currentStreak = 0;
  roundBestStreak = 0;
  currentQuestionHinted = false;
  stage = "playing";
  elements.questionCount.disabled = true;
  elements.difficulty.disabled = true;
  elements.timedMode.disabled = true;
  elements.startBtn.hidden = true;
  elements.nextBtn.hidden = true;
  renderContinents();
  showQuestion();
}

function makeOptions(question) {
  const countries = [...new Set(WORLD_DATA[selectedContinent].map((city) => city.country))];
  const wrongAnswers = shuffle(countries.filter((country) => country !== question.country));
  return shuffle([question.country, ...wrongAnswers.slice(0, getOptionCount() - 1)]);
}

function showQuestion() {
  const question = questions[currentIndex];
  if (!question) {
    finishQuiz();
    return;
  }

  stage = "playing";
  currentQuestionHinted = false;
  elements.questionHeading.textContent = "Which country is it?";
  elements.quizEyebrow.textContent = `${selectedContinent.toUpperCase()} · QUESTION ${currentIndex + 1}`;
  elements.questionCounter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${questions.length}`;
  elements.questionLabel.textContent = `A city somewhere in ${selectedContinent}`;
  elements.cityName.textContent = question.city;
  elements.questionPrompt.textContent = "Which country is this city in?";
  elements.answerReveal.textContent = "";
  elements.answerReveal.className = "answer-reveal";
  elements.hintBtn.disabled = false;
  elements.hintStatus.textContent = "";
  elements.startBtn.hidden = true;
  elements.nextBtn.hidden = true;
  elements.shareBtn.hidden = true;
  elements.nextBtn.textContent =
    currentIndex === questions.length - 1 ? "See your results →" : "Next question →";

  elements.keyboardHint.textContent = `Press 1–${getOptionCount()} to answer`;
  const progress = (currentIndex / questions.length) * 100;
  elements.progressFill.style.width = `${progress}%`;
  elements.quizProgress.setAttribute("aria-valuenow", String(Math.round(progress)));
  elements.options.replaceChildren();

  makeOptions(question).forEach((country, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "opt-btn";
    button.dataset.country = country;
    const number = document.createElement("span");
    number.className = "option-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(optionIndex + 1);
    const label = document.createElement("span");
    label.textContent = country;
    button.append(number, label);
    button.addEventListener("click", () => handleAnswer(country, false));
    elements.options.appendChild(button);
  });

  updateStatsView();
  startTimer();
  elements.options.firstElementChild.focus({ preventScroll: true });
}

function useHint() {
  if (stage !== "playing" || currentQuestionHinted) return;
  currentQuestionHinted = true;
  elements.hintBtn.disabled = true;
  const country = questions[currentIndex].country;
  const initial = Array.from(country)[0];
  const letters = Array.from(country.replace(/\s/g, "")).length;
  elements.hintStatus.textContent = `${letters} letters · starts with “${initial}”`;
  announce(`Hint: ${country} has ${letters} letters and starts with ${initial}.`);
}

function handleAnswer(selectedCountry, timedOut) {
  if (stage !== "playing") return;
  stopTimer();
  stage = "answered";
  const question = questions[currentIndex];
  const correct = selectedCountry === question.country;

  if (correct) {
    correctAnswers++;
    currentStreak++;
    roundBestStreak = Math.max(roundBestStreak, currentStreak);
    if (currentQuestionHinted) hintedCorrectAnswers++;
  } else {
    currentStreak = 0;
  }

  Array.from(elements.options.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.country === question.country) {
      button.classList.add("opt-correct");
    } else if (button.dataset.country === selectedCountry) {
      button.classList.add("opt-wrong");
    } else {
      button.classList.add("opt-muted");
    }
  });

  const message = timedOut
    ? `Time's up! The answer was ${question.country}.`
    : correct
      ? currentQuestionHinted
        ? `That's right — ${question.city} is in ${question.country}. No point this time because you used a hint.`
        : `Exactly right — ${question.city} is in ${question.country}!`
      : `Not quite — ${question.city} is in ${question.country}.`;
  elements.answerReveal.textContent = message;
  elements.answerReveal.classList.add(correct && !timedOut ? "correct" : "incorrect");
  elements.questionPrompt.textContent = "The world is full of surprises.";
  elements.hintBtn.disabled = true;
  elements.nextBtn.hidden = false;
  elements.nextBtn.focus({ preventScroll: true });
  announce(message);
  updateStatsView();
}

function nextQuestion() {
  if (stage !== "answered") return;
  currentIndex++;
  if (currentIndex >= questions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function finishQuiz() {
  stopTimer();
  stage = "results";
  stats.gamesPlayed++;
  stats.bestStreak = Math.max(stats.bestStreak, roundBestStreak);
  if (stats.bestScore === null || getScore() > stats.bestScore) {
    stats.bestScore = getScore();
    stats.bestQuestionCount = questions.length;
  }
  persistStats();

  const accuracy = Math.round((correctAnswers / questions.length) * 100);
  elements.questionHeading.textContent =
    accuracy === 100 ? "Flawless navigation!" : accuracy >= 70 ? "World-wise work." : "Every trip teaches you something.";
  elements.quizEyebrow.textContent = "YOU MADE IT AROUND THE MAP";
  elements.questionCounter.textContent = `${correctAnswers} / ${questions.length} correct`;
  elements.questionLabel.textContent = `${selectedContinent} · round complete`;
  elements.cityName.textContent = `${getScore()} points`;
  elements.questionPrompt.textContent = `${correctAnswers} correct answers · ${accuracy}% accuracy · best streak ${roundBestStreak}`;
  elements.answerReveal.textContent = "Ready for another little adventure?";
  elements.answerReveal.className = "answer-reveal correct";
  elements.options.replaceChildren();
  elements.progressFill.style.width = "100%";
  elements.quizProgress.setAttribute("aria-valuenow", "100");
  elements.timerTrack.hidden = true;
  elements.hintBtn.disabled = true;
  elements.hintStatus.textContent = "";
  elements.startBtn.hidden = false;
  elements.startBtn.textContent = "Play again ↗";
  elements.nextBtn.hidden = true;
  elements.shareBtn.hidden = false;
  elements.questionCount.disabled = false;
  elements.difficulty.disabled = false;
  elements.timedMode.disabled = false;
  renderContinents();
  updateStatsView();
  announce(`Quiz complete. You scored ${getScore()} points with ${correctAnswers} correct answers.`);
}

function setTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  elements.themeIcon.textContent = isDark ? "☀" : "☾";
  elements.themeBtn.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#111915" : "#f5f7f4";
  if (save) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      announce("The theme changed, but this browser could not save your preference.");
    }
  }
}

function initializeTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    announce("Theme preferences are unavailable in this browser.");
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : prefersDark
      ? "dark"
      : "light";
  setTheme(theme, false);
}

function renderPreview() {
  elements.previewPanel.replaceChildren();
  elements.previewPanel.hidden = !previewOpen;
  elements.previewBtn.setAttribute("aria-expanded", String(previewOpen));
  elements.previewBtn.innerHTML = previewOpen
    ? 'Hide sample cities <span aria-hidden="true">⌃</span>'
    : 'Preview sample cities <span aria-hidden="true">⌄</span>';
  if (!previewOpen) return;

  WORLD_DATA[selectedContinent].slice(0, 5).forEach(({ city, country }) => {
    const sample = document.createElement("span");
    sample.className = "preview-city";
    sample.textContent = `${city} · ${country}`;
    elements.previewPanel.appendChild(sample);
  });
}

async function shareResults() {
  const message = `I scored ${getScore()} points in GeoWiz, with ${correctAnswers} correct answers in ${selectedContinent}. Can you beat me?`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "My GeoWiz result", text: message });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  if (!navigator.clipboard) {
    announce("Sharing and clipboard access are unavailable in this browser.");
    return;
  }
  try {
    await navigator.clipboard.writeText(message);
    announce("Your result has been copied to the clipboard.");
  } catch (error) {
    announce("Your result could not be copied. Please try sharing from your browser.");
  }
}

elements.startBtn.addEventListener("click", startQuiz);
elements.nextBtn.addEventListener("click", nextQuestion);
elements.hintBtn.addEventListener("click", useHint);
elements.previewBtn.addEventListener("click", () => {
  previewOpen = !previewOpen;
  renderPreview();
});
elements.shareBtn.addEventListener("click", shareResults);
elements.questionCount.addEventListener("change", updateReadyView);
elements.difficulty.addEventListener("change", updateReadyView);
elements.timedMode.addEventListener("change", updateReadyView);
elements.themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});
elements.resetStatsBtn.addEventListener("click", () => {
  if (!window.confirm("Reset your saved GeoWiz stats? This cannot be undone.")) return;
  stats = createEmptyStats();
  persistStats();
  updateStatsView();
  announce("Your GeoWiz stats have been reset.");
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const target = event.target;
  if (target instanceof HTMLElement && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;

  if (stage === "playing" && /^[1-5]$/.test(event.key)) {
    const option = elements.options.children[Number(event.key) - 1];
    if (option && !option.disabled) option.click();
  } else if (stage === "playing" && event.key.toLowerCase() === "h") {
    useHint();
  } else if (stage === "answered" && event.key === "Enter") {
    nextQuestion();
  }
});

elements.currentYear.textContent = String(new Date().getFullYear());
initializeTheme();
renderContinents();
renderPreview();
updateReadyView();
