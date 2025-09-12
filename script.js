// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create stars for the space background
    createStars();
    
    // Create shooting stars
    createShootingStars();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    for (const link of navLinks) {
        link.addEventListener('click', smoothScroll);
    }
    
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Create stars for the space background
    function createStars() {
        const space = document.getElementById('space');
        const starsCount = 300;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const duration = 3 + Math.random() * 10;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            space.appendChild(star);
        }
    }
    
    // Create shooting stars
    function createShootingStars() {
        const shootingStarsContainer = document.querySelector('.shooting-stars');
        
        setInterval(() => {
            if (Math.random() > 0.7) { // Control frequency of shooting stars
                const shootingStar = document.createElement('div');
                shootingStar.classList.add('shooting-star');
                
                const startX = Math.random() * 10;
                const startY = Math.random() * 10;
                
                shootingStar.style.left = `${startX}%`;
                shootingStar.style.top = `${startY}%`;
                
                const duration = 2 + Math.random() * 3;
                shootingStar.style.animationDuration = `${duration}s`;
                
                shootingStarsContainer.appendChild(shootingStar);
                
                // Remove shooting star after animation completes
                setTimeout(() => {
                    shootingStarsContainer.removeChild(shootingStar);
                }, duration * 1000);
            }
        }, 1000);
    }
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.highlight-card, .speaker-card, .topic-item');
    
    function checkIfInView() {
        for (const element of animatedElements) {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        }
    }
    
    // Set initial state for animated elements
    for (const element of animatedElements) {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    // Check on load and on scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Add parallax effect to the hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.querySelector('.hero').style.backgroundPosition = `0px ${rate}px`;
    });
    
    // Add interactive effect to speaker cards
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    for (const card of speakerCards) {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(147, 112, 219, 0.5)';
            this.style.borderColor = 'rgba(147, 112, 219, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(147, 112, 219, 0.3)';
            this.style.borderColor = 'rgba(147, 112, 219, 0.3)';
        });
    }
    
    // Add countdown timer
    function updateCountdown() {
        const eventDate = new Date('November 18, 2025 09:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Create or update countdown element
        let countdownEl = document.getElementById('countdown');
        if (!countdownEl) {
            countdownEl = document.createElement('div');
            countdownEl.id = 'countdown';
            countdownEl.style.cssText = `
                background: rgba(10, 0, 20, 0.8);
                padding: 20px;
                border-radius: 15px;
                margin: 30px auto;
                max-width: 600px;
                text-align: center;
                border: 1px solid rgba(147, 112, 219, 0.3);
            `;
            document.querySelector('.hero-content').appendChild(countdownEl);
        }
        
        countdownEl.innerHTML = `
            <h3 style="margin-bottom: 15px; color: #ffffff;">Event Starts In</h3>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <div style="background: rgba(147, 112, 219, 0.2); padding: 15px; border-radius: 10px; min-width: 80px;">
                    <div style="font-size: 2rem; font-weight: bold; color: #9370db;">${days}</div>
                    <div style="color: #d8bfd8;">Days</div>
                </div>
                <div style="background: rgba(147, 112, 219, 0.2); padding: 15px; border-radius: 10px; min-width: 80px;">
                    <div style="font-size: 2rem; font-weight: bold; color: #9370db;">${hours}</div>
                    <div style="color: #d8bfd8;">Hours</div>
                </div>
                <div style="background: rgba(147, 112, 219, 0.2); padding: 15px; border-radius: 10px; min-width: 80px;">
                    <div style="font-size: 2rem; font-weight: bold; color: #9370db;">${minutes}</div>
                    <div style="color: #d8bfd8;">Minutes</div>
                </div>
                <div style="background: rgba(147, 112, 219, 0.2); padding: 15px; border-radius: 10px; min-width: 80px;">
                    <div style="font-size: 2rem; font-weight: bold; color: #9370db;">${seconds}</div>
                    <div style="color: #d8bfd8;">Seconds</div>
                </div>
            </div>
        `;
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #9370db;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 0 15px rgba(147, 112, 219, 0.7);
        z-index: 99;
        display: none;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Add animation to section headings
    const sectionHeadings = document.querySelectorAll('section h2');
    
    function animateHeadings() {
        for (const heading of sectionHeadings) {
            const position = heading.getBoundingClientRect();
            
            if(position.top < window.innerHeight - 50) {
                heading.style.opacity = 1;
                heading.style.transform = 'translateY(0)';
            }
        }
    }
    
    for (const heading of sectionHeadings) {
        heading.style.opacity = 0;
        heading.style.transform = 'translateY(-20px)';
        heading.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    window.addEventListener('load', animateHeadings);
    window.addEventListener('scroll', animateHeadings);
    
    // Add particle effect to cursor
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.8) { // Control frequency of particles
            const particles = document.createElement('div');
            particles.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background-color: rgba(147, 112, 219, 0.7);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            particles.style.left = `${e.clientX}px`;
            particles.style.top = `${e.clientY}px`;
            
            document.body.appendChild(particles);
            
            // Animate particle
            let posX = e.clientX;
            let posY = e.clientY;
            let opacity = 1;
            
            const animate = () => {
                posX += (Math.random() - 0.5) * 2;
                posY += (Math.random() - 0.5) * 2;
                opacity -= 0.02;
                
                particles.style.left = `${posX}px`;
                particles.style.top = `${posY}px`;
                particles.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(particles);
                }
            };
            
            requestAnimationFrame(animate);
        }
    });
});