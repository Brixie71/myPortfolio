window.addEventListener('scroll', function(){
    const flashCard = document.querySelector('.flash-card');
    const cardPosition = flashCard.getBoundingClientRect().top;

    if (cardPosition <= window.innerHeight * 0.75){

        flashCard.classList.add('show');
    }
});