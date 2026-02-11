/**
 * Farzet — Portföy Sitesi
 * Scroll animasyonları, navbar davranışı ve mobil menü
 */
(function () {
    'use strict';

    // ===== SCROLL REVEAL ANİMASYONU =====
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
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== NAVBAR SCROLL DAVRANIŞI =====
    var navbar = document.getElementById('navbar');
    var lastScrollY = 0;

    function handleNavbarScroll() {
        var currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ===== AKTİF BÖLÜM TAKİBİ (Navbar linkleri) =====
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-links a[data-section]');

    var sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
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
            rootMargin: '-80px 0px -40% 0px',
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // ===== MOBİL MENÜ =====
    var menuToggle = document.getElementById('menuToggle');
    var navLinksContainer = document.getElementById('navLinks');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });

        // Menü linkine tıklayınca menüyü kapat
        navLinksContainer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
            });
        });

        // Menü dışına tıklayınca kapat
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

    // ===== SMOOTH SCROLL (Navbar linkleri) =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var offset = 80;
                var top =
                    targetEl.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ===== SCROLL İNDİKATÖRÜ GİZLE =====
    var scrollIndicator = document.getElementById('scrollIndicator');

    function handleScrollIndicator() {
        if (window.scrollY > 100 && scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    }

    window.addEventListener('scroll', handleScrollIndicator, { passive: true });

    // ===== PARALAKS ETKİSİ (Hero) =====
    var heroContent = document.getElementById('heroContent');

    function handleParallax() {
        if (!heroContent) return;
        var scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            var opacity = 1 - scrollY / (window.innerHeight * 0.6);
            var translateY = scrollY * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform =
                'translateY(' + translateY + 'px)';
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ===== STAT SAYAÇ ANİMASYONU =====
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsAnimated = false;

    var statsObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        },
        { threshold: 0.5 }
    );

    var aboutSection = document.getElementById('about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    function animateStats() {
        statNumbers.forEach(function (stat) {
            var finalText = stat.textContent.trim();
            // Sadece sayısal değerleri animasyonla göster
            var numericValue = parseInt(finalText, 10);
            if (!isNaN(numericValue) && numericValue > 0 && numericValue < 1000) {
                var current = 0;
                var increment = Math.max(1, Math.floor(numericValue / 30));
                var timer = setInterval(function () {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = current;
                }, 40);
            }
            // ∞ ve 7/24 gibi değerler olduğu gibi kalır
        });
    }

    // ===== CURSOR GLOW (Masaüstü) =====
    if (window.matchMedia('(pointer: fine)').matches) {
        var cursorGlow = document.createElement('div');
        cursorGlow.style.cssText =
            'position:fixed;width:300px;height:300px;border-radius:50%;' +
            'background:radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%);' +
            'pointer-events:none;z-index:0;transition:transform 0.15s ease;' +
            'transform:translate(-50%,-50%);will-change:transform;';
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', function (e) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
})();
