/**
 * Navbar Close Functionality
 * Closes navbar after navigation occurs when user clicks on links
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Close navbar function
     * Handles closing both regular navbar and offcanvas menu
     */
    function closeNavbar() {
        // Close Bootstrap offcanvas menu (for mobile)
        const offcanvasNavbar = document.getElementById('offcanvasNavbar');
        if (offcanvasNavbar) {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        }
        
        // Collapse regular navbar (for desktop/tablet)
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
    
    /**
     * Handle different types of links
     */
    function handleLinkClick(link) {
        const href = link.getAttribute('href');
        
        // Check if it's an external page link (not an anchor link)
        if (href && !href.startsWith('#') && href !== 'javascript:void(0)') {
            // For external pages, close navbar immediately and let browser handle navigation
            closeNavbar();
        } 
        // Check if it's an anchor link (internal page navigation)
        else if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close navbar first
                closeNavbar();
                
                // Use setTimeout to ensure navbar closes before scrolling
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // 300ms delay to allow navbar animation to complete
            }
        }
        // For other links (empty href, javascript links, etc.)
        else {
            // Close navbar but don't prevent default behavior
            closeNavbar();
        }
    }
    
    /**
     * Add click event listeners to all navbar links
     */
    function setupNavbarLinks() {
        // Get all navbar links from both regular navbar and offcanvas menu
        const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        // Add click event listener to each link
        navbarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default behavior - let the link work normally
                // Just handle the navbar closing logic
                handleLinkClick(this);
            });
        });
    }
    
    /**
     * Handle page load scenarios
     */
    function handlePageLoad() {
        // Close navbar if it's open when page loads
        setTimeout(closeNavbar, 100);
        
        // Handle anchor links in URL on page load
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetElement = document.getElementById(hash.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 500);
        }
    }
    
    // Initialize navbar functionality
    setupNavbarLinks();
    
    // Handle page load scenarios
    handlePageLoad();
    
    // Additional: Close navbar when clicking outside (optional enhancement)
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const offcanvas = document.querySelector('.offcanvas');
        const toggler = document.querySelector('.navbar-toggler');
        
        // Check if click is outside navbar and offcanvas, and not on the toggler
        if (!navbar.contains(e.target) && 
            !offcanvas.contains(e.target) && 
            !toggler.contains(e.target)) {
            closeNavbar();
        }
    });
    
    console.log('Navbar close functionality initialized successfully');
});