document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeDrawer = document.querySelector('.close-drawer');
    const drawer = document.querySelector('.drawer-menu');
    const drawerItems = document.querySelectorAll('.drawer-item');
    const pages = document.querySelectorAll('.page');
    const carousel = document.querySelector('.carousel-inner');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    
    // Open drawer
    menuIcon.addEventListener('click', () => {
        drawer.classList.add('open');
    });

    // Close drawer
    closeDrawer.addEventListener('click', () => {
        drawer.classList.remove('open');
    });

    // Handle page navigation
    drawerItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items and pages
            drawerItems.forEach(i => i.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding page
            const targetId = item.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Close drawer after selection on mobile
            drawer.classList.remove('open');
        });
    });

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateCarousel() {
        const width = carousel.clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * width}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch events for swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initial setup
    updateCarousel();
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
}); 