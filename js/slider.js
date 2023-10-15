const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');

let slideIndex = 1;

let sliderInterval;

showSlides(slideIndex);
function showSlides(n){
    if(n>slides.length){
        slideIndex = 1;
    }
    if(n<1){
        slideIndex = slides.length;
    }
    slides.forEach(item => item.style.display='none');
    slides[slideIndex -1].style.display='block'
}
function plusSlides(n){
    showSlides(slideIndex+=n);
}
function disableSlider() {
    prev.removeEventListener('click', prevClickHandler);
    next.removeEventListener('click', nextClickHandler);
}

function enableSlider() {
    prev.addEventListener('click', prevClickHandler);
    next.addEventListener('click', nextClickHandler);
}

function prevClickHandler() {
    plusSlides(-1);
}

function nextClickHandler() {
    plusSlides(1);
}
function startSliderInterval() {
    sliderInterval = setInterval(() => {
        plusSlides(1);
    }, 3000);
}
startSliderInterval()
enableSliderButtons();
