document.addEventListener('DOMContentLoaded', () => {
    // Element selectors
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const themeButton = document.getElementById('theme-button');
    const logoElement = document.getElementById('theme-logo');
    const logoElementFooter = document.getElementById('theme-logo-footer');
    const ashatFooter = document.getElementById('theme-logo-asha');
    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';

    // Function to switch the logo based on the theme
    function updateLogo() {
        const isDarkTheme = document.body.classList.contains(darkTheme);
        logoElement.src = isDarkTheme ? './IMG/logo/logotuvoz-white-oneline.png' : './IMG/logo/logotuvoz-Original-oneline.png';
        logoElementFooter.src = isDarkTheme ? './IMG/logo/logotuvoz-blk-oneline.png' : './IMG/logo/logotuvoz-white-oneline.png';
        ashatFooter.src = isDarkTheme ? './IMG/logo/ashablk.png' : './IMG/logo/ashawhite.png';
    }

    // Menu functionality
    function openMenu() { navMenu.classList.add('show-menu'); }
    function closeMenu() { navMenu.classList.remove('show-menu'); }

    if (navToggle) navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }
    });

    navMenu.addEventListener('click', (event) => event.stopPropagation());

    // Skills accordion
    document.querySelectorAll('.skills__header').forEach(header => {
        header.addEventListener('click', function () {
            document.querySelectorAll('.skills__content').forEach(content => content.classList.add('skills__close'));
            this.parentNode.classList.toggle('skills__open', this.parentNode.classList.contains('skills__close'));
        });
    });

    // Qualification tabs
    document.querySelectorAll('[data-target]').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);
            document.querySelectorAll('[data-content]').forEach(content => content.classList.remove('qualification__active'));
            target.classList.add('qualification__active');
            document.querySelectorAll('[data-target]').forEach(t => t.classList.remove('qualification__active'));
            tab.classList.add('qualification__active');
        });
    });

    // Services modal
    const modalViews = document.querySelectorAll('.services__modal');
    document.querySelectorAll('.services__button').forEach((btn, index) => {
        btn.addEventListener('click', () => modalViews[index].classList.add('active-modal'));
    });
    document.querySelectorAll('.services__modal-close').forEach(close => {
        close.addEventListener('click', () => modalViews.forEach(modal => modal.classList.remove('active-modal')));
    });
    modalViews.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) modal.classList.remove('active-modal');
        });
    });

    // Auto year in footer
    document.getElementById('auto-year').textContent = new Date().getFullYear();

    // Portfolio swiper
    new Swiper('.portfolio__container', {
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

    // Testimonial swiper
    new Swiper('.testimonial__container', {
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

    // Scroll sections active link
    function scrollActive() {
        const scrollY = window.pageYOffset;
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // Change background header
    function scrollHeader() {
        document.getElementById('header').classList.toggle('scroll-header', window.scrollY >= 80);
    }
    window.addEventListener('scroll', scrollHeader);

    // Show scroll up
    function scrollUp() {
        document.getElementById('scroll-up').classList.toggle('show-scroll', window.scrollY >= 560);
    }
    window.addEventListener('scroll', scrollUp);

    // Dark light theme
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
        updateLogo();
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
        updateLogo();
    });

    // Contact form submission
    document.getElementById('contact-me').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:Tuvozspeech@gmail.com?subject= ${encodeURIComponent('Speech Therapy Inquiry: Tu Voz')}
        &body=${encodeURIComponent(`Hi Solanyi,\n\nI am reaching out for a speech therapy consultation.\n\nPlease find my details below:\n\nName: ${name}\n\nMessage: ${message}\n\nI look forward to your response.\n\nBest regards,\n${name}`)}`;
        window.location.href = mailtoLink;
    });

});
