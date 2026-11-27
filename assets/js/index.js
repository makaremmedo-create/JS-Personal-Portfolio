// ^ Write your JavaScript code here

var html = document.documentElement;

// 1- active link
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll(".nav-links a");

function changeActiveLink() {
    var current = "";
    // console.log(window.scrollY);

    for (var i = 0; i < sections.length; i++) {
        if (window.scrollY >= sections[i].offsetTop - 100) {
            current = sections[i].getAttribute("id");
        }
    }

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
        if (navLinks[i].getAttribute("href") == "#" + current) {
            navLinks[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", changeActiveLink);
changeActiveLink();

// menu (mobile)
var menuBtn = document.getElementById("menu-btn");
var navBox = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navBox.classList.toggle("active");
    if (navBox.classList.contains("active")) {
        menuBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
        menuBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
});

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navBox.classList.remove("active");
        menuBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    });
}

// 2- dark & light mode
var themeBtn = document.getElementById("theme-toggle-button");

if (localStorage.getItem("theme") == "light") {
    html.classList.remove("dark");
} else {
    html.classList.add("dark");
}

themeBtn.addEventListener("click", function () {
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
});

// 3- portfolio tabs
var filterBtns = document.querySelectorAll(".portfolio-filter");
var projects = document.querySelectorAll(".portfolio-item");

for (var i = 0; i < projects.length; i++) {
    projects[i].style.transition = "opacity 0.3s ease, transform 0.3s ease";
}

for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");

        for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");
            filterBtns[j].classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");
        }
        this.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");
        this.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");

        showProjects(filter);
    });
}

function showProjects(filter) {
    // hide all first
    for (var i = 0; i < projects.length; i++) {
        projects[i].style.opacity = "0";
        projects[i].style.transform = "scale(0.8)";
    }

    setTimeout(function () {
        for (var i = 0; i < projects.length; i++) {
            var category = projects[i].getAttribute("data-category");
            if (filter == "all" || category == filter) {
                projects[i].style.display = "block";
            } else {
                projects[i].style.display = "none";
            }
        }

        setTimeout(function () {
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].style.display == "block") {
                    projects[i].style.opacity = "1";
                    projects[i].style.transform = "scale(1)";
                }
            }
        }, 50);
    }, 300);
}

// 4- carousel
var carousel = document.getElementById("testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var dots = document.querySelectorAll(".carousel-indicator");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var currentSlide = 0;

function getCardsCount() {
    if (window.innerWidth < 640) {
        return 1;
    } else if (window.innerWidth < 1024) {
        return 2;
    }
    return 3;
}

function getLastSlide() {
    return cards.length - getCardsCount();
}

function moveCarousel() {
    if (currentSlide > getLastSlide()) {
        currentSlide = getLastSlide();
    }

    var step = 100 / getCardsCount();
    carousel.style.transform = "translateX(" + currentSlide * step + "%)";

    for (var i = 0; i < dots.length; i++) {
        if (i == currentSlide) {
            dots[i].classList.add("active", "bg-accent", "scale-125");
            dots[i].classList.remove("bg-slate-400", "dark:bg-slate-600");
        } else {
            dots[i].classList.remove("active", "bg-accent", "scale-125");
            dots[i].classList.add("bg-slate-400", "dark:bg-slate-600");
        }
    }
}

nextBtn.addEventListener("click", function () {
    if (currentSlide < getLastSlide()) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    moveCarousel();
});

prevBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = getLastSlide();
    }
    moveCarousel();
});

for (var i = 0; i < dots.length; i++) {
    dots[i].setAttribute("data-index", i);
    dots[i].addEventListener("click", function () {
        var index = Number(this.getAttribute("data-index"));
        if (index <= getLastSlide()) {
            currentSlide = index;
            moveCarousel();
        }
    });
}

window.addEventListener("resize", moveCarousel);
moveCarousel();

// 5- settings sidebar
var sidebar = document.getElementById("settings-sidebar");
var settingsBtn = document.getElementById("settings-toggle");
var closeBtn = document.getElementById("close-settings");
var resetBtn = document.getElementById("reset-settings");
var fontBtns = document.querySelectorAll(".font-option");
var colorsGrid = document.getElementById("theme-colors-grid");

var colors = [
    { name: "Purple Blue", primary: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" },
    { name: "Pink Orange", primary: "#ec4899", secondary: "#f97316", accent: "#fb923c" },
    { name: "Green Emerald", primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    { name: "Blue Cyan", primary: "#3b82f6", secondary: "#06b6d4", accent: "#22d3ee" },
    { name: "Red Rose", primary: "#ef4444", secondary: "#f43f5e", accent: "#fb7185" },
    { name: "Amber Orange", primary: "#f59e0b", secondary: "#ea580c", accent: "#fbbf24" },
];

function openSidebar() {
    // sidebar.style.transform = "translateX(0)";
    sidebar.classList.remove("translate-x-full");
    settingsBtn.style.right = "20rem";
}

function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    settingsBtn.style.right = "0";
}

settingsBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);

document.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target)) {
        closeSidebar();
    }
});

// fonts
function changeFont(font) {
    document.body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    document.body.classList.add("font-" + font);

    for (var i = 0; i < fontBtns.length; i++) {
        if (fontBtns[i].getAttribute("data-font") == font) {
            fontBtns[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontBtns[i].classList.remove("border-slate-200", "dark:border-slate-700");
        } else {
            fontBtns[i].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontBtns[i].classList.add("border-slate-200", "dark:border-slate-700");
        }
    }

    localStorage.setItem("font", font);
}

for (var i = 0; i < fontBtns.length; i++) {
    fontBtns[i].addEventListener("click", function () {
        changeFont(this.getAttribute("data-font"));
    });
}

// colors
var cartona = "";
for (var i = 0; i < colors.length; i++) {
    cartona += `<button
        class="color-btn w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
        style="background: linear-gradient(135deg, ${colors[i].primary}, ${colors[i].secondary})"
        title="${colors[i].name}"
        onclick="changeColor(${i})"
    ></button>`;
}
colorsGrid.innerHTML = cartona;
console.log(colors);

var colorBtns = document.querySelectorAll(".color-btn");

function changeColor(index) {
    html.style.setProperty("--color-primary", colors[index].primary);
    html.style.setProperty("--color-secondary", colors[index].secondary);
    html.style.setProperty("--color-accent", colors[index].accent);

    for (var i = 0; i < colorBtns.length; i++) {
        colorBtns[i].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    }
    colorBtns[index].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");

    localStorage.setItem("color", index);
}

resetBtn.addEventListener("click", function () {
    localStorage.removeItem("font");
    localStorage.removeItem("color");
    changeFont("tajawal");
    changeColor(0);
    closeSidebar();
});

// load saved settings
if (localStorage.getItem("font") != null) {
    changeFont(localStorage.getItem("font"));
} else {
    changeFont("tajawal");
}

if (localStorage.getItem("color") != null) {
    changeColor(Number(localStorage.getItem("color")));
}

// 6- scroll to top
var topBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topBtn.classList.remove("opacity-0", "invisible");
        topBtn.classList.add("opacity-100", "visible");
    } else {
        topBtn.classList.remove("opacity-100", "visible");
        topBtn.classList.add("opacity-0", "invisible");
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// select in contact form
var selects = document.querySelectorAll(".custom-select");

for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener("click", function (e) {
        e.stopPropagation();
        var list = this.nextElementSibling;
        var arrow = this.querySelector(".fa-chevron-down");
        closeSelects(list);
        list.classList.toggle("hidden");
        if (list.classList.contains("hidden")) {
            arrow.style.transform = "rotate(0deg)";
        } else {
            arrow.style.transform = "rotate(180deg)";
        }
    });
}

var options = document.querySelectorAll(".custom-option");

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function (e) {
        e.stopPropagation();
        var option = this;
        var list = option.parentElement;
        var text = list.previousElementSibling.querySelector(".selected-text");

        text.innerHTML = option.getAttribute("data-value");
        text.classList.remove("text-slate-400", "text-slate-500", "dark:text-slate-400");
        text.classList.add("text-slate-800", "dark:text-white");

        var siblings = list.querySelectorAll(".custom-option");
        for (var j = 0; j < siblings.length; j++) {
            siblings[j].classList.remove("bg-primary/10");
        }
        option.classList.add("bg-primary/10");

        closeSelects(null);
    });
}

function closeSelects(except) {
    var lists = document.querySelectorAll(".custom-options");
    for (var i = 0; i < lists.length; i++) {
        if (lists[i] != except) {
            lists[i].classList.add("hidden");
            lists[i].previousElementSibling.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)";
        }
    }
}

document.addEventListener("click", function () {
    closeSelects(null);
});

// console.log("done");
