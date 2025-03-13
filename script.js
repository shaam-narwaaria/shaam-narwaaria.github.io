// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, null, href); // Update URL without page reload
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";
    const scrollPosition = window.scrollY + window.innerHeight / 3; // Consider viewport height

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href").includes(currentSection));
    });
});

// Back to top button
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = "&#8679;"; // Up arrow symbol
backToTopButton.classList.add("back-to-top");
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Add bounce animation
    backToTopButton.classList.add("clicked");
    setTimeout(() => backToTopButton.classList.remove("clicked"), 300);
});

window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("show", window.scrollY > 300);
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
}, { threshold: 0.2 });

document.querySelectorAll(".animate-on-scroll").forEach(element => observer.observe(element));




// Hero Section Typing Text Effect
document.addEventListener("DOMContentLoaded", function () {
    const heroTypingText = document.getElementById("hero-typing-text");
    const heroTextArray = [
        "Software Development Engineer",
        "Full Stack Developer | MERN & Django",
        "Cloud & System Design Enthusiast",
        "Backend Engineer | Java, C++, Python",
        "DevOps & Distributed Systems Specialist"
    ];

    let heroTextIndex = 0;
    let heroCharIndex = 0;
    let heroIsDeleting = false;
    let heroTypingSpeed = 100;
    let heroPauseTime = 1500;

    function heroTypeEffect() {
        let currentText = heroTextArray[heroTextIndex];
        if (heroIsDeleting) {
            heroTypingText.textContent = currentText.substring(0, heroCharIndex--);
            heroTypingSpeed = 50;
        } else {
            heroTypingText.textContent = currentText.substring(0, heroCharIndex++);
            heroTypingSpeed = 100;
        }

        if (!heroIsDeleting && heroCharIndex === currentText.length) {
            setTimeout(() => (heroIsDeleting = true), heroPauseTime);
        } else if (heroIsDeleting && heroCharIndex === 0) {
            heroIsDeleting = false;
            heroTextIndex = (heroTextIndex + 1) % heroTextArray.length;
        }

        setTimeout(heroTypeEffect, heroTypingSpeed);
    }

    heroTypeEffect();
});



//  Particle Animation
const heroCanvas = document.getElementById("hero-particles");
const heroCtx = heroCanvas.getContext("2d");
heroCanvas.width = window.innerWidth;
heroCanvas.height = window.innerHeight;

let heroParticles = [];
const heroNumParticles = 100;

function HeroParticle() {
    this.x = Math.random() * heroCanvas.width;
    this.y = Math.random() * heroCanvas.height;
    this.radius = Math.random() * 3 + 1;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
}

HeroParticle.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > heroCanvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > heroCanvas.height) this.dy *= -1;
};

HeroParticle.prototype.draw = function () {
    heroCtx.beginPath();
    heroCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    heroCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
    heroCtx.fill();
};

function heroInitParticles() {
    for (let i = 0; i < heroNumParticles; i++) {
        heroParticles.push(new HeroParticle());
    }
}

function heroAnimateParticles() {
    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    heroParticles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(heroAnimateParticles);
}

heroInitParticles();
heroAnimateParticles();

window.addEventListener("resize", () => {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
    heroParticles = [];
    heroInitParticles();
});