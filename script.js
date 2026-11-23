const missions = [
  {
    title: "محقق الوقت",
    emoji: "🔎",
    question: "آدم رجع من المدرسة الساعة 3. فتح الموبايل عشان يشوف رسالة، وفجأة اكتشف إن الساعة بقت 5! إيه أول حاجة تساعده؟",
    description: "اكتشف طريقة تساعد آدم يفهم فين بيروح وقته.",
    choices: [
      {
        text: "يستمر في استخدام الموبايل ويقول إنه هيتصرف بعدين.",
        points: 0,
        feedback: "لما بنستخدم الموبايل من غير هدف أو مدة محددة، ممكن الوقت يمر من غير ما نلاحظ. الوعي بالوقت هو أول خطوة."
      },
      {
        text: "يحدد وقت استخدام ويلاحظ الأنشطة اللي بتستهلك يومه.",
        points: 20,
        feedback: "ممتاز! أول خطوة لإدارة الوقت إنك تعرف وقتك بيروح فين، وتلاحظ الأنشطة اللي بتستهلكه من غير قصد."
      },
      {
        text: "يمسح كل تطبيقاته ويمنع نفسه من استخدام الموبايل.",
        points: 5,
        feedback: "مش لازم نمنع كل حاجة. الأهم إننا نستخدم التكنولوجيا بشكل واعي، ونحدد وقت مناسب ليها."
      },
      {
        text: "يلوم نفسه لأنه ضيع الوقت.",
        points: 0,
        feedback: "لوم نفسك مش هيعيد الوقت. حاول تفهم السبب وتتعلم إزاي تتعامل معاه المرة الجاية."
      }
    ]
  },
  {
    title: "مهمة الأولويات",
    emoji: "🎯",
    question: "عندك 4 حاجات النهارده: امتحان بكرة، مشروع موعده بعد 3 أيام، رسالة من صاحبك، وفيديو بتحبه. تبدأ بإيه؟",
    description: "مش كل حاجة محتاجة تتعمل في نفس اللحظة. اختار القرار الأقرب للتوازن.",
    choices: [
      {
        text: "أبدأ بالفيديو، وبعدها أشوف هعمل إيه.",
        points: 0,
        feedback: "الترفيه مهم، لكن لو بدأنا بالمشتتات قبل ترتيب الأولويات، ممكن نلاقي نفسنا تحت ضغط."
      },
      {
        text: "أبدأ مراجعة الامتحان، وأحدد وقت لاحق للمشروع.",
        points: 20,
        feedback: "قرار ذكي! موعد الامتحان أقرب، لكن المشروع مهم برضه، فالتخطيط له قبل ما يتراكم يساعدك."
      },
      {
        text: "أعمل كل المهام في نفس الوقت.",
        points: 5,
        feedback: "تعدد المهام مش دايمًا فعال. التركيز على مهمة واحدة في كل مرة غالبًا يساعدك تنجز بجودة أفضل."
      },
      {
        text: "أرد على كل الرسائل الأول.",
        points: 0,
        feedback: "الرسائل ممكن تستنى قليلًا لو عندك مهمة أكثر أهمية أو موعد أقرب."
      }
    ]
  },
  {
    title: "معمل التخطيط",
    emoji: "🧩",
    question: "عندك مشروع مدرسي كبير مطلوب تسليمه بعد 4 أيام. إيه أحسن طريقة تبدأ بيها؟",
    description: "المهمة الكبيرة ممكن تبان مخيفة، لكن تقسيمها بيخليها أسهل.",
    choices: [
      {
        text: "أستنى آخر يوم وأخلصه كله مرة واحدة.",
        points: 0,
        feedback: "التأجيل لآخر لحظة ممكن يسبب ضغط ويقلل جودة شغلك. حاول تبدأ مبكرًا."
      },
      {
        text: "أقسم المشروع لأجزاء، وأخصص وقت لكل جزء خلال الأيام الأربعة.",
        points: 20,
        feedback: "رائع! تقسيم المهمة وتحديد وقت لكل جزء بيساعدك تبدأ، ويتابع تقدمك، ويقلل الضغط."
      },
      {
        text: "أعمل المشروع كله النهارده وألغي باقي أنشطتي.",
        points: 5,
        feedback: "الإنجاز مهم، لكن مش لازم تضغط نفسك. توزيع المهام مع الحفاظ على الراحة غالبًا أفضل."
      },
      {
        text: "أفكر في المشروع كتير من غير ما أبدأ.",
        points: 0,
        feedback: "التفكير والتخطيط مهمين، لكن خطوة صغيرة فعلية هي اللي بتحول الفكرة لإنجاز."
      }
    ]
  },
  {
    title: "درع التركيز",
    emoji: "🛡️",
    question: "بدأت مذاكرة، وبعد 5 دقائق ظهر إشعار، وصاحبك بعت رسالة، وفيديو جديد نزل. إزاي تحافظ على تركيزك؟",
    description: "اختار استراتيجية تساعدك تحافظ على وقت التركيز.",
    choices: [
      {
        text: "أفتح كل الإشعارات عشان ميفوتنيش حاجة.",
        points: 0,
        feedback: "الإشعارات ممكن تقاطع تركيزك وتخليك ترجع للمهمة بصعوبة. جرب تقللها وقت المذاكرة."
      },
      {
        text: "أقفل الإشعارات، وأحدد جلسة تركيز قصيرة مع استراحة بعدها.",
        points: 20,
        feedback: "أحسنت! تقليل المشتتات، وتحديد مدة مناسبة للتركيز، ثم الراحة، ممكن يساعدك تحافظ على طاقتك."
      },
      {
        text: "أذاكر ساعات طويلة من غير أي استراحة.",
        points: 5,
        feedback: "الراحة جزء من التركيز. جلسات العمل المناسبة والاستراحات تساعدك تستمر بشكل أفضل."
      },
      {
        text: "أسيب المذاكرة وأرجع لها وقت ما أكون في المود.",
        points: 0,
        feedback: "انتظار المزاج ممكن يخلي المهام تتراكم. جرب تبدأ لمدة 5 دقائق، حتى لو مش متحمس."
      }
    ]
  },
  {
    title: "أنقذ يومك",
    emoji: "⚖️",
    question: "يومك مليان دراسة، مسؤوليات، وهوايات، وإنت حاسس إنك مرهق. إيه القرار الأفضل؟",
    description: "إدارة الوقت مش معناها إنك تضغط على نفسك. اختار خطة واقعية.",
    choices: [
      {
        text: "ألغى النوم والراحة عشان أخلص كل حاجة.",
        points: 0,
        feedback: "النوم والراحة مش وقت ضايع. إهمالهم ممكن يؤثر على صحتك وتركيزك."
      },
      {
        text: "أحدد أهم المهام، وأوزعها، وأخصص وقتًا للراحة والنوم.",
        points: 20,
        feedback: "ده هو التوازن! إدارة الوقت تعني تنظيم المسؤوليات مع الحفاظ على احتياجاتك وطاقتك."
      },
      {
        text: "أعمل كل حاجة في نفس اللحظة.",
        points: 5,
        feedback: "حاول تركز على مهمة واحدة، وتوزع وقتك بشكل واقعي بدل ما تحمل نفسك أكتر من طاقتها."
      },
      {
        text: "ألغى كل المهام وأسيب اليوم من غير خطة.",
        points: 0,
        feedback: "ممكن تحتاج راحة فعلًا، لكن لو تقدر، حدد مهمة صغيرة واحدة وأعد ترتيب باقي يومك بهدوء."
      }
    ]
  }
];

let currentMission = 0;
let score = 0;
let answered = false;

const appScreens = ["home", "intro", "game", "result"];

function showScreen(screenId) {
  appScreens.forEach(id => {
    document.getElementById(id).classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  showScreen("home");
}

function showIntro() {
  showScreen("intro");
}

function startGame() {
  currentMission = 0;
  score = 0;
  renderMission();
  showScreen("game");
}

function renderMission() {
  answered = false;

  const m = missions[currentMission];

  document.getElementById("mission-number").textContent =
    "MISSION " + String(currentMission + 1).padStart(2, "0");

  document.getElementById("mission-title").textContent = m.title;
  document.getElementById("mission-emoji").textContent = m.emoji;
  document.getElementById("question").textContent = m.question;
  document.getElementById("question-description").textContent = m.description;
  document.getElementById("score").textContent = score;

  document.getElementById("progress-bar").style.width =
    ((currentMission) / missions.length * 100) + "%";

  const choicesBox = document.getElementById("choices");
  choicesBox.innerHTML = "";

  m.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = choice.text;
    button.onclick = () => chooseAnswer(index);
    choicesBox.appendChild(button);
  });

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");
}

function chooseAnswer(index) {
  if (answered) return;
  answered = true;

  const m = missions[currentMission];
  const choice = m.choices[index];

  score += choice.points;

  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (choice.points >= 20) {
    buttons[index].classList.add("correct");
  } else {
    buttons[index].classList.add("wrong");
  }

  document.getElementById("score").textContent = score;

  const feedbackBox = document.getElementById("feedback");
  feedbackBox.innerHTML =
    "<h4>" + (choice.points >= 20 ? "✨ اختيار ذكي!" : "💡 نتعلم من كل اختيار") +
    "</h4><p>" + choice.feedback + "</p>";

  feedbackBox.classList.remove("hidden");

  document.getElementById("progress-bar").style.width =
    ((currentMission + 1) / missions.length * 100) + "%";

  const nextButton = document.getElementById("next-btn");
  nextButton.textContent =
    currentMission === missions.length - 1
      ? "شوف نتيجتك 🏆"
      : "المهمة التالية ←";

  nextButton.classList.remove("hidden");
}

function nextMission() {
  if (currentMission < missions.length - 1) {
    currentMission++;
    renderMission();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen("result");

  document.getElementById("final-score").textContent = score;

  let message = "";

  if (score === 100) {
    message = "WOW! أنت Time Master! اختياراتك أظهرت فهمًا رائعًا لكيفية إدارة الوقت والتوازن.";
  } else if (score >= 60) {
    message = "أداء رائع! عندك أفكار ذكية لتنظيم وقتك، ولسه تقدر تطور مهاراتك أكتر.";
  } else {
    message = "رحلتك بدأت! إدارة الوقت مهارة بتتعلمها بالتجربة، وكل قرار جديد فرصة تبدأ أحسن.";
  }

  document.getElementById("result-message").textContent = message;

  const badgesBox = document.getElementById("badges");
  badgesBox.innerHTML = "";

  const badgeNames = [
    "🔎 Time Detective",
    "🎯 Priority Master",
    "🧩 Planner",
    "🛡️ Focus Guardian",
    "⚖️ Time Balancer"
  ];

  badgeNames.forEach(name => {
    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = name;
    badgesBox.appendChild(badge);
  });
}

function restartGame() {
  startGame();
}
