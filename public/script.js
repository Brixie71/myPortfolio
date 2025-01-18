document.addEventListener("DOMContentLoaded", () => {
    const flashCards = document.querySelectorAll(".flash-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the card is visible
        }
    );

    flashCards.forEach((card) => {
        observer.observe(card);
    });
});
