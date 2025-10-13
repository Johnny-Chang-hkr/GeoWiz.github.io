/*******************************
 * GeoWiz - Vanilla JS version
 * Modern Minimalist UI
 *******************************/

// --- Embedded dataset
const WORLD_DATA = {
  Europe: [
    { city: "Paris", country: "France" },
    { city: "Berlin", country: "Germany" },
    { city: "Madrid", country: "Spain" },
    { city: "Rome", country: "Italy" },
    { city: "Lisbon", country: "Portugal" },
    { city: "Vienna", country: "Austria" },
    { city: "Warsaw", country: "Poland" },
    { city: "Dublin", country: "Ireland" },
    { city: "Prague", country: "Czechia" },
    { city: "Stockholm", country: "Sweden" },
    { city: "Amsterdam", country: "Netherlands" },
    { city: "Barcelona", country: "Spain" },
    { city: "Brussels", country: "Belgium" },
    { city: "Hamburg", country: "Germany" },
    { city: "Helsinki", country: "Finland" },
    { city: "London", country: "United Kingdom" },
    { city: "Luxembourg City", country: "Luxembourg" },
    { city: "Milan", country: "Italy" },
    { city: "Munich", country: "Germany" },
    { city: "Oslo", country: "Norway" },
    { city: "Copenhagen", country: "Denmark" },
    { city: "Athens", country: "Greece" },
    { city: "Belgrade", country: "Serbia" },
    { city: "Zagreb", country: "Croatia" },
    { city: "Sarajevo", country: "Bosnia and Herzegovina" },
    { city: "Skopje", country: "North Macedonia" },
    { city: "Podgorica", country: "Montenegro" },
    { city: "Tirana", country: "Albania" },
    { city: "Chisinau", country: "Moldova" },
    { city: "Andorra la Vella", country: "Andorra" },
    { city: "Vaduz", country: "Liechtenstein" },
    { city: "Monaco", country: "Monaco" },
    { city: "San Marino", country: "San Marino" },
    { city: "Vatican City", country: "Vatican City" },
    { city: "Saint Petersburg", country: "Russia" },
    { city: "Moscow", country: "Russia" },
    { city: "Kyiv", country: "Ukraine" },
    { city: "Sofia", country: "Bulgaria" },
    { city: "Riga", country: "Latvia" },
    { city: "Tallinn", country: "Estonia" },
    { city: "Vilnius", country: "Lithuania" },
    { city: "Zurich", country: "Switzerland" },
    { city: "Valencia", country: "Spain" },
    { city: "Naples", country: "Italy" },
    { city: "Venice", country: "Italy" },
  ],
  Asia: [
    { city: "Tokyo", country: "Japan" },
    { city: "Kyoto", country: "Japan" },
    { city: "Osaka", country: "Japan" },
    { city: "Beijing", country: "China" },
    { city: "Shanghai", country: "China" },
    { city: "Guangzhou", country: "China" },
    { city: "Hong Kong", country: "China" },
    { city: "Seoul", country: "South Korea" },
    { city: "Busan", country: "South Korea" },
    { city: "Incheon", country: "South Korea" },
    { city: "Pyongyang", country: "North Korea" },
    { city: "New Delhi", country: "India" },
    { city: "Mumbai", country: "India" },
    { city: "Bangalore", country: "India" },
    { city: "Kolkata", country: "India" },
    { city: "Chennai", country: "India" },
    { city: "Dhaka", country: "Bangladesh" },
    { city: "Chittagong", country: "Bangladesh" },
    { city: "Islamabad", country: "Pakistan" },
    { city: "Karachi", country: "Pakistan" },
    { city: "Lahore", country: "Pakistan" },
    { city: "Islamabad", country: "Pakistan" },
    { city: "Kathmandu", country: "Nepal" },
    { city: "Thimphu", country: "Bhutan" },
    { city: "Male", country: "Maldives" },
    { city: "Colombo", country: "Sri Lanka" },
    { city: "Singapore", country: "Singapore" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "George Town", country: "Malaysia" },
    { city: "Bangkok", country: "Thailand" },
    { city: "Chiang Mai", country: "Thailand" },
    { city: "Phnom Penh", country: "Cambodia" },
    { city: "Siem Reap", country: "Cambodia" },
    { city: "Hanoi", country: "Vietnam" },
    { city: "Ho Chi Minh City", country: "Vietnam" },
    { city: "Jakarta", country: "Indonesia" },
    { city: "Bali", country: "Indonesia" },
    { city: "Manila", country: "Philippines" },
    { city: "Cebu", country: "Philippines" },
    { city: "Tehran", country: "Iran" },
    { city: "Mashhad", country: "Iran" },
    { city: "Baghdad", country: "Iraq" },
    { city: "Basra", country: "Iraq" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Doha", country: "Qatar" },
    { city: "Muscat", country: "Oman" },
    { city: "Amman", country: "Jordan" },
    { city: "Beirut", country: "Lebanon" },
    { city: "Damascus", country: "Syria" },
    { city: "Homs", country: "Syria" },
    { city: "Baghdad", country: "Iraq" },
    { city: "Ankara", country: "Turkey" },
    { city: "Istanbul", country: "Turkey" },
    { city: "Tbilisi", country: "Georgia" },
    { city: "Yerevan", country: "Armenia" },
    { city: "Baku", country: "Azerbaijan" },
    { city: "Ashgabat", country: "Turkmenistan" },
    { city: "Tashkent", country: "Uzbekistan" },
    { city: "Bishkek", country: "Kyrgyzstan" },
    { city: "Dushanbe", country: "Tajikistan" },
    { city: "Nur-Sultan", country: "Kazakhstan" },
    { city: "Almaty", country: "Kazakhstan" },
    { city: "Helsinki", country: "Finland" },
  ],
  Africa: [
    { city: "Cairo", country: "Egypt" },
    { city: "Alexandria", country: "Egypt" },
    { city: "Casablanca", country: "Morocco" },
    { city: "Rabat", country: "Morocco" },
    { city: "Marrakesh", country: "Morocco" },
    { city: "Tunis", country: "Tunisia" },
    { city: "Algiers", country: "Algeria" },
    { city: "Oran", country: "Algeria" },
    { city: "Tripoli", country: "Libya" },
    { city: "Nairobi", country: "Kenya" },
    { city: "Mombasa", country: "Kenya" },
    { city: "Lagos", country: "Nigeria" },
    { city: "Abuja", country: "Nigeria" },
    { city: "Kano", country: "Nigeria" },
    { city: "Accra", country: "Ghana" },
    { city: "Kumasi", country: "Ghana" },
    { city: "Addis Ababa", country: "Ethiopia" },
    { city: "Dar es Salaam", country: "Tanzania" },
    { city: "Dodoma", country: "Tanzania" },
    { city: "Cape Town", country: "South Africa" },
    { city: "Johannesburg", country: "South Africa" },
    { city: "Pretoria", country: "South Africa" },
    { city: "Durban", country: "South Africa" },
    { city: "Lusaka", country: "Zambia" },
    { city: "Harare", country: "Zimbabwe" },
    { city: "Kampala", country: "Uganda" },
    { city: "Kigali", country: "Rwanda" },
    { city: "Bujumbura", country: "Burundi" },
    { city: "Khartoum", country: "Sudan" },
    { city: "Juba", country: "South Sudan" },
    { city: "Libreville", country: "Gabon" },
    { city: "Brazzaville", country: "Republic of the Congo" },
    { city: "Kinshasa", country: "Democratic Republic of the Congo" },
    { city: "Dakar", country: "Senegal" },
    { city: "Bamako", country: "Mali" },
    { city: "Niamey", country: "Niger" },
    { city: "Ouagadougou", country: "Burkina Faso" },
    { city: "Monrovia", country: "Liberia" },
    { city: "Freetown", country: "Sierra Leone" },
    { city: "Conakry", country: "Guinea" },
    { city: "Bissau", country: "Guinea-Bissau" },
    { city: "Cotonou", country: "Benin" },
    { city: "Porto-Novo", country: "Benin" },
    { city: "Lomé", country: "Togo" },
    { city: "Windhoek", country: "Namibia" },
    { city: "Gaborone", country: "Botswana" },
    { city: "Maputo", country: "Mozambique" },
    { city: "Antananarivo", country: "Madagascar" },
    { city: "Malabo", country: "Equatorial Guinea" },
    { city: "Maseru", country: "Lesotho" },
    { city: "Mbabane", country: "Eswatini" },
    { city: "Moroni", country: "Comoros" },
    { city: "Victoria", country: "Seychelles" },
    { city: "Praia", country: "Cape Verde" },
    { city: "Tripoli", country: "Libya" },
    { city: "Tunis", country: "Tunisia" },
    { city: "Algiers", country: "Algeria" },
    { city: "Asmara", country: "Eritrea" },
    { city: "Mogadishu", country: "Somalia" },
    { city: "Djibouti", country: "Djibouti" },
    { city: "Nouakchott", country: "Mauritania" },
    { city: "Port Louis", country: "Mauritius" },
    { city: "São Tomé", country: "Sao Tome and Principe" },
  ],
  "North America": [
    { city: "Washington, D.C.", country: "United States" },
    { city: "New York City", country: "United States" },
    { city: "Los Angeles", country: "United States" },
    { city: "Chicago", country: "United States" },
    { city: "Houston", country: "United States" },
    { city: "Toronto", country: "Canada" },
    { city: "Montreal", country: "Canada" },
    { city: "Vancouver", country: "Canada" },
    { city: "Ottawa", country: "Canada" },
    { city: "Calgary", country: "Canada" },
    { city: "Mexico City", country: "Mexico" },
    { city: "Guadalajara", country: "Mexico" },
    { city: "Monterrey", country: "Mexico" },
    { city: "Cancún", country: "Mexico" },
    { city: "Havana", country: "Cuba" },
    { city: "Santiago de Cuba", country: "Cuba" },
    { city: "Kingston", country: "Jamaica" },
    { city: "Montego Bay", country: "Jamaica" },
    { city: "Nassau", country: "Bahamas" },
    { city: "Haiti", country: "Port-au-Prince" },
    { city: "San Salvador", country: "El Salvador" },
    { city: "Managua", country: "Nicaragua" },
    { city: "Tegucigalpa", country: "Honduras" },
    { city: "Belmopan", country: "Belize" },
    { city: "Panama City", country: "Panama" },
    { city: "Kingston", country: "Jamaica" },
    { city: "Bridgetown", country: "Barbados" },
    { city: "Roseau", country: "Dominica" },
    { city: "Castries", country: "Saint Lucia" },
    { city: "Saint John's", country: "Antigua and Barbuda" },
    { city: "Saint George's", country: "Grenada" },
    { city: "Basseterre", country: "Saint Kitts and Nevis" },
    { city: "Port of Spain", country: "Trinidad and Tobago" },
    { city: "Kingstown", country: "Saint Vincent and the Grenadines" },
    { city: "Gustavia", country: "Saint Barthelemy" },
    { city: "Marigot", country: "Saint Martin" },
  ],
  "South America": [
    { city: "Buenos Aires", country: "Argentina" },
    { city: "Córdoba", country: "Argentina" },
    { city: "Rosario", country: "Argentina" },
    { city: "La Paz", country: "Bolivia" },
    { city: "Santa Cruz de la Sierra", country: "Bolivia" },
    { city: "Sucre", country: "Bolivia" },
    { city: "Brasília", country: "Brazil" },
    { city: "São Paulo", country: "Brazil" },
    { city: "Rio de Janeiro", country: "Brazil" },
    { city: "Salvador", country: "Brazil" },
    { city: "Fortaleza", country: "Brazil" },
    { city: "Santiago", country: "Chile" },
    { city: "Valparaíso", country: "Chile" },
    { city: "Concepción", country: "Chile" },
    { city: "Bogotá", country: "Colombia" },
    { city: "Medellín", country: "Colombia" },
    { city: "Cali", country: "Colombia" },
    { city: "Quito", country: "Ecuador" },
    { city: "Guayaquil", country: "Ecuador" },
    { city: "Lima", country: "Peru" },
    { city: "Arequipa", country: "Peru" },
    { city: "Cusco", country: "Peru" },
    { city: "Asunción", country: "Paraguay" },
    { city: "Montevideo", country: "Uruguay" },
    { city: "Caracas", country: "Venezuela" },
    { city: "Maracaibo", country: "Venezuela" },
    { city: "Georgetown", country: "Guyana" },
    { city: "Paramaribo", country: "Suriname" },
    { city: "Cayenne", country: "French Guiana" },
    { city: "Port of Spain", country: "Trinidad and Tobago" },
  ],
  Oceania: [
    // Australia
    { city: "Sydney", country: "Australia" },
    { city: "Melbourne", country: "Australia" },
    { city: "Brisbane", country: "Australia" },
    { city: "Perth", country: "Australia" },
    { city: "Adelaide", country: "Australia" },
    { city: "Canberra", country: "Australia" },
    { city: "Hobart", country: "Australia" },
    { city: "Darwin", country: "Australia" },

    // New Zealand
    { city: "Auckland", country: "New Zealand" },
    { city: "Wellington", country: "New Zealand" },
    { city: "Christchurch", country: "New Zealand" },
    { city: "Hamilton", country: "New Zealand" },
    { city: "Dunedin", country: "New Zealand" },

    // Papua New Guinea
    { city: "Port Moresby", country: "Papua New Guinea" },
    { city: "Lae", country: "Papua New Guinea" },

    // Fiji
    { city: "Suva", country: "Fiji" },
    { city: "Nadi", country: "Fiji" },

    // Solomon Islands
    { city: "Honiara", country: "Solomon Islands" },

    // Vanuatu
    { city: "Port Vila", country: "Vanuatu" },

    // Samoa
    { city: "Apia", country: "Samoa" },

    // Tonga
    { city: "Nukuʻalofa", country: "Tonga" },

    // Micronesia
    { city: "Palikir", country: "Federated States of Micronesia" },

    // Palau
    { city: "Ngerulmud", country: "Palau" },

    // Marshall Islands
    { city: "Majuro", country: "Marshall Islands" },

    // Kiribati
    { city: "South Tarawa", country: "Kiribati" },

    // Nauru
    { city: "Yaren", country: "Nauru" },

    // Tuvalu
    { city: "Funafuti", country: "Tuvalu" },

    // New Caledonia (France)
    { city: "Nouméa", country: "New Caledonia" },

    // French Polynesia (France)
    { city: "Papeete", country: "French Polynesia" },
  ],
};

// --- utility
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uniq(arr) {
  return Array.from(new Set(arr));
}

// UI refs
const continentGrid = document.getElementById("continentGrid");
const startBtn = document.getElementById("startBtn");
const previewBtn = document.getElementById("previewBtn");
const resetBtn = document.getElementById("resetBtn");
const cityNameEl = document.getElementById("cityName");
const cityHintEl = document.getElementById("cityHint");
const optionsEl = document.getElementById("options");
const cardInner = document.getElementById("cardInner");
const backCountry = document.getElementById("backCountry");
const uiScore = document.getElementById("ui-score");
const uiLevel = document.getElementById("ui-level");

const scoreBox = document.getElementById("scoreBox");
const streakBox = document.getElementById("streakBox");
const levelBox = document.getElementById("levelBox");
const remainingBox = document.getElementById("remainingBox");
const qMeta = document.getElementById("q-meta");

const nextBtn = document.getElementById("nextBtn");
const quitBtn = document.getElementById("quitBtn");
const shareBtn = document.getElementById("shareBtn");
const againBtn = document.getElementById("againBtn");
const summaryText = document.getElementById("summaryText");

// state
let selectedContinent = Object.keys(WORLD_DATA)[0];
let questionList = [];
let index = 0;
let score = 0;
let streak = 0;
let level = 1;
const QUESTIONS_PER_LEVEL = 5;
let canAnswer = true;
let totalAllowed = QUESTIONS_PER_LEVEL * 5; // 5 levels max
let stage = "start"; // start|quiz|results
let guessedCities = [];

// populate continent picker
function renderContinents() {
  continentGrid.innerHTML = "";
  Object.keys(WORLD_DATA).forEach((c) => {
    const btn = document.createElement("button");
    btn.className =
      "continent-btn" + (c === selectedContinent ? " active" : "");
    btn.innerHTML =
      '<div class="continent-name">' +
      c +
      '</div><div class="continent-count">' +
      WORLD_DATA[c].length +
      " cities</div>";
    btn.onclick = () => {
      selectedContinent = c;
      renderContinents();
    };
    continentGrid.appendChild(btn);
  });
}

function buildQuestionsFor(cont) {
  const pool = (WORLD_DATA[cont] || []).slice();
  let list = shuffle(pool).filter((q) => !guessedCities.includes(q.city));

  // ensure enough questions
  while (list.length < totalAllowed) {
    const extra = shuffle(pool).filter((q) => !guessedCities.includes(q.city));
    list = list.concat(extra);
    if (list.length > 200) break;
  }

  return shuffle(list).slice(0, totalAllowed);
}

function startQuiz() {
  guessedCities = []; // reset for new quiz
  questionList = buildQuestionsFor(selectedContinent);
  index = 0;
  score = 0;
  streak = 0;
  level = 1;
  canAnswer = true;
  stage = "quiz";
  updateUI();
  showQuestion();
}

function updateUI() {
  uiScore.textContent = score;
  uiLevel.textContent = level;
  scoreBox.textContent = score;
  streakBox.textContent = streak;
  levelBox.textContent = level;
  remainingBox.textContent = Math.max(
    0,
    Math.min(totalAllowed - index, QUESTIONS_PER_LEVEL)
  );
  qMeta.textContent = `Level ${level} • Q ${(index % QUESTIONS_PER_LEVEL) + 1}`;
}

function pickOptions(correctCountry, poolCountries, count = 3) {
  const wrong = poolCountries.filter((c) => c !== correctCountry);
  const chosen = shuffle(wrong).slice(0, count);
  chosen.push(correctCountry);
  return shuffle(chosen);
}

function showQuestion() {
  canAnswer = true;
  const current = questionList[index];
  if (!current) {
    // no question
    stage = "results";
    showResults();
    return;
  }

  // set card front/back
  cityNameEl.textContent = current.city;
  cityHintEl.textContent = selectedContinent;
  backCountry.textContent = current.country;
  cardInner.classList.remove("flipped");

  // build options from pool countries
  const poolCountries = uniq(questionList.map((q) => q.country));
  const opts = pickOptions(current.country, poolCountries, 3);

  // render options
  optionsEl.innerHTML = "";
  opts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      handleAnswer(opt, btn);
    };
    optionsEl.appendChild(btn);
  });

  updateUI();
}

function handleAnswer(selectedCountry, btnEl) {
  if (!canAnswer) return;
  canAnswer = false;

  const current = questionList[index];

  // ✅ mark this city as guessed
  guessedCities.push(current.city);

  const correct = selectedCountry === current.country;

  // flip card
  setTimeout(() => cardInner.classList.add("flipped"), 80);

  // show result styles
  Array.from(optionsEl.children).forEach((b) => {
    b.disabled = true;
    if (b.textContent === current.country) b.classList.add("opt-correct");
    if (b.textContent === selectedCountry && !correct)
      b.classList.add("opt-wrong");
  });

  // update metrics
  if (correct) {
    score++;
    streak++;
  } else {
    streak = 0;
  }

  updateUI();

  // advance after short delay
  setTimeout(() => {
    index++;
    // calculate next level
    const nextLevel = Math.floor(index / QUESTIONS_PER_LEVEL) + 1;
    level = nextLevel;

    // regenerate questions while skipping guessed cities
    questionList = questionList.filter((q) => !guessedCities.includes(q.city));

    if (index >= totalAllowed || questionList.length === 0) {
      stage = "results";
      showResults();
    } else {
      showQuestion();
    }
  }, 900);
}

function showResults() {
  // flip to back to reveal last (if any)
  cardInner.classList.remove("flipped");
  summaryText.textContent = `You scored ${score} points. Streak ${streak}. Level reached ${level}.`;
  // quick confetti placeholder: subtle effect
  // (We keep it minimal to preserve Apple-style)
  stage = "results";
  updateUI();
}

// controls
startBtn.addEventListener("click", startQuiz);
previewBtn.addEventListener("click", () => {
  const preview = (WORLD_DATA[selectedContinent] || [])
    .slice(0, 5)
    .map((x) => x.city + " (" + x.country + ")")
    .join(", ");
  alert("Preview — sample cities:\\n" + preview);
});
resetBtn.addEventListener("click", () => {
  selectedContinent = Object.keys(WORLD_DATA)[0];
  renderContinents();
  stage = "start";
});

nextBtn.addEventListener("click", () => {
  if (stage === "start") {
    startQuiz();
    return;
  }
  if (stage === "quiz") {
    index++;
    if (index >= questionList.length) {
      stage = "results";
      showResults();
    } else showQuestion();
  }
});

quitBtn.addEventListener("click", () => {
  stage = "start";
  questionList = [];
  index = 0;
  score = 0;
  streak = 0;
  level = 1;
  updateUI();
  alert("Quiz cancelled — back to continent selection.");
});

shareBtn.addEventListener("click", () => {
  const shareText = `I scored ${score} points in GeoWiz (level ${level}). Try the GeoWiz geography quiz!`;
  if (navigator.share) {
    navigator.share({ title: "GeoWiz score", text: shareText }).catch(() => {
      navigator.clipboard.writeText(shareText);
      alert("Summary copied to clipboard");
    });
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Summary copied to clipboard");
  }
});

againBtn.addEventListener("click", () => {
  startQuiz();
});

// init
renderContinents();
updateUI();

// accessibility: keyboard support
document.addEventListener("keydown", (e) => {
  if (stage !== "quiz") return;
  if (e.key === "ArrowRight" || e.key === " ") {
    // try to automatically click first enabled option
    const first = Array.from(optionsEl.children).find((b) => !b.disabled);
    if (first) first.click();
  }
});

