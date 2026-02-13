document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const valentineDate = new Date('February 14, 2026 00:00:00').getTime(); // Adjust year if needed
    const loveMessages = [
        "Thinking of you makes my day brighter...",
        "I cherish every moment with you...",
        "You are my favorite person...",
        "I love you more than words can say! ❤️"
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenMessages = 2000;

    // --- Elements ---
    const typewriterElement = document.getElementById('typewriter-text');
    // const playMusicBtn = document.getElementById('playMusic'); // Removed
    const bgMusic = document.getElementById('bgMusic');
    // const yesBtn = document.getElementById('yesBtn'); // Removed
    // const noBtn = document.getElementById('noBtn');   // Removed
    const celebrationOverlay = document.getElementById('celebration');
    const startBtn = document.getElementById('startBtn');
    const mainContent = document.getElementById('main-content');

    // --- Background Music State ---
    let isPlaying = false;

    // --- Smooth Scroll & Music Start ---
    startBtn.addEventListener('click', () => {
        mainContent.scrollIntoView({ behavior: 'smooth' });
        // Try to play music when user clicks "Click Here" (User Interaction)
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
            }).catch(e => console.log("Audio play failed:", e));
        }
    });

    // Attempt Auto-play on load (might be blocked by browser)
    bgMusic.play().then(() => {
        isPlaying = true;
    }).catch(e => {
        console.log("Autoplay blocked. Waiting for interaction.");
    });

    // --- Typewriter Effect ---
    function typeEffect() {
        const currentMessage = loveMessages[messageIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            setTimeout(() => isDeleting = true, delayBetweenMessages);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % loveMessages.length;
        }

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(typeEffect, speed);
    }

    // Start Typewriter
    setTimeout(typeEffect, 1000); // 1s delay before starting




    // --- Love Counter ---
    // Set your start date here (Year, Month (0-11), Day)
    const startDate = new Date(2022, 6, 25); // July 25, 2022 (Matches 3Y 6M 19D from Feb 13, 2026)

    function updateLoveCounter() {
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        // Adjust for negative days/months
        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        document.getElementById('love-years').textContent = years;
        document.getElementById('love-months').textContent = months;
        document.getElementById('love-days').textContent = days;
    }

    updateLoveCounter();
    setInterval(updateLoveCounter, 1000 * 60 * 60); // Update every hour is enough

    // --- Floating Hearts Logic ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️'; // standard emoji
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 5 + "s"; // 5-8s duration
        heart.style.fontSize = Math.random() * 20 + 10 + "px"; // 10-30px size

        document.querySelector('.hearts-container').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(createHeart, 300);

    // --- Forever Button Interaction ---
    const foreverBtn = document.getElementById('foreverBtn');

    foreverBtn.addEventListener('click', () => {
        // Show celebration
        celebrationOverlay.classList.remove('hidden');
        setTimeout(() => celebrationOverlay.classList.add('visible'), 10);

        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        // Continuous confetti for a bit
        let end = Date.now() + 3000;
        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d6d', '#ff8fa3']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4d6d', '#ff8fa3']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });

});
