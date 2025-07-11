// ----- Prevent Right-Click and Keyboard Shortcuts -----
// window.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
// });

window.addEventListener('keydown', (event) => {
    const keys = {
        'F12': () => event.preventDefault(),
        'I': () => event.ctrlKey && event.shiftKey && event.preventDefault(),
        'U': () => event.ctrlKey && event.preventDefault(),
        'C': () => event.ctrlKey && event.shiftKey && event.preventDefault(),
        'J': () => event.ctrlKey && event.shiftKey && event.preventDefault(),
    };

    if (keys[event.key]) keys[event.key]();
});

// ----- Scroll To Top Button -----
function initScrollToTopButton() {
    const topUpBtn = document.getElementById("topupBtn");
    window.onscroll = () => {
        topUpBtn.style.bottom = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "2em" : "-5em";
    };

    topUpBtn.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

// ----- Navigation Button Highlight -----
function initNavigationBtn() {
    const unactiveNavlink = document.querySelectorAll(".unactive");
    const sections = document.querySelectorAll(".section");

    function highlightNavLinks() {
        const top = window.scrollY;
        sections.forEach((sec) => {
            const offset = sec.offsetTop - 100;
            const offsetHeight = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (top >= offset && top < offset + offsetHeight) {
                unactiveNavlink.forEach(link => link.classList.remove("active"));
                document.querySelector(`.unactive[href*="${id}"]`).classList.add("active");
            }
        });
    }

    window.addEventListener('scroll', highlightNavLinks);
}

// ----- Custom Cursor Animation -----
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    let lastX, lastY;

    document.addEventListener('mousemove', (e) => {
        lastX = e.pageX;
        lastY = e.pageY;
        requestAnimationFrame(() => {
            if (cursor.style.display === 'block') {
                cursor.style.left = `${lastX}px`;
                cursor.style.top = `${lastY}px`;
            }
        });
    });

    document.querySelectorAll('.special-section, .special-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
    });
}

// ----- About Section Scroll -----
function initAboutScroll() {
    const aboutContent = document.querySelector('.about-content');
    const scrollBar = document.querySelector('.scroll-bar');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    const updateScrollBar = () => {
        const maxScrollLeft = aboutContent.scrollWidth - aboutContent.clientWidth;
        const scrollLeft = aboutContent.scrollLeft;
        const scrollPercentage = (scrollLeft / maxScrollLeft) * 101;
        scrollBar.style.width = `${scrollPercentage}%`;
    };

    aboutContent.addEventListener('scroll', updateScrollBar);
    leftBtn.addEventListener('click', () => aboutContent.scrollBy({ left: -aboutContent.clientWidth, behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => aboutContent.scrollBy({ left: aboutContent.clientWidth, behavior: 'smooth' }));

    const cursorText = document.getElementById("textPath");
    const hoverAbout = document.getElementById("aboutContent");

    hoverAbout.addEventListener('mousemove', () => {
        cursorText.innerHTML = 'Swipe to Explore • Swipe to Explore •';
        cursorText.style.fontSize = '11.1px';
    });

    hoverAbout.addEventListener('mouseleave', () => {
        cursorText.innerHTML = 'Scroll to Explore • Scroll to Explore •';
        cursorText.style.fontSize = '10.4px';
    });
}

// ----- Product Section Scroll -----
function initProductScrollBtn() {
    const scrollAble = document.querySelectorAll('.scrollAble');
    const leftBtns = document.querySelectorAll('.scrollLeftBtn');
    const rightBtns = document.querySelectorAll('.scrollRightBtn');

    leftBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            scrollAble[Math.floor(index / 2)].scrollBy({ left: -640, behavior: 'smooth' });
        });
    });

    rightBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            scrollAble[Math.floor(index / 2)].scrollBy({ left: 640, behavior: 'smooth' });
        });
    });
}

// ----- Wall/Floor Product Section -----
function initWallFloorProductShowHide() {
    const getCategoryFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('category') || 'all-tiles';
    };

    const filterProducts = (category) => {
        const rows = document.querySelectorAll('.row');
        if (rows.length === 0) {
            console.error("No rows found for filtering.");
            return; // Exit if no rows exist
        }

        let hasVisibleProducts = false;

        rows.forEach(row => {
            const visibleProductCards = Array.from(row.children).filter(card =>
                card.classList.contains('card-wrapper') && card.style.display !== 'none'
            );

            const hasProducts = visibleProductCards.length > 0;

            if (category === 'all-tiles' || row.dataset.category === category) {
                row.style.display = hasProducts ? 'flex' : 'none';
                if (hasProducts) hasVisibleProducts = true;
            } else {
                row.style.display = 'none';
            }
        });

        // Handle no data scenario
        const noDataElement = document.querySelector('.no-data');
        if (noDataElement) {
            noDataElement.style.display = hasVisibleProducts ? 'none' : 'block';
        } else {
            console.warn("No data message element not found.");
        }
    };

    const updateActiveLink = (category) => {
        const links = document.querySelectorAll('.filterLinks li');
        links.forEach(link => {
            const linkCategory = new URL(link.querySelector('a').href).searchParams.get('category');
            if (linkCategory === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const init = () => {
        const category = getCategoryFromURL();
        filterProducts(category);
        updateActiveLink(category);

        const categoryMap = {
            'bathroom-tiles': 'Bathroom',
            'kitchen-tiles': 'Kitchen',
            'bedroom-tiles': 'Bedroom',
            'livingroom-tiles': 'Living Room',
            'outdoor-tiles': 'Outdoor',
            'all-tiles': 'All'
        };

        const Walltitle = categoryMap[category] ? `${categoryMap[category]} Wall Tile Products` : 'All Wall Tile Products';
        const Floortitle = categoryMap[category] ? `${categoryMap[category]} Floor Tile Products` : 'All Floor Tile Products';
        const wallProductTitleElement = document.getElementById("WallProductTitle");
        const floorProductTitleElement = document.getElementById("FloorProductTitle");
        if (wallProductTitleElement) {
            wallProductTitleElement.innerText = Walltitle;
        } else {
            console.warn("Wall Product title element not found.");
        }

        if (floorProductTitleElement) {
            floorProductTitleElement.innerText = Floortitle;
        } else {
            console.warn("Floor Product title element not found.");
        }
    };

    init();
}


// ----- Individual Wall/Floor Product Section -----
function initTimerLocation() {
    const whereTobuyBtn = document.getElementById("whereTobuy");
    const timerElement = document.getElementById("seconds");
    const locationElement = document.getElementById("location");
    let countdown = 30; // Initial countdown value
    let countdownInterval; // Store the interval ID

    if (!whereTobuyBtn || !timerElement || !locationElement) {
        console.error("One or more required elements are missing.");
        return; // Exit if any required element is missing
    }

    const startCountdown = () => {
        countdown = 30;
        timerElement.textContent = countdown;
        locationElement.style.display = "block";

        countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                locationElement.style.display = "none";
                whereTobuyBtn.removeAttribute('disabled');
                timerElement.textContent = "30"; // Reset timer display
            }
        }, 1000);
    };

    whereTobuyBtn.addEventListener("click", () => {
        if (!whereTobuyBtn.disabled) {
            whereTobuyBtn.setAttribute('disabled', 'true');
            startCountdown();
        }
    });
}

function initNavLinks() {
    // When the user clicks on the navigation button, then the glow on text will appear
    const UnactiveNavlink = document.querySelectorAll(".unactive");
    const sections = document.querySelectorAll(".section");

    // Navigation Menu Toggle
    const navBarOpen = document.getElementById("navBtn");
    const navBarClose = document.getElementById("navBtnClose");
    const navBar = document.getElementById("sideMenu");
    const navLinks = navBar.querySelectorAll("a");

    // Consolidated Scroll Function
    window.onscroll = () => {
        highlightNavLinks();
    };

    // Highlight Navigation Links
    function highlightNavLinks() {
        sections.forEach((sec) => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let offsetHeight = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if (top >= offset && top < offset + offsetHeight) {
                UnactiveNavlink.forEach((links) => {
                    links.classList.remove("active");
                    document
                        .querySelector(".unactive[href*=" + id + "]")
                        .classList.add("active");
                });
            }
        });
    }

    navBarOpen.addEventListener("click", () => {
        navBar.style.right = "0%";
        navBar.style.display = "block";
        navBarOpen.style.display = "none";
        navBarClose.style.display = "block";
        document.body.classList.add("no-scroll");
    });

    navBarClose.addEventListener("click", () => {
        navBar.style.right = "-110%";
        navBarOpen.style.display = "block";
        navBarClose.style.display = "none";
        document.body.classList.remove("no-scroll");
        // navBar.style.display = "none";
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navBar.style.right = "-110%";
            navBarOpen.style.display = "block";
            navBarClose.style.display = "none";
            document.body.classList.remove("no-scroll");
        });
    });
}

// ----- Initialize Functions on DOM Load -----
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("custom-cursor")) {
        initCustomCursor();
    }
    if (document.querySelectorAll(".section").length > 0) {
        initNavigationBtn();
    }
    if (document.querySelectorAll('.scrollAble').length > 0) {
        initProductScrollBtn();
    }
    if (document.querySelector('.about-content')) {
        initAboutScroll();
    }
    if (document.querySelector('.row')) {
        initWallFloorProductShowHide();
    }
    if (document.getElementById("whereTobuy") && document.getElementById("seconds") && document.getElementById("location")) {
        initTimerLocation();
    }
    if (document.getElementById("sideMenu")) {
        initNavLinks();
    }
    if (document.getElementById("topupBtn")) {
        initScrollToTopButton();
    }
});
