document.addEventListener('DOMContentLoaded', () => {
    // Mobile Hamburger Injection
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (navbar && navLinks && window.innerWidth <= 1000) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        navbar.appendChild(hamburgerBtn);

        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            // Toggle hamburger icon between menu and close (X)
            if (navLinks.classList.contains('mobile-active')) {
                hamburgerBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            } else {
                hamburgerBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                hamburgerBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            });
        });
    }

    // Immersive Reading Variable & Logic
    let inactivityTimer;

    function resetInactivityTimer() {
        if (navbar) {
            navbar.classList.remove('navbar-hidden');
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                const isMenuOpen = navLinks && navLinks.classList.contains('mobile-active');
                // Only hide if scrolled enough and menu is closed
                if (window.scrollY > 150 && !isMenuOpen) {
                    navbar.classList.add('navbar-hidden');
                }
            }, 3000);
        }
    }

    // Nav scroll effect & integration
    const revealNavbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            resetInactivityTimer();
        }, { passive: true });

        window.addEventListener('mousemove', resetInactivityTimer, { passive: true });
        window.addEventListener('touchstart', resetInactivityTimer, { passive: true });

        navbar.addEventListener('mouseenter', () => clearTimeout(inactivityTimer));
        navbar.addEventListener('mouseleave', resetInactivityTimer);

        resetInactivityTimer();
    }

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Auto-collapse logo text into icon after 3.5 seconds
    const logo = document.querySelector('.custom-logo');
    if (logo) {
        setTimeout(() => {
            logo.classList.add('logo-collapsed');
        }, 3500);
    }
});
