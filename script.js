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








