document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';
    const logoElement = document.getElementById('theme-logo'); // Get the logo element
    const logoElementFooter = document.getElementById('theme-logo-footer');
    const ashtFooter = document.getElementById('theme-logo-asha');


    // Function to switch the logo based on the theme
    function updateLogo() {
        if (document.body.classList.contains(darkTheme)) {
            logoElement.src = './IMG/logo/logotuvoz-white-oneline.png'; // Dark theme logo
            logoElementFooter.src = './IMG/logo/logotuvoz-blk-oneline.png';
            ashtFooter.src = './IMG/logo/ashablk.png';
        } else {
            logoElement.src = './IMG/logo/logotuvoz-Original-oneline.png'; // Light theme logo
            logoElementFooter.src = './IMG/logo/logotuvoz-white-oneline.png';
            ashtFooter.src = './IMG/logo/ashawhite.png';
        }
    }

    // Initialize the logo based on the initial theme
    updateLogo();

    // Function to open the menu
    function openMenu() {
        navMenu.classList.add('show-menu');
    }

    // Function to close the menu
    function closeMenu() {
        navMenu.classList.remove('show-menu');
    }

    // Open the menu when the toggle button is clicked
    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
    }

    // Close the menu when the close button is clicked
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close the menu when clicking outside of the menu
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }
    });

    // Prevent closing when clicking inside the nav menu
    navMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // ACCORDION SKILLS
    const skillsContent = document.getElementsByClassName('skills__content'),
        skillsHeader = document.querySelectorAll('.skills__header');

    function toggleSkills() {
        let itemClass = this.parentNode.className;
        for (let i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills__content skills__close';
        }
        if (itemClass === 'skills__content skills__close') {
            this.parentNode.className = 'skills__content skills__open';
        }
    }

    skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills);
    });

    // QUALIFICATION TABS
    const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('qualification__active');
            });
            target.classList.add('qualification__active');
            tabs.forEach(tab => {
                tab.classList.remove('qualification__active');
            });
            tab.classList.add('qualification__active');
        });
    });

    // SERVICES MODAL
    const modalViews = document.querySelectorAll('.services__modal');
    const modalBtns = document.querySelectorAll('.services__button');
    const modalCloses = document.querySelectorAll('.services__modal-close');

    function openModal(index) {
        modalViews[index].classList.add('active-modal');
    }

    function closeAllModals() {
        modalViews.forEach(modalView => {
            modalView.classList.remove('active-modal');
        });
    }

    modalBtns.forEach((modalBtn, index) => {
        modalBtn.addEventListener('click', () => {
            openModal(index);
        });
    });

    modalCloses.forEach((modalClose) => {
        modalClose.addEventListener('click', () => {
            closeAllModals();
        });
    });

    modalViews.forEach(modalView => {
        modalView.addEventListener('click', (event) => {
            if (event.target === modalView) {
                closeAllModals();
            }
        });
    });

    document.getElementById('auto-year').textContent = new Date().getFullYear();

    // PORTFOLIO SWIPER
    let swiperPortfolio = new Swiper('.portfolio__container', {
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

    // TESTIMONIAL
    let swiperTestimonial = new Swiper('.testimonial__container', {
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

    // SCROLL SECTIONS ACTIVE LINK
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
            } else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // CHANGE BACKGROUND HEADER
    function scrollHeader() {
        const nav = document.getElementById('header');
        if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);

    // SHOW SCROLL UP
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
    }
    window.addEventListener('scroll', scrollUp);

    // DARK LIGHT THEME
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

    document.getElementById('contact-me').addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
        var mailtoLink = 'mailto:Tuvozspeech@gmail.com' +
            '?subject=' + encodeURIComponent('Speech Therapy Inquiry: Tu Voz') +
            '&body=' + encodeURIComponent(
                'Hi Solanyi,\n\n' +
                'I am reaching out for a speech therapy consultation.\n\n Please find my details below:\n\n' +
                'Name: ' + name + '\n\n' +
                'Message: ' + message + '\n\n' +
                'I look forward to your response.\n\n' +
                'Best regards,\n\n' +
                name
            );
        window
    })
})