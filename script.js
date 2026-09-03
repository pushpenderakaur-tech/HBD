/* =========================================
   HIMANSHI BIRTHDAY WEBSITE
   Smooth & Lightweight Script
   ========================================= */

/* -----------------------------------------
   SCROLL TO MESSAGE
   ----------------------------------------- */

function scrollToMessage() {
    const message = document.getElementById("message");

    if (message) {
        message.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* -----------------------------------------
   MUSIC
   ----------------------------------------- */

const birthdayMusic = document.getElementById("birthdayMusic");

function startMusic() {
    if (!birthdayMusic) return;

    birthdayMusic.volume = 0.45;

    const playPromise = birthdayMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Browser autoplay restriction.
            // Music will start after the user's first interaction.
        });
    }
}

/* Try autoplay */

window.addEventListener("load", () => {
    setTimeout(() => {
        startMusic();
    }, 500);
});

/* Start music on first user interaction */

document.addEventListener("click", startMusic, {
    once: true,
    passive: true
});

document.addEventListener("touchstart", startMusic, {
    once: true,
    passive: true
});

document.addEventListener("scroll", startMusic, {
    once: true,
    passive: true
});


/* -----------------------------------------
   PHOTO REVEAL ANIMATION
   ----------------------------------------- */

const photoCards = document.querySelectorAll(".photo-card");

if (photoCards.length > 0) {

    const photoObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    photoCards.forEach((card) => {
        photoObserver.observe(card);
    });
}


/* -----------------------------------------
   CANDLE
   ----------------------------------------- */

function blowCandle() {

    const flame = document.getElementById("flame");
    const message = document.getElementById("wish-message");

    if (!flame || flame.style.display === "none") {
        return;
    }

    /* Hide flame */

    flame.style.opacity = "0";
    flame.style.transform = "scale(0.5)";

    setTimeout(() => {
        flame.style.display = "none";
    }, 250);

    /* Change message */

    if (message) {
        message.textContent =
            "Wish made? ✨ Happy Birthday, Himanshi! ❤️";
    }

    /* Small celebration */

    createFireworks();
}


/* -----------------------------------------
   FLOATING HEARTS
   ----------------------------------------- */

function createHeart() {

    const heart = document.createElement("div");

    heart.textContent = "♥";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";

    heart.style.fontSize =
        (11 + Math.random() * 9) + "px";

    heart.style.color = "#df91aa";
    heart.style.opacity = "0.45";

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "10";

    document.body.appendChild(heart);

    const duration =
        6000 + Math.random() * 1500;

    const drift =
        (Math.random() * 40) - 20;

    const animation = heart.animate(
        [
            {
                transform: "translate3d(0, 0, 0)",
                opacity: 0
            },
            {
                transform: "translate3d(" + drift + "px, -50vh, 0)",
                opacity: 0.45
            },
            {
                transform: "translate3d(" + (-drift) + "px, -110vh, 0)",
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );

    animation.onfinish = () => {
        heart.remove();
    };
}


/* One heart every 2.2 seconds */

setInterval(createHeart, 2200);


/* -----------------------------------------
   FIREWORKS
   ----------------------------------------- */

function createFireworks() {

    const particles = 24;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particles; i++) {

        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = "50%";
        particle.style.top = "45%";

        particle.style.width = "4px";
        particle.style.height = "4px";

        particle.style.borderRadius = "50%";

        particle.style.background = "#ffd1df";

        particle.style.pointerEvents = "none";
        particle.style.zIndex = "100";

        fragment.appendChild(particle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            70 + Math.random() * 130;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        const animation = particle.animate(
            [
                {
                    transform: "translate3d(0, 0, 0)",
                    opacity: 1
                },
                {
                    transform:
                        "translate3d(" +
                        x +
                        "px, " +
                        y +
                        "px, 0)",

                    opacity: 0
                }
            ],
            {
                duration: 850 + Math.random() * 200,
                easing: "cubic-bezier(0.1, 0.7, 0.2, 1)"
            }
        );

        animation.onfinish = () => {
            particle.remove();
        };
    }

    document.body.appendChild(fragment);
}


/* -----------------------------------------
   FINAL SECTION CELEBRATION
   ----------------------------------------- */

const finalSection =
    document.getElementById("final");

if (finalSection) {

    let celebrationDone = false;

    const finalObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !celebrationDone
                    ) {

                        celebrationDone = true;

                        /* First fireworks */

                        createFireworks();

                        /* Second small burst */

                        setTimeout(() => {
                            createFireworks();
                        }, 900);

                        observer.unobserve(finalSection);
                    }

                });

            },
            {
                threshold: 0.45
            }
        );

    finalObserver.observe(finalSection);
}


/* -----------------------------------------
   PAGE VISIBILITY
   ----------------------------------------- */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            !document.hidden &&
            birthdayMusic &&
            birthdayMusic.paused
        ) {
            startMusic();
        }

    }
);
