/* =========================================
   MODERN PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // ========== ELEMENTS ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('mainContent');
    const introOverlay = document.getElementById('intro-overlay');
    const bgVideo = document.getElementById('bgVideo');
    const heroImage = document.getElementById('heroImage');
    const heroText = document.querySelector('.hero-text');
    const heroImageContainer = document.querySelector('.hero-image-container');
    const socialDock = document.getElementById('socialDock');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');

    // ========== VIDEO AUTOPLAY ==========
    bgVideo.play().catch(() => console.log("Video autoplay prevented"));

    // ========== INTRO ANIMATION SEQUENCE ==========
    setTimeout(() => {
        // Remove intro overlay
        introOverlay.classList.add('finished');

        setTimeout(() => {
            // Show main content
            mainContent.classList.add('visible');

            // Show hero image and text
            setTimeout(() => {
                heroImageContainer.classList.add('show');
                heroText.classList.add('show');

                // Show navbar
                setTimeout(() => {
                    navbar.classList.add('visible');

                    // Show social dock
                    setTimeout(() => {
                        socialDock.classList.add('visible');
                    }, 300);
                }, 800);
            }, 400);
        }, 500);
    }, 3500);

    // ========== MOBILE NAVIGATION TOGGLE ==========
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========== SMOOTH SCROLLING ==========
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== ACTIVE NAVIGATION ON SCROLL ==========
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // ========== SCROLL ANIMATIONS ==========
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Animate skill progress bars
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.setProperty('--progress-width', `${progress}%`);
                        bar.classList.add('animate');
                    });
                }
            }
        });
    }, {
        root: null,
        threshold: 0.2
    });

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-title, .about-card, .project-card, .skill-category, .tech-stack, .contact-info, .contact-form'
    );
    animateElements.forEach(el => animateOnScroll.observe(el));

    // ========== SCROLL TO TOP BUTTON ==========
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== PARALLAX EFFECT ON HERO IMAGE ==========
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Parallax effect on hero image
                if (heroImageContainer) {
                    heroImageContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Parallax effect on hero text
                if (heroText) {
                    heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========== CONTACT FORM HANDLING ==========
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link
        const mailtoLink = `mailto:berke@farzet.xyz?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Message prepared! Your email client should open.', 'success');

        // Reset form
        contactForm.reset();
    });

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(99, 102, 241, 0.95);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.5s ease;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========== CURSOR EFFECT (Optional Enhancement) ==========
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Smooth cursor following
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(236, 72, 153, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
        });
    });

    // ========== PERFORMANCE: REDUCE MOTION FOR USERS WHO PREFER IT ==========
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--ease-premium', 'linear');
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ========== LAZY LOADING IMAGES ==========
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                };

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ========== CONSOLE MESSAGE ==========
    console.log('%c👋 Welcome to Farzet Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #9ca3af;');
});
