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

        // Function to toggle biography content
        function toggleBio(bioId) {
            const allBios = document.querySelectorAll('.biography');
            allBios.forEach(bio => {
                const button = bio.querySelector(".toggle-btn img");
                const name = bio.querySelector('.bio-name');
                const content = bio.querySelector('.bio-content'); // Get content

                if (bio.id === bioId) {
                    bio.classList.toggle('expanded'); // Toggle expanded class

                    if (bio.classList.contains("expanded")) {
                        button.src = "/img/white-minus-sign.png"; // Show minus icon
                        name.classList.add('hidden'); // Hide bio name
                        content.style.height = 'auto'; // Allow it to expand
                    } else {
                        button.src = "/img/white-plus-sign.png"; // Show plus icon
                        name.classList.remove('hidden'); // Show bio name
                        content.style.height = '0'; // Collapse content
                    }
                } else {
                    bio.classList.remove('expanded'); // Collapse other biographies
                    bio.querySelector(".toggle-btn img").src = "/img/white-plus-sign.png"; // Reset button
                    bio.querySelector('.bio-name').classList.remove('hidden'); // Show other names
                    content.style.height = '0'; // Collapse other contents
                }
            });
        }


    // Attach event listeners to biography buttons
    const bioButtons = document.querySelectorAll('.toggle-btn');
    bioButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const bioId = btn.closest('.biography').id; // Get the bio id
            toggleBio(bioId);
        });
    });
});
