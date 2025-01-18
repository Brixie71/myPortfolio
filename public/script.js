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
            threshold: 0.5, 
        }
    );

    flashCards.forEach((card) => {
        observer.observe(card);
    });
});
