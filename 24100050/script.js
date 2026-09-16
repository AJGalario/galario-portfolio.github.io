function showHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("about").style.display = "none"; 
    document.getElementById("projects").style.display = "none";
    document.getElementById("contact").style.display = "none";
}

function showAbout() {
    document.getElementById("home").style.display = "none";
    document.getElementById("about").style.display = "block";
    document.getElementById("projects").style.display = "none";
    document.getElementById("contact").style.display = "none";
}

function showTopics() {
    document.getElementById("home").style.display = "none"; 
    document.getElementById("about").style.display = "none";    
    document.getElementById("projects").style.display = "block";
    document.getElementById("contact").style.display = "none";
}

function showContact() {
    document.getElementById("home").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("projects").style.display = "none";
    document.getElementById("contact").style.display = "block";
}
const words = ["Vibe Programmer", "Prompt Developer", "Frontend Hobbyist", "Creative Technologist", "UI/UX Engineer"];
const el = document.getElementById("word-swap");
let index = 0;

function rotateWord() {
  el.classList.add("fade-out");

  setTimeout(() => {
    index = (index + 1) % words.length;
    el.textContent = words[index];
    el.classList.remove("fade-out");
  }, 500); // matches the CSS transition duration
}

setInterval(rotateWord, 2500); // change word every 2.5s

// Initially show the Home section
showHome();

// Scroll-to-hide navigation header functionality
let lastScrollTop = 0;
const navHeader = document.getElementById("nav-header");

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // If scrolling down, hide the nav header
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navHeader.classList.add("hide");
    } 
    // If scrolling up, show the nav header
    else {
        navHeader.classList.remove("hide");
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
