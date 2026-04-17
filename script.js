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