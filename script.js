/* ======================================
   TIK TK - BEAT THE CLOCK
   ====================================== */

/* AUDIO FILES - FILES IN REPOSITORY ROOT */

const audioFiles = {
  music: "music.mp3",
  correct: "correct.mp3",
  wrong: "wrong.mp3",
  click: "click.mp3",
  victory: "victory.mp3"
};

const sounds = {};

for (const key in audioFiles) {
  sounds[key] = new Audio(audioFiles[key]);
}

sounds.music.loop = true;
sounds.music.volume = 0.22;
sounds.correct.volume = 0.85;
sounds.wrong.volume = 0.75;
sounds.click.volume = 0.45;
sounds.victory.volume = 0.85;

let soundEnabled = true;
let musicStarted = false;

function playSound(name) {
  if (!soundEnabled || !sounds[name]) return;

  try {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(() => {});
  } catch (error) {
    console.log("Audio playback unavailable.");
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
  sounds.music.currentTime = 0;
  musicStarted = false;
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  const icon = document.getElementById("sound-icon");
  const label = document.getElementById("sound-label");

  icon.textContent = soundEnabled ? "♫" : "🔇";
  label.textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";

  if (soundEnabled) {
    startMusic();
  } else {
    for (const key in sounds) {
      sounds[key].pause();
    }
    musicStarted = false;
  }
}

document.getElementById("sound-toggle")
  .addEventListener("click", () => {
    toggleSound();
  });


/* ======================================
   FLOATING HOURS
   ====================================== */

function createHours() {
  const container = document.getElementById("floating-hours");

  for (let i = 0; i < 24; i++) {
    const hour = document.createElement("span");

    hour.className = "floating-hour";
    hour.textContent = i + 1;

    hour.style.left = Math.random() * 100 + "%";
    hour.style.animationDuration = (15 + Math.random() * 25) + "s";
    hour.style.animationDelay = (-Math.random() * 30) + "s";
    hour.style.fontSize = (12 + Math.random() * 25) + "px";

    container.appendChild(hour);
  }
}

createHours();


/* ======================================
   MISSIONS
   ====================================== */

const missions = [
  {
    title: "TIME DETECTIVE",
    emoji: "🔎",
    description: "Discover where your time really goes.",
    question: "Adam came home from school at 3 PM. He opened his phone to check a message, and suddenly it was 5 PM! What is the first thing that can help him?",
    options: [
      {
        text: "Keep using the phone and say he will deal with it later.",
        points: 0,
        type: "wrong",
        feedback: "Scrolling without a clear purpose can make time disappear. Recognizing the problem is the first step."
      },
      {
        text: "Set a usage limit and track the activities that consume his day.",
        points: 20,
        type: "correct",
        feedback: "Excellent! Managing time starts with knowing where it goes and noticing activities that consume it unintentionally."
      },
      {
        text: "Delete all his apps and completely stop using his phone.",
        points: 5,
        type: "partial",
        feedback: "Reducing distractions can help, but balance is better than completely banning technology."
      },
      {
        text: "Blame himself for wasting time.",
        points: 0,
        type: "wrong",
        feedback: "Blaming yourself doesn't recover lost time. Understanding what happened helps you make a better choice next time."
      }
    ]
  },

  {
    title: "PRIORITY QUEST",
    emoji: "🎯",
    description: "Not everything deserves your attention right now.",
    question: "You have four things to do today: an exam tomorrow, a project due in three days, a message from your friend, and a video you love. What should you start with?",
    options: [
      {
        text: "Watch the video first, then see what happens.",
        points: 0,
        type: "wrong",
        feedback: "Starting with entertainment before urgent tasks may leave you with less time to prepare."
      },
      {
        text: "Review for the exam and schedule time for the project later.",
        points: 20,
        type: "correct",
        feedback: "Great choice! The exam is urgent, and planning the project ahead prevents last-minute stress."
      },
      {
        text: "Do all the tasks at the same time.",
        points: 5,
        type: "partial",
        feedback: "Trying to multitask can make it harder to focus. Doing one thing at a time is usually more effective."
      },
      {
        text: "Reply to all messages first.",
        points: 0,
        type: "wrong",
        feedback: "Messages can wait when an important deadline is approaching. Prioritize what matters most."
      }
    ]
  },

  {
    title: "PLAN IT",
    emoji: "🧩",
    description: "Turn a big task into small achievable steps.",
    question: "You have a big school project due in four days. What is the best way to begin?",
    options: [
      {
        text: "Wait until the last day and finish everything at once.",
        points: 0,
        type: "wrong",
        feedback: "Leaving everything until the last day increases pressure and makes it harder to produce your best work."
      },
      {
        text: "Divide the project into smaller tasks and schedule each one over the four days.",
        points: 20,
        type: "correct",
        feedback: "Smart planning! Breaking a big task into smaller steps makes it easier to manage and reduces stress."
      },
      {
        text: "Finish the whole project today and cancel all other activities.",
        points: 5,
        type: "partial",
        feedback: "Starting early is good, but a realistic plan should leave space for other responsibilities and rest."
      },
      {
        text: "Think about the project a lot without actually starting.",
        points: 0,
        type: "wrong",
        feedback: "Thinking is useful, but taking the first small step is what gets the project moving."
      }
    ]
  },

  {
    title: "FOCUS MODE",
    emoji: "🛡️",
    description: "Protect your focus from digital distractions.",
    question: "You start studying, but after five minutes a notification appears, your friend sends a message, and a new video is posted. How can you protect your focus?",
    options: [
      {
        text: "Open every notification so you don't miss anything.",
        points: 0,
        type: "wrong",
        feedback: "Constant interruptions make it harder to stay focused and complete your tasks."
      },
      {
        text: "Turn off notifications and set a short focus session followed by a break.",
        points: 20,
        type: "correct",
        feedback: "Excellent! A distraction-free focus session and a planned break help you study more effectively."
      },
      {
        text: "Study for many hours without taking any breaks.",
        points: 5,
        type: "partial",
        feedback: "Long study sessions may leave you exhausted. Short breaks help you maintain your energy and focus."
      },
      {
        text: "Stop studying and return whenever you feel motivated.",
        points: 0,
        type: "wrong",
        feedback: "Waiting for the perfect mood can delay your work. A small planned session can help you get started."
      }
    ]
  },

  {
    title: "SAVE YOUR DAY",
    emoji: "⚖️",
    description: "Find the balance between productivity and wellbeing.",
    question: "Your day is full of studying, responsibilities, and hobbies, and you feel exhausted. What is the best decision?",
    options: [
      {
        text: "Cancel sleep and rest so you can finish everything.",
        points: 0,
        type: "wrong",
        feedback: "Sacrificing sleep can hurt your health and concentration. Rest is part of a productive day."
      },
      {
        text: "Prioritize important tasks, organize them, and make time for rest and sleep.",
        points: 20,
        type: "correct",
        feedback: "That's the right balance! A realistic plan includes priorities, responsibilities, hobbies, rest, and enough sleep."
      },
      {
        text: "Try to do everything at the same time.",
        points: 5,
        type: "partial",
        feedback: "Multitasking may increase stress. Organizing your tasks and focusing on one at a time is a better approach."
      },
      {
        text: "Cancel everything and spend the whole day without a plan.",
        points: 0,
        type: "wrong",
        feedback: "Taking a break is important, but a flexible plan can help you feel less overwhelmed."
      }
    ]
  }
];


/* ======================================
   GAME STATE
   ====================================== */

let currentMission = 0;
let totalScore = 0;
let answered = false;


/* ======================================
   SCREEN CONTROL
   ====================================== */

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
  showScreen("home-screen");
}


/* ======================================
   START GAME
   ====================================== */

function startGame() {
  playSound("click");
  startMusic();

  currentMission = 0;
  totalScore = 0;
  answered = false;

  document.getElementById("score").textContent = "0";

  renderMission();
  showScreen("game-screen");
}


/* ======================================
   RENDER MISSION
   ====================================== */

function renderMission() {
  answered = false;

  const mission = missions[currentMission];

  document.getElementById("mission-number").textContent =
    "MISSION " + String(currentMission + 1).padStart(2, "0");

  document.getElementById("mission-count-footer").textContent =
    (currentMission + 1) + " / 5";

  document.getElementById("progress-bar").style.width =
    ((currentMission + 1) / missions.length * 100) + "%";

  document.getElementById("mission-emoji").textContent =
    mission.emoji;

  document.getElementById("mission-title").textContent =
    mission.title;

  document.getElementById("mission-description").textContent =
    mission.description;

  document.getElementById("question").textContent =
    mission.question;

  document.getElementById("score").textContent =
    totalScore;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("next-button").classList.add("hidden");

  const letters = ["A", "B", "C", "D"];

  mission.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "choice-button";

    button.innerHTML =
      '<span class="choice-letter">' + letters[index] + '</span>' +
      '<span class="choice-text"></span>';

    button.querySelector(".choice-text").textContent = option.text;

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    choices.appendChild(button);
  });
}


/* ======================================
   ANSWER
   ====================================== */

function chooseAnswer(index) {
  if (answered) return;

  answered = true;

  playSound("click");

  const mission = missions[currentMission];
  const selected = mission.options[index];

  totalScore += selected.points;

  document.getElementById("score").textContent =
    totalScore;

  const buttons = document.querySelectorAll(".choice-button");

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === index) {
      button.classList.add(selected.type);
    }
  });

  if (selected.type === "correct") {
    playSound("correct");
  } else {
    playSound("wrong");
  }

  showFeedback(selected);

  document.getElementById("next-button").classList.remove("hidden");

  document.getElementById("next-button").textContent =
    currentMission === missions.length - 1
      ? "SEE MY RESULTS →"
      : "NEXT MISSION →";
}


/* ======================================
   FEEDBACK
   ====================================== */

function showFeedback(selected) {
  const feedback = document.getElementById("feedback");
  const icon = document.getElementById("feedback-icon");
  const title = document.getElementById("feedback-title");
  const text = document.getElementById("feedback-text");

  feedback.classList.remove(
    "hidden",
    "correct-feedback",
    "partial-feedback",
    "wrong-feedback"
  );

  if (selected.type === "correct") {
    feedback.classList.add("correct-feedback");
    icon.textContent = "🎉";
    title.textContent = "EXCELLENT CHOICE! +" + selected.points;
  } else if (selected.type === "partial") {
    feedback.classList.add("partial-feedback");
    icon.textContent = "🤔";
    title.textContent = "NOT BAD! +" + selected.points;
  } else {
    feedback.classList.add("wrong-feedback");
    icon.textContent = "💡";
    title.textContent = "THINK AGAIN NEXT TIME! +0";
  }

  text.textContent = selected.feedback;
}


/* ======================================
   NEXT MISSION
   ====================================== */

function nextMission() {
  playSound("click");

  currentMission++;

  if (currentMission < missions.length) {
    renderMission();
  } else {
    showResult();
  }
}


/* ======================================
   RESULTS
   ====================================== */

function showResult() {
  stopMusic();

  showScreen("result-screen");

  playSound("victory");

  document.getElementById("final-score").textContent =
    totalScore;

  const title = document.getElementById("result-title");
  const badge = document.getElementById("result-badge");
  const message = document.getElementById("result-message");
  const emoji = document.getElementById("result-emoji");

  if (totalScore >= 80) {
    title.textContent = "TIME MASTER!";
    badge.textContent = "🏆 TIME MASTER";
    emoji.textContent = "🏆";
    message.textContent =
      "Amazing! You made smart choices, prioritized your tasks, and protected your time. Keep building these habits!";
  } else if (totalScore >= 50) {
    title.textContent = "TIME EXPLORER!";
    badge.textContent = "🚀 TIME EXPLORER";
    emoji.textContent = "🚀";
    message.textContent =
      "Good job! You are learning how to make better time choices. Keep practicing and your skills will grow!";
  } else {
    title.textContent = "TIME STARTER!";
    badge.textContent = "🌟 TIME STARTER";
    emoji.textContent = "🌟";
    message.textContent =
      "Every journey starts somewhere! You have the power to improve your choices and take control of your day.";
  }

  if (totalScore >= 50) {
    launchConfetti();
  }
}


/* ======================================
   CONFETTI
   ====================================== */

function launchConfetti() {
  const container = document.getElementById("confetti-container");

  const pieces = 100;

  const colors = [
    "#42e8e0",
    "#b66cff",
    "#ff5eae",
    "#ff9e45",
    "#f6d65c",
    "#53e6a1"
  ];

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[
      Math.floor(Math.random() * colors.length)
    ];

    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.animationDuration = (2 + Math.random() * 2) + "s";

    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 5000);
}


/* ======================================
   RESTART
   ====================================== */

function restartGame() {
  playSound("click");
  startGame();
}
