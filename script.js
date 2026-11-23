"use strict";

(() => {
  const $ = (id) => document.getElementById(id);
  const screens = [...document.querySelectorAll(".screen")];
  const taskBank = [
    { id: "study", name: "مذاكرة / شغل", emoji: "📚", minutes: 90, energy: 22, description: "وقت تركيز على حاجة مهمة.", tint: "#efe8ff" },
    { id: "errands", name: "مشوار صغير", emoji: "🛍️", minutes: 60, energy: 14, description: "خلص مشوارك على مهلك.", tint: "#fff0dc" },
    { id: "exercise", name: "حركة ونشاط", emoji: "🏃", minutes: 45, energy: 18, description: "حرّك جسمك وجدّد نشاطك.", tint: "#e5f8ed" },
    { id: "family", name: "وقت مع العيلة", emoji: "🏡", minutes: 60, energy: 8, description: "قعدة حلوة مع الناس القريبة.", tint: "#ffe9e7" },
    { id: "tidy", name: "ترتيب الأوضة", emoji: "🧹", minutes: 40, energy: 12, description: "حتة صغيرة كل مرة تكفي.", tint: "#e4f7fb" },
    { id: "project", name: "شغل على مشروعي", emoji: "🎨", minutes: 90, energy: 20, description: "خطوة جديدة في حاجة بتحبها.", tint: "#fff0f6" },
    { id: "meal", name: "أكل وراحة", emoji: "🍲", minutes: 45, energy: -18, description: "فاصل يرد الروح والطاقة.", tint: "#fff5d9" },
    { id: "friends", name: "أكلم صحابي", emoji: "📱", minutes: 30, energy: -8, description: "رسالة أو مكالمة تفرّحك.", tint: "#e9efff" },
    { id: "read", name: "قراءة / هواية", emoji: "🎧", minutes: 45, energy: -10, description: "وقت لطيف لنفسك بعيد عن الزحمة.", tint: "#f2eafa" },
    { id: "rest", name: "استراحة حقيقية", emoji: "☕", minutes: 30, energy: -20, description: "مفيش إنجاز مطلوب في الاستراحة.", tint: "#e8f8ee" }
  ];

  const events = [
    { emoji: "📩", title: "رسالة من صاحبك!", description: "صاحبك بيسأل عليك وعايز يرغي شوية.", options: [{ icon: "💬", label: "أرد عليه دلوقتي", detail: "فاصل اجتماعي صغير", time: 15, energy: -4, score: 1 }, { icon: "🕒", label: "أرد بعد المهمة", detail: "أحافظ على تركيزي", time: 0, energy: 0, score: 1 }] },
    { emoji: "🌧️", title: "الجو قلب فجأة", description: "كان عندك مشوار، بس الدنيا بتمطر. تعمل إيه؟", options: [{ icon: "🏠", label: "أبدّل المشوار بحاجة في البيت", detail: "مرونة حلوة في الخطة", time: 0, energy: 0, score: 2 }, { icon: "☕", label: "أستغلها استراحة", detail: "أهدّي الإيقاع شوية", time: 20, energy: -8, score: 2 }] },
    { emoji: "🥱", title: "حاسس إن تركيزك قل", description: "لسه في حاجات، بس مخك محتاج نفس. تختار إيه؟", options: [{ icon: "🧘", label: "أعمل استراحة قصيرة", detail: "الراحة هترجع شوية طاقة", time: 15, energy: -12, score: 2 }, { icon: "🎯", label: "أكمّل ١٥ دقيقة وبعدين أقرر", detail: "خطوة صغيرة من غير ضغط", time: 15, energy: 6, score: 1 }] },
    { emoji: "🍰", title: "حد جاب حاجة حلوة!", description: "فاصل لطيف ظهر في نص اليوم. إزاي تستغله؟", options: [{ icon: "😊", label: "أشاركهم خمس دقايق", detail: "لحظة اجتماعية خفيفة", time: 10, energy: -4, score: 1 }, { icon: "📌", label: "أخلص اللي في إيدي الأول", detail: "وألحقهم بعدين", time: 0, energy: 0, score: 1 }] }
  ];

  const state = { plan: [], completed: 0, skipped: 0, energy: 100, minute: 8 * 60, stars: 0, eventsSeen: 0, currentProgress: 0, mode: "ready", sound: false, eventQueue: [] };
  let toastTimer;
  const sounds = {};
  const soundFiles = { click: "click.mp3", music: "music.mp3", success: "correct.mp3", victory: "victory.mp3" };

  function showScreen(id) {
    const target = $(id);
    if (!target) return;
    screens.forEach((screen) => screen.classList.toggle("active", screen === target));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function minutesText(value) { return `${new Intl.NumberFormat("ar-EG").format(value)} دقيقة`; }
  function digits(value) { return new Intl.NumberFormat("ar-EG").format(value); }
  function clockText(total) {
    const h24 = Math.floor(total / 60) % 24;
    const m = total % 60;
    const h = h24 % 12 || 12;
    return `${digits(h)}:${digits(String(m).padStart(2, "0"))} ${h24 < 12 ? "ص" : "م"}`;
  }
  function toast(message) {
    const node = $("toast"); node.textContent = message; node.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove("show"), 2300);
  }
  function playSound(kind, loop = false) {
    if (!state.sound) return;
    const audio = sounds[kind]; if (!audio) return;
    try { audio.currentTime = 0; audio.loop = loop; const promise = audio.play(); if (promise?.catch) promise.catch(() => {}); } catch (_) { /* الصوت اختياري ومش هيعطل اللعبة */ }
  }
  function stopMusic() { if (sounds.music) { sounds.music.pause(); sounds.music.currentTime = 0; } }
  function enableSound() {
    Object.entries(soundFiles).forEach(([key, file]) => { if (!sounds[key]) { sounds[key] = new Audio(file); sounds[key].preload = key === "music" ? "none" : "auto"; } });
    state.sound = !state.sound;
    $("sound-icon").textContent = state.sound ? "🔊" : "🔇";
    $("sound-label").textContent = state.sound ? "الصوت شغال" : "الصوت مقفول";
    if (state.sound && $("play-screen").classList.contains("active")) playSound("music", true); else stopMusic();
    if (state.sound) playSound("click");
  }
  function renderLibrary() {
    $("task-library").innerHTML = taskBank.map((task) => {
      const selected = state.plan.includes(task.id);
      return `<button type="button" class="task-option ${selected ? "selected" : ""}" data-task="${task.id}" aria-pressed="${selected}" style="--task-tint:${task.tint}"><span class="task-ico">${task.emoji}</span><span><strong>${task.name}</strong><small>${minutesText(task.minutes)} · ${task.energy < 0 ? "تجدد طاقة" : `طاقة ${digits(task.energy)}٪`}</small></span><span class="add-mark">${selected ? "✓" : "+"}</span></button>`;
    }).join("");
    $("task-library").querySelectorAll("[data-task]").forEach((button) => button.addEventListener("click", () => toggleTask(button.dataset.task)));
  }
  function taskFor(id) { return taskBank.find((task) => task.id === id); }
  function planMinutes() { return state.plan.reduce((sum, id) => sum + taskFor(id).minutes, 0); }
  function renderPlan() {
    const total = planMinutes();
    $("plan-count").textContent = `${digits(state.plan.length)} ${state.plan.length === 1 ? "مهمة" : "مهام"}`;
    $("plan-time").textContent = `${digits((total / 60).toFixed(1))} ساعة`;
    $("plan-time-fill").style.width = `${Math.min(100, total / 840 * 100)}%`;
    $("start-day-button").disabled = state.plan.length === 0;
    const warning = $("plan-warning");
    warning.classList.toggle("warn", total > 600);
    warning.textContent = state.plan.length === 0 ? "ضيف مهمة واحدة على الأقل عشان نبدأ." : total > 600 ? "الجدول مليان شوية؛ سيب لنفسك مساحة للمفاجآت والراحة." : total > 360 ? "خطة مليانة! افتكر إنك تقدر تعدّي أو تغيّر أي مهمة." : "فيه مساحة للمفاجآت والاستراحة، تمام كده!";
    $("empty-plan").classList.toggle("hidden", state.plan.length > 0);
    $("selected-tasks").innerHTML = state.plan.map((id, index) => { const task = taskFor(id); return `<div class="planned-task"><span class="order">${digits(index + 1)}</span><span>${task.emoji} ${task.name}</span><small class="task-min">${digits(task.minutes)} د</small><span class="task-controls"><button type="button" data-move="up" data-index="${index}" aria-label="تقديم ${task.name}" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-move="down" data-index="${index}" aria-label="تأخير ${task.name}" ${index === state.plan.length - 1 ? "disabled" : ""}>↓</button><button type="button" data-remove="${id}" aria-label="حذف ${task.name}">×</button></span></div>`; }).join("");
    $("selected-tasks").querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => toggleTask(button.dataset.remove)));
    $("selected-tasks").querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => moveTask(Number(button.dataset.index), button.dataset.move === "up" ? -1 : 1)));
  }
  function toggleTask(id) {
    if (state.plan.includes(id)) state.plan = state.plan.filter((item) => item !== id);
    else state.plan.push(id);
    playSound("click"); renderLibrary(); renderPlan();
  }
  function moveTask(index, delta) {
    const next = index + delta; if (next < 0 || next >= state.plan.length) return;
    [state.plan[index], state.plan[next]] = [state.plan[next], state.plan[index]]; playSound("click"); renderPlan();
  }
  function startDay() {
    if (!state.plan.length) return;
    state.completed = 0; state.skipped = 0; state.energy = 100; state.minute = 8 * 60; state.stars = 0; state.eventsSeen = 0; state.currentProgress = 0; state.mode = "ready";
    state.eventQueue = [...events].sort(() => Math.random() - 0.5).slice(0, Math.min(2, Math.max(1, Math.ceil(state.plan.length / 3))));
    renderGame(); showScreen("play-screen"); playSound("click"); playSound("music", true);
  }
  function currentTask() { return taskFor(state.plan[state.completed + state.skipped] || ""); }
  function renderGame() {
    const task = currentTask();
    $("current-time").textContent = clockText(state.minute);
    $("energy-label").textContent = `${digits(state.energy)}٪`;
    $("energy-bar").style.width = `${state.energy}%`;
    $("energy-bar").style.background = state.energy < 25 ? "var(--coral)" : state.energy < 55 ? "var(--yellow)" : "var(--mint)";
    $("energy-tip").textContent = state.energy < 25 ? "طاقتك قليلة، خد استراحة لو تحب." : state.energy < 55 ? "استراحة صغيرة ممكن تساعد." : "طاقة حلوة، انطلق!";
    $("game-stars").textContent = digits(state.stars);
    $("day-task-counter").textContent = `${digits(state.completed + state.skipped)} / ${digits(state.plan.length)}`;
    $("day-progress").style.width = `${(state.completed + state.skipped) / state.plan.length * 100}%`;
    const done = state.completed + state.skipped;
    $("day-task-list").innerHTML = state.plan.map((id, index) => { const item = taskFor(id); const isDone = index < done; const isCurrent = index === done; return `<div class="day-task ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}"><span class="task-ico" style="--task-tint:${item.tint}">${item.emoji}</span><span><strong>${item.name}</strong><small>${digits(item.minutes)} دقيقة${state.skipped > 0 && isDone && index >= state.completed ? " · عدّيتها" : ""}</small></span><span class="task-state">${isDone ? (index >= state.completed ? "⏭️" : "✅") : isCurrent ? "👈" : "▫️"}</span></div>`; }).join("");
    if (!task) { finishDay(); return; }
    $("current-task-emoji").textContent = task.emoji; $("current-task-name").textContent = task.name; $("current-task-description").textContent = task.description; $("task-duration").textContent = minutesText(task.minutes);
    $("task-progress-bar").style.width = `${Math.min(100, state.currentProgress / task.minutes * 100)}%`;
    $("task-progress-text").textContent = state.mode === "paused" ? "خد وقتك… المهمة مستنياك" : state.mode === "working" ? `اتعمل ${digits(state.currentProgress)} من ${digits(task.minutes)} دقيقة` : "ابدأ لما تكون جاهز";
    $("task-action-button").classList.toggle("hidden", state.mode === "paused");
    $("task-action-button").innerHTML = state.mode === "working" ? "كمّل ١٥ دقيقة <span>⏩</span>" : "ابدأ المهمة <span>⚡</span>";
    $("pause-button").classList.toggle("hidden", state.mode !== "working");
    $("resume-button").classList.toggle("hidden", state.mode !== "paused");
    $("character-message").textContent = state.mode === "paused" ? "استراحة صغيرة؟ خد وقتك ☕" : state.energy < 25 ? "واضح إنك محتاج تهدى شوية 🌿" : state.completed > 0 ? "حلو! خطوة كمان وهنقرب 🎉" : "يلا بينا! يوم جديد وفرصة جديدة 🌞";
  }
  function beginTask() { state.mode = "working"; playSound("click"); advanceTime(15); }
  function advanceTime(amount) {
    const task = currentTask(); if (!task) return;
    const remaining = task.minutes - state.currentProgress;
    const spent = Math.min(amount, remaining);
    state.currentProgress += spent; state.minute += spent;
    if (state.currentProgress >= task.minutes) completeTask(); else renderGame();
  }
  function completeTask() {
    const task = currentTask(); if (!task) return;
    state.completed++; state.currentProgress = 0; state.energy = Math.max(0, Math.min(100, state.energy - task.energy)); state.stars += state.energy >= 20 ? 2 : 1; state.mode = "ready";
    playSound("success");
    if (state.eventQueue.length && state.completed % 2 === 0 && state.eventsSeen < state.eventQueue.length) showEvent();
    else if (!currentTask()) finishDay(); else { toast(`عاش! خلصت ${task.name}`); renderGame(); }
  }
  function pauseTask() { state.mode = "paused"; renderGame(); }
  function resumeTask() { state.mode = "working"; playSound("click"); advanceTime(15); }
  function skipTask() {
    const task = currentTask(); if (!task) return;
    state.skipped++; state.currentProgress = 0; state.mode = "ready"; playSound("click");
    if (!currentTask()) finishDay(); else { toast(`تمام، شلنا ${task.name} من الطريق`); renderGame(); }
  }
  function showEvent() {
    const event = state.eventQueue[state.eventsSeen]; if (!event) { renderGame(); return; }
    stopMusic(); $("event-emoji").textContent = event.emoji; $("event-title").textContent = event.title; $("event-description").textContent = event.description;
    $("event-options").innerHTML = event.options.map((option, index) => `<button type="button" class="event-choice" data-choice="${index}"><span>${option.icon}</span><span>${option.label}<small>${option.detail}</small></span><b>←</b></button>`).join("");
    $("event-options").querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => chooseEvent(event.options[Number(button.dataset.choice)])));
    showScreen("event-screen");
  }
  function chooseEvent(option) {
    state.minute += option.time; state.energy = Math.max(0, Math.min(100, state.energy - option.energy)); state.stars += option.score; state.eventsSeen++; playSound("click");
    if (!currentTask()) finishDay(); else { showScreen("play-screen"); renderGame(); playSound("music", true); toast("اختيارك اتحسب في يومك ✨"); }
  }
  function finishDay() {
    stopMusic();
    const ratio = state.completed / Math.max(1, state.plan.length);
    const balanced = state.energy >= 25 && state.completed >= Math.ceil(state.plan.length / 2);
    $("result-emoji").textContent = ratio >= .8 && state.energy >= 25 ? "🏆" : balanced ? "🌟" : "🌱";
    $("result-title").textContent = ratio >= .8 && state.energy >= 25 ? "يوم جامد ومتوازن!" : balanced ? "عاش، عملت اللي عليك!" : "كل يوم بنتعلم حاجة!";
    $("result-message").textContent = state.skipped ? `خلصت ${digits(state.completed)} مهمة واخترت تعدّي ${digits(state.skipped)}. وده قرار ذكي لما يومك يحتاج مرونة.` : `خلصت ${digits(state.completed)} مهمة من خطتك، وخدت يومك خطوة خطوة.`;
    $("result-stars").textContent = `⭐ ${digits(state.stars)}`;
    $("result-badge").textContent = state.energy >= 45 ? "صاحب يوم متوازن" : state.completed >= state.plan.length / 2 ? "بطل الأولويات" : "بداية لطيفة";
    $("stat-completed").textContent = digits(state.completed); $("stat-skipped").textContent = digits(state.skipped); $("stat-time").textContent = digits(state.minute - 8 * 60); $("stat-energy").textContent = `${digits(state.energy)}٪`;
    $("result-insight").textContent = state.energy < 20 ? "الراحة مش مكافأة بعد الإنجاز؛ هي جزء من الخطة نفسها. المرة الجاية حط استراحة بدري." : state.skipped > 0 ? "إنك تغيّر الخطة وقت اللزوم مهارة مهمة. المرونة كمان إنجاز." : "التخطيط مش معناه تعمل كل حاجة؛ معناه تختار اللي يهمك وتسيب مساحة لنفسك.";
    showScreen("result-screen"); playSound("victory");
  }
  function openPlanner() { state.plan = []; renderLibrary(); renderPlan(); showScreen("planner-screen"); playSound("click"); }
  function resetPlan() { state.plan = []; renderLibrary(); renderPlan(); playSound("click"); }
  function restart() { openPlanner(); }
  document.addEventListener("click", (event) => {
    const go = event.target.closest("[data-go]"); if (go) { showScreen(go.dataset.go); playSound("click"); return; }
    const action = event.target.closest("[data-action]"); if (!action) return;
    switch (action.dataset.action) {
      case "open-planner": openPlanner(); break;
      case "start-day": startDay(); break;
      case "reset-plan": resetPlan(); break;
      case "begin-task": if (state.mode === "ready") beginTask(); else if (state.mode === "working") advanceTime(15); break;
      case "pause-task": pauseTask(); break;
      case "resume-task": resumeTask(); break;
      case "skip-task": skipTask(); break;
      case "restart": restart(); break;
    }
  });
  $("sound-toggle").addEventListener("click", enableSound);
  renderLibrary(); renderPlan();
})();
