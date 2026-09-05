document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================
  const entry = document.getElementById("entry");
  const giftButton = document.getElementById("giftButton");
  const birthdayMusic = document.getElementById("birthdayMusic");
  const ageNumber = document.getElementById("ageNumber");
  const continueButton = document.getElementById("continueButton");
  const giftParticles = document.getElementById("giftParticles");

  const balloonsSection = document.getElementById("balloons");
  const balloonComplete = document.getElementById("balloonComplete");
  const scrollAfterBalloons = document.getElementById("scrollAfterBalloons");

  const blowButton = document.getElementById("blowButton");
  const candleFlame = document.getElementById("candleFlame");
  const cakeMessage = document.getElementById("cakeMessage");

  const gameBoard = document.getElementById("gameBoard");
  const gameArrow = document.getElementById("gameArrow");
  const heartTarget = document.getElementById("heartTarget");
  const gameHint = document.getElementById("gameHint");
  const gameSuccess = document.getElementById("gameSuccess");

  const finale = document.getElementById("finale");

  // =========================
  // DOB → AGE
  // =========================
  function calculateAge() {
    const dob = new Date(2001, 8, 12);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const birthdayThisYear = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );

    if (today < birthdayThisYear) {
      age--;
    }

    return age;
  }

  if (ageNumber) {
    ageNumber.textContent = calculateAge();
  }

  // =========================
  // CONFETTI
  // =========================
  function createConfetti(amount = 35) {
    const container = document.createElement("div");
    container.className = "confetti-container";
    document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDelay = Math.random() * 0.5 + "s";
      piece.style.transform =
        `rotate(${Math.random() * 360}deg)`;

      container.appendChild(piece);
    }

    setTimeout(() => {
      container.remove();
    }, 3500);
  }

  // =========================
  // GIFT PARTICLES
  // =========================
  function createGiftParticles() {
    if (!giftParticles) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("span");

      particle.style.left = "50%";
      particle.style.top = "50%";

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 180;

      particle.style.setProperty(
        "--x",
        Math.cos(angle) * distance + "px"
      );

      particle.style.setProperty(
        "--y",
        Math.sin(angle) * distance + "px"
      );

      particle.className = "gift-particle";
      giftParticles.appendChild(particle);

      setTimeout(() => particle.remove(), 1500);
    }
  }

  // =========================
  // OPEN GIFT
  // =========================
  if (giftButton) {
    giftButton.addEventListener("click", () => {
      if (entry && entry.classList.contains("opened")) return;

      if (entry) {
        entry.classList.add("opened");
      }

      createGiftParticles();
      createConfetti(45);

      // Start music after user interaction
      if (birthdayMusic) {
        birthdayMusic.volume = 0.7;

        const playPromise = birthdayMusic.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      // Small delay for smooth reveal
      setTimeout(() => {
        const reveal = document.querySelector(".birthday-reveal");

        if (reveal) {
          reveal.classList.add("show");
        }
      }, 500);
    });
  }

  // =========================
  // CONTINUE BUTTON
  // =========================
  if (continueButton) {
    continueButton.addEventListener("click", () => {
      if (balloonsSection) {
        balloonsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  // =========================
  // BALLOONS
  // =========================
  const balloons = document.querySelectorAll(".balloon");
  let poppedCount = 0;

  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      if (balloon.classList.contains("popped")) return;

      balloon.classList.add("popped");
      poppedCount++;

      const index = balloon.dataset.index;

      const word = document.getElementById(`word${index}`);

      if (word) {
        word.classList.add("show");
      }

      // Pop sound using Web Audio
      playPopSound();

      // Confetti
      createConfetti(25);

      // When all balloons are popped
      if (poppedCount === balloons.length) {
        setTimeout(() => {
          if (balloonComplete) {
            balloonComplete.classList.add("show");
          }

          if (scrollAfterBalloons) {
            scrollAfterBalloons.classList.add("show");
          }
        }, 700);
      }
    });
  });

  // =========================
  // BALLOON POP SOUND
  // =========================
  function playPopSound() {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) return;

      const ctx = new AudioContext();

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(180, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        60,
        ctx.currentTime + 0.12
      );

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.12
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.12);
    } catch (error) {
      console.log("Audio unavailable");
    }
  }

  // =========================
  // SCROLL REVEALS
  // =========================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // =========================
  // CAKE / BLOW CANDLE
  // =========================
  let candleBlown = false;

  if (blowButton) {
    blowButton.addEventListener("click", () => {
      if (candleBlown) return;

      candleBlown = true;

      if (candleFlame) {
        candleFlame.classList.add("extinguished");
      }

      // Smoke
      createSmoke();

      // Confetti
      createConfetti(70);

      // Firework effect
      createFireworks();

      if (cakeMessage) {
        setTimeout(() => {
          cakeMessage.classList.add("show");
        }, 500);
      }

      blowButton.textContent = "🎉 Birthday!";
      blowButton.disabled = true;
    });
  }

  // =========================
  // SMOKE
  // =========================
  function createSmoke() {
    const candle = document.querySelector(".candle");

    if (!candle) return;

    for (let i = 0; i < 8; i++) {
      const smoke = document.createElement("span");

      smoke.className = "smoke";
      smoke.style.left = 45 + Math.random() * 10 + "%";
      smoke.style.animationDelay = Math.random() * 0.3 + "s";

      candle.appendChild(smoke);

      setTimeout(() => smoke.remove(), 2500);
    }
  }

  // =========================
  // FIREWORKS
  // =========================
  function createFireworks() {
    for (let f = 0; f < 4; f++) {
      setTimeout(() => {
        const firework = document.createElement("div");
        firework.className = "firework";

        firework.style.left =
          20 + Math.random() * 60 + "vw";

        firework.style.top =
          20 + Math.random() * 35 + "vh";

        document.body.appendChild(firework);

        for (let i = 0; i < 16; i++) {
          const spark = document.createElement("span");

          const angle = (Math.PI * 2 * i) / 16;
          const distance = 50 + Math.random() * 50;

          spark.style.setProperty(
            "--fx",
            Math.cos(angle) * distance + "px"
          );

          spark.style.setProperty(
            "--fy",
            Math.sin(angle) * distance + "px"
          );

          firework.appendChild(spark);
        }

        setTimeout(() => firework.remove(), 1200);
      }, f * 250);
    }
  }

  // =========================
  // BOW & ARROW GAME
  // =========================
  if (gameBoard && gameArrow && heartTarget) {
    let dragging = false;
    let startX = 0;
    let currentX = 0;

    gameArrow.addEventListener("pointerdown", (event) => {
      if (gameSuccess && gameSuccess.classList.contains("show")) return;

      dragging = true;

      startX = event.clientX;
      currentX = startX;

      gameArrow.setPointerCapture(event.pointerId);
      gameArrow.classList.add("dragging");
    });

    gameArrow.addEventListener("pointermove", (event) => {
      if (!dragging) return;

      currentX = event.clientX;

      const distance = startX - currentX;

      // Limit pull
      const pull = Math.max(
        -10,
        Math.min(120, distance)
      );

      gameArrow.style.transform =
        `translateX(${-pull}px)`;
    });

    gameArrow.addEventListener("pointerup", () => {
      if (!dragging) return;

      dragging = false;
      gameArrow.classList.remove("dragging");

      const distance = startX - currentX;

      gameArrow.style.transform = "translateX(0)";

      // Need enough pull
      if (distance > 45) {
        shootArrow();
      }
    });

    function shootArrow() {
      gameArrow.classList.add("shoot");

      setTimeout(() => {
        if (heartTarget) {
          heartTarget.classList.add("hit");
        }

        if (gameHint) {
          gameHint.classList.add("hide");
        }

        if (gameSuccess) {
          gameSuccess.classList.add("show");
        }

        createConfetti(35);

        setTimeout(() => {
          gameArrow.classList.remove("shoot");
        }, 800);
      }, 450);
    }
  }

  // =========================
  // FINAL SECTION OBSERVER
  // =========================
  if (finale) {
    const finaleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            finale.classList.add("active");
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    finaleObserver.observe(finale);
  }

  // =========================
  // GENTLE HEART FLOATING
  // =========================
  function createFloatingHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration =
      5 + Math.random() * 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 9000);
  }

  // Very light effect — no performance-heavy particles
  setInterval(createFloatingHeart, 3500);

  // =========================
  // SMOOTH ANCHOR SCROLL
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
