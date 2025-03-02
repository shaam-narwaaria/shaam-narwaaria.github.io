// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        // If the href attribute is just "#", then do nothing.
        if (href === "#") {
            return;
        }
        const target = document.querySelector(href); // href already contains the '#'
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 50) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});




// Back to top button
// Back to top button
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = "&#8679;"; // Up arrow symbol
backToTopButton.classList.add("back-to-top");
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Add a small bounce effect on click
    backToTopButton.classList.add("clicked");
    setTimeout(() => backToTopButton.classList.remove("clicked"), 200);
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});


// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        } else {
            entry.target.classList.remove("in-view");
        }
    });
});

document.querySelectorAll(".animate-on-scroll").forEach(element => {
    observer.observe(element);
});


