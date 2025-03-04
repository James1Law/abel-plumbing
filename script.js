document.addEventListener('DOMContentLoaded', function() {
    // Drawer Menu Variables
    const menuIcon = document.querySelector('.menu-icon');
    const drawerMenu = document.querySelector('.drawer-menu');
    const closeDrawer = document.querySelector('.close-drawer');
    const drawerItems = document.querySelectorAll('.drawer-item');
    const pages = document.querySelectorAll('.page');

    // Reviews Carousel Variables
    const reviewCarousel = document.querySelector('.carousel-inner');
    const reviewCards = document.querySelectorAll('.review-card');
    const carouselPrevBtn = document.querySelector('.carousel-button.prev');
    const carouselNextBtn = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let carouselIndex = 0;

    // Lightbox Variables
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNextBtn = document.querySelector('.lightbox-button.next');
    const lightboxPrevBtn = document.querySelector('.lightbox-button.prev');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    let lightboxIndex = 0;

    // Drawer Menu Functions
    function openDrawer() {
        drawerMenu.classList.add('active');
    }

    function closeDrawerMenu() {
        drawerMenu.classList.remove('active');
    }

    // Drawer Event Listeners
    menuIcon.addEventListener('click', openDrawer);
    closeDrawer.addEventListener('click', closeDrawerMenu);

    // Close drawer when clicking outside
    document.addEventListener('click', function(event) {
        if (!drawerMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            closeDrawerMenu();
        }
    });

    // Handle page navigation
    drawerItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            drawerItems.forEach(i => i.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            item.classList.add('active');
            const targetId = item.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            closeDrawerMenu();
            
            // Add this line to scroll to top when changing pages
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Reviews Carousel Functions
    function updateCarousel() {
        const width = reviewCarousel.clientWidth;
        reviewCarousel.style.transform = `translateX(-${carouselIndex * width}px)`;
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carouselIndex);
        });
    }

    function goToSlide(index) {
        carouselIndex = index;
        updateCarousel();
    }

    function nextCarouselSlide() {
        carouselIndex = (carouselIndex + 1) % reviewCards.length;
        updateCarousel();
    }

    function prevCarouselSlide() {
        carouselIndex = (carouselIndex - 1 + reviewCards.length) % reviewCards.length;
        updateCarousel();
    }

    // Create carousel dots
    reviewCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Carousel Event Listeners
    carouselPrevBtn.addEventListener('click', prevCarouselSlide);
    carouselNextBtn.addEventListener('click', nextCarouselSlide);

    // Lightbox Functions
    function showImage(index) {
        lightboxImg.src = portfolioItems[index].src;
        lightboxImg.alt = portfolioItems[index].alt;
        lightboxIndex = index;
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${portfolioItems.length}`;
    }

    function nextLightboxImage() {
        lightboxIndex = (lightboxIndex + 1) % portfolioItems.length;
        showImage(lightboxIndex);
    }

    function prevLightboxImage() {
        lightboxIndex = (lightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
        showImage(lightboxIndex);
    }

    // Create images array for lightbox
    const images = Array.from(portfolioItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    // Lightbox Event Listeners
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            showImage(index);
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightboxNextBtn.addEventListener('click', nextLightboxImage);
    lightboxPrevBtn.addEventListener('click', prevLightboxImage);

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
    });

    // Touch events for carousel and lightbox
    function handleSwipe(startX, endX, nextFn, prevFn) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextFn();
            } else {
                prevFn();
            }
        }
    }

    // Carousel touch events
    let carouselTouchStartX = 0;
    reviewCarousel.addEventListener('touchstart', e => {
        carouselTouchStartX = e.changedTouches[0].screenX;
    });

    reviewCarousel.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carouselTouchStartX, touchEndX, nextCarouselSlide, prevCarouselSlide);
    });

    // Lightbox touch events
    let lightboxTouchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
        lightboxTouchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        handleSwipe(lightboxTouchStartX, touchEndX, nextLightboxImage, prevLightboxImage);
    });

    // Auto-advance carousel
    setInterval(nextCarouselSlide, 5000);

    // Initial setup
    updateCarousel();

    // Update carousel on window resize
    window.addEventListener('resize', updateCarousel);
}); 