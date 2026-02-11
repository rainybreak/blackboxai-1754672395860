/**
 * Farzet — Ultra Modern Portfolio
 * Advanced interactions, toast system, animations
 */
(function () {
    'use strict';

    // ===== TOAST NOTIFICATION SYSTEM =====
    const ToastManager = {
        container: null,
        toasts: [],

        init() {
            this.container = document.getElementById('toastContainer');
        },

        show(options) {
            const {
                type = 'info',
                title = '',
                message = '',
                duration = 4000,
                icon = null
            } = options;

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            const iconMap = {
                success: '✓',
                error: '✕',
                info: 'ℹ'
            };

            const toastIcon = icon || iconMap[type] || 'ℹ';

            toast.innerHTML = `
                <div class="toast-icon">${toastIcon}</div>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    ${message ? `<div class="toast-message">${message}</div>` : ''}
                </div>
                <button class="toast-close" aria-label="Kapat">×</button>
            `;

            this.container.appendChild(toast);
            this.toasts.push(toast);

            // Close button
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.hide(toast));

            // Auto hide
            if (duration > 0) {
                setTimeout(() => this.hide(toast), duration);
            }

            return toast;
        },

        hide(toast) {
            toast.classList.add('hiding');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                const index = this.toasts.indexOf(toast);
                if (index > -1) {
                    this.toasts.splice(index, 1);
                }
            }, 300);
        },

        success(title, message, duration) {
            return this.show({ type: 'success', title, message, duration });
        },

        error(title, message, duration) {
            return this.show({ type: 'error', title, message, duration });
        },

        info(title, message, duration) {
            return this.show({ type: 'info', title, message, duration });
        }
    };

    // ===== PARTICLE SYSTEM =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = window.innerWidth > 768 ? 50 : 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ===== SCROLL PROGRESS BAR =====
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (!scrollProgress) return;

        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== NAVBAR SCROLL BEHAVIOR =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // ===== ACTIVE SECTION TRACKING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a[data-section]');

    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-100px 0px -40% 0px',
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // ===== MOBILE MENU =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });

        navLinksContainer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (
                navLinksContainer.classList.contains('open') &&
                !navLinksContainer.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                menuToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 90;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ===== SCROLL INDICATOR AUTO-HIDE =====
    const scrollIndicator = document.getElementById('scrollIndicator');

    function handleScrollIndicator() {
        if (window.scrollY > 150 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    }

    // ===== HERO PARALLAX EFFECT =====
    const heroContent = document.getElementById('heroContent');

    function handleParallax() {
        if (!heroContent) return;
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const opacity = 1 - scrollY / (window.innerHeight * 0.7);
            const translateY = scrollY * 0.4;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = 'translateY(' + translateY + 'px)';
        }
    }

    // ===== COPY EMAIL TO CLIPBOARD =====
    const copyEmailBtn = document.getElementById('copyEmailBtn');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
            const email = this.getAttribute('data-email');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email)
                    .then(function () {
                        ToastManager.success(
                            'Kopyalandı!',
                            'E-posta adresi panoya kopyalandı.',
                            3000
                        );
                    })
                    .catch(function () {
                        fallbackCopyEmail(email);
                    });
            } else {
                fallbackCopyEmail(email);
            }
        });
    }

    function fallbackCopyEmail(email) {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            ToastManager.success(
                'Kopyalandı!',
                'E-posta adresi panoya kopyalandı.',
                3000
            );
        } catch (err) {
            ToastManager.error(
                'Hata',
                'Kopyalama başarısız oldu.',
                3000
            );
        }

        document.body.removeChild(textArea);
    }

    // ===== MAGNETIC BUTTON EFFECT (Desktop only) =====
    if (window.matchMedia('(pointer: fine)').matches) {
        const magneticElements = document.querySelectorAll('.btn, .social-card, .project-card, .skill-card, .music-card');

        magneticElements.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = x * 0.15;
                const moveY = y * 0.15;

                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = '';
            });
        });
    }

    // ===== CARD TILT EFFECT (3D) =====
    if (window.matchMedia('(pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.project-card, .skill-card');

        tiltCards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    // ===== RIPPLE EFFECT ON CLICK =====
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const rippleButtons = document.querySelectorAll('.btn, .contact-email-btn, .music-listen-btn');
    rippleButtons.forEach(function (btn) {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.addEventListener('click', createRipple);
    });

    // ===== CURSOR GLOW EFFECT (Desktop) =====
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transition: transform 0.2s ease;
            transform: translate(-50%, -50%);
            will-change: transform;
        `;
        document.body.appendChild(cursorGlow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    // ===== INTRO ANIMATION SEQUENCE =====
    document.addEventListener('DOMContentLoaded', function () {
        const introOverlay = document.getElementById('intro-overlay');
        const heroContent = document.getElementById('heroContent');
        const scrollIndicator = document.getElementById('scrollIndicator');
        const navbar = document.getElementById('navbar');

        // Initialize Toast Manager
        ToastManager.init();

        // Create particles
        createParticles();

        // Intro animation timing (preserved)
        setTimeout(function () {
            introOverlay.classList.add('finished');

            setTimeout(function () {
                document.body.classList.remove('intro-active');
                heroContent.classList.add('visible');

                setTimeout(function () {
                    navbar.classList.add('visible');
                    scrollIndicator.classList.add('visible');

                    // Welcome toast
                    setTimeout(function () {
                        ToastManager.info(
                            'Hoş geldiniz! 👋',
                            'Portföyümü keşfetmeye başlayabilirsiniz.',
                            5000
                        );
                    }, 800);
                }, 600);
            }, 600);
        }, 3500);
    });

    // ===== EVENT LISTENERS =====
    window.addEventListener('scroll', function () {
        handleNavbarScroll();
        handleScrollIndicator();
        handleParallax();
        updateScrollProgress();
    }, { passive: true });

    // ===== EASTER EGG: Konami Code =====
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function (e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            ToastManager.success(
                '🎮 Konami Code!',
                'Gizli kod bulundu! Tebrikler!',
                5000
            );
            konamiCode = [];

            // Fun animation
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(function () {
                document.body.style.animation = '';
            }, 2000);
        }
    });

    // Rainbow animation for easter egg
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // ===== PERFORMANCE: Debounce resize events =====
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // Recreate particles on resize
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
                createParticles();
            }
        }, 250);
    });

    // ===== ACCESSIBILITY: Focus visible =====
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-nav');
    });

    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        body.keyboard-nav *:focus {
            outline: 2px solid var(--color-accent);
            outline-offset: 4px;
        }
    `;
    document.head.appendChild(focusStyle);

    // ===== LINK CLICK FEEDBACK =====
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            const linkText = this.textContent.trim() || this.querySelector('span')?.textContent || 'Link';
            ToastManager.info(
                'Yönlendiriliyor...',
                `${linkText} açılıyor.`,
                2000
            );
        });
    });

    // ===== CONSOLE MESSAGE =====
    console.log('%c🎵 Farzet Portfolio', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
    console.log('%cMade with ❤️ by Farzet', 'font-size: 14px; color: #a78bfa;');
    console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 12px; color: #666;');
    console.log('%chttps://github.com/farzetyokumben', 'font-size: 12px; color: #8b5cf6; text-decoration: underline;');
})();
