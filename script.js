document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200,
        once: true,
        easing: 'ease-in-out'
    });

    const header = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
    const sections = document.querySelectorAll('section');
    const langBtn = document.getElementById('lang-switch');
    const menuOpen = document.getElementById('mobile-menu-open');
    const menuClose = document.getElementById('mobile-menu-close');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const yearEl = document.getElementById('year');
    const marquee = document.querySelector('.marquee-content');

    if (yearEl) yearEl.innerText = new Date().getFullYear();

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    function updateLanguageDirection() {
        const isAr = document.documentElement.dir === 'rtl';
        if (marquee) {
            marquee.style.animation = 'none';
            marquee.offsetHeight; 
            marquee.style.animation = null;
        }
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const isAr = document.documentElement.dir === 'rtl';
            if (isAr) {
                document.documentElement.dir = 'ltr';
                document.documentElement.lang = 'en';
                document.body.classList.add('en');
                langBtn.innerText = 'AR';
            } else {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
                document.body.classList.remove('en');
                langBtn.innerText = 'EN';
            }
            document.querySelectorAll('[data-en]').forEach(el => {
                const text = document.documentElement.dir === 'rtl' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
                el.innerText = text;
            });
            updateLanguageDirection();
        });
    }

    const toggleMenu = () => {
        if (sideMenu && overlay) {
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'initial';
        }
    };

    if (menuOpen) menuOpen.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideMenu && sideMenu.classList.contains('active')) toggleMenu();
        });
    });

    const counters = document.querySelectorAll('.counter');
    const bars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    const target = +entry.target.getAttribute('data-target');
                    let count = 0;
                    const speed = target / 50;
                    const update = () => {
                        if (count < target) {
                            count += speed;
                            entry.target.innerText = Math.ceil(count);
                            setTimeout(update, 30);
                        } else {
                            entry.target.innerText = target + '+';
                        }
                    };
                    update();
                }

                if (entry.target.classList.contains('skill-bar-fill')) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
    bars.forEach(b => observer.observe(b));
});

window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => { splash.style.display = 'none'; }, 600);
        }, 2000);
    }
});

function toggleLuxuryActive(element) {
    const isServiceCard = element.classList.contains('luxury-service-box');
    const className = isServiceCard ? '.luxury-service-box' : '.glass-luxury-card';
    const activeClass = isServiceCard ? 'is-gold' : 'active-gold-state';

    document.querySelectorAll(className).forEach(box => {
        box.classList.remove(activeClass);
        if (!isServiceCard) box.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    element.classList.add(activeClass);
    if (!isServiceCard) element.style.background = 'rgba(255, 255, 255, 0.4)';
}
const track = document.getElementById('marquee-track');
if (track) {
    const items = track.innerHTML;
    track.innerHTML = items + items + items;
}

const langBtn = document.getElementById('lang-switcher');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        setTimeout(() => {
            const isEn = document.documentElement.lang === 'en';
            if (track) {
                track.style.animation = 'none';
                track.offsetHeight; 
                track.style.animation = isEn ? 'scrollLTR 25s linear infinite' : 'scrollRTL 25s linear infinite';
            }
        }, 50);
    });
}