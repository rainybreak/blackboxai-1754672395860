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
    const heroImage = document.getElementById('heroImage');
    const heroText = document.querySelector('.hero-text');
    const heroImageContainer = document.querySelector('.hero-image-container');
    const socialDock = document.getElementById('socialDock');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const contactForm = document.getElementById('contactForm');

    // ========== PARTICLE SYSTEM ==========
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

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

    // ========== ENHANCED SCROLL ANIMATIONS WITH STAGGER ==========
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger animation delay based on element index
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(child =>
                    child.classList.contains(entry.target.classList[0])
                );
                const index = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('animate');

                    // Animate skill progress bars
                    if (entry.target.classList.contains('skill-category')) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach((bar, i) => {
                            setTimeout(() => {
                                const progress = bar.getAttribute('data-progress');
                                bar.style.setProperty('--progress-width', `${progress}%`);
                                bar.classList.add('animate');
                            }, i * 100);
                        });
                    }
                }, index * 100);
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

    // ========== ENHANCED TOAST NOTIFICATION SYSTEM ==========
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 15px;
        pointer-events: none;
    `;
    document.body.appendChild(toastContainer);

    function showNotification(message, type = 'info') {
        const icons = {
            success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
            error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
            info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
            warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
        };

        const colors = {
            success: { bg: 'rgba(16, 185, 129, 0.95)', border: '#10b981' },
            error: { bg: 'rgba(239, 68, 68, 0.95)', border: '#ef4444' },
            info: { bg: 'rgba(99, 102, 241, 0.95)', border: '#6366f1' },
            warning: { bg: 'rgba(245, 158, 11, 0.95)', border: '#f59e0b' }
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">×</button>
        `;

        const color = colors[type] || colors.info;
        toast.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            background: ${color.bg};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            border-left: 4px solid ${color.border};
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1) inset;
            backdrop-filter: blur(10px);
            min-width: 300px;
            max-width: 400px;
            pointer-events: auto;
            animation: toastSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transform-origin: right center;
            font-family: 'Poppins', sans-serif;
        `;

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.2s ease;
            margin-left: auto;
        `;

        const icon = toast.querySelector('.toast-icon');
        icon.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `;

        const msgEl = toast.querySelector('.toast-message');
        msgEl.style.cssText = `
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
        `;

        toastContainer.appendChild(toast);

        const removeToast = () => {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        };

        closeBtn.addEventListener('click', removeToast);
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            closeBtn.style.transform = 'scale(1.1)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            closeBtn.style.transform = 'scale(1)';
        });

        setTimeout(removeToast, 5000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastSlideIn {
            from {
                transform: translateX(400px) scale(0.9);
                opacity: 0;
            }
            to {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
        @keyframes toastSlideOut {
            from {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
            to {
                transform: translateX(400px) scale(0.9);
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

    // ========== LOAD MORE PROJECTS ==========
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let projectsRevealed = 0;
    const projectsPerLoad = 2;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Calculate how many projects to reveal
            const projectsToReveal = Math.min(projectsPerLoad, hiddenProjects.length - projectsRevealed);

            // Reveal projects with stagger animation
            for (let i = 0; i < projectsToReveal; i++) {
                const projectIndex = projectsRevealed + i;
                if (projectIndex < hiddenProjects.length) {
                    setTimeout(() => {
                        hiddenProjects[projectIndex].classList.add('reveal');
                    }, i * 150);
                }
            }

            projectsRevealed += projectsToReveal;

            // Hide button if all projects are revealed
            if (projectsRevealed >= hiddenProjects.length) {
                setTimeout(() => {
                    loadMoreBtn.classList.add('hidden');
                    showNotification('Tüm projeler yüklendi!', 'success');
                }, projectsToReveal * 150 + 300);
            } else {
                // Update button text with remaining count
                const remaining = hiddenProjects.length - projectsRevealed;
                loadMoreBtn.innerHTML = `
                    Daha Fazla Yükle (${remaining} kaldı)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px; vertical-align: middle;">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                `;
            }
        });
    }

    // ========== CONSOLE MESSAGE ==========
    console.log('%c👋 Welcome to Farzet Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #9ca3af;');
});
