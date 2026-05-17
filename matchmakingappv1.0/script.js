        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu when clicking on nav links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.textContent = '☰';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                    navLinks.classList.remove('active');
                    hamburger.textContent = '☰';
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // Prevent default link behavior
                e.preventDefault();
                
                // --- NEW CLASS SWITCHING LOGIC ---
                // 1. Remove 'active' from whoever has it now
                document.querySelector('.active')?.classList.remove('active');
                // 2. Add 'active' to the link that was just clicked
                this.classList.add('active');

                // Get the target section ID from the href attribute
                const targetId = this.getAttribute('href');
                
                // Only scroll if it's an internal link (starts with #)
                if (targetId.startsWith('#')) {
                    // Find the target element
                    const targetElement = document.querySelector(targetId);
                    
                    // Scroll to the element with smooth behavior
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // CONCEPT 9: SCROLL EFFECTS
        // Change header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            // Add shadow when scrolled down more than 100px
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = 'var(--shadow)';
                header.style.background = 'white';
            }
        });

        // CONCEPT 10: ANIMATION ON SCROLL
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.project-card, .about-content, .contact-container');
            
            elements.forEach(element => {
                // Get position of element relative to viewport
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                // If element is in view, add animation class
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial styles for animation
        document.querySelectorAll('.project-card, .about-content, .contact-container').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Run animation on scroll and on page load
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        
        // Run once on page load to animate elements already in view
        setTimeout(animateOnScroll, 300);

        // Set your launch date here
const launchDate = new Date("2026-05-25T00:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".timer").innerHTML = "<h3>Launched!</h3>";
    }
}, 1000);

const timerCard = document.querySelector(".launch-timer-card");
const timerToggle = document.getElementById("timerToggle");

function updateToggleIcon() {
    const isMobile = window.innerWidth <= 767;

    if (timerCard.classList.contains("collapsed")) {
        timerToggle.innerHTML = isMobile ? "↑" : "←";
    } else {
        timerToggle.innerHTML = isMobile ? "↓" : "→";
    }
}

/* Initial icon */
updateToggleIcon();

/* Update when resizing screen */
window.addEventListener("resize", updateToggleIcon);

timerToggle.addEventListener("click", () => {
    timerCard.classList.toggle("collapsed");
    updateToggleIcon();
});

const cards = document.querySelectorAll(".img-card");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function updateCarousel() {

    cards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "left",
            "right",
            "hidden"
        );

        if(index === current){
            card.classList.add("active");
        }

        else if(
            index === (current - 1 + cards.length) % cards.length
        ){
            card.classList.add("left");
        }

        else if(
            index === (current + 1) % cards.length
        ){
            card.classList.add("right");
        }

        else{
            card.classList.add("hidden");
        }
    });
}

function nextSlide(){
    current = (current + 1) % cards.length;
    updateCarousel();
}

function prevSlide(){
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

updateCarousel();

// AUTO LOOP
setInterval(nextSlide, 3000);