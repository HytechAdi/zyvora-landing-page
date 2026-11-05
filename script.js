
document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    const yearElement = document.getElementById("year");


    // Automatically update footer year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // Mobile navigation
    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);

    });


    // Close menu when a navigation link is clicked
    navItems.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    // Close mobile menu when clicking outside it
    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }

    });


    // Close menu using Escape key
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // Scroll reveal animations
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-bottom, .services-heading, " +
        ".service-card, .statement-content, .contact-box"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    // Respect reduced-motion preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    // Highlight the current navigation section
    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        navItems.forEach((link) => {

                            const isActive =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", isActive);

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }

});