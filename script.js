// ===============================
// SMOOTH SCROLL
// ===============================

function scrollToMessage() {
    document.getElementById("message").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// CANDLE / BIRTHDAY WISH
// ===============================

function blowCandle() {

    const flame = document.getElementById("flame");
    const message = document.getElementById("wish-message");

    if (flame.style.display === "none") {
        return;
    }

    flame.style.display = "none";

    message.innerHTML =
        "Wish made? ✨ Happy Birthday, Himanshi! ❤️";

    createFireworks();
}


// ===============================
// FLOATING HEARTS
// ===============================

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "♥";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.color = "#e889a7";
    heart.style.opacity = "0.7";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "500";

    document.body.appendChild(heart);

    const duration = 5000 + Math.random() * 4000;

    heart.animate(
        [
            {
                transform: "translateY(0) rotate(0deg)",
                opacity: 0
            },
            {
                transform: "translateY(-50vh) rotate(25deg)",
                opacity: 0.8
            },
            {
                transform: "translateY(-110vh) rotate(-25deg)",
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "ease-out"
        }
    );

    setTimeout(() => {
        heart.remove();
    }, duration);
}


// Create hearts continuously

setInterval(createHeart, 900);


// ===============================
// FIREWORKS
// ===============================

function createFireworks() {

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = "50%";
        particle.style.top = "45%";
        particle.style.width = "5px";
        particle.style.height = "5px";
        particle.style.borderRadius = "50%";
        particle.style.background = "#ffd1df";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "999";

        document.body.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 180;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.animate(
            [
                {
                    transform: "translate(0, 0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${x}px, ${y}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "cubic-bezier(.1,.7,.3,1)"
            }
        );

        setTimeout(() => {
            particle.remove();
        }, 1600);
    }
}


// ===============================
// SOFT MUSIC
// ===============================

let audioContext;
let musicPlaying = false;
let musicInterval;

function playSoftMusic() {

    if (!audioContext) {
        audioContext =
            new (window.AudioContext ||
            window.webkitAudioContext)();
    }

    const notes = [
        261.63,
        293.66,
        329.63,
        392.00,
        329.63,
        293.66,
        261.63
    ];

    let index = 0;

    function playNote() {

        if (!musicPlaying) return;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            notes[index];

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.04,
            audioContext.currentTime + 0.05
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 1
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(
            audioContext.currentTime + 1
        );

        index = (index + 1) % notes.length;
    }

    playNote();

    musicInterval =
        setInterval(playNote, 1000);
}


// ===============================
// MUSIC ON / OFF
// ===============================

function toggleMusic() {

    const button =
        document.querySelector(".music-button");

    if (!musicPlaying) {

        musicPlaying = true;

        playSoftMusic();

        button.innerHTML =
            "♫ Music ON";

    } else {

        musicPlaying = false;

        clearInterval(musicInterval);

        button.innerHTML =
            "♫ Soft Music";
    }
}
