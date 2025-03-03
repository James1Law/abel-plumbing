document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeDrawer = document.querySelector('.close-drawer');
    const drawer = document.querySelector('.drawer-menu');
    const drawerItems = document.querySelectorAll('.drawer-item');
    const pages = document.querySelectorAll('.page');

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
}); 