document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1️⃣ NAVIGASI & SET TASK (SET TASK PAGE)
     Berlaku di: index.html, setTask.html
  ====================================================== */

  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.onclick = () => location.href = "setTask.html";
  }

  const setTimerBtn = document.getElementById("set-timer-btn");
  if (setTimerBtn) {
    setTimerBtn.onclick = (e) => {
      e.preventDefault(); // penting kalau pakai <a>

      const task = document.getElementById("task-value")?.value || "Working...";
      localStorage.setItem("taskValue", task);

      location.href = "work.html";
    };
  }

  const startBreakBtn = document.getElementById("start-break-btn");
  if (startBreakBtn) {
    startBreakBtn.onclick = () => location.href = "break.html";
  }

  const backToWorkBtn = document.getElementById("start-timer-btn");
  if (backToWorkBtn) {
    backToWorkBtn.onclick = () => location.href = "work.html";
  }

  /* =====================================================
     2️⃣ TAMPILKAN TASK (WORK / BREAK / STOP PAGE)
  ====================================================== */

  const taskValue = localStorage.getItem("taskValue");
  if (taskValue) {
    document.querySelectorAll("#task").forEach(el => {
      el.textContent = taskValue;
    });
  }

  /* =====================================================
     3️⃣ MUSIK LOFI (HANYA JALAN JIKA ADA ELEMENNYA)
  ====================================================== */

  const music = document.getElementById("lofi-music");
  const musicBtn = document.getElementById("music-btn");

  if (music) {
    music.volume = 0.4;

    // autoplay setelah interaksi user pertama
    document.body.addEventListener("click", () => {
      music.play().catch(() => {});
    }, { once: true });
  }

  if (music && musicBtn) {
    musicBtn.onclick = () => {
      if (music.paused) {
        music.play();
        musicBtn.textContent = "MUSIC OFF";
      } else {
        music.pause();
        musicBtn.textContent = "MUSIC ON";
      }
    };
  }

  /* =====================================================
     4️⃣ TIMER + PAUSE + ALARM
     Berlaku di: work.html & break.html
  ====================================================== */

  const display = document.getElementById("time-remaining");
  if (!display) return;

  const pauseBtn = document.getElementById("pause-btn");
  const alarm = document.getElementById("alarm-sound");

  const isBreak = document.body.dataset.mode === "break";
  let timeLeft = (isBreak ? 5 : 25) * 60;
  let isPaused = false;

  function format(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function tick() {
    if (isPaused) return;

    display.textContent = format(timeLeft);

    if (timeLeft <= 0) {
      if (alarm) {
        alarm.currentTime = 0;
        alarm.play();
      }

      clearInterval(interval);

      setTimeout(() => {
        location.href = isBreak ? "stopBreak.html" : "stopWork.html";
      }, 800);

      return;
    }

    timeLeft--;
  }

  // INIT TIMER
  display.textContent = format(timeLeft);
  const interval = setInterval(tick, 1000);

  // PAUSE / RESUME
  if (pauseBtn) {
    pauseBtn.onclick = () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? "RESUME" : "PAUSE";
      pauseBtn.classList.toggle("resume", isPaused);
    };
  }

});
