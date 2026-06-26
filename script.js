// ============================================
// TECHVERSE - Professional Teaching Website
// JavaScript Functionality
// ============================================

// ===== Global Variables =====
let currentSection = 1;
let totalSections = 11;
let presenterModeActive = false;
let speakerNotesVisible = false;

// ===== DOM Elements =====
const loader = document.getElementById('loader');
const scrollProgress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
const darkModeToggle = document.getElementById('darkModeToggle');
const presenterModeToggle = document.getElementById('presenterModeToggle');
const presenterControls = document.getElementById('presenterControls');
const presenterProgress = document.getElementById('presenterProgress');
const prevSectionBtn = document.getElementById('prevSection');
const nextSectionBtn = document.getElementById('nextSection');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const speakerNotesToggle = document.getElementById('speakerNotesToggle');
const speakerNotesPanel = document.getElementById('speakerNotesPanel');
const speakerNotesText = document.getElementById('speakerNotesText');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// ===== Speaker Notes Data =====
const speakerNotes = {
    1: `
        <p><strong>Opening (5 minutes)</strong></p>
        <p>• Welcome students with energy and enthusiasm</p>
        <p>• Introduce yourself: "I'm Vaishnavi Gupta, a Frontend Developer"</p>
        <p>• Explain the session: "Today we're not learning basics - we're learning how the industry works"</p>
        <p>• Set expectations: "This is about real-world practices, not textbook theory"</p>
        <p>• Mention: "By the end, you'll know what companies actually expect from frontend developers"</p>
    `,
    2: `
        <p><strong>Agenda Overview (5 minutes)</strong></p>
        <p>• Walk through the timeline briefly</p>
        <p>• Emphasize: "This is practical, hands-on learning"</p>
        <p>• Mention: "We'll do live coding together"</p>
        <p>• Highlight: "The challenge at the end is where you apply what you learn"</p>
        <p><strong>Interview Question to Ask:</strong> "What do you think is the most important skill for a frontend developer?"</p>
    `,
    3: `
        <p><strong>Roadmap Explanation (10 minutes)</strong></p>
        <p>• Go through each card systematically</p>
        <p>• Ask: "Which step are you currently on?"</p>
        <p>• Emphasize Git: "No code goes to production without version control"</p>
        <p>• Explain API Integration: "This is how frontend talks to backend"</p>
        <p>• Mention AI Tools: "These are productivity boosters, not replacements"</p>
        <p><strong>Industry Example:</strong> "At my company, we use Git for every project. Every change is reviewed before deployment."</p>
    `,
    4: `
        <p><strong>Live Coding Demo (15 minutes)</strong></p>
        <p>• This is the CORE demo - spend time here</p>
        <p>• Switch between HTML, CSS, JavaScript tabs</p>
        <p>• HTML: Explain semantic tags, accessibility</p>
        <p>• CSS: Show clean styling, variables, responsiveness</p>
        <p>• JavaScript: Demonstrate event listeners, DOM manipulation</p>
        <p>• Click the "Connect" button to show the alert</p>
        <p>• Explain: "See how all three work together?"</p>
        <p><strong>Practical Tip:</strong> "Always write clean, readable code. Your future self will thank you."</p>
    `,
    5: `
        <p><strong>Responsive Design (10 minutes)</strong></p>
        <p>• Click Desktop, Tablet, Mobile buttons</p>
        <p>• Show how layout changes</p>
        <p>• Explain: "60% of traffic is mobile now"</p>
        <p>• Demonstrate: "See how sidebar disappears on tablet?"</p>
        <p>• Explain Mobile First: "Design for mobile, then enhance"</p>
        <p>• Show concepts: Flexbox for rows/columns, Grid for layouts</p>
        <p><strong>Industry Example:</strong> "We test on 5+ devices before launching any feature."</p>
    `,
    6: `
        <p><strong>Project Structure (5 minutes)</strong></p>
        <p>• Show the comparison</p>
        <p>• Explain: "Beginner projects are fine for learning"</p>
        <p>• But: "Industry projects need organization"</p>
        <p>• Why: "Multiple developers, maintainability, teamwork"</p>
        <p>• Ask: "How would you find a file in 100+ files without folders?"</p>
        <p><strong>Interview Question:</strong> "How would you organize a project with 100+ files?"</p>
    `,
    7: `
        <p><strong>Why React Exists (10 minutes)</strong></p>
        <p>• Focus on the PROBLEM, not React syntax</p>
        <p>• Show: "Navbar copied on every page - that's bad"</p>
        <p>• Explain: "Change navbar = update 10+ files"</p>
        <p>• Solution: "Components - write once, use everywhere"</p>
        <p>• Use LEGO analogy: "Components are like LEGO blocks"</p>
        <p>• NO JSX, NO hooks, NO state - just concepts</p>
        <p><strong>Practical Tip:</strong> "Think of components as reusable building pieces."</p>
    `,
    8: `
        <p><strong>AI Tools (10 minutes)</strong></p>
        <p>• Go through each tool briefly</p>
        <p>• ChatGPT: Great for explanations and learning</p>
        <p>• Copilot: Code completion in your IDE</p>
        <p>• Cursor: Full project context, multi-file editing</p>
        <p>• Windsurf: AI-native IDE with Cascade agent</p>
        <p>• Claude: Large context, great for analysis</p>
        <p>• IMPORTANT: "AI is your assistant, not your replacement"</p>
        <p>• Emphasize: "You still need to understand the code"</p>
    `,
    9: `
        <p><strong>Student Challenge (15 minutes)</strong></p>
        <p>• Explain the challenge clearly</p>
        <p>• "Choose ANY 3 improvements from the list"</p>
        <p>• "You have 15 minutes"</p>
        <p>• "Don't worry about perfection - focus on learning"</p>
        <p>• Walk around and help students</p>
        <p>• Encourage: "Try something new, don't be afraid to break things"</p>
        <p>• After 15 minutes: "Let's see what everyone built!"</p>
    `,
    10: `
        <p><strong>Career Roadmap (10 minutes)</strong></p>
        <p>• Walk through the path realistically</p>
        <p>• Be honest about timelines</p>
        <p>• Emphasize: "Projects matter more than grades"</p>
        <p>• GitHub: "Your GitHub profile is your resume"</p>
        <p>• Portfolio: "Show, don't just tell"</p>
        <p>• Internship: "The bridge between learning and working"</p>
        <p>• Encourage: "Everyone starts somewhere - I did too"</p>
        <p><strong>Interview Question:</strong> "Where do you see yourself in 2 years?"</p>
    `,
    11: `
        <p><strong>Q&A and Closing (5 minutes)</strong></p>
        <p>• Thank everyone sincerely</p>
        <p>• "Stay Curious. Keep Building. Keep Learning."</p>
        <p>• Open floor for questions</p>
        <p>• Share contact info if they have follow-up questions</p>
        <p>• End on a high, encouraging note</p>
        <p>• "The industry needs more developers like you"</p>
    `
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Initialize all features
    initScrollProgress();
    initNavbar();
    initDarkMode();
    initPresenterMode();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initLiveCoding();
    initResponsiveDemo();
    initSpeakerNotes();
    initExampleCodeTabs();
    updatePresenterProgress();
});

// ===== Loading Animation =====
// Already handled in DOMContentLoaded

// ===== Scroll Progress Bar =====
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ===== Navbar =====
function initNavbar() {
    // Sticky navbar with shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Dark Mode Toggle =====
function initDarkMode() {
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
}

// ===== Presenter Mode =====
function initPresenterMode() {
    presenterModeToggle.addEventListener('click', () => {
        presenterModeActive = !presenterModeActive;
        presenterControls.classList.toggle('active', presenterModeActive);
        
        if (presenterModeActive) {
            // Enter presenter mode
            updateSpeakerNotes();
        }
    });

    prevSectionBtn.addEventListener('click', () => {
        if (currentSection > 1) {
            currentSection--;
            scrollToSectionByIndex(currentSection);
            updatePresenterProgress();
            updateSpeakerNotes();
        }
    });

    nextSectionBtn.addEventListener('click', () => {
        if (currentSection < totalSections) {
            currentSection++;
            scrollToSectionByIndex(currentSection);
            updatePresenterProgress();
            updateSpeakerNotes();
        }
    });

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!presenterModeActive) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            if (currentSection < totalSections) {
                currentSection++;
                scrollToSectionByIndex(currentSection);
                updatePresenterProgress();
                updateSpeakerNotes();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentSection > 1) {
                currentSection--;
                scrollToSectionByIndex(currentSection);
                updatePresenterProgress();
                updateSpeakerNotes();
            }
        } else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
}

function updatePresenterProgress() {
    presenterProgress.textContent = `${currentSection} of ${totalSections}`;
}

function scrollToSectionByIndex(index) {
    const section = sections[index - 1];
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// ===== Speaker Notes =====
function initSpeakerNotes() {
    speakerNotesToggle.addEventListener('click', () => {
        speakerNotesVisible = !speakerNotesVisible;
        speakerNotesPanel.classList.toggle('active', speakerNotesVisible);
    });
}

function updateSpeakerNotes() {
    if (speakerNotes[currentSection]) {
        speakerNotesText.innerHTML = speakerNotes[currentSection];
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Update current section
                currentSection = parseInt(targetSection.dataset.section);
                updatePresenterProgress();
                updateSpeakerNotes();
            }
        });
    });
}

// Global function for buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        currentSection = parseInt(section.dataset.section);
        updatePresenterProgress();
        updateSpeakerNotes();
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe roadmap cards
    document.querySelectorAll('.roadmap-card').forEach(card => {
        observer.observe(card);
    });

    // Observe career steps
    document.querySelectorAll('.career-step').forEach(step => {
        observer.observe(step);
    });

    // Update current section on scroll
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = parseInt(section.dataset.section);
                updatePresenterProgress();
                if (speakerNotesVisible) {
                    updateSpeakerNotes();
                }
            }
        });
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Live Coding Section =====
function initLiveCoding() {
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeBlocks = document.querySelectorAll('.code-block');

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active code block
            codeBlocks.forEach(block => {
                block.classList.remove('active');
                if (block.id === targetTab + '-code') {
                    block.classList.add('active');
                }
            });
        });
    });
}

// Demo alert function
function showDemoAlert() {
    alert('Connected! This is a demo of JavaScript interactivity.');
}

// React Counter Demo Functions
let counterValue = 0;

function incrementCounter() {
    counterValue++;
    document.getElementById('counterValue').textContent = counterValue;
}

function decrementCounter() {
    counterValue--;
    document.getElementById('counterValue').textContent = counterValue;
}

function resetCounter() {
    counterValue = 0;
    document.getElementById('counterValue').textContent = counterValue;
}

// ===== Example Calculator Functions =====
function appendToDisplay(value) {
    const display = document.getElementById('calculatorDisplay');
    if (display) {
        display.value += value;
    }
}

function clearDisplay() {
    const display = document.getElementById('calculatorDisplay');
    if (display) {
        display.value = '';
    }
}

function deleteLast() {
    const display = document.getElementById('calculatorDisplay');
    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    const display = document.getElementById('calculatorDisplay');
    if (display) {
        try {
            display.value = eval(display.value);
        } catch (error) {
            display.value = 'Error';
        }
    }
}

// ===== Challenge Example Code Tabs =====
function initExampleCodeTabs() {
    const tabs = document.querySelectorAll('.example-tab');
    const panels = document.querySelectorAll('.example-code-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetTab}-code`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ===== Responsive Design Demo =====
function initResponsiveDemo() {
    const deviceBtns = document.querySelectorAll('.device-btn');
    const deviceFrames = document.querySelectorAll('.device-frame');

    deviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDevice = btn.dataset.device;
            
            // Update active button
            deviceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active frame
            deviceFrames.forEach(frame => {
                frame.classList.remove('active');
                if (frame.id === targetDevice + 'Frame') {
                    frame.classList.add('active');
                }
            });
        });
    });
}

// ===== Typing Animation (Optional Enhancement) =====
// Can be added to hero section if desired
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Animated Statistics (Optional Enhancement) =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== Utility Functions =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
const throttledScroll = throttle(() => {
    // Scroll-related operations that don't need to run on every pixel
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===== Console Message =====
console.log('%c TechVerse - Modern Frontend Development ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px;');
console.log('%c Built with HTML, CSS, and Vanilla JavaScript ', 'color: #667eea; font-size: 12px;');
