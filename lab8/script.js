const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

let currentSlide = 0;
const slidesContainer = document.querySelector(".carousel-slides");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

function updateCarousel() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  indicators.forEach((ind, index) => {
    ind.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateCarousel();
  });
});

setInterval(nextSlide, 3000);
