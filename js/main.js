document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const DARK_THEME = 'dark-theme';
    const ICON_THEME = 'uil-sun';

    // DOM Elements
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const themeButton = document.getElementById('theme-button');
    const logoElements = {
        header: document.getElementById('theme-logo'),
        footer: document.getElementById('theme-logo-footer'),
        asht: document.getElementById('theme-logo-asha')
    };
    const skillsHeaders = document.querySelectorAll('.skills__header');
    const tabs = document.querySelectorAll('[data-target]');
    const tabContents = document.querySelectorAll('[data-content]');
    const modalViews = document.querySelectorAll('.services__modal');
    const modalBtns = document.querySelectorAll('.services__button');
    const modalCloses = document.querySelectorAll('.services__modal-close');
    const sections = document.querySelectorAll('section[id]');
    const header = document.getElementById('header');
    const scrollUpBtn = document.getElementById('scroll-up');
    const contactForm = document.getElementById('contact-me');
    const autoYear = document.getElementById('auto-year');

    // Functions
    function updateLogo() {
        const isDark = document.body.classList.contains(DARK_THEME);
        logoElements.header.src = isDark ? './IMG/logo/logotuvoz-white-oneline.png' : './IMG/logo/logotuvoz-Original-oneline.png';
        logoElements.footer.src = isDark ? './IMG/logo/logotuvoz-blk-oneline.png' : './IMG/logo/logotuvoz-white-oneline.png';
        logoElements.asht.src = isDark ? './IMG/logo/ashablk.png' : './IMG/logo/ashawhite.png';
    }

    function toggleMenu(action) {
        navMenu.classList[action]('show-menu');
    }

    function toggleSkills() {
        const itemClass = this.parentNode.className;
        Array.from(skillsHeaders).forEach(header => {
            header.parentNode.className = 'skills__content skills__close';
        });
        if (itemClass.includes('skills__close')) {
            this.parentNode.className = 'skills__content skills__open';
        }
    }

    function activateTab(targetTab) {
        const target = document.querySelector(targetTab.dataset.target);
        tabContents.forEach(content => content.classList.remove('qualification__active'));
        target.classList.add('qualification__active');
        tabs.forEach(tab => tab.classList.remove('qualification__active'));
        targetTab.classList.add('qualification__active');
    }

    function toggleModal(index) {
        modalViews[index].classList.toggle('active-modal');
    }

    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    function scrollHeader() {
        header.classList.toggle('scroll-header', window.scrollY >= 80);
    }

    function scrollUp() {
        scrollUpBtn.classList.toggle('show-scroll', window.scrollY >= 560);
    }

    function handleThemeToggle() {
        document.body.classList.toggle(DARK_THEME);
        themeButton.classList.toggle(ICON_THEME);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
        updateLogo();
    }

    function getCurrentTheme() {
        return document.body.classList.contains(DARK_THEME) ? 'dark' : 'light';
    }

    function getCurrentIcon() {
        return themeButton.classList.contains(ICON_THEME) ? 'uil-moon' : 'uil-sun';
    }

    function handleContactFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const mailtoLink = `mailto:Tuvozspeech@gmail.com?subject=${encodeURIComponent('Speech Therapy Inquiry: Tu Voz')}&body=${encodeURIComponent(`Hi Solanyi,\n\nI am reaching out for a speech therapy consultation.\n\n Please find my details below:\n\nName: ${name}\n\nMessage: ${message}\n\nI look forward to your response.\n\nBest regards,\n\n${name}`)}`;
        window.location.href = mailtoLink;
    }

    // Event Listeners
    if (navToggle) navToggle.addEventListener('click', () => toggleMenu('add', 'show-menu'));
    if (navClose) navClose.addEventListener('click', () => toggleMenu('remove', 'show-menu'));
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('show-menu')) {
            toggleMenu('remove', 'show-menu');
        }
    });
    navMenu.addEventListener('click', event => event.stopPropagation());

    skillsHeaders.forEach(header => header.addEventListener('click', toggleSkills));
    tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));
    modalBtns.forEach((btn, index) => btn.addEventListener('click', () => toggleModal(index)));
    modalCloses.forEach(close => close.addEventListener('click', () => modalViews.forEach(modal => modal.classList.remove('active-modal'))));
    modalViews.forEach(modal => modal.addEventListener('click', event => {
        if (event.target === modal) {
            modal.classList.remove('active-modal');
        }
    }));

    autoYear.textContent = new Date().getFullYear();

    const swiperPortfolio = new Swiper('.portfolio__container', {
        cssMode: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    const swiperTestimonial = new Swiper('.testimonial__container', {
        loop: true,
        grabCursor: true,
        spaceBetween: 48,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            568: {
                slidesPerView: 2,
            }
        }
    });

    window.addEventListener('scroll', () => {
        scrollActive();
        scrollHeader();
        scrollUp();
    });

    themeButton.addEventListener('click', handleThemeToggle);
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Initialize theme on load
    const savedTheme = localStorage.getItem('selected-theme');
    const savedIcon = localStorage.getItem('selected-icon');
    if (savedTheme) {
        document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](DARK_THEME);
        themeButton.classList[savedIcon === 'uil-moon' ? 'add' : 'remove'](ICON_THEME);
        updateLogo();
    }
});
