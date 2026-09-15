// ──────────────────────────────────────────
// Section Switcher
// ──────────────────────────────────────────
function showSection(id) {
    ["home","about","projects","contact"].forEach(s => {
        document.getElementById(s).style.display = (s === id) ? "block" : "none";
    });
}
function showHome()    { showSection("home"); }
function showAbout()   { showSection("about"); }
function showTopics()  { showSection("projects"); }
function showContact() { showSection("contact"); }

// ──────────────────────────────────────────
// Rotating word swap
// ──────────────────────────────────────────
const words = ["Vibe Programmer", "Prompt Developer", "Frontend Hobbyist", "Creative Technologist", "UI/UX Engineer"];
const el = document.getElementById("word-swap");
let index = 0;

function rotateWord() {
    el.classList.add("fade-out");
    setTimeout(() => {
        index = (index + 1) % words.length;
        el.textContent = words[index];
        el.classList.remove("fade-out");
    }, 500);
}
setInterval(rotateWord, 2500);

// ──────────────────────────────────────────
// Page intro animation (from cover page)
// ──────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("page-intro-overlay");
    const body = document.body;

    // Overlay fades out, body fades in
    setTimeout(() => {
        overlay.classList.add("done");
    }, 100);
    setTimeout(() => {
        body.classList.remove("page-hidden");
        body.classList.add("page-visible");
    }, 200);

    showHome();
});

// ──────────────────────────────────────────
// Sticky header minimise on scroll
// ──────────────────────────────────────────
const navHeader = document.getElementById("nav-header");
window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 50) {
        navHeader.classList.add("minimized");
    } else {
        navHeader.classList.remove("minimized");
    }
});

// ──────────────────────────────────────────
// Project card modal
// ──────────────────────────────────────────
const modal = document.getElementById("project-modal");
let modalMediaIndex = 0;
let modalMediaItems = [];

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const title   = card.dataset.title;
        const desc    = card.dataset.desc;

        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-desc").textContent  = desc;

        const mediaContainer = document.getElementById("modal-media-container");
        mediaContainer.innerHTML = "";
        modalMediaItems = [];
        modalMediaIndex = 0;

        // Get all media from the carousel
        const mediaElements = card.querySelectorAll(".media-container");
        mediaElements.forEach((element, index) => {
            const img = element.querySelector("img");
            const video = element.querySelector("video");
            
            let mediaDiv = document.createElement("div");
            mediaDiv.className = "modal-media-item";
            mediaDiv.style.display = index === 0 ? "block" : "none";
            
            if (img) {
                const newImg = img.cloneNode(true);
                newImg.style.maxWidth = "100%";
                newImg.style.height = "auto";
                mediaDiv.appendChild(newImg);
            } else if (video) {
                const newVideo = video.cloneNode(true);
                newVideo.style.maxWidth = "100%";
                newVideo.controls = true;
                newVideo.playsInline = true;
                mediaDiv.appendChild(newVideo);
            }
            
            mediaContainer.appendChild(mediaDiv);
            modalMediaItems.push(mediaDiv);
        });

        // Show/hide navigation buttons based on media count
        const prevBtn = document.querySelector(".prev-modal-btn");
        const nextBtn = document.querySelector(".next-modal-btn");
        
        if (modalMediaItems.length > 1) {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }

        // Show modal with animation
        modal.style.display = "block";
        requestAnimationFrame(() => {
            modal.classList.add("show");
        });

        document.body.style.overflow = "hidden";
    });
});

function nextModalMedia() {
    if (modalMediaItems.length <= 1) return;
    
    modalMediaItems[modalMediaIndex].style.display = "none";
    modalMediaIndex = (modalMediaIndex + 1) % modalMediaItems.length;
    modalMediaItems[modalMediaIndex].style.display = "block";
}

function prevModalMedia() {
    if (modalMediaItems.length <= 1) return;
    
    modalMediaItems[modalMediaIndex].style.display = "none";
    modalMediaIndex = (modalMediaIndex - 1 + modalMediaItems.length) % modalMediaItems.length;
    modalMediaItems[modalMediaIndex].style.display = "block";
}

function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("modal-media-container").innerHTML = "";
    }, 300);
    document.body.style.overflow = "";
}

// Close on backdrop click
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// ──────────────────────────────────────────
// Animated ember background
// ──────────────────────────────────────────
(function () {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles;

    function resize() {
        width  = canvas.width  = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles(count) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push({
                x:       Math.random() * width,
                y:       Math.random() * height,
                r:       Math.random() * 1.8 + 0.4,
                speedY:  Math.random() * 0.4 + 0.1,
                speedX:  (Math.random() - 0.5) * 0.3,
                alpha:   Math.random() * 0.5 + 0.2,
                flicker: Math.random() * 0.02 + 0.005
            });
        }
        return arr;
    }

    function init() {
        resize();
        const count = Math.min(120, Math.floor((width * height) / 12000));
        particles = createParticles(count);
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
            p.y     -= p.speedY;
            p.x     += p.speedX;
            p.alpha += (Math.random() - 0.5) * p.flicker;
            p.alpha  = Math.max(0.1, Math.min(0.7, p.alpha));
            if (p.y < -10)        { p.y = height + 10; p.x = Math.random() * width; }
            if (p.x < -10)          p.x = width + 10;
            if (p.x > width + 10)   p.x = -10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle   = "rgba(255, 176, 96, " + p.alpha + ")";
            ctx.shadowColor = "rgba(255, 140, 60, 0.8)";
            ctx.shadowBlur  = 4;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        resize();
        particles = createParticles(Math.min(120, Math.floor((width * height) / 12000)));
    });

    init();
    requestAnimationFrame(draw);
})();

// ──────────────────────────────────────────
// Project Card Carousel Navigation
// ──────────────────────────────────────────
function nextMedia(button) {
    const carousel = button.parentElement;
    const containers = carousel.querySelectorAll(".media-container");
    
    if (containers.length <= 1) return;
    
    let currentIndex = 0;
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].style.display !== "none") {
            currentIndex = i;
            break;
        }
    }
    
    containers[currentIndex].style.display = "none";
    const nextIndex = (currentIndex + 1) % containers.length;
    containers[nextIndex].style.display = "block";
}

function prevMedia(button) {
    const carousel = button.parentElement;
    const containers = carousel.querySelectorAll(".media-container");
    
    if (containers.length <= 1) return;
    
    let currentIndex = 0;
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].style.display !== "none") {
            currentIndex = i;
            break;
        }
    }
    
    containers[currentIndex].style.display = "none";
    const prevIndex = (currentIndex - 1 + containers.length) % containers.length;
    containers[prevIndex].style.display = "block";
}
