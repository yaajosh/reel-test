// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (navToggle && mainMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on menu items
        const menuItems = document.querySelectorAll('.menu-items li a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navToggle.classList.remove('active');
                    mainMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    
    // Video background fallback
    const heroVideo = document.getElementById('hero-video');
    
    if (heroVideo) {
        // If video fails to load, add a fallback background image
        heroVideo.addEventListener('error', function() {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundImage = 'url("img/hero-fallback.jpg")';
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center center';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    }
}); 