document.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.querySelector(".fa-angle-left");
    const nextBtn = document.querySelector(".fa-angle-right");
    const slider = document.querySelector(".card__slider__img");
    let position = 0;
    let touchStartX = 0;

    // Funkcija za određivanje širine jednog slajda
    function calculateSlideWidth() {
        return slider.offsetWidth / Math.floor(slider.offsetWidth / slider.children[0].offsetWidth);
    }

    // Postavljanje atributa draggable na false za svaku sliku
    const images = slider.querySelectorAll("img");
    images.forEach(function(img) {
        img.setAttribute("draggable", "false");
    });

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Swipe podrška
    slider.addEventListener("touchstart", touchStart);
    slider.addEventListener("touchmove", touchMove);
    slider.addEventListener("touchend", touchEnd);

    function nextSlide() {
        const slideWidth = calculateSlideWidth();
        position -= slideWidth;
        if (position < -slideWidth * (slider.children.length - Math.floor(slider.offsetWidth / slideWidth))) {
            position = 0;
        }
        slider.style.transform = `translateX(${position}px)`;
    }

    function prevSlide() {
        const slideWidth = calculateSlideWidth();
        position += slideWidth;
        if (position > 0) {
            position = -slideWidth * (slider.children.length - Math.floor(slider.offsetWidth / slideWidth));
        }
        slider.style.transform = `translateX(${position}px)`;
    }

    function touchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function touchMove(event) {
        const touchEndX = event.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 20) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    function touchEnd(event) {
        touchStartX = 0;
    }

    // Prilagođavanje slajdera prilikom promene veličine prozora
    window.addEventListener("resize", function() {
        const slideWidth = calculateSlideWidth();
        position = 0;
        slider.style.transform = `translateX(${position}px)`;
    });
});


// Dobijanje trenutnog datuma
var today = new Date().toISOString().split('T')[0];
    
// Postavljanje minimalne dozvoljene vrednosti za polja unosa datuma na trenutni datum
const datumPreuzimanjaInput = document.querySelector('input[name="Datum_preuzimanja"]');
const datumVracanjaInput = document.querySelector('input[name="Datum_vracanja"]');

datumPreuzimanjaInput.setAttribute('min', today);
datumVracanjaInput.setAttribute('min', today);
