document.addEventListener("DOMContentLoaded", () => {

    // Title and Name Animations

    const animatedElements = document.querySelectorAll('.animated-name, .animated-title');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Flash Card Animation
    
    const flashCards = document.querySelectorAll(".flash-card");
    const flashCardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        },
        { threshold: 0.1 }
    );

    flashCards.forEach((card) => {
        flashCardObserver.observe(card);
    });

    // Vertical Carousel Navigation
    const carouselItems = document.querySelectorAll(".carousel-item");
    const sections = document.querySelectorAll("#home, .flash-card");

    // Function to scroll to a section with an offset
    const scrollToSection = (target, offset = 0) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    };

    carouselItems.forEach((item) => {
        item.addEventListener("click", () => {
            const target = document.querySelector(item.getAttribute("data-target"));
            if (target) {
                const offset = 250;
                scrollToSection(target, offset);
                carouselItems.forEach((ci) => ci.classList.remove("active"));
                item.classList.add("active");
            }
        });
    });

    // Observe sections to highlight the corresponding carousel dot
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    carouselItems.forEach((item) => {
                        item.classList.toggle(
                            "active",
                            item.getAttribute("data-target") === `#${id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
});
