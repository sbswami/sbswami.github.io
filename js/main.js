// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded');

    const careerJourney = [
        {
            title: "Computer Science Degree",
            date: "2015 - 2019",
            description: "Graduated with a Computer Science and Engineering degree. Created three major projects: Canteen Management System (Java, SQLite), Buy Sell Inventory, and Farm Management System (Android, Java).",
            image: "images/graduation.jpg"
        },
        {
            title: "Script IT Solutions",
            date: "July 2019 - December 2019",
            description: "Started professional journey as a developer. Worked on multiple technologies including ReactJS (TypeScript), Django (Python3), and Electron. Developed e-commerce, inventory management, and a solo project for election ballots.",
            image: "images/script-it.jpg"
        },
        {
            title: "Actyv",
            date: "December 2019 - June 2020",
            description: "Worked on bill discounting application using MongoDB, ExpressJS, and React Native. Deepened knowledge of TypeScript and JavaScript concepts.",
            image: "images/actyv.jpg"
        },
        {
            title: "Personal Projects",
            date: "July 2020",
            description: "Developed three projects to enhance skills in Flutter, MongoDB, and Express. Created Buy Sell Inventory v2, Ram Ram Sa (society database app), and CQN - Classroom Quiz Notes for online classes.",
            image: "images/personal-projects.jpg"
        },
        {
            title: "smallcase",
            date: "July 2020 - October 2021",
            description: "Worked as a mobile engineer focusing on React Native. Refactored the entire smallcase application from class-based to functional components. Created a custom React Native SDK for Fresh Chat and integrated a payment gateway for the manager payment system.",
            image: "images/smallcase.jpg"
        },
        {
            title: "Flobiz - myBillBook",
            date: "October 2021 - Present",
            description: "Joined as a Full Stack Engineer. Initially worked on Android development with Kotlin. Later, led initiatives to create cross-platform solutions for invoice generation and pricing modules. Developed a component library with Angular 16 for web and desktop projects. Currently working on 'Money Tree by myBillBook' and 'mySandesh' applications using Flutter.",
            image: "images/flobiz.jpg"
        }
    ];

    const timeline = document.querySelector('.timeline');

    careerJourney.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        const content = document.createElement('div');
        content.classList.add('timeline-content');

        content.innerHTML = `
            <h3>${item.title}</h3>
            <p class="date">${item.date}</p>
            <img src="${item.image}" alt="${item.title}" class="timeline-img">
            <p>${item.description}</p>
        `;

        timelineItem.appendChild(content);
        timeline.appendChild(timelineItem);
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .timeline-content').forEach(item => {
        observer.observe(item);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Header shrink on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollToTopBtn);

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

    // Particle background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6c5ce7" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#6c5ce7", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // Typing animation for header subtitle
    const subtitle = "Software Developer";
    let i = 0;
    const speed = 100; // Typing speed in milliseconds

    function typeSubtitle() {
        if (i < subtitle.length) {
            document.querySelector('header h1::after').textContent += subtitle.charAt(i);
            i++;
            setTimeout(typeSubtitle, speed);
        }
    }

    setTimeout(typeSubtitle, 1000); // Start typing after 1 second

    // Animate skill tags
    const skillTags = document.querySelectorAll('#skills li');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 100}ms`;
        tag.classList.add('animate-in');
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollPosition = window.pageYOffset;
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});