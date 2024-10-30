document.addEventListener("DOMContentLoaded", function () {
    // Function to load external HTML components
    const loadComponent = (url, elementId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === 'nav') {
                    setupNavbar(); // Setup navbar event listeners after loading
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // Load the navbar and footer
    loadComponent('/assets/nav.html', 'nav');
    loadComponent('/assets/footer.html', 'footer');

    // Function to set up navbar behavior
    const setupNavbar = () => {
        const navbar = document.querySelector('nav');
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

        window.addEventListener('scroll', handleScroll);

        // Update hamburger visibility based on screen size and navbar state
        const updateHamburgerVisibility = () => {
            hamburgerIcon.style.display = (window.innerWidth > 768 || navMenu.classList.contains("active")) ? "none" : "flex";
        };

        // Toggle the hamburger menu
        hamburgerIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            updateHamburgerVisibility();
        });

        // Close the hamburger menu when clicking outside of it
        window.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
                navMenu.classList.remove("active");
                updateHamburgerVisibility();
            }
        });

        // Listen for window resize events
        window.addEventListener('resize', updateHamburgerVisibility);

        // Initial visibility check
        updateHamburgerVisibility();
    };

    const toggleBio = (bioId) => {
        const bio = document.getElementById(bioId);
        const button = bio.querySelector(".toggle-btn img");
        const name = bio.querySelector('.bio-name');
        const content = bio.querySelector('.bio-content');

        // Toggle expanded class on the biography section
        bio.classList.toggle('expanded');

        if (bio.classList.contains("expanded")) {
            button.src = "/img/white-minus-sign.png"; // Show minus icon
            name.classList.add('hidden'); // Hide bio name
            content.style.height = 'auto'; // Expand content
        } else {
            button.src = "/img/white-plus-sign.png"; // Show plus icon
            name.classList.remove('hidden'); // Show bio name
            content.style.height = '0'; // Collapse content
        }
    };

    // Attach event listeners to each toggle button independently
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bioId = btn.closest('.biography').id; // Get the bio section's ID
            toggleBio(bioId);
        });
    });
});
