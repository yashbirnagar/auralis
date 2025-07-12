const homeSwiper = new Swiper(".carousel.swiper", {
  loop: true,
  autoplay: {
    delay: 5000,            // 5 s between slides
    disableOnInteraction: false,
  },
  speed: 800,               // transition speed in ms
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
