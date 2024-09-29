// Career journey data structure
const CAREER_JOURNEY = [
    {
        title: "Computer Science Degree",
        date: "Aug 2015 - May 2019",
        company: "Rajasthan Technical University, Kota",
        description: "Graduated with a Computer Science and Engineering degree. Created three major projects showcasing diverse skills:",
        details: [
            "Developed a Canteen Management System using Java 8 and SQLite for offline use.",
            "Created Buy Sell Inventory and Farm Management System applications for Android using Java and Android Studio.",
            "Gained proficiency in Java, SQLite, and Android development."
        ],
        skills: ["Java", "SQLite", "Android"]
    },
    {
        title: "Script IT Solutions",
        date: "Jul 2019 - Dec 2019",
        company: "Script IT Solutions",
        description: "Kickstarted professional journey as a versatile developer in a project-based startup:",
        details: [
            "Worked on multiple technologies simultaneously, including ReactJS (TypeScript), Django (Python3), and Electron.",
            "Contributed to shared e-commerce and inventory management projects.",
            "Independently developed an election ballot project using ReactJS and Electron."
        ],
        skills: ["ReactJS", "TypeScript", "Django", "Python3", "Electron"]
    },
    {
        title: "Actyv",
        date: "Dec 2019 - Jun 2020",
        company: "Actyv",
        description: "Deepened expertise in full-stack development at a multi-product company:",
        details: [
            "Focused on the Bill Discounting application, working with MongoDB, ExpressJS, and React Native.",
            "Gained in-depth knowledge of TypeScript and JavaScript concepts.",
            "Contributed to the development of multiple products including 'Jandan' and 'Bill Discounting'."
        ],
        skills: ["MongoDB", "ExpressJS", "React Native", "TypeScript"]
    },
    {
        title: "Personal Projects",
        date: "Jul 2020",
        company: "",
        description: "Sharpened skills through personal projects, all available on PlayStore:",
        details: [
            "Developed Buy Sell Inventory version 2 using Flutter.",
            "Created 'Ram Ram Sa', a society database and relative record-keeping application.",
            "Built 'CQN - Classroom Quiz Notes' for online classes, note sharing, and private classroom quizzes."
        ],
        skills: ["Flutter", "MongoDB", "Express"]
    },
    {
        title: "smallcase",
        date: "Jul 2020 - Oct 2021",
        company: "smallcase",
        description: "Contributed significantly to a mid-stage startup as a mobile engineer:",
        details: [
            "Refactored the entire smallcase application from class-based to functional components in React Native.",
            "Developed a custom React Native SDK for Fresh Chat due to lack of an official version.",
            "Integrated a payment gateway for the smallcase manager payment system, a crucial revenue source."
        ],
        skills: ["React Native", "JavaScript", "SDK Development"]
    },
    {
        title: "Flobiz - myBillBook",
        company: "Flobiz",
        date: "Oct 2021 - May 2022",
        description: "Joined as a Full Stack Engineer, initially focusing on Android development:",
        details: [
            "Worked on myBillBook, a comprehensive billing solution platform.",
            "Executed daily tasks and bug fixes in Android development using Kotlin.",
            "Gained in-depth knowledge of the product ecosystem."
        ],
        skills: ["Android", "Kotlin", "Full Stack Development"]
    },
    {
        title: "Flobiz - Invoice Module Initiative",
        date: "Jun 2022 - Oct 2022",
        company: "Flobiz",
        description: "Led a crucial initiative to streamline invoice creation across platforms:",
        details: [
            "Created a unified invoice module usable across Android, iOS, Web, and Desktop platforms.",
            "Implemented on-the-air update functionality for the module.",
            "Developed an invoice service for sharing invoices via links.",
            "Reduced invoice-related bugs from hundreds to 1-2 monthly.",
            "Decreased developer effort from 5 to 1 for feature building and bug fixing."
        ],
        skills: ["HTML", "CSS", "JavaScript", "ExpressJS", "GitHub Actions"]
    },
    {
        title: "Flobiz - Pricing Module Development",
        date: "Nov 2022 - May 2023",
        company: "Flobiz",
        description: "Revolutionized the payment system for myBillBook:",
        details: [
            "Built a centralized pricing module handling price lists and payment gateways.",
            "Enabled easy experimentation for the product team through on-the-air updates.",
            "Implemented features for flash sales, discounts, and dynamic UI.",
            "Reduced developer effort by 4 times for pricing-related tasks.",
            "Utilized ReactJS and AWS S3 for module development and storage."
        ],
        skills: ["ReactJS", "AWS S3", "GitHub Actions"]
    },
    {
        title: "Flobiz - Component Library and Design System",
        date: "Jun 2023 - Nov 2023",
        company: "Flobiz",
        description: "Led the development of a comprehensive component library:",
        details: [
            "Headed a team of 3 developers to create a component library for web and desktop projects.",
            "Developed a wide range of components including typography, buttons, tables, cards, etc.",
            "Created a Storybook for easy component visualization and usage.",
            "Successfully integrated the library into 3 major screens initially.",
            "Achieved full adoption by 12 developers across web projects within 6 months."
        ],
        skills: ["Angular 16", "Storybook", "Design Systems"]
    },
    {
        title: "Flobiz - Loan Disbursal Application",
        date: "Apr 2024 - Jul 2024",
        company: "Flobiz",
        description: "Spearheaded the development of a new loan disbursal application:",
        details: [
            "Led a team of 3 developers to create 'Money Tree by myBillBook' using Flutter.",
            "Developed a Flutter package containing essential startup code for new projects.",
            "Implemented features like translations, theming, routing, local DB, and network interceptors.",
            "Successfully integrated the application with myBillBook and partnered with Liquloans."
        ],
        skills: ["Flutter", "Dart", "Mobile App Development"]
    },
    {
        title: "Flobiz - mySandesh Application",
        date: "Aug 2024 - Present",
        company: "Flobiz",
        description: "Currently working on a new application for creating and sharing business greetings:",
        details: [
            "Developing 'mySandesh', a Flutter-based application for creating festival greetings.",
            "Contributed to project structure and created resizable custom widgets.",
            "Implemented functionality to merge frames with images or videos.",
            "Ongoing development and feature enhancement."
        ],
        skills: ["Flutter", "Dart"]
    }
];

// Reverse the order of the CAREER_JOURNEY array
CAREER_JOURNEY.reverse();

// Group career journey items by company
const groupedJourney = CAREER_JOURNEY.reduce((acc, item) => {
    const company = item.company || item.title;
    if (!acc[company]) {
        acc[company] = [];
    }
    acc[company].push(item);
    return acc;
}, {});

// Functions

/**
 * Creates a timeline item DOM element from a career journey item
 * @param {Object} item - Career journey item
 * @param {number} index - Index of the item in the journey
 * @param {boolean} isFirst - Whether this is the first item for this company
 * @param {boolean} isLast - Whether this is the last item for this company
 * @returns {HTMLElement} - Timeline item DOM element
 */
function createTimelineItem(item, index, isFirst, isLast) {
    const timelineItem = document.createElement('div');
    timelineItem.classList.add('timeline-item');
    if (isFirst) {
        timelineItem.classList.add('company-start');
    }
    if (isLast) {
        timelineItem.classList.add('company-end');
    }
    
    timelineItem.innerHTML = `
        <div class="timeline-date">${item.date}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-description">${item.description}</p>
        <ul class="timeline-details">
            ${item.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <div class="timeline-skills">
            ${item.skills.map(skill => `<span class="timeline-skill">${skill}</span>`).join('')}
        </div>
    `;
    return timelineItem;
}

function animateTimeline() {
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Adjust this value to trigger the animation earlier
    const triggerBottom = window.innerHeight * 0.8;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('show');
        } else {
            item.classList.remove('show');
        }
    });
}

// Main execution
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded');

    // Create and populate the timeline
    const timeline = document.querySelector('.timeline');
    Object.entries(groupedJourney).forEach(([company, companyItems]) => {
        const companySection = document.createElement('div');
        companySection.classList.add('company-section');
        
        const companyHeader = document.createElement('h3');
        companyHeader.classList.add('timeline-company');
        companyHeader.textContent = company;
        companySection.appendChild(companyHeader);
        
        companyItems.forEach((item, index) => {
            const timelineItem = createTimelineItem(item, index, index === 0, index === companyItems.length - 1);
            companySection.appendChild(timelineItem);
        });
        
        timeline.appendChild(companySection);
    });

    // Set up Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.05 });

    // Observe sections and timeline items for animation
    document.querySelectorAll('section, .timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Implement smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const scrollContainer = document.querySelector('.scrollable-content');
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + scrollContainer.scrollTop - headerOffset;

            /// Reduce height from top that much space header section consuming after scroll.
            const headerHeight = document.querySelector('header').offsetHeight;
            

            scrollContainer.scrollTo({
                top: offsetPosition - headerHeight,
                behavior: "smooth"
            });
        });
    });

    // Implement header hide on scroll
    const header = document.querySelector('header');
    const scrollContainer = document.querySelector('.scrollable-content');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Adjust this value to change when the header hides

    scrollContainer.addEventListener('scroll', () => {
        const scrollTop = scrollContainer.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });

    // Initialize particle background
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

    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate skill tags
    const skillTags = document.querySelectorAll('#skills li');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 100}ms`;
        tag.classList.add('animate-in');
    });

    // Implement parallax effect for header
    scrollContainer.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollPosition = scrollContainer.scrollTop;
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});