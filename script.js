// ========================================
// HIMANSHI BIRTHDAY WEBSITE
// ========================================


// ========================================
// 1. HERO BUTTON
// ========================================

function scrollToMessage() {
    document.getElementById("message").scrollIntoView({
        behavior: "smooth"
    });
}


// ========================================
// 2. CANDLE / WISH
// ========================================

function blowCandle() {

    const flame = document.getElementById("flame");
    const message = document.getElementById("wish-message");

    // Candle already blown
    if (flame.style.display === "none") {
        return;
    }

    // Hide flame
    flame.style.display = "none";

    // Change message
    message.innerHTML =
        "Wish made? ✨ Happy Birthday, Himanshi! ❤️";

    // Fireworks
    createFireworks();
}


// ========================================
// 3. FLOATING HEARTS
// ========================================

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "♥";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.color = "#e889a7";
    heart.style.opacity = "0.7";

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "500";

    document.body.appendChild(heart);

    const duration =
        5000 + Math.random() * 4000;

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


// Create a heart every 1 second

setInterval(createHeart, 1000);


// ========================================
// 4. FIREWORKS
// ========================================

function createFireworks() {

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = "50%";
        particle.style.top = "45%";

        particle.style.width = "5px";
        particle.style.height = "5px";

        particle.style.borderRadius = "50%";

        particle.style.background =
            i % 2 === 0
                ? "#ffd1df"
                : "#f3a4bd";

        particle.style.pointerEvents = "none";
        particle.style.zIndex = "999";

        document.body.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 220;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        particle.animate(
            [
                {
                    transform: "translate(0, 0) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${x}px, ${y}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    900 + Math.random() * 700,

                easing:
                    "cubic-bezier(.1,.7,.3,1)"
            }
        );

        setTimeout(() => {
            particle.remove();
        }, 1800);
    }
}


// ========================================
// 5. ACTUAL BIRTHDAY MUSIC
// ========================================

const birthdayMusic =
    document.getElementById("birthdayMusic");

let musicPlaying = false;


// ========================================
// 6. MUSIC ON / OFF
// ========================================

function toggleMusic() {

    const button =
        document.querySelector(".music-button");

    if (!birthdayMusic) {
        alert("Music file nahi mili.");
        return;
    }


    // MUSIC OFF → ON

    if (!musicPlaying) {

        birthdayMusic.volume = 0.5;

        birthdayMusic.play()
            .then(() => {

                musicPlaying = true;

                button.innerHTML =
                    "♫ Music ON";

            })
            .catch(() => {

                alert(
                    "Music start karne ke liye ek baar button dobara dabayein."
                );

            });

    }


    // MUSIC ON → OFF

    else {

        birthdayMusic.pause();

        musicPlaying = false;

        button.innerHTML =
            "♫ Soft Music";
    }
}


// ========================================
// 7. MUSIC ENDED
// ========================================

if (birthdayMusic) {

    birthdayMusic.addEventListener(
        "ended",
        function () {

            musicPlaying = false;

            const button =
                document.querySelector(".music-button");

            if (button) {
                button.innerHTML =
                    "♫ Soft Music";
            }
        }
    );
}


// ========================================
// 8. FINAL BIRTHDAY CELEBRATION
// ========================================

const finalSection =
    document.getElementById("final");


if (finalSection) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            // Small celebration
                            createFireworks();

                            setTimeout(
                                createFireworks,
                                700
                            );

                            setTimeout(
                                createFireworks,
                                1400
                            );
                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );

    observer.observe(finalSection);
}
