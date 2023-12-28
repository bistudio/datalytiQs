// define all required dom elements
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;



// set slide position
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach((slide, index) => { 
    slide.style.left = slideWidth * index + 'px';
})


console.log(slides)