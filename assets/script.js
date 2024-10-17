document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar
    fetch('/assets/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav').innerHTML = data;

            const navbar = document.querySelector('nav'); // Get the navbar after it's loaded
            const hamburgerIcon = document.getElementById("menu-toggle");
            const navMenu = document.getElementById("nav-menu");

            if (!hamburgerIcon || !navMenu) {
                console.error("Menu toggle or nav menu not found!");
                return; // Prevent further execution if elements are missing
            }

            // Scroll effect for the navbar
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            };

            // Listen for scroll events
            window.addEventListener('scroll', handleScroll);

            // Update hamburger visibility based on screen size and navbar state
            function updateHamburgerVisibility() {
                if (window.innerWidth > 768) {
                    hamburgerIcon.style.display = "none"; // Hide hamburger on larger screens
                } else {
                    hamburgerIcon.style.display = navMenu.classList.contains("active") ? "none" : "flex"; // Show/hide based on menu state
                }
            }

            // Toggle the hamburger menu when clicked
            hamburgerIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                navMenu.classList.toggle("active"); // Toggle active class
                updateHamburgerVisibility(); // Update hamburger visibility
            });

            // Close the hamburger menu when clicking outside of it
            window.addEventListener("click", (e) => {
                if (!navMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
                    navMenu.classList.remove("active"); // Hide menu
                    updateHamburgerVisibility(); // Update hamburger visibility
                }
            });

            // Listen for window resize events to update hamburger visibility
            window.addEventListener('resize', updateHamburgerVisibility);

            // Initial visibility check
            updateHamburgerVisibility();
        });
});
