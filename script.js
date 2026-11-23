/* =========================================
   TIK TK - BEAT THE CLOCK!
   DAY PLANNER GAME
========================================= */

/* AUDIO */

const audioFiles = {
  music: "./music.mp3",
  correct: "./correct.mp3",
  wrong: "./wrong.mp3",
  click: "./click.mp3",
  victory: "./victory.mp3"
};

const sounds = {};

for (const key in audioFiles) {
  sounds[key] = new Audio(audioFiles[key]);
  sounds[key].preload = "auto";
}

sounds.music.loop = true;
sounds.music.volume = 0.18;

sounds.correct.volume = 0.75;
sounds.wrong.volume = 0.65;
sounds.click.volume = 0.4;
sounds.victory.volume = 0.8;

let soundEnabled = true;
let musicStarted = false;

function playSound(name) {
  if (!soundEnabled || !sounds[name]) return;

  try {
    const audio = sounds[name];

    audio.pause();
    audio.currentTime = 0;

    audio.play().catch(() => {});
  } catch (error) {
    console.log("Sound unavailable.");
  }
}

function startMusic() {
  if (!soundEnabled || musicStarted) return;

  sounds.music.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      musicStarted = false;
    });
}

function stopMusic() {
  sounds.music.pause();

  try {
    sounds.music.currentTime = 0;
  } catch (error) {}

  musicStarted = false;
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  document.getElementById("sound-icon").textContent =
    soundEnabled ? "🔊" : "🔇";

  document.getElementById("sound-label").textContent =
    soundEnabled ? "الصوت شغال" : "الصوت مقفول";

  if (soundEnabled) {
    startMusic();
    playSound("click");
  } else {
    for (const key in sounds) {
      sounds[key].pause();
    }

    musicStarted = false;
  }
}

document.getElementById("sound-toggle")
  .addEventListener("click", toggleSound);


/* =========================================
   FLOATING HOURS
========================================= */

function createHours() {
  const container = document.getElementById("floating-hours");

  if (!container) return;

  for (let i = 0; i < 24; i++) {
    const hour = document.createElement("span");

    hour.className = "floating-hour";
    hour.textContent = i + 1;

    hour.style.left = Math.random() * 100 + "%";
    hour.style.animationDuration =
      (15 + Math.random() * 25) + "s";

    hour.style.animationDelay =
      (-Math.random() * 30) + "s";

    hour.style.fontSize =
      (12 + Math.random() * 25) + "px";

    container.appendChild(hour);
  }
}

createHours();


/* =========================================
   TASK LIBRARY
========================================= */

const taskLibrary = [
  {
    id: "study",
    name: "مذاكرة فصل",
    emoji: "📚",
    duration: 60,
    energy: -15,
    stars: 20,
    description: "ركز في مذاكرة الفصل وحاول تخلص الجزء المطلوب.",
    category: "تعلم",
    message: "أحسنت! خطوة صغيرة في المذاكرة بتفرق."
  },

  {
    id: "homework",
    name: "حل الواجب",
    emoji: "✏️",
    duration: 40,
    energy: -12,
    stars: 15,
    description: "حل الواجب المطلوب منك وراجع إجاباتك.",
    category: "تعلم",
    message: "واجب خلص! كده بتقرب من أهدافك."
  },

  {
    id: "room",
    name: "ترتيب الأوضة",
    emoji: "🧹",
    duration: 20,
    energy: -8,
    stars: 10,
    description: "رتب مكانك وخليه جاهز ليوم أحسن.",
    category: "مسؤولية",
    message: "مكان مرتب.. دماغ أهدى!"
  },

  {
    id: "help",
    name: "مساعدة في البيت",
    emoji: "🏠",
    duration: 30,
    energy: -10,
    stars: 15,
    description: "شارك في مسؤوليات البيت وساعد اللي حواليك.",
    category: "مسؤولية",
    message: "مساعدتك بتفرق.. شكرًا ليك!"
  },

  {
    id: "friends",
    name: "وقت مع صحابك",
    emoji: "👫",
    duration: 45,
    energy: 5,
    stars: 15,
    description: "استمتع بوقت حلو مع صحابك.",
    category: "متعة",
    message: "الوقت الحلو مع الناس اللي بنحبهم مهم."
  },

  {
    id: "hobby",
    name: "ممارسة هواية",
    emoji: "🎨",
    duration: 30,
    energy: 8,
    stars: 15,
    description: "خصص وقت لحاجة بتحب تعملها.",
    category: "متعة",
    message: "هوايتك مساحة ليك.. استمتع بيها!"
  },

  {
    id: "rest",
    name: "استراحة",
    emoji: "☕",
    duration: 30,
    energy: 20,
    stars: 10,
    description: "خد استراحة حقيقية بعيد عن ضغط المهام.",
    category: "راحة",
    message: "الراحة مش تضييع وقت.. دي جزء من خطتك!"
  },

  {
    id: "exercise",
    name: "حركة ونشاط",
    emoji: "🏃",
    duration: 30,
    energy: -5,
    stars: 15,
    description: "حرك جسمك شوية وارجع بطاقة مختلفة.",
    category: "صحة",
    message: "الحركة بتساعدك تجدد نشاطك!"
  },

  {
    id: "phone",
    name: "وقت للموبايل",
    emoji: "📱",
    duration: 30,
    energy: 0,
    stars: 5,
    description: "خصص وقت للموبايل بدل ما الوقت يتسحب منك.",
    category: "متعة",
    message: "لما تحدد وقت للموبايل، أنت اللي بتتحكم!"
  }
];


/* =========================================
   GAME EVENTS
========================================= */

const gameEvents = [
  {
    id: "message",
    threshold: 2,
    emoji: "📱",
    title: "رسالة مفاجئة!",
    description:
      "صاحبك بعتلك: «يلا نلعب! مستنيك».. بس عندك مهام لسه! هتعمل إيه؟",

    options: [
      {
        text: "أرد عليه وأحدد وقت نلعب فيه بعد ما أخلص المهمة الحالية.",
        description: "تواصل من غير ما تسيب خطتك تتلخبط.",
        time: 5,
        energy: 0,
        stars: 10,
        message: "عرفت تحافظ على التواصل وعلى خطتك في نفس الوقت!"
      },

      {
        text: "أسيب كل حاجة وأدخل ألعب معاه.",
        description: "ممكن وقت اللعب يطول ويأثر على باقي يومك.",
        time: 30,
        energy: 5,
        stars: 2,
        message: "استمتعت، لكن خلي بالك من الوقت عشان باقي المهام."
      },

      {
        text: "أقفل الإشعارات وأكمل، وأرد عليه في وقت مناسب.",
        description: "تأجل الرد عشان تحافظ على تركيزك.",
        time: 0,
        energy: 0,
        stars: 15,
        message: "قرار ذكي! مش كل رسالة لازم نرد عليها فورًا."
      }
    ]
  },

  {
    id: "help",
    threshold: 4,
    emoji: "🏠",
    title: "طلب مساعدة!",
    description:
      "حد من البيت طلب منك تساعده في حاجة محتاجة حوالي 20 دقيقة.. وخطتك مش فاضية! هتتصرف إزاي؟",

    options: [
      {
        text: "أساعده وأراجع خطتي بعدها.",
        description: "تضيف الموقف لليوم وتعيد ترتيب باقي المهام.",
        time: 20,
        energy: -5,
        stars: 15,
        message: "مرونة ممتازة! خطتك قابلة للتعديل."
      },

      {
        text: "أعتذر وأوضح إني مشغول، وأحدد وقت أساعد فيه.",
        description: "تواصل واضح مع مراعاة مسؤولياتك.",
        time: 5,
        energy: 0,
        stars: 10,
        message: "التواصل وتحديد وقت مناسب بيساعدك توازن مسؤولياتك."
      },

      {
        text: "أحاول أخلص كل حاجة بسرعة وأساعد من غير ما أرتب.",
        description: "ممكن تعمل حاجات كتير بس تتعب أو تتلخبط.",
        time: 25,
        energy: -10,
        stars: 5,
        message: "خد بالك! أحيانًا السرعة من غير تنظيم بتزود الضغط."
      }
    ]
  },

  {
    id: "distraction",
    threshold: 6,
    emoji: "🎮",
    title: "لص الوقت!",
    description:
      "وأنت شغال، ظهر فيديو جديد وعروض وإشعارات.. وبدأت تحس إنك عايز تسيب المهمة! إيه الحل؟",

    options: [
      {
        text: "أقفل الإشعارات وأكمل المهمة وبعدها أخصص وقت للموبايل.",
        description: "تحمي وقت تركيزك وتحدد وقت للترفيه.",
        time: 0,
        energy: 5,
        stars: 15,
        message: "قدرت تتحكم في وقتك بدل ما الوقت يتحكم فيك!"
      },

      {
        text: "أشوف فيديو واحد بس.",
        description: "ممكن يخلص بسرعة، وممكن يفتح باب لمشتتات تانية.",
        time: 10,
        energy: -3,
        stars: 5,
        message: "الفيديو ممكن يطول.. حاول تحدد وقت واضح."
      },

      {
        text: "أسيب المهمة وأكمل تصفح.",
        description: "الوقت ممكن يضيع من غير ما تحس.",
        time: 20,
        energy: -5,
        stars: 0,
        message: "خلي بالك من الوقت! التصفح المفتوح بيستهلك وقت أكتر مما تتوقع."
      }
    ]
  }
];


/* =========================================
   GAME STATE
========================================= */

let selectedTasks = [];

let completedTasks = [];
let currentTaskIndex = 0;

let totalStars = 0;
let energy = 100;

let currentMinutes = 8 * 60;
let totalGameMinutes = 0;

let eventQueue = [];
let eventPending = false;
let currentEvent = null;

let taskTimer = null;
let taskRunning = false;
let taskElapsed = 0;

const MAX_DAY_MINUTES = 14 * 60;
const SIMULATION_SPEED = 75;

let eventCount = 0;


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function goHome() {
  playSound("click");

  stopTaskTimer();

  showScreen("home-screen");
}

function restartGame() {
  playSound("click");

  stopTaskTimer();

  selectedTasks = [];
  completedTasks = [];

  totalStars = 0;
  energy = 100;

  currentMinutes = 8 * 60;
  totalGameMinutes = 0;

  eventQueue = [];
  eventPending = false;
  currentEvent = null;

  currentTaskIndex = 0;
  taskElapsed = 0;
  eventCount = 0;

  openPlanner();
}


/* =========================================
   PLANNER
========================================= */

function openPlanner() {
  playSound("click");

  selectedTasks = [];

  renderTaskLibrary();
  updatePlanner();

  showScreen("planner-screen");
}

function renderTaskLibrary() {
  const container = document.getElementById("task-library");

  container.innerHTML = "";

  taskLibrary.forEach(task => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "task-option";

    const isSelected = selectedTasks.some(
      item => item.id === task.id
    );

    if (isSelected) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="task-icon">${task.emoji}</span>

      <span class="task-info">
        <strong>${task.name}</strong>
        <small>${task.duration} دقيقة • ${task.category}</small>
      </span>

      <span class="task-add-indicator">
        ${isSelected ? "✓" : "+"}
      </span>
    `;

    button.addEventListener("click", () => {
      toggleTask(task.id);
    });

    container.appendChild(button);
  });
}

function toggleTask(taskId) {
  playSound("click");

  const task = taskLibrary.find(
    item => item.id === taskId
  );

  if (!task) return;

  const existingIndex = selectedTasks.findIndex(
    item => item.id === taskId
  );

  if (existingIndex !== -1) {
    selectedTasks.splice(existingIndex, 1);
  } else {
    const proposedTime =
      selectedTasks.reduce(
        (total, item) => total + item.duration,
        0
      ) + task.duration;

    if (proposedTime > MAX_DAY_MINUTES) {
      document.getElementById("plan-warning").textContent =
        "مش هينفع نضيف المهمة دي لأن الوقت المتاح في يومك خلص! حاول تختار أو ترتب مهامك من جديد.";

      document.getElementById("plan-warning")
        .classList.add("warning");

      playSound("wrong");
      return;
    }

    selectedTasks.push(task);
  }

  renderTaskLibrary();
  updatePlanner();
}

function updatePlanner() {
  const container = document.getElementById("selected-tasks");
  const empty = document.getElementById("empty-plan");

  container.innerHTML = "";

  const totalTime = selectedTasks.reduce(
    (total, task) => total + task.duration,
    0
  );

  document.getElementById("plan-count").textContent =
    selectedTasks.length + " مهام";

  document.getElementById("plan-time").textContent =
    formatDuration(totalTime);

  const percent = Math.min(
    100,
    (totalTime / MAX_DAY_MINUTES) * 100
  );

  document.getElementById("plan-time-fill").style.width =
    percent + "%";

  const warning = document.getElementById("plan-warning");

  warning.classList.remove("warning");

  if (selectedTasks.length === 0) {
    warning.textContent =
      "اختار المهام اللي حابب تنجزها النهارده.";
  } else if (totalTime > MAX_DAY_MINUTES) {
    warning.textContent =
      "الوقت أكتر من الوقت المتاح!";
    warning.classList.add("warning");
  } else {
    warning.textContent =
      "تمام! خطتك لسه في حدود الوقت المتاح. تقدر تعدلها في أي وقت.";
  }

  empty.classList.toggle(
    "hidden",
    selectedTasks.length !== 0
  );

  selectedTasks.forEach((task, index) => {
    const item = document.createElement("div");

    item.className = "selected-task";

    item.innerHTML = `
      <span class="selected-icon">${task.emoji}</span>

      <span class="selected-info">
        <strong>${task.name}</strong>
        <small>${task.duration} دقيقة</small>
      </span>

      <div class="task-order-controls">

        <button
          class="order-button"
          title="تحريك لأعلى"
          ${index === 0 ? "disabled" : ""}
        >↑</button>

        <button
          class="order-button"
          title="تحريك لأسفل"
          ${index === selectedTasks.length - 1 ? "disabled" : ""}
        >↓</button>

        <button
          class="remove-button"
          title="حذف المهمة"
        >×</button>

      </div>
    `;

    const buttons = item.querySelectorAll("button");

    buttons[0].addEventListener("click", () => {
      moveTask(index, -1);
    });

    buttons[1].addEventListener("click", () => {
      moveTask(index, 1);
    });

    buttons[2].addEventListener("click", () => {
      toggleTask(task.id);
    });

    container.appendChild(item);
  });

  document.getElementById("start-day-button").disabled =
    selectedTasks.length === 0 ||
    totalTime > MAX_DAY_MINUTES;
}

function moveTask(index, direction) {
  playSound("click");

  const newIndex = index + direction;

  if (
    newIndex < 0 ||
    newIndex >= selectedTasks.length
  ) {
    return;
  }

  const temp = selectedTasks[index];

  selectedTasks[index] =
    selectedTasks[newIndex];

  selectedTasks[newIndex] = temp;

  updatePlanner();
}


/* =========================================
   START DAY
========================================= */

function startDay() {
  if (selectedTasks.length === 0) {
    return;
  }

  playSound("click");
  startMusic();

  completedTasks = [];

  currentTaskIndex = 0;

  totalStars = 0;
  energy = 100;

  currentMinutes = 8 * 60;
  totalGameMinutes = 0;

  eventPending = false;
  currentEvent = null;

  taskElapsed = 0;
  eventCount = 0;

  eventQueue = [];

  const totalTasks = selectedTasks.length;

  if (totalTasks >= 2) {
    eventQueue.push({
      id: "message",
      threshold: 2
    });
  }

  if (totalTasks >= 4) {
    eventQueue.push({
      id: "help",
      threshold: 4
    });
  }

  if (totalTasks >= 6) {
    eventQueue.push({
      id: "distraction",
      threshold: 6
    });
  }

  updateEnergy();
  renderDayTasks();

  updateDayProgress();

  showScreen("play-screen");

  loadCurrentTask();
}


/* =========================================
   TASK RENDERING
========================================= */

function loadCurrentTask() {
  stopTaskTimer();

  taskElapsed = 0;

  if (currentTaskIndex >= selectedTasks.length) {
    finishDay();
    return;
  }

  const task = selectedTasks[currentTaskIndex];

  document.getElementById("current-task-emoji").textContent =
    task.emoji;

  document.getElementById("current-task-name").textContent =
    task.name;

  document.getElementById("current-task-description").textContent =
    task.description;

  document.getElementById("current-task-duration").textContent =
    task.duration + " دقيقة";

  document.getElementById("task-progress-bar").style.width =
    "0%";

  document.getElementById("task-progress-text").textContent =
    "جاهز؟ اضغط وابدأ!";

  document.getElementById("task-action-button").classList.remove("hidden");

  document.getElementById("pause-button").classList.add("hidden");
  document.getElementById("resume-button").classList.add("hidden");

  document.getElementById("task-action-button").disabled = false;

  document.getElementById("character-message").textContent =
    "يلا نبدأ! كل مهمة بتقربك من نهاية يومك.";

  renderDayTasks();

  updateClock();
  updateDayProgress();

  showScreen("play-screen");
}

function renderDayTasks() {
  const container = document.getElementById("day-task-list");

  container.innerHTML = "";

  selectedTasks.forEach((task, index) => {
    const item = document.createElement("div");

    item.className = "day-task-item";

    if (index < currentTaskIndex) {
      item.classList.add("done");
    } else if (index === currentTaskIndex) {
      item.classList.add("current");
    }

    const status =
      index < currentTaskIndex
        ? "✓ خلصت"
        : index === currentTaskIndex
        ? "⏳ جاري"
        : "⌛ بعدين";

    item.innerHTML = `
      <span class="task-list-icon">${task.emoji}</span>

      <span class="task-list-info">
        <strong>${task.name}</strong>
        <small>${task.duration} دقيقة</small>
      </span>

      <span class="task-list-status">${status}</span>
    `;

    container.appendChild(item);
  });

  document.getElementById("day-task-counter").textContent =
    currentTaskIndex + " / " + selectedTasks.length;

  document.getElementById("game-stars").textContent =
    totalStars;
}


/* =========================================
   TASK EXECUTION
========================================= */

function beginTask() {
  if (taskRunning) return;

  playSound("click");

  taskRunning = true;

  document.getElementById("task-action-button").classList.add("hidden");

  document.getElementById("pause-button").classList.remove("hidden");
  document.getElementById("resume-button").classList.add("hidden");

  document.getElementById("character-message").textContent =
    "ركز.. أنت تقدر تخلص المهمة دي! 💪";

  const task = selectedTasks[currentTaskIndex];

  taskTimer = setInterval(() => {
    taskElapsed++;

    const percent = Math.min(
      100,
      (taskElapsed / task.duration) * 100
    );

    document.getElementById("task-progress-bar").style.width =
      percent + "%";

    document.getElementById("task-progress-text").textContent =
      Math.round(percent) + "% خلصت المهمة";

    if (taskElapsed >= task.duration) {
      completeTask();
    }
  }, SIMULATION_SPEED);
}

function pauseTask() {
  if (!taskRunning) return;

  playSound("click");

  stopTaskTimer();

  document.getElementById("pause-button").classList.add("hidden");
  document.getElementById("resume-button").classList.remove("hidden");

  document.getElementById("task-progress-text").textContent =
    "المهمة متوقفة مؤقتًا.";

  document.getElementById("character-message").textContent =
    "خد وقتك.. لما تكون جاهز كمل!";
}

function resumeTask() {
  playSound("click");

  beginTask();
}

function stopTaskTimer() {
  if (taskTimer) {
    clearInterval(taskTimer);
    taskTimer = null;
  }

  taskRunning = false;
}

function completeTask() {
  stopTaskTimer();

  const task = selectedTasks[currentTaskIndex];

  taskElapsed = task.duration;

  document.getElementById("task-progress-bar").style.width =
    "100%";

  document.getElementById("task-progress-text").textContent =
    "المهمة خلصت! 🎉";

  currentMinutes += task.duration;
  totalGameMinutes += task.duration;

  energy += task.energy;
  energy = Math.max(0, Math.min(100, energy));

  totalStars += task.stars;

  completedTasks.push(task);

  document.getElementById("task-action-button").classList.add("hidden");
  document.getElementById("pause-button").classList.add("hidden");
  document.getElementById("resume-button").classList.add("hidden");

  document.getElementById("character-message").textContent =
    task.message;

  playSound("correct");

  updateClock();
  updateEnergy();

  currentTaskIndex++;

  renderDayTasks();
  updateDayProgress();

  checkEvents();
}


/* =========================================
   EVENT CHECK
========================================= */

function checkEvents() {
  if (eventQueue.length === 0) {
    loadCurrentTask();
    return;
  }

  const nextEvent = eventQueue[0];

  if (completedTasks.length < nextEvent.threshold) {
    loadCurrentTask();
    return;
  }

  eventQueue.shift();

  currentEvent = gameEvents.find(
    event => event.id === nextEvent.id
  );

  if (!currentEvent) {
    loadCurrentTask();
    return;
  }

  eventPending = true;

  renderEvent();

  showScreen("event-screen");
}


/* =========================================
   EVENT DISPLAY
========================================= */

function renderEvent() {
  if (!currentEvent) return;

  playSound("wrong");

  document.getElementById("event-title").textContent =
    currentEvent.title;

  document.querySelector(".event-burst").textContent =
    currentEvent.emoji;

  document.getElementById("event-description").textContent =
    currentEvent.description;

  const container = document.getElementById("event-options");

  container.innerHTML = "";

  currentEvent.options.forEach(option => {
    const button = document.createElement("button");

    button.className = "event-option";
    button.type = "button";

    button.innerHTML = `
      <strong>${option.text}</strong>
      <small>${option.description}</small>
    `;

    button.addEventListener("click", () => {
      chooseEvent(option);
    });

    container.appendChild(button);
  });
}


/* =========================================
   EVENT RESPONSE
========================================= */

function chooseEvent(option) {
  playSound("click");

  currentMinutes += option.time;
  totalGameMinutes += option.time;

  energy += option.energy;

  energy = Math.max(0, Math.min(100, energy));

  totalStars += option.stars;

  eventCount++;

  updateClock();
  updateEnergy();

  document.getElementById("game-stars").textContent =
    totalStars;

  document.getElementById("character-message").textContent =
    option.message;

  eventPending = false;

  currentEvent = null;

  renderDayTasks();
  updateDayProgress();

  loadCurrentTask();
}


/* =========================================
   CLOCK
========================================= */

function formatTime(minutes) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  const displayHour = hour % 12 || 12;

  const period = hour >= 12 ? "مساءً" : "صباحًا";

  return displayHour + ":" +
    String(minute).padStart(2, "0") +
    " " + period;
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return mins + " دقيقة";
  }

  if (mins === 0) {
    return hours + " ساعة";
  }

  return hours + " ساعة و " + mins + " دقيقة";
}

function updateClock() {
  document.getElementById("current-time").textContent =
    formatTime(currentMinutes);
}


/* =========================================
   ENERGY
========================================= */

function updateEnergy() {
  energy = Math.max(0, Math.min(100, energy));

  const bar = document.getElementById("energy-bar");

  bar.style.width = energy + "%";

  document.getElementById("energy-label").textContent =
    energy + "%";

  if (energy >= 60) {
    bar.style.background = "var(--green)";
  } else if (energy >= 30) {
    bar.style.background = "var(--yellow)";
  } else {
    bar.style.background = "var(--red)";
  }

  const character = document.getElementById("player-character");

  if (energy >= 75) {
    character.textContent = "😎";
  } else if (energy >= 45) {
    character.textContent = "🙂";
  } else if (energy >= 20) {
    character.textContent = "😮‍💨";
  } else {
    character.textContent = "🥱";
  }
}


/* =========================================
   PROGRESS
========================================= */

function updateDayProgress() {
  const progress =
    selectedTasks.length === 0
      ? 0
      : (currentTaskIndex / selectedTasks.length) * 100;

  document.getElementById("day-progress").style.width =
    progress + "%";

  document.getElementById("game-stars").textContent =
    totalStars;
}


/* =========================================
   FINISH DAY
========================================= */

function finishDay() {
  stopTaskTimer();

  stopMusic();

  showScreen("result-screen");

  playSound("victory");

  const completed = completedTasks.length;

  const total = selectedTasks.length;

  const percent = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  document.getElementById("stat-completed").textContent =
    completed + " / " + total;

  document.getElementById("stat-time").textContent =
    totalGameMinutes;

  document.getElementById("stat-energy").textContent =
    energy + "%";

  document.getElementById("stat-events").textContent =
    eventCount;

  document.getElementById("result-stars").textContent =
    "⭐ " + totalStars;

  document.getElementById("result-title").textContent =
    percent >= 100
      ? "يومك اتنقذ! 🎉"
      : "وصلت لنهاية اليوم!";

  document.getElementById("result-emoji").textContent =
    percent >= 100
      ? "🏆"
      : percent >= 50
      ? "🚀"
      : "🌟";

  document.getElementById("result-badge").textContent =
    percent >= 100
      ? "DAY MASTER"
      : percent >= 50
      ? "TIME EXPLORER"
      : "DAY STARTER";

  let message;

  if (percent >= 100 && energy >= 50) {
    message =
      "يا سلام! خلصت كل المهام اللي اخترتها، وقدرت تحافظ على طاقتك بشكل كويس. ده يوم متوازن!";
  } else if (percent >= 100) {
    message =
      "قدرت تخلص كل المهام اللي اخترتها! بس خلي بالك إن الطاقة جزء مهم من يومك، ومحتاج تسيب لنفسك مساحة للراحة.";
  } else if (percent >= 50) {
    message =
      "أنجزت جزء كبير من خطتك! مش لازم كل حاجة تخلص في يوم واحد. المهم إنك عرفت تتحرك وتتعامل مع يومك.";
  } else {
    message =
      "وصلت لنهاية اليوم ودي بداية كويسة! كل يوم ممكن تتعلم تختار وتخطط بطريقة أحسن.";
  }

  document.getElementById("result-message").textContent =
    message;

  let insight;

  if (energy >= 70) {
    insight =
      "طاقتك كويسة! حاول تحافظ على التوازن بين إنجاز المهام والراحة.";
  } else if (energy >= 35) {
    insight =
      "طاقة متوسطة.. المرة الجاية فكر في ترتيب المهام وتوزيع المجهود.";
  } else {
    insight =
      "طاقتك محتاجة اهتمام! الإنجاز مهم، لكن الراحة والنوم مش رفاهية.";
  }

  document.querySelector("#result-insight p").textContent =
    insight;

  if (totalStars >= 50) {
    launchConfetti();
  }
}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {
  const container = document.getElementById("confetti-container");

  container.innerHTML = "";

  const pieces = 100;

  const colors = [
    "#8b5cf6",
    "#15bfc6",
    "#f36aa6",
    "#ff9b42",
    "#f5c94f",
    "#22b987"
  ];

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random() * 100 + "%";

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDelay =
      Math.random() * 1.5 + "s";

    piece.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 5000);
}


/* =========================================
   INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  updatePlanner();
});
