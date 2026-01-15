  // DOM Elements
       
        const darkToggle = document.getElementById('dark-toggle');
        const toggleCircle = document.querySelector('.toggle-circle');
        const navLinks = document.querySelectorAll('.nav-link');
        const contactForm = document.getElementById('contact-form');
        const skillLevels = document.querySelectorAll('.skill-level');
        
        // Mobile menu toggle
        const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
});

// Optional: auto close menu when link clicked (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.add("hidden");
        hamburger.classList.remove("hamburger-active");
    });
});

        
        // Dark mode toggle
        darkToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            toggleCircle.classList.toggle('dark-toggle-active');
            
            // Save theme preference to localStorage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference or OS preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            toggleCircle.classList.add('dark-toggle-active');
        } else {
            document.documentElement.classList.remove('dark');
            toggleCircle.classList.remove('dark-toggle-active');
        }
        
        // Animate skill bars on scroll
        function animateSkillBars() {
            skillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.width = level + '%';
            });
        }
        
        // Intersection Observer for skill bars animation
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        }, observerOptions);
        
        // Observe skills section
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-nav');
                }
            });
        });
        
        // Initialize
        window.addEventListener('DOMContentLoaded', () => {
            // Set first nav link as active
            if (navLinks.length > 0) {
                navLinks[0].classList.add('active-nav');
            }
        });
        